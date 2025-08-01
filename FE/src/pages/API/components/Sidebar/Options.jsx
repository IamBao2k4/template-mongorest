import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Link } from '@/components/ui/Link';

import clsx from 'clsx';
import { Ellipsis } from 'lucide-react';

function Options({ id, handleExecute, selectRow, method, OptionsInput, classNameTrigger = '' }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={clsx(
          'absolute group-hover:opacity-100 opacity-0 right-3 top-1/2 -translate-y-1/2 w-auto border-0 p-1 hover:bg-[#e6e6e6]',
          'data-[state=open]:bg-[#e6e6e6]',
          classNameTrigger
        )}>
        <Ellipsis
          className='w-4 h-4'
          onClick={selectRow}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-44 p-1'>
        {OptionsInput.map((opt) => {
          const item = (
            <DropdownMenuItem
              key={opt.label}
              onSelect={() => {
                if (opt.href) return;
                if (method) handleExecute(method);
                else handleExecute(opt.defaultMethod);
              }}
              className={clsx(
                'text-xs py-3 px-3 flex justify-between items-center group cursor-pointer',
                'focus:bg-[var(--focus-bg)]'
              )}
              style={{
                '--focus-bg': opt.background,
              }}>
              <span
                className={clsx('group-hover:!text-[var(--hover-text)]', 'text-current')}
                style={{ '--hover-text': opt.color }}>
                {opt.label}
              </span>
              <span
                className={clsx('group-hover:!text-[var(--hover-text)]', 'text-[#a6a6a6]')}
                style={{ '--hover-text': opt.color }}>
                {opt.shortcut}
              </span>
            </DropdownMenuItem>
          );

          if (opt.href) {
            return (
              <Link
                href={'/role-settings/' + id + opt.href}
                key={opt.label}>
                {item}
              </Link>
            );
          } else {
            return item;
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Options;
