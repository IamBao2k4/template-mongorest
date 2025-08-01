'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import Code from '../Code';
import { Fragment, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { RelationEdit } from '@/components/builders/fields/Relation/components';
import Cookies from 'js-cookie';
import { extractKeysWithAt, groupValuesByPrefix } from './utils';
import { useParams } from 'react-router-dom';

function CheckValidate({
  isShowModal = false,
  setIsShowModal,
  watch,
  advance,
  cb,
  url,
  method,
  defaultValues,
}) {
  const params = useParams();
  const [status, setStatus] = useState(null);
  const [dataForm, setDataForm] = useState(null);
  const [formDataCheck, setFormDataCheck] = useState({
    param: {},
    body: {},
    jwt: Cookies.get('userToken') || '',
    header: {},
  });
  const { jsonSchema } = useAuth();

  useEffect(() => {
    if (isShowModal) {
      if (advance) {
        setDataForm(advance);
        return;
      }

      if (watch('advance')) {
        const _data = extractKeysWithAt(JSON.parse(watch('advance')));
        if (_data) {
          delete _data.jwt;
          setFormDataCheck((pre) => {
            const _pre = JSON.parse(JSON.stringify(pre));
            Object.keys(_data).forEach((key) => {
              _pre[key] = {};
            });
            return _pre;
          });
          setDataForm(_data);
          return;
        }
      }

      if (watch('data') && watch('data').rules) {
        const _data = JSON.parse(JSON.stringify(watch('data').rules));
        const _format = groupValuesByPrefix(_data);
        if (_format) {
          setDataForm(_format);
        }
      }
    }
  }, [isShowModal]);

  const handleChange = (key, field, value) => {
    if (key === 'jwt') {
      setFormDataCheck((prev) => ({ ...prev, jwt: value }));
    } else {
      setFormDataCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], [field]: value },
      }));
    }
  };

  const renderInputs = (groupKey, data) => {
    if (!data || Object.keys(data).length === 0) return null;

    return (
      <div>
        <p className='text-lg font-semibold text-black/80 capitalize'>{groupKey}</p>
        <div className='flex flex-col gap-4'>
          {data
            ?.filter((item) => item)
            ?.map((key) => {
              const [entity, field] = key.split('/');
              const [_entity, _field] = entity?.split('.');
              const relation = jsonSchema?.[_entity]?.filter?.find((item) => item.key === _field);

              if (entity && relation && relation?.widget === 'relation') {
                return (
                  <div key={key}>
                    <p className='pb-1 text-sm text-black/80'>{field}</p>
                    <RelationEdit
                      schema={{
                        title: '',
                        description: '',
                        typeSelect: 'multiple',
                        typeRelation: {
                          title: relation?.typeRelation?.title,
                          entity: relation?.typeRelation?.title,
                        },
                      }}
                      onChange={(data) => handleChange(groupKey, field, data)}
                      value={formDataCheck?.[groupKey]?.[field] || []}
                    />
                  </div>
                );
              }

              return (
                <div key={key}>
                  <p className='pb-1 text-sm text-black/80'>{field || entity}</p>
                  <Input
                    type='text'
                    value={formDataCheck?.[groupKey]?.[field || entity]}
                    onChange={(e) => handleChange(groupKey, field || entity, e.target.value)}
                    placeholder={`Enter ${field || entity}`}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo params string
    const paramsString = Object.entries(formDataCheck.param)
      .map(([key, value]) => {
        const _value = JSON.parse(JSON.stringify(value));
        const _data = Array.isArray(_value) ? _value?.map((item) => item?._id).join(',') : _value;
        return `${key}=${encodeURIComponent(_data)}`;
      })
      .join('&');

    // Fetch API
    try {
      const _url =
        url ||
        `${import.meta.env.VITE_API_URL}/api/v1/protean/test-validate/list/${
          defaultValues?._id || params?.id
        }`;
      const _method = method || (Object.keys(formDataCheck.body || {}).length > 0 ? 'POST' : 'GET');

      const response = await fetch(`${_url}${paramsString ? `?${paramsString}` : ''}`, {
        method: _method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${formDataCheck.jwt}`,
          ...formDataCheck.header,
        },
        ...(Object.keys(formDataCheck.body || {}).length > 0 || ['post', 'put'].includes(_method)
          ? {
              body: JSON.stringify(formDataCheck.body || {}),
            }
          : {}),
      });

      const result = await response.json();
      cb && cb(result);
      setStatus({
        status: 'success',
        message: result,
      });
    } catch (error) {
      cb && cb(error);
      console.error('Error calling API:', error);
      setStatus({
        status: 'error',
        message: error.message,
      });
    }
  };

  return (
    <Dialog
      open={isShowModal}
      onOpenChange={setIsShowModal}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Check validate</DialogTitle>
          <DialogDescription>Kiểm tra giá trị trả về của validate</DialogDescription>
        </DialogHeader>
        <div className=''>
          {dataForm ? (
            <form onSubmit={handleSubmit}>
              {/* JWT Input */}
              <div className='grid gap-4 pb-4'>
                <div>
                  <p className='pb-1 text-sm text-black/80'>jwt</p>
                  <Input
                    type='text'
                    value={formDataCheck?.jwt}
                    onChange={(e) => handleChange('jwt', null, e.target.value)}
                    placeholder='Enter JWT'
                  />
                </div>
                {Object.keys(dataForm).map((key) => {
                  if (key === 'jwt') return null;
                  return <Fragment key={key}>{renderInputs(key, dataForm?.[key])}</Fragment>;
                })}
              </div>

              <DialogFooter className='items-center justify-center pb-4'>
                <Button
                  type='submit'
                  className='w-[120px]'>
                  Check
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <></>
          )}

          {status ? <Code value={status} /> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CheckValidate;
