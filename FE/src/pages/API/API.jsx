import { Suspense } from 'react';
import ContainerAPI from './components';

function API({ type, entity }) {
  return (
    <Suspense>
      <div className='flex flex-col w-full h-full overflow-y-auto'>
        <ContainerAPI
          entity={entity}
          type={type}
        />
      </div>
    </Suspense>
  );
}

export default API;
