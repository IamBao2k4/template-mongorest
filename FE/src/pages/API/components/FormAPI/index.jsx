'use client';

import { Button, buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { PopoverContent, Popover, PopoverTrigger } from '@/components/ui/Popover';
import { entityDataApi } from '@/services/entity-data';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '../context';
import { methods } from '../Method';
import WrapperField from '../WrapperField';
import { Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';

function FormAPI({ id, defaultValues, callbackOk, callbackError, classNameFooter }) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { register, handleSubmit } = useForm({ defaultValues });
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { dataSelected, settings, setRefresh, handleChangeMethod, entity } = useApi();
  const { jsonSchema } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const handleSave = async (value) => {
    try {
      const data = {
        ...dataSelected,
        method: Object.keys(settings),
        settings,
        title: value?.title,
        keySearch: value?.keySearch,
      };
      const res = await entityDataApi().updateData({
        entity,
        data,
        id: params?.id,
      });
      handleChangeJsonAPI();
      toast({ title: 'Success', description: 'Success' });
      setRefresh(true);
    } catch (error) {
      console.log('🚀 ~ handleSave ~ error:', error);
      toast({ description: 'Fail' });
    }
  };

  const handleChangeJsonAPI = async () => {
    const _methods = Object.keys(settings);
    let schemaTable = [];
    let schemaForm = [];
    let schemaRequired = [];
    //Checking for get list method
    if (_methods?.includes('get-list')) {
      const entityRes = [];

      const dataGetList = dataSelected?.settings?.['get-list'];
      const _validate = dataGetList?.validate;

      if (_validate && _validate?.length > 0) {
        const _params = dataGetList?.default?.param || [];
        if (_params?.length > 0) {
          schemaRequired = _params.map((key) => {
            return {
              type: 'string',
              widget: 'shortAnswer',
              title: key,
              filter: true,
              isCheck: true,
              key,
              dataIndex: key,
              component: 'ShortAnswer',
            };
          });
        }
        //Use response or advance
        for (let i = 0; i < _validate.length; i++) {
          const item = _validate[i];
          const _response = item?.response?.[0]?.outputEntity?.[0];

          if (_response) {
            if (typeof _response === 'string') {
              try {
                const _fetchRes = Object.values(jsonSchema)?.find(
                  (item) => item?._id === _response
                );
                entityRes.push(_fetchRes?.mongodb_collection_name);
              } catch (error) {
                console.log('🚀 ~ handleChangeJsonAPI ~ error:', error);
              }
            } else {
              if (!entityRes.includes(_response.mongodb_collection_name)) {
                entityRes.push(_response.mongodb_collection_name);
              }
            }
          }
        }
      }

      if (entityRes?.length > 0) {
        entityRes.map((item) => {
          schemaTable.push(...(jsonSchema?.[item]?.filter || []));
        });
      }
    }

    //Checking for post || put
    if (_methods?.includes('post') || _methods?.includes('put')) {
      const entityRes = [];

      const dataGetList = dataSelected?.settings?.['post'] || dataSelected?.settings?.['put'];
      const _validate = dataGetList?.validate;

      if (_validate && _validate?.length > 0) {
        for (let i = 0; i < _validate.length; i++) {
          const item = _validate[i];
          const _response = item?.response?.[0]?.outputEntity?.[0];

          if (_response) {
            if (typeof _response === 'string') {
              try {
                const _fetchRes = Object.values(jsonSchema)?.find(
                  (item) => item?._id === _response
                );
                entityRes.push(_fetchRes?.mongodb_collection_name);
              } catch (error) {
                console.log('🚀 ~ handleChangeJsonAPI ~ error:', error);
              }
            } else {
              if (!entityRes.includes(_response.mongodb_collection_name)) {
                entityRes.push(_response.mongodb_collection_name);
              }
            }
          }
        }
      }

      if (entityRes?.length > 0) {
        entityRes.map((item) => {
          schemaForm.push(
            ...(jsonSchema?.[item]?.filter?.filter(
              (item) =>
                !['_id', 'created_at', 'updated_at', 'created_by', 'updated_by'].includes(item.key)
            ) || [])
          );
        });
      }
    }

    //List properties, for json schema
    const createJson = (val) => {
      const _fields = Array.from(new Map(val.map((item) => [item.key, item])).values());
      const properties = {};
      const ui = {
        'ui:order': [],
      };
      _fields.map((item) => {
        properties[item.key] = item;
        ui[item.key] = {
          'ui:widget': item.widget,
        };
        ui['ui:order'].push(item.key);
      });

      return {
        json: {
          type: 'object',
          properties,
        },
        ui,
      };
    };

    const _schemaTable = createJson(schemaTable);

    const _schemaForm = createJson(schemaForm);

    const _schemaRequired = createJson(schemaRequired);

    const _data = {
      title: dataSelected?.title,
      api: [dataSelected?._id],
      filter: _schemaTable,
      form: _schemaForm,
      required: _schemaRequired,
    };

    try {
      const itemApiSchema = await entityDataApi().getData({
        entity: 'api-schema',
        params: {
          'search[title:equal]': dataSelected?.title,
        },
      });

      const res =
        itemApiSchema?.data?.length > 0
          ? await entityDataApi().updateData({
              entity: 'api-schema',
              data: _data,
              id: itemApiSchema?.data[0]?._id,
            })
          : await entityDataApi().createData({
              entity: 'api-schema',
              data: _data,
            });
    } catch (error) {
      console.log('🚀 ~ handleSave ~ error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await entityDataApi().deleteData({
        entity,
        ids: params?.id,
      });
      toast({ description: 'Thành công' });
      setRefresh(true);
      navigate(`/${entity}`);
    } catch (error) {
      console.log('🚀 ~ handleSave ~ error:', error);
      toast({ description: 'Thất bại' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className='flex flex-col gap-3 p-5'>
      <WrapperField
        title={'Title'}
        des={'Nhập title cho API'}>
        <Input
          {...register('title')}
          rules={{ required: true }}
        />
      </WrapperField>
      <WrapperField
        title={'Endpoint'}
        des={'Nhập thêm thông tin endpoint'}>
        <Input
          {...register('endpoint')}
          rules={{ required: true }}
        />
      </WrapperField>
      <WrapperField
        title={'Note'}
        des={'Nhập thêm thông tin mô tả cho API'}>
        <Textarea
          {...register('note')}
          rules={{ required: true }}
        />
      </WrapperField>
      <WrapperField
        title={'Key search'}
        des={'Nhập key dùng cho search cho API'}>
        <Input {...register('keySearch')} />
      </WrapperField>
      <div className={'h-[45px] flex gap-2 items-center bg-white justify-between'}>
        <div className='flex gap-2'>
          <Select onValueChange={(val) => handleChangeMethod(params?.id, val)}>
            <SelectTrigger className='w-[160px]'>
              <SelectValue placeholder='Select method' />
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
          <Button
            type='submit'
            className='h-8 w-[100px]'>
            Save
          </Button>
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
                  onClick={handleDelete}
                  type='button'
                  className='h-8 w-[100px]'>
                  Xác nhận
                </Button>
              </div>
            </PopoverContent>
            <PopoverTrigger>
              <div
                className={clsx(buttonVariants({ variant: 'ghost' }), 'h-8 w-[60px]')}
                onClick={() => setOpen(true)}>
                <Trash2 className='size-4' />
              </div>
            </PopoverTrigger>
          </Popover>
        </div>
      </div>
    </form>
  );
}

export default FormAPI;
