import DrawerFilter from '@/components/common/ContainerTable/Action/ButtonFilter/DrawerFilter';
import { useState } from 'react';
import TableEdit from '../TableEdit';

function AddCustom({ itemValidate, settings, setSettings, method, handleChange }) {
  const _custom = itemValidate?.['custom-fields'] || [];
  const [value, setValue] = useState(() => {
    const _in = JSON.parse(JSON.stringify(_custom));
    return _in && Array.isArray(_in) ? _in?.map((item) => item?.value || '') : [];
  });

  const handleChangeCustomField = (value) => {
    const data = JSON.parse(JSON.stringify(itemValidate));
    data['custom-fields'] = value;
    handleChange(data);
  };

  const handleChangeFilter = (value) => {
    const data = JSON.parse(JSON.stringify(itemValidate));
    data['custom-filter'] = value;
    handleChange(data);
  };

  return (
    <div className='flex flex-col gap-4 border'>
      <div className='p-4 rounded-lg bg-white'>
        <div className='flex flex-col gap-3'>
          <div>
            <p className='font-semibold mb-1'>Custom key</p>
            <p className='text-xs text-black/60'>{'Nhập các key cần add thêm'}</p>
          </div>
          <TableEdit
            data={_custom}
            onChange={handleChangeCustomField}
          />
          {_custom?.length > 0 ? (
            <DrawerFilter
              header={JSON.parse(JSON.stringify(_custom))
                ?.filter((item) => item.value)
                ?.map((item, index) => ({
                  title: item.value,
                  type: 'string',
                  widget: 'shortAnswer',
                  filter: true,
                  isCheck: true,
                  key: item.value,
                  dataIndex: index,
                  component: 'ShortAnswer',
                  label: item.value,
                  name: item.value,
                  field: item.value,
                  datatype: 0,
                }))}
              query={itemValidate?.['custom-filter'] || null}
              setQuery={(v) => handleChangeFilter(v)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AddCustom;
