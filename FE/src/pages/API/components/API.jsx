'use client';

import { useEffect, useRef, useState } from 'react';
import { useApi } from './context';
import Method from './Method';
import Response from './Response';
import Tabs from './Tabs';
import Validate from './Validate';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/Resizable';
import FormAPI from './FormAPI';
import Result from './Result';
import {
  ArrowUp,
  BookText,
  Braces,
  ClipboardList,
  Code,
  MessageSquareText,
  UserRoundPen,
} from 'lucide-react';
import clsx from 'clsx';
import StickyRight from './StickyRight';
import TabTable from './TabTable';
import { useLocation } from 'react-router-dom';

function API({ type, entity }) {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const { method, settings, setSettings, dataSelected, isNew, tester } = useApi();
  const [tabSelected, setTabSelected] = useState(searchParams.get('tab') || null);
  const [sizeRight, setSizeRight] = useState(null);
  const [sizeBottom, setSizeBottom] = useState(null);
  const ref = useRef(null);
  const refBottom = useRef(null);
  const [typeSelect, setTypeSelect] = useState('task');
  const handleChangeRow = (data, type) => {
    const dataSettings = JSON.parse(JSON.stringify(settings));
    dataSettings[method][type] = data;
    setSettings(dataSettings);
  };

  useEffect(() => {
    if (!tabSelected) return;
    const url = new URL(window.location);
    url.searchParams.set('tab', tabSelected);
    window.history.pushState({}, '', url);
  }, [tabSelected]);

  const showCollapse = () => ref.current?.collapse();

  if (!method && !isNew) {
    return <FormAPI defaultValues={dataSelected} />;
  }

  const _dataMethod = settings?.[method];

  const hasData = (key) =>
    _dataMethod?.[key]?.length > 0 || _dataMethod?.default?.[key.replace('s', '')]?.length > 0;

  return (
    <div className={'flex flex-col gap-4 flex-1'}>
      <ResizablePanelGroup
        direction='horizontal'
        autoSaveId='resize-api'>
        <ResizablePanel
          defaultSize={80}
          className=''>
          <ResizablePanelGroup
            direction='vertical'
            autoSaveId='resize-api-2'
            className=''>
            <ResizablePanel
              defaultSize={90}
              className='flex flex-col pt-2'>
              <Method />
              <div className='px-5 mb-4'>
                <Tabs
                  tabs={tabs.map((item) => ({
                    ...item,
                    status:
                      item.value === 'validate'
                        ? _dataMethod?.validate?.length || 0
                        : (_dataMethod?.[item.value]?.length || 0) +
                          (_dataMethod?.default?.[item.value.replace('s', '')]?.length || 0),
                  }))}
                  tabSelected={tabSelected}
                  setTabSelected={setTabSelected}
                />
              </div>
              <div className='px-5 flex flex-col gap-5 flex-1 overflow-y-auto'>
                {method ? (
                  <>
                    {['params', 'headers', 'body'].includes(tabSelected) && (
                      <TabTable
                        handleChangeRow={(val) => handleChangeRow(val, tabSelected)}
                        tabSelected={tabSelected}
                      />
                    )}
                    {/* {tabSelected === 'description' && <Description />} */}
                    {tabSelected === 'response' && <Response method={method} />}
                    {(!tabSelected || tabSelected === 'validate') && <Validate method={method} />}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </ResizablePanel>
            {!isNew && (
              <>
                <ResizableHandle className='hover:bg-red-500' />
                <ResizablePanel
                  ref={refBottom}
                  collapsible={true}
                  defaultSize={40}
                  collapsedSize={0}
                  onResize={(val) => setSizeBottom(parseInt(val))}
                  minSize={20}>
                  <Result
                    onCollapse={() => refBottom.current?.collapse()}
                    key={JSON.stringify(dataSelected?._id + method + tester?._id)}
                    method={method}
                  />
                </ResizablePanel>
                <div
                  onClick={() => refBottom.current?.expand()}
                  className={clsx(
                    'flex flex-col gap-1 w-full bg-gray-200 hover:bg-gray-300 cursor-pointer items-center justify-center overflow-hidden',
                    sizeBottom === 0 ? 'h-[48px]' : 'h-0'
                  )}>
                  <div className='flex gap-2 items-center'>
                    <p className='text-sm font-semibold text-black/80'>Test API</p>
                    <ArrowUp className='size-4' />
                  </div>
                </div>
              </>
            )}
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle className='hover:bg-red-500' />
        <ResizablePanel
          className='relative'
          ref={ref}
          collapsible={true}
          defaultSize={50}
          collapsedSize={0}
          onResize={(val) => setSizeRight(parseInt(val))}
          minSize={20}>
          <StickyRight
            showCollapse={showCollapse}
            dataIcons={dataIcons}
            typeSelect={typeSelect}
            setTypeSelect={setTypeSelect}
          />
        </ResizablePanel>
        <div className={clsx('flex flex-col gap-1', sizeRight === 0 ? 'w-[45px]' : 'w-0')}>
          {dataIcons.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setTypeSelect(item?.type);
                  ref.current?.expand();
                }}
                className={
                  'size-[48px] flex items-center justify-center cursor-pointer hover:bg-[#F9F9F9]'
                }>
                <item.icon
                  className='size-4'
                  strokeWidth={1}
                />
              </div>
            );
          })}
        </div>
      </ResizablePanelGroup>
    </div>
  );
}

export default API;

const tabs = [
  { label: 'Validate', value: 'validate' },
  { label: 'Params', value: 'params' },
  { label: 'Headers', value: 'headers' },
  { label: 'Body', value: 'body' },
];

const dataIcons = [
  { title: 'Chat', type: 'chat', icon: MessageSquareText },
  { title: 'Documents', type: 'documents', icon: BookText },
  { title: 'Code', type: 'code', icon: Code },
  { title: 'Tester', type: 'tester', icon: UserRoundPen },
  { title: 'Task', type: 'task', icon: ClipboardList },
  { title: 'JSON', type: 'json', icon: Braces },
];
