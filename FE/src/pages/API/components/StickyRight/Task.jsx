import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet';
import { Tag } from '@/components/ui/Tag';
import useServiceDetail from '@/hooks/useServiceDetail';
import { MessageSquareText, Paperclip, Plus } from 'lucide-react';
import FormTask from '../FormTask';
import { useState } from 'react';

function Task({ tasks }) {
  const [data, setData] = useState(null);
  const { schema } = useServiceDetail({ entity: 'task', notInitData: true });
  const labelOptions = JSON.parse(schema.json).properties.label.choices || [];
  const statusOptions = JSON.parse(schema.json).properties.status.choices || [];
  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <p className='text-sm font-semibold'>Task</p>
        <Button
          onClick={() => {}}
          variant='outline'
          className='w-[120px] gap-2'>
          <Plus className='w-4 h-4' />
          <span className='text-xs'>Add new task</span>
        </Button>
      </div>
      <div className='flex flex-col gap-4'>
        {tasks?.map((item) => {
          const { title, files, label, status, members } = item;
          const _label = labelOptions.filter((item) => (label || [])?.includes(item.value));
          const _status = statusOptions.filter((item) => (status || [])?.includes(item.value));
          return (
            <div
              className='shadow-lg rounded-md border overflow-hidden hover:bg-gray-100 cursor-pointer'
              onClick={() => setData(item)}
              key={item?._id}>
              {files?.[0] && (
                <div className='relative'>
                  <img
                    src={files?.[0]?.path}
                    alt='img'
                    className='w-full h-[200px] object-cover'
                  />
                  {_status?.length > 0 ? (
                    <div
                      className='px-4 py-1 w-fit rounded-sm mb-1 absolute top-2 left-2'
                      style={{ backgroundColor: `#${_status[0].key.split('#')[1]}` }}>
                      <p className='text-xs font-semibold text-white'>
                        {_status[0].key.split('#')[0]}
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
              <div className='p-4'>
                {_label?.length > 0 ? (
                  <div className='flex gap-2'>
                    {_label?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className='px-4 py-1 w-fit rounded-sm mb-1'
                          style={{ backgroundColor: `#${item.key.split('#')[1]}` }}>
                          <p className='text-xs font-semibold text-white'>
                            {item.key.split('#')[0]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                <p className='text-base font-medium mb-2'>{title}</p>
                <div className='flex gap-2 justify-between items-center'>
                  <div className='flex gap-4'>
                    <MessageSquareText className='w-4 h-4' />
                    <div className='flex gap-1'>
                      <Paperclip className='w-4 h-4' />
                      <span className='text-xs'>{files?.length} files</span>
                    </div>
                  </div>
                  <div className='flex'>
                    {members?.map((item) => {
                      return <Tag key={item._id}>{item.first_name + ' ' + item.last_name}</Tag>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Sheet
        open={data}
        onOpenChange={setData}>
        <SheetContent className='sm:max-w-[70%] p-0 flex flex-col'>
          <div className={'p-4 gap-4 flex items-center'}>
            <SheetHeader>
              <SheetTitle className='text-2xl'>Task</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
          </div>
          <div className='flex flex-col gap-4 relative flex-1 px-5 pb-14 overflow-auto'>
            {data && (
              <FormTask
                showHeading={false}
                id={data?._id}
                defaultValues={data}
                callbackOk={() => setData(null)}
                classNameFooter='absolute bottom-0 left-0 right-0 flex gap-2 justify-end p-4'
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Task;
