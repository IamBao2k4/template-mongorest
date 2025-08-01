import { RelationEdit } from '@/components/builders/fields/Relation/components';
import { Tag } from '@/components/ui/Tag';
import { useEffect, useState } from 'react';
import Form from './Form';
import { entityDataApi } from '@/services/entity-data';

function SelectEntity({ entity, title, des, typeSelect = 'multiple', value, onChange, className }) {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(null);

  const handleGet = async (id) => {
    try {
      const response = await entityDataApi().getDetail({ entity, id });
      setData(response?.data);
    } catch (error) {
      console.log('🚀 ~ handleGet ~ error:', error);
    }
  };

  useEffect(() => {
    if (selected) {
      handleGet(selected?._id);
    }
  }, [selected]);

  return (
    <div className={className}>
      {title && <p className='text-sm font-semibold mb-1'>{title}</p>}
      {des && <p className='text-xs mb-1 text-black/60'>{des}</p>}
      <div className='h-[34px] overflow-hidden'>
        <RelationEdit
          schema={{
            typeSelect,
            typeRelation: {
              title: entity,
              entity: entity,
            },
          }}
          value={value}
          onChange={onChange}
        />
      </div>

      {value?.length > 0 ? (
        <div className='pt-2 flex gap-2 flex-wrap'>
          {value?.map((item, index) => {
            return (
              <Tag
                key={item._id}
                className='cursor-pointer'
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey) {
                    window.open(`/${entity}/${item._id}`, '_blank');
                  } else {
                    // Hành vi bình thường
                    setSelected(item);
                  }
                }}
                closable
                onClose={(e) => {
                  e.preventDefault();
                  const _data = JSON.parse(JSON.stringify(value));
                  _data.splice(index, 1);
                  onChange(_data);
                }}>
                {item?.title}
              </Tag>
            );
          })}
        </div>
      ) : null}

      <Form
        data={data}
        setData={setData}
        setSelected={setSelected}
        entity={entity}
      />
    </div>
  );
}

export default SelectEntity;
