import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import { Plus } from 'lucide-react';
import { useApi } from '../context';
import SelectEntity from '../SelectEntity';
import Code from '../Code';
import { useState } from 'react';

function Response({ method, itemValidate, indexValidate, setOpenDrawerRes }) {
  const { settings, setSettings } = useApi();
  const [toggleAdvance, setToggleAdvance] = useState(itemValidate?.query_advance);
  const [toggleTrigger, setToggleTrigger] = useState(itemValidate?.trigger_pipeline);
  const _data = settings?.[method]?.validate || [];

  const handleChange = (value, index) => {
    const data = JSON.parse(JSON.stringify(settings));
    data[method]['validate'][index].response = value;
    setSettings(data);
  };

  const handleChangeCode = (value, index) => {
    const data = JSON.parse(JSON.stringify(settings));
    data[method]['validate'][index].trigger_pipeline = value;
    setSettings(data);
  };

  const handleChangeQ = (value, index) => {
    const data = JSON.parse(JSON.stringify(settings));
    data[method]['validate'][index].query_advance = value;
    setSettings(data);
  };
  return (
    <div className='flex flex-col gap-4'>
      <div className='p-4 rounded-lg bg-white'>
        <div className='flex justify-between items-center mb-3'>
          <div className='flex flex-col items-start'>
            <p className='font-semibold mb-[2px]'>{'Response'}</p>
            <p className='text-xs mb-1 text-black/60'>{'Chọn response cho validate'}</p>
          </div>
        </div>
        <div className='flex gap-4 relative'>
          <SelectEntity
            value={itemValidate?.response || []}
            typeSelect='once'
            onChange={(value) => handleChange(value, indexValidate)}
            entity={'response'}
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
        <div className='flex gap-8 mt-4'>
          {['delete', 'patch', 'put'].includes(method) ? (
            <div className='flex items-center space-x-2'>
              <Switch
                checked={toggleAdvance}
                onCheckedChange={setToggleAdvance}
              />
              <Label htmlFor='airplane-mode'>Query Advance</Label>
            </div>
          ) : null}

          <div className='flex items-center space-x-2'>
            <Switch
              checked={toggleTrigger}
              onCheckedChange={setToggleTrigger}
            />
            <Label htmlFor='airplane-mode'>Trigger Pipeline</Label>
          </div>
        </div>

        {toggleAdvance && ['delete', 'patch', 'put'].includes(method) ? (
          <div className='my-4 overflow-hidden'>
            <p className='font-semibold mb-[2px]'>{'Query Advance'}</p>
            <p className='text-xs mb-1 text-black/60'>{'Nhập data advance'}</p>
            <Code
              height={300}
              className={'mt-2'}
              value={itemValidate?.query_advance || ''}
              onChange={(value) => handleChangeQ(value, indexValidate)}
            />
          </div>
        ) : (
          <></>
        )}

        {toggleTrigger ? (
          <div className='mt-4'>
            <p className='font-semibold mb-[2px]'>{'Trigger Pipeline'}</p>
            <p className='text-xs mb-1 text-black/60'>{'Chọn data trigger'}</p>
            <Code
              height={300}
              className={'mt-2'}
              defaultLanguage='json'
              value={itemValidate?.trigger_pipeline || ''}
              onChange={(value) => handleChangeCode(value, indexValidate)}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Response;
