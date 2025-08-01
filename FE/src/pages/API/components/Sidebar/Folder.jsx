import clsx from 'clsx';
import { ChevronDown, Folder } from 'lucide-react';
import React from 'react';
import { Fragment } from 'react';

function FolderUI({ chevronClassName = '', folderClassName = '' }) {
  return (
    <Fragment>
      <ChevronDown
        className={clsx('text-[#212121] size-4 transition-all duration-200', chevronClassName)}
      />
      <Folder className={clsx('size-3 shrink-0', folderClassName)} />
    </Fragment>
  );
}

export default FolderUI;
