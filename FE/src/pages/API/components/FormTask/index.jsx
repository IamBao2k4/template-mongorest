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
import useServiceDetail from '@/hooks/useServiceDetail';
import { entityDataApi } from '@/services/entity-data';
import { Controller, useForm } from 'react-hook-form';
import WrapperField from '../WrapperField';
import { TextEditor } from '@/components/builders/elements';
import { MultiFileEdit } from '@/components/builders/fields/MultiFile/components';

function FormTask({ id, defaultValues, callbackOk, callbackError, classNameFooter, showHeading }) {
  const { register, handleSubmit, control } = useForm({ defaultValues });
  const { schema } = useServiceDetail({ entity: 'task', notInitData: true });
  const labelOptions = JSON.parse(schema.json).properties.label.choices || [];
  const statusOptions = JSON.parse(schema.json).properties.status.choices || [];
  const { createData, updateData } = entityDataApi();

  const onSubmit = async (data) => {
    try {
      const _data = {
        ...data,
        members: (data?.members || [])?.map((item) => item?._id),
        api: (data?.api || [])?.map((item) => item?._id),
      };
      const res =
        id && id !== 'new'
          ? await updateData({
              entity: 'task',
              data: _data,
              id,
            })
          : await createData({
              entity: 'task',
              data: _data,
            });
      callbackOk && callbackOk();
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      callbackError && callbackError();
    }
  };

  return (
    <>
      {showHeading && (
        <div className='flex flex-col mb-4'>
          {id === 'new' ? (
            <>
              <p className='text-[24px] font-bold text-black/80'>Tạo mới Task</p>
              <p className='text-sm text-black/60'>Nhập thông tin tạo task</p>
            </>
          ) : (
            <>
              <p className='text-[24px] font-bold text-black/80'>{defaultValues?.title}</p>
              <p className='text-sm text-black/60'>Nhập thông tin câp nhật task</p>
            </>
          )}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex gap-10 pb-10 flex-1 overflow-y-auto'>
        <div className='flex-1 flex flex-col gap-3'>
          <WrapperField
            title={'Title'}
            des={'Nhập title cho task'}>
            <Input
              {...register('title')}
              rules={{ required: true }}
            />
          </WrapperField>

          <WrapperField
            title={'Description'}
            des={'Nhập thêm thông tin mô tả cho task'}>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextEditor
                  {...field}
                  config={{
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; height: 200px; overflow-y: auto !important; }',
                  }}
                />
              )}
            />
          </WrapperField>

          <WrapperField
            title={'Files'}
            des={'Chọn các file liên quan'}>
            <Controller
              name='files'
              control={control}
              render={({ field }) => (
                <MultiFileEdit
                  {...field}
                  schema={{ widget: 'multipleFiles' }}
                />
              )}
            />
          </WrapperField>
        </div>

        <div className='w-[300px] flex flex-col gap-3'>
          <WrapperField
            title={'Label'}
            des={'Chọn label sử dụng cho task'}>
            <Controller
              name='label'
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    value={Array.isArray(field.value) ? field.value?.[0] : field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {labelOptions.map((item) => (
                        <SelectItem
                          value={item.value}
                          key={item.value}>
                          <span
                            className='text-xs font-bold'
                            style={{ color: `#${item.key.split('#')?.[1]}` }}>
                            {item.key.split('#')?.[0]}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </WrapperField>

          <WrapperField
            title={'Status'}
            des={'Chọn trạng thái cho task'}>
            <Controller
              name='status'
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    value={Array.isArray(field.value) ? field.value?.[0] : field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((item) => (
                        <SelectItem
                          value={item.value}
                          key={item.value}>
                          <span
                            className='text-xs font-bold'
                            style={{ color: `#${item.key.split('#')?.[1]}` }}>
                            {item.key.split('#')?.[0]}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </WrapperField>

          <WrapperField
            title={'Members'}
            des={'Chọn members cho task'}>
            <Controller
              name='members'
              control={control}
              render={({ field }) => (
                <RelationEdit
                  schema={{
                    typeSelect: 'multi',
                    typeRelation: {
                      title: 'user',
                      entity: 'user',
                    },
                  }}
                  {...field}
                />
              )}
            />
          </WrapperField>

          <WrapperField
            title={'API'}
            des={'Chọn thuộc API nào'}>
            <Controller
              name='api'
              control={control}
              render={({ field }) => (
                <RelationEdit
                  schema={{
                    typeSelect: 'multi',
                    typeRelation: {
                      title: 'role-settings',
                      entity: 'role-settings',
                    },
                  }}
                  {...field}
                />
              )}
            />
          </WrapperField>
        </div>

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

export default FormTask;
