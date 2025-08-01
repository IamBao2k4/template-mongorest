'use client';

import API from './API';
import { useApi } from './context';
import TabLayout from './TabLayout';

function ContainerAPI({ title, entity, type }) {
  const { dataSelected } = useApi();
  return (
    <>
      <TabLayout entity={entity} />
      <API
        className='flex-1 p-5'
        data={dataSelected}
        key={dataSelected?._id}
        title={title}
        entity={entity}
        type={type}
      />
    </>
  );
}

export default ContainerAPI;
