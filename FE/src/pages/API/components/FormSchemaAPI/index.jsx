'use client';

import { RelationEdit } from '@/components/builders/fields/Relation/components';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { entityDataApi } from '@/services/entity-data';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import WrapperField from '../WrapperField';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { JsonBuilder } from '@/components/builders';

function FormSchemaAPI({
  id,
  defaultValues,
  callbackOk,
  callbackError,
  classNameFooter,
  setIsChange,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
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
        api: data?.api?.map((item) => item?._id)?.join(),
      };

      delete _data._id;
      const res =
        id === 'new'
          ? await entityDataApi().createData({
              entity: 'api-schema',
              data: _data,
            })
          : await entityDataApi().updateData({
              entity: 'api-schema',
              data: _data,
              id,
            });
      callbackOk && callbackOk();
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      callbackError && callbackError();
    }
  };

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

        <Tabs defaultValue='information'>
          <TabsList className='w-fit'>
            <TabsTrigger
              value='information'
              className='w-[160px]'>
              Information
            </TabsTrigger>
            <TabsTrigger
              value='schema-table'
              className='w-[160px]'>
              Schema Table
            </TabsTrigger>
            <TabsTrigger
              value='schema-form'
              className='w-[160px]'>
              Schema Form
            </TabsTrigger>
            <TabsTrigger
              value='schema-required'
              className='w-[160px]'>
              Schema Required
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value='information'
            className='flex flex-col gap-4'>
            <WrapperField
              title={'Title'}
              des={'Nhập title cho api-schema'}>
              <Input
                {...register('title')}
                rules={{ required: true }}
              />
            </WrapperField>

            <WrapperField
              title={'API'}
              des={'Chọn categories sử dụng cho validate'}>
              <Controller
                name='api'
                control={control}
                render={({ field }) => (
                  <RelationEdit
                    schema={{
                      typeSelect: 'once',
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
          </TabsContent>
          <TabsContent value='schema-table'>
            <WrapperField
              title={'Table'}
              des={'Thông tin các cột table'}>
              <Controller
                name='filter'
                control={control}
                render={({ field }) => {
                  return (
                    <div className='pt-5'>
                      <JsonBuilder
                        schema={JSON.stringify(field?.value?.json || {})}
                        uischema={JSON.stringify(field?.value?.ui || {})}
                        onChange={(json, ui) =>
                          field.onChange({ json: JSON.parse(json), ui: JSON.parse(ui) })
                        }
                      />
                    </div>
                  );
                }}
              />
            </WrapperField>
          </TabsContent>
          <TabsContent value='schema-form'>
            <WrapperField
              title={'Form'}
              des={'Thông tin form'}>
              <Controller
                name='form'
                control={control}
                render={({ field }) => (
                  <div className='pt-5'>
                    <JsonBuilder
                      schema={JSON.stringify(field?.value?.json || {})}
                      uischema={JSON.stringify(field?.value?.ui || {})}
                      onChange={(json, ui) =>
                        field.onChange({ json: JSON.parse(json), ui: JSON.parse(ui) })
                      }
                    />
                  </div>
                )}
              />
            </WrapperField>
          </TabsContent>
          <TabsContent value='schema-required'>
            <WrapperField
              title={'Form'}
              des={'Thông tin form'}>
              <Controller
                name='required'
                control={control}
                render={({ field }) => (
                  <div className='pt-5'>
                    <JsonBuilder
                      schema={JSON.stringify(field?.value?.json || {})}
                      uischema={JSON.stringify(field?.value?.ui || {})}
                      onChange={(json, ui) =>
                        field.onChange({ json: JSON.parse(json), ui: JSON.parse(ui) })
                      }
                    />
                  </div>
                )}
              />
            </WrapperField>
          </TabsContent>
        </Tabs>

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

export default FormSchemaAPI;
