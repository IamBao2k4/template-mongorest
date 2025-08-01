'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm, Controller } from 'react-hook-form';
import WrapperField from '../WrapperField';
import Tabs from '../Tabs';
import { useEffect, useState } from 'react';
import { RelationEdit } from '@/components/builders/fields/Relation/components';
import { Condition } from '@/components/builders/fields';
import Code from '../Code';
import TableEdit from '../TableEdit';
import { formatQuery } from 'react-querybuilder';
import { entityDataApi } from '@/services/entity-data';
import CheckValidate from './CheckValidate';
import { Textarea } from '@/components/ui/Textarea';
import { getKeysAdvance } from '../utils';

function FormValidate({
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
  const [isShowModal, setIsShowModal] = useState(false);

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
        entity: (data?.entity || [])?.map((item) => item?._id),
        categories: (data?.categories || [])?.map((item) => item?._id),
      };

      const res =
        id === 'new'
          ? await entityDataApi().createData({
              entity: 'validate',
              data: _data,
            })
          : await entityDataApi().updateData({
              entity: 'validate',
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
    if (watch('data')) {
      const _dataRules = JSON.parse(JSON.stringify(watch('data')));
      function formatData(data) {
        const processRules = (rules) => {
          return rules.map((rule) => {
            if (Array.isArray(rule.value)) {
              rule.value = rule?.value?.map((item) => item._id || item);
            }
            if (rule.rules) {
              rule.rules = processRules(rule.rules);
            }
            return rule;
          });
        };
        data.rules = processRules(data.rules);
        return data;
      }

      const _dataFormat = formatData(_dataRules);
      const _format = formatQuery(_dataFormat, { format: 'mongodb', parseNumbers: true });
      const _required =
        _dataRules && _dataRules?.rules && Array.isArray(_dataRules?.rules)
          ? JSON.parse(JSON.stringify(_dataRules))
              ?.rules?.filter((item) => `${item.value}` === `$${item.field}`)
              ?.map((item) => item.field)
          : [];

      setValue('queryMongodb', _format);
      setValue('required', _required);
    }
  }, [JSON.stringify(watch('data'))]);

  const handleCheckData = () => {
    setIsShowModal(true);
  };

  useEffect(() => {
    if (defaultValues?.advance) {
      const tempResult = getKeysAdvance(defaultValues?.advance);
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
            <p className='text-[24px] font-bold text-black/80'>Tạo mới Validate</p>
            <p className='text-sm text-black/60'>Nhập thông tin tạo validate</p>
          </>
        ) : (
          <>
            <p className='text-[24px] font-bold text-black/80'>{defaultValues?.title}</p>
            <p className='text-sm text-black/60'>Nhập thông tin câp nhật validate</p>
          </>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 flex-1 overflow-auto'>
        <WrapperField
          title={'Title'}
          des={'Nhập title cho validate'}>
          <Input {...register('title')} />
        </WrapperField>

        <WrapperField
          title={'Note'}
          des={'Nhập thêm thông tin mô tả cho validate'}>
          <Textarea
            rows={3}
            {...register('note')}
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
          title={'Entity'}
          des={'Chọn entity sử dụng cho validate'}>
          <Controller
            name='entity'
            control={control}
            render={({ field }) => (
              <RelationEdit
                schema={{
                  typeSelect: 'multiple',
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
                    title: 'categories-validate',
                    entity: 'categories-validate',
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
            { label: 'Error Code', value: 'error_code' },
          ].map((item) => {
            return {
              ...item,
              status:
                item.value === 'advance'
                  ? Boolean(watch('advance'))
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
                formContext={{ formData: { post_type: watch('entity') } }}
                {...field}
              />
            )}
          />
        )}

        {tabSelected === 'advance' && (
          <Controller
            name='advance'
            control={control}
            render={({ field }) => (
              <Code
                {...field}
                defaultLanguage='json'
                className='shrink-0'
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

        {tabSelected === 'error_code' && (
          <Controller
            name='error_code'
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
            variant='outline'
            onClick={handleCheckData}
            type='button'>
            Check validate
          </Button>
          <Button
            type='submit'
            className='h-8 w-[100px]'>
            Submit
          </Button>
        </div>
      </form>
      <CheckValidate
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        watch={watch}
        defaultValues={defaultValues}
      />
    </>
  );
}

export default FormValidate;
