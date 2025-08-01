'use client';

import { Suspense } from 'react';
import ContainerAPI from './components';

function APIDetail() {
  return (
    <Suspense>
      <div className='flex flex-col flex-1 w-0'>
        <ContainerAPI />
      </div>
    </Suspense>
  );
}

export default APIDetail;
