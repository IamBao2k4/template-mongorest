'use client';

import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { useAuth } from '@/context/AuthContext';
import { RelationEdit } from '@/components/builders/fields/Relation/components';
import { Tag } from '@/components/ui/Tag';
import { withRelation } from '@/hooks/withRelation';
import { classifyFieldsIntoGroups } from '@/helpers/classifyFieldsIntoGroups';
import { DEFAULT_FORM_INPUTS } from '@/components/builders/fields/default';

const TagRender = withRelation(({ title, ...props }) => {
  return (
    <Tag className='h-6'>
      <span className='w-max line-clamp-1 max-w-[160px]'>{title}</span>
    </Tag>
  );
});

function Row({ value, relation, description, onChange, required, handleRemove }) {
  const [focus, setFocus] = useState(false);
  const _renderItem = (key, val, select) => {
    return (
      <div className='flex items-center px-1 relative overflow-hidden'>
        {relation && key === 'description' ? (
          <>
            <div className='h-6 w-full overflow-hidden relative z-20 mb-2'>
              <RelationEdit
                schema={{
                  title: '',
                  description: '',
                  typeSelect: 'multiple',
                  typeRelation: {
                    title: relation,
                    entity: relation,
                  },
                }}
                onChange={(e) => onChange('description', e)}
                value={val}
                classContainer='border-none !h-6 shadow-none !bg-transparent'
              />
            </div>
            <div className='absolute z-10 flex gap-1 overflow-hidden'>
              {val &&
                Array.isArray(val) &&
                val?.map((item) => (
                  <TagRender
                    {...item}
                    key={item._id}
                    inforFields={{ key: relation }}
                  />
                ))}
            </div>
          </>
        ) : (
          <input
            className='w-full border-none h-[22px] outline-none text-xs bg-white'
            value={val}
            onChange={(e) => onChange(key, e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        )}

        {select}
      </div>
    );
  };

  const select = (
    <Select
      value={relation}
      onValueChange={(val) => onChange('relation', val)}>
      <SelectTrigger className='w-[160px] border-none absolute right-0'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {classifyFieldsIntoGroups(DEFAULT_FORM_INPUTS).map((item) => {
          return (
            <SelectGroup key={item.label}>
              <SelectLabel>
                <span className='text-sm'>{item.label}</span>
              </SelectLabel>
              {item.options.map((opt) => (
                <SelectItem
                  value={opt.value}
                  key={opt.value}>
                  <span className='text-xs'>{opt.label}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );

  return (
    <div
      className={clsx(
        'flex items-center border-b border-x divide-x h-8 relative',
        focus && 'bg-[#F9F9F9]'
      )}>
      <div className='w-8 flex items-center justify-end pr-1'>
        <input
          type='checkbox'
          onChange={(e) => onChange('required', e.target.checked)}
          checked={required}
        />
        <div
          className='absolute -right-7 top-0 bottom-0 h-full flex items-center p-1 hover:bg-accent rounded-sm cursor-pointer'
          onClick={handleRemove}>
          <Trash2 className='size-3.5' />
        </div>
      </div>
      <div className='flex-1 grid grid-cols-2 divide-x h-full'>
        {_renderItem('value', value, select)}
        {_renderItem('description', description)}
      </div>
    </div>
  );
}

export default Row;
