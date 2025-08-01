import ButtonFilter from '@/components/common/ContainerTable/Action/ButtonFilter';
import { buttonVariants } from '@/components/ui/Button';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import TablePreview from './TablePreview';

const initialQuery = {
  combinator: 'and',
  rules: [],
};

function ContainerPreview({
  dataApi,
  getData,
  header,
  setShowDrawerAdd,
  refresh,
  setRefresh,
  ...props
}) {
  const [queryFilter, setQueryFilter] = useState(initialQuery);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });
  const [result, setResult] = useState({
    data: [],
    meta: {},
  });

  useEffect(() => {
    const data = localStorage.getItem('pageSizePreview');
    if (data) {
      setFilter((pre) => ({
        ...pre,
        limit: data,
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {
    if (refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [refresh]);

  const onChangeFilter = () => {
    const _rules =
      queryFilter?.rules?.length > 0 ? JSON.parse(JSON.stringify(queryFilter?.rules)) : [];
    if (_rules?.length > 0) {
      const _data = {};
      _rules.map((item) => {
        _data[item.field] = item.value;
      });
      setFilter({ ...filter, ..._data });
    }
  };

  const fetchData = async () => {
    try {
      const data = await getData({ params: { ...filter } });
      setResult(data);
    } catch (error) {
      console.log('🚀 ~ fetchData ~ error:', error?.response?.data?.message);
    }
  };

  const onClickRow = (val) => {
    setShowDrawerAdd(val);
  };

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex items-start justify-between py-2 shadow-md'>
        <ButtonFilter
          header={header}
          query={queryFilter}
          setQuery={setQueryFilter}
          onChangeFilter={onChangeFilter}
          showFilter
        />
        {dataApi?.method?.includes('post') && (
          <div
            variant='outline'
            onClick={() => {
              setShowDrawerAdd((pre) => !pre);
            }}
            className={clsx(
              buttonVariants({ variant: 'outline' }),
              'gap-1 border-none !shadow-none cursor-pointer'
            )}>
            <Plus className='size-4' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap text-sm text-default-black'>
              Add new
            </span>
          </div>
        )}
      </div>

      <TablePreview
        data={result?.data}
        total={result?.meta?.total}
        filter={filter}
        setFilter={setFilter}
        header={header}
        onClickRow={onClickRow}
        {...props}
      />
    </div>
  );
}

export default ContainerPreview;
