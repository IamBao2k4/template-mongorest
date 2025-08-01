import DrawerFilter from '@/components/common/ContainerTable/Action/ButtonFilter/DrawerFilter';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { ChevronDown, GripVertical, Plus, Settings2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Response from '../Response';
import SelectEntity from '../SelectEntity';
import AddCustom from './AddCustom';
import HeaderCard from './HeaderCard';
import { Button, buttonVariants } from '@/components/ui/Button';
import { useLocation } from 'react-router-dom';
import Code from '../Code';

function Item({
  providedDraggable,
  itemValidate,
  indexValidate,
  settings,
  setSettings,
  method,
  handleChange,
  handleDelete,
  setOpenDrawer,
  setOpenDrawerRes,
  toggle,
  handleClone,
  handleChangeTitle,
}) {
  const [open, setOpen] = useState(true);
  const [openAdvance, setOpenAdvance] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (toggle !== 1) setOpen(toggle);
  }, [toggle]);

  const handleChangeDataValidate = (value) => {
    const data = JSON.parse(JSON.stringify(itemValidate));
    const _require = [];
    if (value?.length > 0) {
      value?.map((item) => {
        if (item?.required && Array.isArray(item?.required)) {
          _require.push(...item?.required);
        }
      });
    }
    if (_require?.length > 0) {
      if (!data?.params) {
        data.params = [];
      }
      for (let i = 0; i < _require.length; i++) {
        const requireItem = _require[i];

        if (data?.params?.findIndex((i) => i.value === requireItem) === -1) {
          data.params.push({ value: requireItem, required: true });
        }
      }
    }

    data.required = _require;
    data.data = value;
    if (!data?.['query-validate']) {
      data['custom-fields'] = {
        combinator: 'and',
        rules: [],
      };
    }

    handleChange(data);
  };

  const handleChangeQueryValidate = (value) => {
    const data = JSON.parse(JSON.stringify(itemValidate));
    data['query-validate'] = value;
    handleChange(data);
  };

  const handleChangeNoti = (value) => {
    const data = JSON.parse(JSON.stringify(itemValidate));
    data.notification = value;
    handleChange(data);
  };

  const handleChangeAdvance = (value) => {
    const data = JSON.parse(JSON.stringify(itemValidate));
    data['advance'] = value;
    handleChange(data);
  };

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className='w-full'>
      <div className='p-4 rounded-lg bg-[#F9F9F9] my-1 border shadow mr-2'>
        <div className='flex gap-2 items-center'>
          <div
            className='p-2'
            {...providedDraggable.dragHandleProps}>
            <GripVertical className='size-4' />
          </div>
          <CollapsibleTrigger className='flex justify-between items-center w-full'>
            <HeaderCard
              open={open}
              setOpenDrawer={setOpenDrawer}
              itemValidate={itemValidate}
              indexValidate={indexValidate}
              handleDelete={handleDelete}
              handleClone={handleClone}
              handleChangeTitle={handleChangeTitle}
            />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className='flex-1 flex flex-col gap-4 pt-2'>
            <div className='relative'>
              <SelectEntity
                key={indexValidate}
                value={itemValidate?.data}
                typeSelect='multi'
                onChange={(value) => handleChangeDataValidate(value)}
                entity={'validate'}
                className={'pr-32'}
              />
              <Button
                className='gap-2 h-[30px] absolute top-[2px] right-0'
                variant='outline'
                onClick={() => setOpenDrawer(true)}>
                <Plus className='size-4 cursor-pointer' />
                <span>Add new</span>
              </Button>
            </div>
            <Response
              itemValidate={itemValidate}
              indexValidate={indexValidate}
              method={method}
              setOpenDrawerRes={setOpenDrawerRes}
            />

            <div className='px-4 py-2 rounded-sm bg-white mb-2'>
              <div
                className='flex justify-between gap-2 items-center p-2 rounded-sm bg-white cursor-pointer mb-2 hover:bg-gray-100'
                onClick={() => setOpenAdvance(!openAdvance)}>
                <div className='flex flex-col items-start'>
                  <p className='font-semibold mb-[2px]'>{'Advance'}</p>
                  <p className='text-xs mb-1 text-black/60'>{'Chọn advance cho validate'}</p>
                </div>
                <div className={buttonVariants({ variant: 'ghost' })}>
                  <ChevronDown />
                </div>
              </div>
              {openAdvance ? (
                <div className='flex flex-col gap-4'>
                  <div className=''>
                    <DrawerFilter
                      key={JSON.stringify(itemValidate)}
                      header={[
                        {
                          ...fields,
                          choices:
                            itemValidate?.data?.map((item) => ({
                              ...item,
                              key: item.title,
                              value: item?._id,
                            })) || [],
                        },
                      ]}
                      query={
                        itemValidate?.['query-validate'] || {
                          combinator: 'and',
                          rules: [],
                        }
                      }
                      setQuery={(value) => handleChangeQueryValidate(value)}
                    />
                  </div>
                  <AddCustom
                    itemValidate={itemValidate}
                    indexValidate={indexValidate}
                    data={itemValidate?.['custom-fields']}
                    settings={settings}
                    setSettings={setSettings}
                    method={method}
                    handleChange={handleChange}
                  />

                  <div className='flex flex-col gap-4 border'>
                    <div className='p-4 rounded-lg bg-white'>
                      <div className='flex justify-between items-center mb-3'>
                        <div className='flex flex-col items-start'>
                          <p className='font-semibold mb-[2px]'>Notification</p>
                          <p className='text-xs mb-1 text-black/60'>
                            {'Chọn notification cho validate'}
                          </p>
                        </div>
                      </div>
                      <div className='flex gap-4 relative'>
                        <SelectEntity
                          value={itemValidate?.notification || []}
                          typeSelect='multi'
                          onChange={(value) => handleChangeNoti(value)}
                          entity={'notification'}
                          className={'w-full pr-32'}
                        />
                        <Button
                          className='gap-2 h-[30px] absolute top-[2px] right-0'
                          variant='outline'
                          onClick={() => setOpenDrawerRes(true)}>
                          <Plus className='size-4 cursor-pointer' />
                          <span>Add new</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {pathname.startsWith('/workflow') && (
              <Code
                value={itemValidate?.advance}
                onChange={(value) => handleChangeAdvance(value)}
                height={700}
              />
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export default Item;

const fields = {
  widget: 'select',
  returnValue: 2,
  default: 'pending',
  allowNull: false,
  isMultiple: false,
  title: 'data',
  type: 'string',
  filter: true,
  isCheck: true,
  key: 'data',
  dataIndex: 'data',
  component: 'Select',
  label: 'data',
  name: 'data',
  field: 'data',
  datatype: 0,
};
