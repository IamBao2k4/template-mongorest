import { entityDataApi } from '@/services/entity-data';
import FormTester from '../FormTester';
import { useEffect, useState } from 'react';
import { useApi } from '../context';

function Tester({ id }) {
  const [data, setData] = useState(null);
  const { setTester } = useApi();
  useEffect(() => {
    async function getData() {
      try {
        if (id) {
          const tester = await entityDataApi().getDetail({ entity: 'tester', id });
          if (tester) {
            setData(tester?.data);
          }
        }
      } catch (error) {
        console.log('🚀 ~ getData ~ error:', error);
        setTester(null);
        localStorage.removeItem('tester');
      }
    }

    getData();
  }, [id]);

  return (
    data && (
      <FormTester
        className='absolute bottom-0 left-0 right-0'
        defaultValues={data}
        classNameFooter='absolute bottom-0 left-0 right-0 w-full h-[45px] border-t border-t-[#D4D6D999] px-4 flex gap-2 justify-end items-center bg-white'
        key={data?._id}
        id={data?._id}
      />
    )
  );
}

export default Tester;
