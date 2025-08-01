import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import useServiceDetail from '@/hooks/useServiceDetail';
import FormResponse from '../FormResponse';
import FormValidate from '../FormValidate';
import { Button } from '@/components/ui/Button';
import { MoveDiagonal } from 'lucide-react';
import { Link } from '@/components/ui/Link';
import { useState } from 'react';
import ContainerForm from '@/components/common/ContainerForm';
import { useToast } from '@/hooks/use-toast';

const FormDocuments = ({ data, callbackOk, entity }) => {
  const { schema, formData, onChangeFormData, onSubmit, loading } = useServiceDetail({
    entity,
    id: data?._id,
  });

  return (
    <>
      <div className='flex flex-col mb-4'>
        <p className='text-[24px] font-bold text-black/80'>{data?.title}</p>
        <p className='text-sm text-black/60'>Nhập thông tin câp nhật response</p>
      </div>
      <div className='flex-1 overflow-y-auto'>
        <ContainerForm
          schema={schema}
          onChangeFormData={onChangeFormData}
          formData={formData}
        />
      </div>
      <div className='absolute bottom-0 left-0 right-0 flex gap-2 justify-end p-4'>
        <Button
          className='h-8 w-[100px]'
          onClick={async () => {
            await onSubmit();
            callbackOk();
          }}
          loading={loading}>
          Submit
        </Button>
      </div>
    </>
  );
};

function Form({ data, setData, entity, setSelected }) {
  const { toast } = useToast();
  const [isChange, setIsChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const callbackOk = () => {
    toast({ description: 'Thành công' });
    setData(null);
    setSelected(null);
  };

  return (
    <Sheet
      open={data}
      onOpenChange={(val) => {
        if (isChange && !val) {
          setShowModal(true);
          return;
        }
        if (!val) {
          setSelected(null);
          setData(null);
          return;
        }
        setData(val);
      }}>
      <SheetContent className='sm:max-w-[70%] p-0 flex flex-col'>
        <div className={'p-4 gap-4 flex items-center'}>
          <Link
            target={'_blank'}
            className='cursor-pointer'
            href={`/${entity}/${data?._id}`}>
            <MoveDiagonal className='size-5' />
          </Link>
          <SheetHeader>
            <SheetTitle className='text-2xl'>Edit {entity}</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
        </div>
        <div className='flex flex-col gap-4 relative flex-1 px-5 pb-14 overflow-auto'>
          {entity === 'validate' ? (
            <FormValidate
              id={data?._id}
              defaultValues={data}
              callbackOk={callbackOk}
              classNameFooter='absolute bottom-0 left-0 right-0 flex gap-2 justify-end p-4'
              setIsChange={setIsChange}
            />
          ) : null}
          {entity === 'response' ? (
            <FormResponse
              id={data?._id}
              defaultValues={data}
              callbackOk={callbackOk}
              classNameFooter='absolute bottom-0 left-0 right-0 flex gap-2 justify-end p-4'
              setIsChange={setIsChange}
            />
          ) : null}
          {data && entity === 'documents' ? (
            <FormDocuments
              data={data}
              callbackOk={callbackOk}
              entity={'documents'}
            />
          ) : null}
          {data && entity === 'notification' ? (
            <FormDocuments
              data={data}
              callbackOk={callbackOk}
              entity={'notification'}
            />
          ) : null}
        </div>
        <Dialog
          open={showModal}
          onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button
                onClick={() => {
                  setShowModal(false);
                  setIsChange(false);
                  setData(null);
                  setSelected(null);
                }}>
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  );
}

export default Form;
