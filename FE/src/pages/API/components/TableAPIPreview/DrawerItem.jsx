import { JsonForm } from '@/components/builders';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/Sheet';
import { useState } from 'react';
import { apiPreview, formatFilter } from './TableAPI';
import { useToast } from '@/hooks/use-toast';

function DrawerItem({ schema, showDrawerAdd, setShowDrawerAdd, tester, dataApi, setRefresh }) {
  const [data, setData] = useState(typeof showDrawerAdd === 'object' ? showDrawerAdd : {});
  const { toast } = useToast();
  const handleClickSave = async () => {
    try {
      const method = showDrawerAdd?._id ? 'put' : 'post';
      const _data = formatFilter(data);
      await apiPreview[method]('protean/' + dataApi?.endpoint, _data, {
        headers: { Authorization: `Bearer ${tester.jwt}` },
      });
      toast({
        title: 'Success',
        description: 'Add new item successfully',
      });
      setRefresh(true);
      setShowDrawerAdd(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message,
        variant: 'destructive',
      });
      console.log('🚀 ~ handleClickSave ~ error:', error);
    }
  };
  return (
    <Sheet
      open={showDrawerAdd}
      onOpenChange={setShowDrawerAdd}>
      <SheetContent className='sm:max-w-[70%] overflow-hidden flex flex-col'>
        <SheetHeader className='flex justify-between flex-row items-center'>
          <SheetTitle>Add New</SheetTitle>
          <Button
            className='w-[120px]'
            onClick={handleClickSave}>
            Save
          </Button>
        </SheetHeader>
        <div>
          {showDrawerAdd ? (
            <JsonForm
              schema={JSON.stringify(schema?.form?.json || {})}
              uischema={JSON.stringify(schema?.form?.ui || {})}
              initFormData={data}
              onChangeFormData={setData}
            />
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default DrawerItem;
