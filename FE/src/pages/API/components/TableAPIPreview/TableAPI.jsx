import { JsonForm } from '@/components/builders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import getHeaderInPosttype from '@/helpers/getHeaderInPosttype';
import { useToast } from '@/hooks/use-toast';
import { entityDataApi } from '@/services';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DrawerItem from './DrawerItem';
import ContainerPreview from './ContainerPreview';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export const formatFilter = (filter) => {
  const _filter = JSON.parse(JSON.stringify(filter));
  Object.keys(_filter).forEach((key) => {
    if (_filter[key]) {
      if (Array.isArray(_filter[key])) {
        _filter[key] = _filter[key]
          .map((item) => (typeof item === 'object' ? item._id : item))
          .join(',');
      } else {
        if (typeof _filter[key] === 'object') {
          _filter[key] = _filter[key]?._id;
        }
      }
    }
  });

  return _filter;
};

function TableAPI({ dataApi, tester }) {
  const [firstData, setFirstData] = useState(null);
  const [schema, setSchema] = useState(null);
  const [select, setSelect] = useState([]);
  const [showDrawerAdd, setShowDrawerAdd] = useState(false);
  const [filterRequired, setFilterRequired] = useState({});
  const [refresh, setRefresh] = useState(false);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (dataApi?.endpoint) fetchData();
  }, [dataApi, filterRequired]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const resSchema = await entityDataApi().getData({
        entity: 'api-schema',
        params: {
          'search[title:equal]': dataApi?.title,
        },
      });

      const _state = {};

      if (resSchema?.data?.length > 0) {
        const _schema = resSchema?.data[0];
        _state.form = _schema?.form;
        _state.required = _schema?.required;

        try {
          const _filter = formatFilter(filterRequired);
          if (
            _schema?.required &&
            JSON.stringify(_schema?.required?.json?.properties) !== '{}' &&
            !(Object.keys(_filter).length > 0)
          ) {
          } else {
            let _dataFirst = {};
            const resFirst = await apiPreview.get('protean/list/' + dataApi?.endpoint, {
              params: {
                limit: 1,
                ..._filter,
              },
              headers: { Authorization: `Bearer ${tester.jwt}` },
            });
            _dataFirst = resFirst?.data?.[0] || {};
            const keys = Object.keys(_dataFirst);
            const _properties = getHeaderInPosttype({
              isPottype: true,
              data: { json: _schema?.filter?.json ? _schema.filter.json : {} },
            });

            const _items = [];
            keys.forEach((key) => {
              const _field = _properties.find((item) => item.key === key) || {
                type: 'string',
                widget: key,
                title: key,
                filter: true,
                isCheck: true,
                key,
                dataIndex: key,
                component: 'ShortAnswer',
              };
              _items.push(_field);
            });
            setFirstData(_dataFirst);
            _state.filter = _items;
          }
        } catch (error) {
          console.log('🚀 ~ fetchData ~ error:123126', error);
        }
        setSchema(_state);
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getData = async ({ params = {} }) => {
    try {
      const _filter = formatFilter(filterRequired);
      return await apiPreview.get('protean/list/' + dataApi?.endpoint, {
        params: { ...params, ..._filter },
        headers: { Authorization: `Bearer ${tester.jwt}` },
      });
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (dataApi?.settings?.['delete']) {
        await apiPreview.delete('protean/' + dataApi?.endpoint, {
          params: {
            _id: select.join(','),
          },
        });
      }
      toast({ description: 'Thành công' });
      setRefresh(true);
      setSelect([]);
    } catch (error) {
      toast({
        title: 'Thất bại',
        description: error?.response?.data?.message,
        variant: 'destructive',
      });
    }
  };

  const handleShowDrawer = (val) => {
    setShowDrawerAdd(val);
  };

  if (!schema && !loading) {
    return (
      <div className='flex items-center justify-center flex-col flex-1 h-full'>
        <p className='text-sm text-black/70 font-medium'>API chưa được tạo schema</p>
        <p className='text-sm text-black/70 font-medium mb-2'>
          Quay về trang API detail nhấn Save để cập nhật schema
        </p>
        <Link
          to={'/role-settings/' + dataApi?._id}
          className={buttonVariants()}>
          Quay về API detail
        </Link>
      </div>
    );
  }

  if (!dataApi?.endpoint) return <></>;

  return (
    <div className='flex-1 flex flex-col overflow-hidden relative'>
      {schema?.required?.json && JSON.stringify(schema?.required?.json?.properties) !== '{}' ? (
        <div className='w-full px-6 pt-5'>
          <div className='w-full'>
            <Card>
              <CardHeader className='space-y-1 pb-2'>
                <CardTitle>Required</CardTitle>
                <CardDescription>Nhập thông tin các field để hiện table</CardDescription>
              </CardHeader>
              <CardContent className='pb-2'>
                <JsonForm
                  schema={JSON.stringify(schema?.required?.json || {})}
                  uischema={JSON.stringify(schema?.required?.ui || {})}
                  setFormData={setFilterRequired}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}

      {!schema && firstData !== null && JSON.stringify(firstData) === '{}' ? (
        <div className='flex justify-center pt-5 items-center w-full'>
          <p className='font-semibold text-sm'>Không có dữ liệu</p>
        </div>
      ) : schema?.required &&
        JSON.stringify(schema?.required?.json?.properties) !== '{}' &&
        !(Object.keys(filterRequired).length > 0) ? (
        <></>
      ) : (
        <ContainerPreview
          dataApi={dataApi}
          tester={tester}
          header={schema?.filter || []}
          getData={getData}
          filterData={filterRequired}
          key={JSON.stringify(filterRequired) + JSON.stringify(schema?.filter || '')}
          refresh={refresh}
          setRefresh={setRefresh}
          setShowDrawerAdd={handleShowDrawer}
          select={select}
          setSelect={setSelect}
        />
      )}

      <DrawerItem
        dataApi={dataApi}
        schema={schema}
        showDrawerAdd={showDrawerAdd}
        setShowDrawerAdd={setShowDrawerAdd}
        tester={tester}
        setRefresh={setRefresh}
        key={JSON.stringify(showDrawerAdd)}
      />
      {dataApi?.method?.includes('delete') && select?.length > 0 ? (
        <div className=' absolute bottom-[70px] left-1/2 transform -translate-x-1/2 z-10 shadow-lg'>
          <div className='px-5 h-9 bg-white border rounded-md flex gap-4 items-center justify-center'>
            <p className='text-sm font-semibold text-black/70'>{select?.length} items selected</p>
            <Button
              className='h-7 w-[80px]'
              onClick={handleDelete}>
              Xóa
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export const apiPreview = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: false,
  timeout: 1000 * 60,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Requested-Store': 'default',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'x-tenant-id': '67b2bc288ac7a801d196b4b0',
  },
});

apiPreview.interceptors.response.use(function (response) {
  return response?.data || response;
});

export default TableAPI;
