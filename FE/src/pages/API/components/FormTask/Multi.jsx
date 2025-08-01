'use client';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useState } from 'react';

export function DropdownMenuCheckboxes({ list }) {
  const [showStatusBar, setShowStatusBar] = useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-full'>
        <DropdownMenuGroup>
          {list?.map((item) => {
            return (
              <DropdownMenuCheckboxItem
                key={item.key}
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}>
                {item.key}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
