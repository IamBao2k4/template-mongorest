// Row.jsx
'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { Link } from '@/components/ui/Link';
import clsx from 'clsx';
import { useApi } from '../context';
import { methods } from '../Method';
import Options from './Options';
import { entityDataApi } from '@/services/entity-data';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, useRef, useEffect } from 'react';
import { handleDataAction } from '@/helpers/utils';
import FolderUI from './Folder';
import NameInput from './NameInput';
import { Fragment } from 'react';
import Dialog from './Dialog';
import { OPTIONS } from '../data';
function Row({
  _id,
  title,
  selectedRow,
  showOptions,
  setShowOptions,
  setSelectedRow,
  data,
  selected,
  method,
  entity,
}) {
  const {
    handleChangeMethod,
    handleChangeApi,
    setRefresh,
    method: methodSelected,
    openSidebar,
    handleChangeOpenSidebar,
  } = useApi();
  const [rename, setRename] = useState(title);
  const [isRenaming, setIsRenaming] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalMethod, setOpenModalMethod] = useState(false);
  const [updatedMethod, setUpdatedMethod] = useState({});

  const renameInputRef = useRef(null);
  const open = openSidebar?.includes(_id);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;

    const [movedItem] = method.splice(source.index, 1);
    method.splice(destination.index, 0, movedItem);
    data.method = method;
    handleDataAction(
      entityDataApi,
      'update',
      { entity, data, id: data._id },
      setRefresh,
      'Sắp xếp method thành công!',
      'Lỗi khi sắp xếp method:'
    );
  };

  const handleRemoveMethod = async (value) => {
    const updatedData = { ...data };
    updatedData.method = updatedData.method.filter((method) => method !== value);
    delete updatedData.settings[value];
    setUpdatedMethod(updatedData);
    setOpenModalMethod(true);
  };
  const handleConfirmRemoveMethod = async () => {
    handleDataAction(
      entityDataApi,
      'update',
      { entity, data: updatedMethod, id: _id },
      setRefresh,
      'Xóa method thành công!',
      'Lỗi khi xóa method:'
    );
    //Reset
    setOpenModalMethod(false);
    setUpdatedMethod({});
  };
  const handleSaveRename = () => {
    const trimmedName = rename.trim();
    if (!trimmedName) {
      setRename(title); // Reset
    } else if (trimmedName !== title) {
      data.title = trimmedName;
      handleDataAction(
        entityDataApi,
        'update',
        { entity, data, id: _id },
        setRefresh,
        'Đổi tên API thành công!',
        'Lỗi khi đổi tên API:'
      );
    }
    //Reset
    setIsRenaming(false);
  };
  const handleExecuteFolder = (method) => {
    switch (method) {
      case 'rename': {
        setIsRenaming(true);
        break;
      }
      case 'duplicate': {
        handleDuplicate();
        break;
      }
      case 'delete': {
        setOpenModal(true);
        break;
      }
      default:
        break;
    }
  };
  const handleDuplicate = async () => {
    const duplicatedData = { ...data };
    delete duplicatedData._id;

    const now = new Date();
    const formattedDate = now.toLocaleString('vi-VN').replace(',', '');

    const newTitle = `${duplicatedData.title} ${formattedDate}`;
    duplicatedData.title = newTitle;
    handleDataAction(
      entityDataApi,
      'create',
      { entity, data: duplicatedData },
      setRefresh,
      'Nhân bản API thành công!',
      'Lỗi khi nhân bản API:'
    );
  };
  const handleDelete = async () => {
    handleDataAction(
      entityDataApi,
      'delete',
      { entity, ids: _id },
      setRefresh,
      'Xóa API thành công!',
      'Lỗi khi xóa API:'
    );
    setOpenModal(false);
  };
  const handleClickOutside = (e) => {
    if (isRenaming && renameInputRef.current && !renameInputRef.current.contains(e.target)) {
      handleSaveRename();
    }
  };

  useEffect(() => {
    if (isRenaming) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRenaming, rename]);
  // block potential bugs Shift + Space
  useEffect(() => {
    const logKeyPress = (e) => {
      if (e.key === ' ' && e.shiftKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', logKeyPress);
    return () => {
      window.removeEventListener('keydown', logKeyPress);
    };
  }, []);
  useEffect(() => {
    if (isRenaming && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [isRenaming]);

  return (
    <Fragment>
      <Collapsible
        open={open}
        onOpenChange={() => handleChangeOpenSidebar(_id)}>
        <div>
          <div
            className={clsx('relative group', selectedRow === 'folder' + _id && 'bg-[#ededed]')}
            onMouseEnter={() => {
              setShowOptions('folder' + _id);
            }}
            onMouseLeave={() => {
              setShowOptions('');
            }}
            onClick={() => {
              setSelectedRow('folder' + _id);
            }}>
            <Link
              href={`/${entity}/${_id}`}
              className='group-hover:bg-[#ededed]'>
              <CollapsibleTrigger
                className={clsx(
                  'flex items-center justify-between gap-2 w-full pl-8 pr-[14px] h-7 group-hover:bg-[#ededed] hover:bg-[#ededed]',
                  _id === selected && !methodSelected
                    ? 'bg-[#ededed] border-l-2 border-l-red-500'
                    : ''
                )}
                onClick={() => handleChangeApi(_id)}>
                <div className='flex items-center gap-2 relative w-full'>
                  <FolderUI chevronClassName={open ? 'rotate-0' : '-rotate-90'} />
                  <NameInput
                    isRenaming={isRenaming}
                    ref={renameInputRef}
                    rename={rename}
                    setRename={setRename}
                    handleSaveRename={handleSaveRename}
                  />
                </div>
              </CollapsibleTrigger>
            </Link>
            <Options
              id={_id}
              method={null}
              OptionsInput={OPTIONS}
              handleExecute={handleExecuteFolder}
            />
          </div>
          <CollapsibleContent>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId={`droppable-${_id}`}
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {method?.map((item, index) => (
                      <Draggable
                        key={item}
                        draggableId={`draggable-${item}`}
                        index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onMouseEnter={() => {
                              setShowOptions(item + _id);
                            }}
                            onMouseLeave={() => {
                              setShowOptions('');
                            }}
                            className={clsx(
                              'relative w-full group ',
                              selectedRow === item + _id && 'bg-[#ededed]'
                            )}>
                            <Link
                              href={`/${entity}/${_id}?method=${item}`}
                              onClick={() => handleChangeMethod(_id, item)}
                              className={clsx(
                                'flex items-center justify-between w-full pl-14 h-7 group-hover:bg-[#ededed]',
                                _id === selected &&
                                  methodSelected === item &&
                                  'bg-[#e6e6e6] border-l-2 border-l-red-500'
                              )}>
                              <p
                                className='text-xs text-[#212121] font-semibold'
                                style={{ color: methods[item].color }}>
                                {methods[item].label}
                              </p>
                            </Link>
                            <Options
                              id={_id}
                              method={item}
                              selectRow={() => {
                                setSelectedRow(item + _id);
                              }}
                              OptionsInput={[OPTIONS[2]]}
                              handleExecute={handleRemoveMethod}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CollapsibleContent>
        </div>
      </Collapsible>
      <Dialog
        title={'Xác nhận xóa'}
        cancel={'Hủy'}
        description={'Bạn có chắc chắn muốn xóa API này không?'}
        setOpen={setOpenModal}
        open={openModal}
        handleExecute={handleDelete}
        submit={'Xác nhận'}
      />
      <Dialog
        title={'Xác nhận xóa'}
        cancel={'Hủy'}
        description={'Bạn có chắc chắn muốn xóa Method này không?'}
        setOpen={setOpenModalMethod}
        open={openModalMethod}
        handleExecute={handleConfirmRemoveMethod}
        submit={'Xác nhận'}
      />
    </Fragment>
  );
}

export default Row;
