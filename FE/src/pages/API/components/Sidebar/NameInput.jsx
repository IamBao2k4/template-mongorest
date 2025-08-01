import React, { forwardRef } from 'react';

const NameInput = forwardRef(
  ({ isRenaming, rename, setRename, handleSaveRename, ...props }, ref) => {
    return isRenaming ? (
      <input
        ref={ref}
        className='h-7 text-xs text-[#212121] w-8/12 border border-gray-300 rounded px-1'
        value={rename}
        onChange={(e) => setRename(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSaveRename()}
        {...props}
      />
    ) : (
      <p className='text-xs text-[#212121] line-clamp-1 text-left'>{rename}</p>
    );
  }
);

export default NameInput;
