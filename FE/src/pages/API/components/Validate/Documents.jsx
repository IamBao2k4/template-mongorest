import clsx from 'clsx';
import { useApi } from '../context';
import SelectEntity from '../SelectEntity';

function Documents({ method, itemValidate, indexValidate, onChange, className }) {
  const { settings, setSettings } = useApi();

  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
      return;
    }
    const data = JSON.parse(JSON.stringify(settings));
    data[method]['validate'][indexValidate].documents = value;
    setSettings(data);
  };

  return (
    <div className={clsx('flex flex-col gap-4 bg-white rounded-lg', className)}>
      <div className='p-4'>
        <div className='flex justify-between items-center mb-3'>
          <div className='flex flex-col items-start'>
            <p className='font-semibold mb-[2px]'>{'Documents'}</p>
            <p className='text-xs mb-1 text-black/60'>{'Chọn documents cho validate'}</p>
          </div>
        </div>
        <div className='flex gap-4'>
          <SelectEntity
            value={itemValidate?.documents || []}
            onChange={(value) => handleChange(value)}
            entity={'documents'}
            className={'w-full'}
          />
        </div>
      </div>
    </div>
  );
}

export default Documents;
