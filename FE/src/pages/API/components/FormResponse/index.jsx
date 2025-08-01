'use client';

import { RelationEdit } from '@/components/builders/fields/Relation/components';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { entityDataApi } from '@/services/entity-data';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Code from '../Code';
import TableEdit from '../TableEdit';
import Tabs from '../Tabs';
import WrapperField from '../WrapperField';
import { methods } from '../Method';
import { Textarea } from '@/components/ui/Textarea';
import { Condition } from '@/components/builders/fields';
import Advance from './Advance';
import { getKeysAdvance } from '../utils';

function FormResponse({
  id,
  defaultValues,
  callbackOk,
  callbackError,
  classNameFooter,
  setIsChange,
}) {
  const [tabSelected, setTabSelected] = useState('advance');
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    getValues,
  } = useForm({ defaultValues });

  useEffect(() => {
    if (setIsChange) {
      const { unsubscribe } = watch((value) => {
        if (JSON.stringify(value) !== JSON.stringify(defaultValues)) {
          setIsChange(true);
        }
      });
      return () => unsubscribe();
    }
  }, [watch]);

  const onSubmit = async (data) => {
    try {
      const _data = {
        ...data,
        categories: (data?.categories || [])?.map((item) => item?._id),
        outputEntity: (data?.outputEntity || [])?.map((item) => item?._id),
      };
      const res =
        id === 'new'
          ? await entityDataApi().createData({
              entity: 'response',
              data: _data,
            })
          : await entityDataApi().updateData({
              entity: 'response',
              data: _data,
              id,
            });
      callbackOk && callbackOk();
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      callbackError && callbackError();
    }
  };

  useEffect(() => {
    if (defaultValues?.queryAdvance) {
      const tempResult = getKeysAdvance(defaultValues?.queryAdvance);
      Object.keys(tempResult).forEach((key) => {
        if (tempResult[key].length > 0) {
          const _key = key === 'param' ? 'params' : key === 'header' ? 'headers' : key;
          if (getValues(_key) && Array.isArray(getValues(_key))) {
            setValue(
              _key,
              [...new Set([...getValues(_key)?.map((item) => item.value), ...tempResult[key]])].map(
                (item) => ({
                  value: item,
                  key: item,
                })
              )
            );
          } else {
            setValue(
              _key,
              [...new Set([...tempResult[key]])].map((item) => ({
                value: item,
                key: item,
              }))
            );
          }
        }
      });
    }
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 pb-10 flex-1 overflow-y-auto'>
        <div className='flex flex-col mb-4'>
          {id === 'new' ? (
            <>
              <p className='text-[24px] font-bold text-black/80'>Tạo mới Response</p>
              <p className='text-sm text-black/60'>Nhập thông tin tạo response</p>
            </>
          ) : (
            <>
              <p className='text-[24px] font-bold text-black/80'>{defaultValues?.title}</p>
              <p className='text-sm text-black/60'>Nhập thông tin câp nhật response</p>
            </>
          )}
        </div>
        <WrapperField
          title={'Title'}
          des={'Nhập title cho response'}>
          <Input
            {...register('title')}
            rules={{ required: true }}
          />
        </WrapperField>

        <WrapperField
          title={'Categories'}
          des={'Chọn categories sử dụng cho validate'}>
          <Controller
            name='entity'
            control={control}
            render={({ field }) => (
              <RelationEdit
                schema={{
                  typeSelect: 'multiple',
                  typeRelation: {
                    title: 'categories-api',
                    entity: 'categories-api',
                  },
                }}
                {...field}
              />
            )}
          />
        </WrapperField>

        <WrapperField
          title={'Note'}
          des={'Nhập thêm thông tin mô tả cho response'}>
          <Textarea
            rows={3}
            {...register('note')}
            rules={{ required: true }}
          />
        </WrapperField>

        <WrapperField
          title={'Documents'}
          des={'Chọn documents sử dụng cho validate'}>
          <Controller
            name='documents'
            control={control}
            render={({ field }) => (
              <RelationEdit
                schema={{
                  typeSelect: 'multiple',
                  typeRelation: {
                    title: 'documents',
                    entity: 'documents',
                  },
                }}
                {...field}
              />
            )}
          />
        </WrapperField>

        <WrapperField
          title={'Method'}
          des={'Chọn method sử dụng cho response'}>
          <Controller
            name='method'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(methods).map((item) => (
                    <SelectItem
                      value={item}
                      key={item}>
                      <span className='text-xs font-medium'>{methods?.[item]?.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </WrapperField>

        <WrapperField
          title={'Cache'}
          des={'Thời gian cache (s)'}>
          <Input
            {...register('cache_time')}
            type='number'
          />
        </WrapperField>

        <WrapperField
          title={'Entity'}
          des={'Chọn entity sử dụng cho response'}>
          <Controller
            name='outputEntity'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RelationEdit
                schema={{
                  typeRelation: {
                    title: 'entity',
                    entity: 'entity',
                  },
                }}
                {...field}
              />
            )}
          />
        </WrapperField>

        <WrapperField
          title={'Categories'}
          des={'Chọn categories sử dụng cho validate'}>
          <Controller
            name='categories'
            control={control}
            render={({ field }) => (
              <RelationEdit
                schema={{
                  typeSelect: 'once',
                  typeRelation: {
                    title: 'categories-response',
                    entity: 'categories-response',
                  },
                }}
                {...field}
              />
            )}
          />
        </WrapperField>

        <Tabs
          tabs={[
            { label: 'Data', value: 'data' },
            { label: 'Advance', value: 'advance' },
            { label: 'Params', value: 'params' },
            { label: 'Headers', value: 'headers' },
            { label: 'Body', value: 'body' },
            ...(['get-list', 'get-detail'].includes(watch('method'))
              ? [{ label: 'Mongo tl', value: 'mongo_tl' }]
              : []),
          ].map((item) => {
            return {
              ...item,
              status: ['advance', 'mongo_tl'].includes(item.value)
                ? Boolean(watch('queryAdvance'))
                : item.value === 'data'
                  ? watch(item.value)?.rules?.length > 0
                  : watch(item.value)?.length,
            };
          })}
          tabSelected={tabSelected}
          setTabSelected={setTabSelected}
          className='pt-4 pb-2'
        />

        {tabSelected === 'data' && (
          <Controller
            name='data'
            control={control}
            render={({ field }) => (
              <Condition
                schema={{ typeUI: 'validate' }}
                formContext={{ formData: { post_type: watch('outputEntity') } }}
                {...field}
              />
            )}
          />
        )}

        {tabSelected === 'advance' && (
          <div className='flex flex-col gap-4'>
            <Controller
              name='queryAdvance'
              control={control}
              render={({ field }) => (
                <div className='flex flex-col gap-3'>
                  <p>queryAdvance</p>
                  <Advance
                    value={field.value}
                    onChange={field.onChange}
                    entity={watch('outputEntity')}
                    restricted={watch('restricted')}
                    onChangeRestricted={(data) => setValue('restricted', data)}
                  />
                </div>
              )}
            />
            <Controller
              name='preQueryAdvance'
              control={control}
              render={({ field }) => (
                <div className='flex flex-col gap-3'>
                  <p>preQueryAdvance</p>
                  <Advance
                    value={field.value}
                    onChange={field.onChange}
                    entity={watch('outputEntity')}
                    restricted={watch('restricted')}
                    onChangeRestricted={(data) => setValue('restricted', data)}
                    showTable={false}
                  />
                </div>
              )}
            />
            <Controller
              name='postQueryAdvance'
              control={control}
              render={({ field }) => (
                <div className='flex flex-col gap-3'>
                  <p>postQueryAdvance</p>
                  <Advance
                    value={field.value}
                    onChange={field.onChange}
                    entity={watch('outputEntity')}
                    restricted={watch('restricted')}
                    onChangeRestricted={(data) => setValue('restricted', data)}
                    showTable={false}
                  />
                </div>
              )}
            />
          </div>
        )}

        {tabSelected === 'mongo_tl' && (
          <Controller
            name='mongo_tl'
            control={control}
            render={({ field }) => (
              <Code
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        )}

        {tabSelected === 'headers' && (
          <Controller
            name='headers'
            control={control}
            render={({ field }) => (
              <TableEdit
                data={field.value}
                {...field}
              />
            )}
          />
        )}

        {tabSelected === 'params' && (
          <Controller
            name='params'
            control={control}
            render={({ field }) => (
              <TableEdit
                data={field.value}
                {...field}
              />
            )}
          />
        )}

        {tabSelected === 'body' && (
          <Controller
            name='body'
            control={control}
            render={({ field }) => (
              <TableEdit
                data={field.value}
                {...field}
              />
            )}
          />
        )}

        <div
          className={
            classNameFooter ||
            'fixed z-50 left-[256px] bottom-0 right-0 h-[45px] border-t border-t-[#D4D6D999] px-4 flex gap-2 justify-end items-center bg-white'
          }>
          <Button
            type='submit'
            className='h-8 w-[100px]'>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}

export default FormResponse;
