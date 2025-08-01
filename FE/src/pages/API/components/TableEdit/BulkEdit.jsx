'use client';

import clsx from 'clsx';
import { useState } from 'react';

const BulkEdit = ({ bulkEditValue, setBulkEditValue }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <textarea
        value={bulkEditValue}
        onChange={(e) => setBulkEditValue(e.target.value)}
        placeholder='Enter key=value pairs, one per line'
        className={clsx(
          'w-full h-40 rounded p-2 text-xs outline-none',
          focus ? 'bg-white' : 'bg-[#F9F9F9]'
        )}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

export default BulkEdit;
