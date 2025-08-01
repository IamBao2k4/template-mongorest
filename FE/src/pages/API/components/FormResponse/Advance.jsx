import { useEffect, useState } from 'react';
import Code from '../Code';
import TableEdit from '../TableEdit';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/Resizable';
import { useAuth } from '@/context/AuthContext';

function Advance({ value, onChange, entity, restricted, onChangeRestricted, showTable = true }) {
  const [rows, setRows] = useState([]);
  const { jsonSchema } = useAuth();

  useEffect(() => {
    try {
      const item = entity?.[0]?.mongodb_collection_name;
      if (item) {
        const _filter = JSON.parse(JSON.stringify(jsonSchema[item].filter));
        const _rows = JSON.parse(JSON.stringify(restricted || []));
        _filter?.map((item) => {
          if (_rows?.findIndex((row) => row.key === item.key) === -1) {
            _rows.push({
              key: item.key,
              value: item.key,
            });
          }
        });
        if (!restricted) {
          onChangeRestricted(_rows);
        }
        setRows(_rows);
      }
    } catch (error) {
      console.log('🚀 ~ useEffect ~ error:', error);
    }
  }, [entity]);

  return (
    <div className='flex gap-5 h-[500px]'>
      <ResizablePanelGroup
        direction='horizontal'
        autoSaveId='resize-api'>
        <ResizablePanel
          defaultSize={50}
          className='pr-3'>
          <Code
            value={value || ''}
            onChange={(value) => onChange(value)}
            className='shrink-0 h-[500px]'
            defaultLanguage={'json'}
          />
        </ResizablePanel>
        {rows?.length > 0 && entity?.[0] ? (
          <>
            <ResizableHandle className='hover:bg-red-500' />
            <ResizablePanel
              defaultSize={50}
              className='pl-3'>
              {showTable && (
                <TableEdit
                  data={rows}
                  title={entity?.[0]?.title}
                  onChange={(data) => onChangeRestricted(data)}
                />
              )}
            </ResizablePanel>
          </>
        ) : (
          <></>
        )}
      </ResizablePanelGroup>
    </div>
  );
}

export default Advance;
