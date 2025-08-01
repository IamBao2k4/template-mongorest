import { Button } from '@/components/ui/Button';
import { useApi } from '../context';
import Code from '../Code';
import { useAuth } from '@/context/AuthContext';
import Cookies from 'js-cookie';
import { useToast } from '@/hooks/use-toast';

function buildCurlCommand({
  url, // URL mặc định
  method = 'GET', // Method mặc định
  headers = {}, // Headers mặc định
  body = null, // Body mặc định
}) {
  const { toast } = useToast();
  const _url = `${import.meta.env.VITE_API_URL}/api/v1/protean/${url}`;
  const _method = method?.split('-')[0].toUpperCase();
  // Xây dựng chuỗi headers
  const headerString = Object.entries(headers)
    .map(([key, value]) => `-H "${key}: ${value}"`)
    .join(' ');

  // Xử lý body (nếu có)
  const bodyString = body ? `-d '${JSON.stringify(body)}'` : '';

  // Tạo chuỗi curl
  return `curl -X ${_method}${headerString ? ` ${headerString}` : ''}${
    bodyString ? ` ${bodyString}` : ''
  } "${_url}"`;
}

function CodeEditor() {
  const { dataSelected, method } = useApi();
  const { tenant } = useAuth();

  const _data = buildCurlCommand({
    url: dataSelected?.endpoint,
    headers: {
      'X-Tenant-ID': tenant?._id,
      Authorization: `bearer ${Cookies.get('userToken')}`,
    },
    body: dataSelected?.body,
    method,
  });

  // Hàm copy _data vào clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(_data).then(
      () => {
        toast({ description: 'Copy thành công' });
      },
      (err) => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy.');
      }
    );
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <p className='text-sm font-semibold'>Curl</p>
        <Button
          onClick={handleCopy}
          variant='ghost'
          className='w-[120px]'>
          <span className='text-xs'>Copy</span>
        </Button>
      </div>
      <Code
        value={_data}
        width='auto'
        fontSize={12}
        height={'400px'}
      />
    </div>
  );
}

export default CodeEditor;
