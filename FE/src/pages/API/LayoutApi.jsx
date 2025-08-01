import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Suspense } from 'react';
import { APIProvider } from './components/context';
import PageHeader from '@/components/common/PageHeader';

function LayoutAPI({ entity }) {
  return (
    <APIProvider entity={entity}>
      <div className='h-screen overflow-hidden flex flex-col'>
        <PageHeader
          title={entity === 'role-settings' ? 'API Setting' : 'Flow Setting'}
          showTester={true}
        />
        <div className='flex w-full overflow-y-auto flex-1'>
          <Suspense>
            <Sidebar entity={entity} />
          </Suspense>
          <Outlet />
        </div>
      </div>
    </APIProvider>
  );
}

export default LayoutAPI;
