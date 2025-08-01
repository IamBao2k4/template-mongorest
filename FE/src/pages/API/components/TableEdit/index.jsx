import React, { useEffect, useState } from 'react';
import BulkEdit from './BulkEdit';
import Header from './Header';
import Row from './Row';
import { Plus } from 'lucide-react';

const TableEdit = ({ data, title, onChange }) => {
  const [dataRows, setDataRows] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      setDataRows([...data]);
    } else {
      setDataRows([{ key: '', value: '', description: '' }]);
    }
  }, [data]);

  const [isBulkEdit, setIsBulkEdit] = useState(false);
  const [bulkEditValue, setBulkEditValue] = useState('');

  const handleChange = (index, field, value) => {
    const updatedRows = [...dataRows];
    if (['value', 'description'].includes(field) && value && index === dataRows.length - 1) {
      updatedRows.push({ key: '', value: '', description: '' });
    }
    updatedRows[index][field] = value;
    setDataRows(updatedRows);
    onChange(updatedRows);
  };

  const toggleBulkEdit = () => {
    if (!isBulkEdit) {
      const bulkValue = dataRows.map((row) => `${row.key}:${row.value}`).join('\n');
      setBulkEditValue(bulkValue);
    } else {
      applyBulkEdit();
    }
    setIsBulkEdit(!isBulkEdit);
  };

  const applyBulkEdit = () => {
    const newRows = bulkEditValue
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => {
        const [key, value = ''] = line.split(':');
        return { key: key.trim(), value: value.trim(), description: '' };
      });
    setDataRows(newRows);
    onChange(newRows);
  };

  const handleRemove = (index) => {
    const updatedRows = [...dataRows];
    updatedRows.splice(index, 1);
    setDataRows(updatedRows);
    onChange(updatedRows);
  };

  const handleAdd = () => {
    const updatedRows = [...dataRows, { key: '', value: '', description: '' }];
    setDataRows(updatedRows);
    onChange(updatedRows);
  };

  return (
    <div className='pr-8 relative'>
      {title ? <p className='text-xs font-semibold text-black/70 mb-2'>{title}</p> : null}
      <div className='relative'>
        <Header
          toggleBulkEdit={toggleBulkEdit}
          isBulkEdit={isBulkEdit}
        />
        {isBulkEdit ? (
          <BulkEdit
            bulkEditValue={bulkEditValue}
            setBulkEditValue={setBulkEditValue}
            applyBulkEdit={applyBulkEdit}
          />
        ) : (
          dataRows.map((row, index) => {
            return (
              <Row
                {...row}
                key={index}
                fieldKey={row?.key}
                onChange={(key, val) => handleChange(index, key, val)}
                handleRemove={() => handleRemove(index)}
              />
            );
          })
        )}
        <div className='flex justify-end'>
          <div
            className='p-1 border-x border-b cursor-pointer'
            onClick={handleAdd}>
            <Plus className='size-2' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableEdit;
