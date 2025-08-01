import { useParams } from 'react-router-dom';
import TableAPI from './TableAPI';
import { useApi } from '../context';
import { useEffect, useState } from 'react';
import { entityDataApi } from '@/services';

function TableAPIPreview() {
  const { id } = useParams();
  const { tester } = useApi();
  const [dataSelected, setDataSelected] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const resSchema = await entityDataApi().getDetail({
        entity: 'role-settings',
        id,
      });
      setDataSelected(resSchema?.data);
    } catch (error) {
      console.log('🚀 ~ fetchData ~ error:', error);
    }
  };

  return (
    dataSelected && (
      <TableAPI
        dataApi={dataSelected}
        tester={tester}
        key={dataSelected?._id + JSON.stringify(tester || {})}
      />
    )
  );
}

export default TableAPIPreview;
