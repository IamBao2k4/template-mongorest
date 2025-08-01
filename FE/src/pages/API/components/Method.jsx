import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { PopoverContent, Popover, PopoverTrigger } from '@/components/ui/Popover';
import { entityDataApi } from '@/services/entity-data';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useApi } from './context';
import clsx from 'clsx';
import { Tag } from '@/components/ui/Tag';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
function Method() {
  const {
    method,
    handleChangeMethod,
    dataSelected,
    settings,
    setDataSelected,
    setRefresh,
    handleDeleteMethod,
    deletedMethod,
    setDeletedMethod,
    entity,
  } = useApi();

  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const handleChangeURL = (data) => {
    setDataSelected({
      ...dataSelected,
      endpoint: data,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const _settings = JSON.parse(JSON.stringify(settings));
      if (deletedMethod?.length > 0) {
        deletedMethod.forEach((item) => {
          delete _settings[item];
        });
      }
      const data = { ...dataSelected, method: Object.keys(_settings), settings: _settings };
      if (!params?.id) {
        setShowModal(true);
        setLoading(false);
        return;
      } else {
        const res = await entityDataApi().updateData({
          entity,
          data,
          id: params?.id,
        });
      }

      toast({ description: 'Thành công' });
      setDeletedMethod([]);
      setLoading(false);
      setRefresh(true);
    } catch (error) {
      setLoading(false);
      console.log('🚀 ~ handleSave ~ error:', error);
    }
  };

  const create = async () => {
    try {
      setLoading(true);
      const data = { ...dataSelected, method: Object.keys(settings), settings, title };
      const res = await entityDataApi().createData({
        entity,
        data,
      });
      handleChangeMethod(res?.data?._id, undefined);
      toast({ description: 'Thành công' });
      setRefresh(true);
      setTitle('');
      setShowModal(false);
      setLoading(false);
      navigate(`/${entity}/${res?.data?._id}`);
    } catch (error) {
      console.log('🚀 ~ create ~ error:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex gap-2 px-5 pt-4'>
        <div className='flex w-full'>
          <Select
            value={method}
            onValueChange={(val) => handleChangeMethod(params?.id, val)}>
            <SelectTrigger className='w-[120px] py-[19px] rounded-tr-none rounded-br-none h-[38px]'>
              <SelectValue placeholder='Select a method' />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(methods).map((item) => (
                <SelectItem
                  value={item}
                  key={item}>
                  <span
                    className='text-xs font-bold'
                    style={{ color: methods?.[item]?.color }}>
                    {methods?.[item]?.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            className='h-10 rounded-tl-none rounded-bl-none border-l-0 text-[#212121] text-xs'
            placeholder='Enter your URL or past'
            value={dataSelected?.endpoint}
            onChange={(e) => handleChangeURL(e.target.value)}
          />
        </div>
        <Button
          className='h-10 w-[120px]'
          onClick={handleSave}
          loading={loading}>
          <span className='font-bold text-white'>Save</span>
        </Button>
        {method ? (
          <Popover
            place
            open={open}
            onOpenChange={setOpen}>
            <PopoverContent side='bottom'>
              <p className='font-semibold'>Xác nhận</p>
              <p className='text-xs text-black/80 mb-2'>Bạn có chắc chắn xóa?</p>
              <div className='flex gap-2'>
                <Button
                  onClick={() => setOpen(false)}
                  type='button'
                  variant='outline'
                  className='h-8 w-[100px]'>
                  Hủy
                </Button>
                <Button
                  onClick={() => {
                    handleDeleteMethod();
                    setOpen(false);
                  }}
                  type='button'
                  className='h-8 w-[100px]'>
                  Xác nhận
                </Button>
              </div>
            </PopoverContent>
            <PopoverTrigger>
              <div
                className={clsx(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'h-[38px]'
                )}>
                <Trash2 className='size-4' />
              </div>
            </PopoverTrigger>
          </Popover>
        ) : null}
      </div>
      {deletedMethod?.length > 0 ? (
        <div className='flex gap-1 items-center pl-5'>
          <span className='text-xs'>Method deleted: </span>
          {deletedMethod.map((item) => {
            return (
              <Tag>
                <span className='text-xs'>{methods?.[item]?.label}</span>
              </Tag>
            );
          })}
        </div>
      ) : null}
      <Modal
        width={500}
        open={showModal}
        centered
        title='Tạo mới response'
        description='Nhập thông tin tạo response'
        okText='Tạo'
        cancelText='Hủy'
        onCancel={() => setShowModal(false)}
        loading={loading}
        onOk={create}>
        <div>
          <p className='font-medium'>Title</p>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
}

export default Method;

export const methods = {
  // get: { label: 'GET', color: '#007F31' },
  ['get-list']: { label: 'GET LIST', color: '#007F31' },
  ['get-detail']: { label: 'GET DETAIL', color: '#007F31' },
  post: { label: 'POST', color: '#AD7A03' },
  put: { label: 'PUT', color: '#0053B8' },
  patch: { label: 'PATCH', color: '#623497' },
  delete: { label: 'DELETE', color: '#8E1A10' },
  ['get-tree']: { label: 'GET TREE', color: '#3a86c8' },
  ['set-tree']: { label: 'SET TREE', color: '#3a86c8' },
};
