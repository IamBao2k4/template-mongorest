import clsx from 'clsx';
import { ArrowLeftRight } from 'lucide-react';

function Header({ isBulkEdit, toggleBulkEdit }) {
  return (
    <div className={clsx('flex items-center', isBulkEdit ? 'border-y' : 'divide-x border')}>
      {isBulkEdit ? (
        <></>
      ) : (
        <div className='w-8 flex items-center justify-end pr-1'>
          <input type='checkbox' />
        </div>
      )}

      <div className={clsx('flex-1 grid grid-cols-2', isBulkEdit ? '' : 'divide-x')}>
        <div className='flex items-center'>
          {isBulkEdit ? (
            <></>
          ) : (
            <>
              <span className='text-xs text-[#212121] font-semibold p-2'>Key</span>
            </>
          )}
        </div>
        <div
          className={clsx(
            'flex divide-x items-center h-full',
            isBulkEdit ? 'justify-end' : 'justify-between'
          )}>
          {isBulkEdit ? (
            <></>
          ) : (
            <span className='text-xs text-[#212121] font-semibold p-2'>Description</span>
          )}
          <div
            className='flex items-center justify-between h-full w-[160px] hover:bg-slate-100 cursor-pointer pr-2'
            onClick={toggleBulkEdit}>
            <span className='text-xs text-[#212121] font-semibold p-2'>
              {isBulkEdit ? 'Table Edit' : 'Bulk Edit'}
            </span>
            <ArrowLeftRight className='size-4' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
