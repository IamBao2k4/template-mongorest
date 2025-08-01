import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useApi } from '../context';
import { useMemo, useState } from 'react';
import Code from '../Code';
import TableEdit from '../TableEdit';
import { ArrowDown } from 'lucide-react';

function Result({ method, onCollapse }) {
  const { settings, dataSelected, tester } = useApi();
  const { headers, params, body } = settings[method] || {};
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const mergeDefaults = (key, defaults, keyDefault) => [
    ...(key || []),
    ...(defaults?.map((item) => ({
      key: item,
      value: item,
      description: tester?.[keyDefault]?.find((i) => i.value === item)?.description,
    })) || []),
  ];

  const _default = useMemo(() => {
    return {
      params: mergeDefaults(params, settings[method]?.default?.param, 'params'),
      headers: mergeDefaults(headers, settings[method]?.default?.header, 'headers'),
      body: mergeDefaults(body, settings[method]?.default?.body, 'body'),
      jwt: tester?.jwt,
    };
  });
  const [data, setData] = useState(_default);
  const [res, setRes] = useState(null);

  const handleSubmit = async () => {
    // Tạo params string
    const paramsString = data?.params
      ?.filter((item) => item?.description)
      ?.map(({ key, description }) => {
        return `${key}=${description}`;
      })
      ?.join('&');

    const _headers = {};
    data?.headers?.forEach((item) => {
      if (item?.description) {
        _headers[item?.key || item.value] = item?.description;
      }
    });

    const _body = {};
    data?.body?.forEach((item) => {
      if (item?.description) {
        _body[item?.key || item.value] = item?.description;
      }
    });

    // Fetch API
    try {
      setLoading(true);
      const _url = `${import.meta.env.VITE_API_URL}/api/v1/protean${
        method === 'get-list' ? '/list' : ''
      }/${dataSelected?.endpoint}`;
      const _method =
        method?.split('-')?.length > 1
          ? method?.split('-')[0]?.toUpperCase()
          : method?.toUpperCase();

      const response = await fetch(`${_url}${paramsString ? `?${paramsString}` : ''}`, {
        method: _method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${data.jwt}`,
          ..._headers,
        },
        ...(Object.keys(data.body || {}).length > 0 ||
        ['post', 'put'].includes(_method.toLowerCase())
          ? {
              body: JSON.stringify(_body),
            }
          : {}),
      });

      const result = await response.json();
      setStatus({
        status: 'success',
        message: result,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error calling API:', error);
      setStatus({
        status: 'error',
        message: error.message,
      });
    }
  };

  return (
    <div className=' p-5 w-full'>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <p className='text-sm font-semibold'>Result</p>
          <div className='flex gap-2'>
            <Button
              onClick={handleSubmit}
              variant='outline'
              loading={loading}>
              Check
            </Button>
            <Button
              onClick={onCollapse}
              variant='ghost'>
              <ArrowDown className='size-4' />
            </Button>
          </div>
        </div>
        {res ? (
          <Code
            value={res}
            theme='github'
            className='h-auto'
          />
        ) : null}
      </div>
      <div className='flex gap-2 pt-2'>
        <div className='flex-1 flex flex-col gap-3'>
          <div>
            <p className='text-sm font-semibold mb-1'>{'JWT'}</p>
            <Input
              value={data.jwt}
              onChange={(ev) => setData({ ...data, jwt: ev.target.value })}
            />
          </div>
          <div>
            <p className='text-sm font-semibold mb-1'>{'Params'}</p>
            <TableEdit
              data={_default.params}
              onChange={(val) => setData({ ...data, params: val })}
            />
          </div>
          <div>
            <p className='text-sm font-semibold mb-1'>{'Headers'}</p>
            <TableEdit
              data={_default.headers}
              onChange={(val) => setData({ ...data, headers: val })}
            />
          </div>
          <div>
            <p className='text-sm font-semibold mb-1'>{'Body'}</p>
            <TableEdit
              data={_default.body}
              onChange={(val) => setData({ ...data, body: val })}
            />
          </div>
        </div>
        <div className='flex-1'>
          <Code value={status || ''} />
        </div>
      </div>
    </div>
  );
}

export default Result;
