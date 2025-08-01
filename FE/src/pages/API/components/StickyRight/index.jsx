import { Textarea } from '@/components/ui/Textarea';
import clsx from 'clsx';
import { useApi } from '../context';
import CodeEditor from './Code';
import SelectEntity from '../SelectEntity';
import { useEffect, useState } from 'react';
import Tester from './Tester';
import Task from './Task';
import { entityDataApi } from '@/services';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import Code from '../Code';

function StickyRight({ showCollapse, dataIcons, typeSelect, setTypeSelect }) {
  const { dataSelected, setDataSelected, settings, setSettings, method, tester } = useApi();
  const [tasks, setTasks] = useState({ data: [], total: 0 });

  const handleChangeDocuments = (data) => {
    const dataSettings = JSON.parse(JSON.stringify(settings));
    dataSettings[method].documents = data;
    setSettings(dataSettings);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const res = await entityDataApi().getData({
        entity: 'task',
        params: {
          'search[api:in]': dataSelected?._id,
          limit: 100,
        },
      });
      setTasks({ data: res.data, total: res.meta.total });
    } catch (error) {
      console.log('🚀 ~ getTasks ~ error:', error);
    }
  };

  useEffect(() => {
    if (tester) setTypeSelect('tester');
  }, [JSON.stringify(tester)]);

  return (
    <div className='flex w-full gap-2'>
      <div className={clsx('flex flex-col gap-1 w-[48px] p-2')}>
        {dataIcons.map((item, index) => {
          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={() => {
                      setTypeSelect(item?.type);
                      if (item?.type === typeSelect) {
                        showCollapse();
                      }
                    }}
                    className={clsx(
                      'size-[48px] flex items-center justify-center cursor-pointer hover:bg-[#F9F9F9] relative',
                      {
                        'bg-[#F9F9F9]': typeSelect === item?.type,
                      }
                    )}>
                    <item.icon className='size-4' />
                    {tasks.total > 0 && item?.type === 'task' && (
                      <span className='text-[9px] top-1 right-1 absolute font-bold'>
                        {tasks.total}
                      </span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{item?.title}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      <div className='pt-4 flex flex-col overflow-hidden gap-2 flex-1 px-4'>
        {typeSelect === 'chat' && (
          <div>
            <p className='text-sm font-semibold mb-1'>Chat</p>
            <p className='text-xs mb-1 text-black/60'>Nhập thông tin chat</p>
            <Textarea
              rows={8}
              className='w-full'
              value={dataSelected?.chat}
              onChange={(e) => setDataSelected((pre) => ({ ...pre, chat: e.target.value }))}
            />
          </div>
        )}

        {typeSelect === 'documents' && (
          <div className='flex flex-col'>
            <div className={clsx('flex flex-col gap-4 bg-white rounded-lg mb-4')}>
              <div className=''>
                <div className='flex justify-between items-center mb-3'>
                  <div className='flex flex-col items-start'>
                    <p className='font-semibold mb-[2px]'>{'Documents'}</p>
                    <p className='text-xs mb-1 text-black/60'>{'Chọn documents cho validate'}</p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <SelectEntity
                    value={settings?.[method]?.documents || []}
                    onChange={(value) => handleChangeDocuments(value)}
                    entity={'documents'}
                    className={'w-full'}
                  />
                </div>
              </div>
            </div>
            <div className='w-full h-[600px] overflow-y-auto'>
              <div className='w-full'>
                {settings?.[method]?.documents?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p className='text-sm font-semibold mb-1'>{item?.title}</p>
                      <div
                        dangerouslySetInnerHTML={{ __html: item?.long_description }}
                        className='prose !w-full !max-w-full [&_div]:!w-full [&_table]:!w-full'
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {typeSelect === 'code' ? <CodeEditor /> : null}
        {typeSelect === 'tester' && tester?._id ? <Tester id={tester?._id} /> : null}
        {typeSelect === 'task' ? <Task tasks={tasks.data} /> : null}
        {typeSelect === 'json' ? <Code value={JSON.stringify(dataSelected, null, 2)} /> : null}
      </div>
    </div>
  );
}

export default StickyRight;
