'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { entityDataApi } from '@/services/entity-data';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TableEdit from '../TableEdit';
import Tabs from '../Tabs';
import { getKeysAdvance } from '../utils';
import WrapperField from '../WrapperField';

function FormTester({
  id,
  defaultValues,
  callbackOk,
  callbackError,
  classNameFooter,
  setIsChange,
}) {
  const [tabSelected, setTabSelected] = useState('params');
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
              entity: 'tester',
              data: _data,
            })
          : await entityDataApi().updateData({
              entity: 'tester',
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
      <div className='flex flex-col mb-4'>
        {id === 'new' ? (
          <>
            <p className='text-[24px] font-bold text-black/80'>Tạo mới Tester</p>
            <p className='text-sm text-black/60'>Nhập thông tin tạo tester</p>
          </>
        ) : (
          <>
            <p className='text-[24px] font-bold text-black/80'>{defaultValues?.title}</p>
            <p className='text-sm text-black/60'>Nhập thông tin câp nhật tester</p>
          </>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 pb-10 flex-1 overflow-y-auto'>
        <WrapperField
          title={'Title'}
          des={'Nhập title cho tester'}>
          <Input
            {...register('title')}
            rules={{ required: true }}
          />
        </WrapperField>

        <WrapperField
          title={'Jwt'}
          des={'Nhập thêm thông tin jwt'}>
          <Input {...register('jwt')} />
        </WrapperField>

        <Tabs
          tabs={[
            { label: 'Params', value: 'params' },
            { label: 'Headers', value: 'headers' },
            { label: 'Body', value: 'body' },
          ].map((item) => {
            return {
              ...item,
              status:
                item.value === 'advance'
                  ? Boolean(watch('queryAdvance'))
                  : item.value === 'data'
                    ? watch(item.value)?.rules?.length > 0
                    : watch(item.value)?.length,
            };
          })}
          tabSelected={tabSelected}
          setTabSelected={setTabSelected}
          className='pb-2'
        />

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

export default FormTester;
