'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useApi } from './context';

const Description = ({}) => {
  const [focus, setFocus] = useState(false);
  const { dataSelected, setDataSelected } = useApi();
  return (
    <textarea
      placeholder='Enter description...'
      className={clsx(
        'w-full h-40 outline-none rounded p-2 text-xs',
        focus ? 'bg-white' : 'bg-[#F9F9F9]'
      )}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      value={dataSelected.description}
      onChange={(e) => {
        setDataSelected({
          ...dataSelected,
          description: e.target.value,
        });
      }}
    />
  );
};

export default Description;
