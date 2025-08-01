import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useApi } from '../context';
import Item from './Item';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import FormValidate from '../FormValidate';
import { useState } from 'react';
import FormResponse from '../FormResponse';
import { Plus } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/Sheet';
import { useToast } from '@/hooks/use-toast';

function Validate({ method }) {
  const { settings, setSettings } = useApi();
  const _data = settings?.[method]?.validate || [];
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerRes, setOpenDrawerRes] = useState(false);
  const [toggle, setToggle] = useState(true);
  const { toast } = useToast();

  const onDragEnd = (result) => {
    const data = JSON.parse(JSON.stringify(settings));
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const [removed] = data?.[method]?.['validate'].splice(sourceIndex, 1);
    data[method]['validate'].splice(destinationIndex, 0, removed);
    setSettings(data);
  };

  const handleChange = (value, index) => {
    const data = JSON.parse(JSON.stringify(settings));
    data[method]['validate'][index] = value;
    value?.data?.map((item) => {
      ['headers', 'body', 'params'].map((key) => {
        if (item?.[key] && Array.isArray(item?.[key])) {
          item?.[key]
            ?.filter((head) => head.value)
            ?.map((head) => {
              if (data[method][key]?.findIndex((item) => item.value === head.value) === -1) {
                data[method][key].push(head);
              }
            });
        }
      });
    });
    setSettings(data);
  };

  const handleDelete = (index) => {
    const data = JSON.parse(JSON.stringify(settings));
    data[method]['validate'].splice(index, 1);
    setSettings(data);
  };

  const handleClone = (index) => {
    const data = JSON.parse(JSON.stringify(settings));
    const item = JSON.parse(JSON.stringify(data[method]['validate'][index]));
    data[method]['validate'].splice(index, 0, item);
    setSettings(data);
  };

  const handleChangeTitle = (value, index) => {
    const data = JSON.parse(JSON.stringify(settings));
    data[method]['validate'][index].title = value;
    setSettings(data);
  };

  const handleAddValidate = () => {
    const data = JSON.parse(JSON.stringify(settings));
    data[method]['validate'].push({ data: [] });
    setSettings(data);
  };

  return (
    <>
      <div className='flex gap-2 justify-between'>
        <Button
          className='gap-2 w-[200px]'
          variant='outline'
          onClick={handleAddValidate}>
          <Plus className='size-5' />
          <span>Add validate</span>
        </Button>
        <div className='flex items-center space-x-2'>
          <Switch
            checked={toggle}
            onCheckedChange={setToggle}
          />
          <Label htmlFor='airplane-mode'>Toggle Collapse ({_data?.length || 0})</Label>
        </div>
      </div>
      <DragDropContext
        onDragEnd={onDragEnd}
        className='w-full'>
        <Droppable
          direction='vertical'
          droppableId='droppable'
          isDropDisabled={false}
          isCombineEnabled={false}
          ignoreContainerClipping={false}>
          {(providedDroppable) => (
            <div
              className='w-full flex flex-col gap-3 overflow-y-auto pb-5'
              {...providedDroppable.droppableProps}
              ref={providedDroppable.innerRef}>
              {_data?.map((itemValidate, indexValidate) => {
                return (
                  <Draggable
                    className='w-full'
                    key={JSON.stringify(itemValidate?.title) + indexValidate.toString()}
                    draggableId={indexValidate.toString()}
                    index={indexValidate}>
                    {(providedDraggable, snapshot) => (
                      <div
                        key={indexValidate.toString()}
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        className={`draggable-item ${snapshot.isDragging ? 'dragging' : ''}`}
                        style={{
                          ...providedDraggable.draggableProps.style,
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        <Item
                          handleChangeTitle={handleChangeTitle}
                          providedDraggable={providedDraggable}
                          itemValidate={itemValidate}
                          indexValidate={indexValidate}
                          settings={settings}
                          setSettings={setSettings}
                          method={method}
                          handleChange={(data) => handleChange(data, indexValidate)}
                          handleDelete={() => handleDelete(indexValidate)}
                          handleClone={() => handleClone(indexValidate)}
                          setOpenDrawer={setOpenDrawer}
                          setOpenDrawerRes={setOpenDrawerRes}
                          toggle={toggle}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {providedDroppable.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Sheet
        open={openDrawerRes}
        onOpenChange={setOpenDrawerRes}>
        <SheetContent className='sm:max-w-[80%] p-0 flex flex-col'>
          <div className='p-5 h-full overflow-auto relative'>
            <div className='relative'>
              <FormResponse
                id={'new'}
                defaultValues={{}}
                callbackOk={() => {
                  setOpenDrawerRes(false);
                  toast({ description: 'Thành công' });
                }}
                classNameFooter='absolute top-0 right-0 gap-2 flex'
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <Sheet
        open={openDrawer}
        onOpenChange={setOpenDrawer}>
        <SheetContent className='sm:max-w-[80%] p-0 flex flex-col'>
          <div className='p-5 h-full overflow-auto relative'>
            <div className='relative'>
              <FormValidate
                id={'new'}
                defaultValues={{}}
                callbackOk={() => {
                  setOpenDrawer(false);
                  toast({ description: 'Thành công' });
                }}
                classNameFooter='absolute top-0 right-0 gap-2 flex'
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Validate;
