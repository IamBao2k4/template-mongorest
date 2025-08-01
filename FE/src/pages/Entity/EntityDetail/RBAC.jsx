import { RelationEdit } from '@/components/builders/fields/Relation/components';
import { SelectEdit } from '@/components/builders/fields/Select/components';
import { Button } from '@/components/ui/Button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import clsx from 'clsx';
import _ from 'lodash';
import { ChevronDown, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function getAllKeys({ result, schema, path = '' }) {
  if (schema?.properties) {
    for (const key in schema.properties) {
      const _path = path ? path + '.' + key : key;

      result.push({
        ...schema.properties[key],
        key: _path,
        value: schema.properties[key]?.typeRelation?.title
          ? `${_path}@${schema.properties[key]?.typeRelation?.title}`
          : _path,
      });
      const _schema = schema.properties[key].properties || schema.properties[key].items?.properties;
      if (_schema) {
        getAllKeys({
          result,
          schema: schema.properties[key].items || schema.properties[key],
          path: _path,
        });
      }
    }
  }
  return result;
}

function RBAC({ schema, formData, setFormData }) {
  const [roles, setRoles] = useState(formData?.permission || []);

  const _json = JSON.parse(schema?.json);
  const res = [];

  getAllKeys({ result: res, schema: _json, path: '' });

  useEffect(() => {
    try {
      if (!roles?.length) return;
      const _res = {};
      roles
        ?.filter((item) => item?.methods)
        ?.map((cur) => {
          const data = [];
          Object.keys(cur?.methods).map((method) => {
            const _method = cur?.methods[method];
            data.push({
              action: method,
              list_field: _method?.keys.map((item) => item?.fields).join(','),
              custom_field: _method?.keys?.filter(
                (item) => item?.relation || item?.function || item?.enum || item?.pattern
              ),
            });
          });
          _res[cur?.title] = data;
        });

      setFormData({
        ...formData,
        permission: _res,
      });
    } catch (error) {
      console.log('🚀 ~ useEffect ~ error:', error);
    }
  }, [roles]);

  const handleChangeMethod = (item, data) => {
    const _roles = JSON.parse(JSON.stringify(roles));
    const _roleSelect = _roles.find((i) => i?.title === item?.title);

    if (!_roleSelect.methods) _roleSelect.methods = {};
    data.map((method) => {
      if (!_roleSelect.methods[method]) {
        _roleSelect.methods[method] = { keys: [] };
      }
    });

    Object.keys(_roleSelect.methods).map((method) => {
      if (!data.includes(method)) {
        delete _roleSelect.methods[method];
      }
    });

    setRoles(_roles);
  };

  const handleSelectKeys = (item, method, data) => {
    const _roles = JSON.parse(JSON.stringify(roles));
    const _roleSelect = _roles.find((i) => i?.title === item?.title);
    _roleSelect.methods[method].keys = data.map((item) => {
      const key = item?.split('@')[1];
      return {
        fields: item?.split('@')[0],
        ...(key && { relation: key }),
      };
    });
    setRoles(_roles);
  };

  const handleUpdateKey = (item, method, keyIndex, field, value) => {
    const _roles = JSON.parse(JSON.stringify(roles));
    const _roleSelect = _roles.find((i) => i?.title === item?.title);

    _roleSelect.methods[method].keys[keyIndex][field] = value;

    setRoles(_roles);
  };

  const handleDeleteKey = (item, method, keyIndex) => {
    const _roles = JSON.parse(JSON.stringify(roles));
    const _roleSelect = _roles.find((i) => i?.title === item?.title);

    _roleSelect.methods[method].keys.splice(keyIndex, 1);

    setRoles(_roles);
  };

  return (
    <div className='flex flex-col gap-5'>
      <RelationEdit
        schema={{
          title: 'Role',
          description: 'Chọn danh sách role',
          typeSelect: 'multi',
          typeRelation: {
            title: 'role',
            entity: 'role',
          },
        }}
        value={roles}
        onChange={(data) =>
          setRoles(
            data.map((item) => {
              const _findItem = roles.find((i) => i.title === item.title);
              if (_findItem) return { ..._findItem };
              return { title: item.title, slug: item.slug, _id: item._id };
            })
          )
        }
      />
      <div className='flex flex-col gap-4'>
        {roles?.map((item) => {
          return (
            <div
              className='py-2 px-4 rounded-sm border flex flex-col gap-4'
              key={item?.title}>
              <Collapsible defaultOpen={true}>
                <CollapsibleTrigger className='mb-1 flex justify-between items-center w-full'>
                  <p className='text-base font-semibold'>{item?.title}</p>
                  <ChevronDown className='size-4' />
                </CollapsibleTrigger>
                <CollapsibleContent className={'flex flex-col gap-4'}>
                  <div className=''>
                    <p className='text-sm mb-1'>Chọn method</p>
                    <SelectEdit
                      isMulti
                      choices={['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((item) => {
                        return {
                          value: item,
                          key: item,
                        };
                      })}
                      value={item?.methods ? Object.keys(item?.methods) : []}
                      onChange={(val) => handleChangeMethod(item, val)}
                    />
                  </div>
                  {Object.keys(item?.methods || {}).map((method) => {
                    return (
                      <div
                        className='flex flex-col gap-2 p-2 border rounded-sm'
                        key={method}>
                        <div>
                          <p className='text-base font-semibold mb-2'>{method}</p>
                          <p className='text-sm mb-1'>Chọn key</p>
                          <SelectEdit
                            isMulti
                            choices={res}
                            value={
                              item?.methods?.[method]?.keys?.map(
                                (item) =>
                                  `${item?.fields}${item?.relation ? `@${item?.relation}` : ''}`
                              ) || []
                            }
                            onChange={(val) => handleSelectKeys(item, method, val)}
                          />
                        </div>

                        <div className='flex flex-col gap-3'>
                          {item?.methods?.[method]?.keys?.map((key, keyIndex) => {
                            return (
                              <div
                                key={keyIndex}
                                className='p-3 border rounded bg-gray-50 flex gap-2'>
                                <div className='grid grid-cols-2 gap-y-2 gap-x-5 flex-1 border p-2'>
                                  <div
                                    className={clsx(
                                      'flex gap-2 items-center',
                                      key.relation ? 'col-span-1' : 'col-span-2'
                                    )}>
                                    <label className='text-xs font-semibold text-gray-600 mb-1 block w-[55px]'>
                                      Fields
                                    </label>
                                    <input
                                      type='text'
                                      value={key.fields || ''}
                                      onChange={(e) =>
                                        handleUpdateKey(
                                          item,
                                          method,
                                          keyIndex,
                                          'fields',
                                          e.target.value
                                        )
                                      }
                                      className='w-full px-2 py-1 border rounded text-sm h-fit'
                                      placeholder='Nhập fields'
                                    />
                                  </div>

                                  {key?.relation ? (
                                    <div className='flex gap-2 items-center col-span-1'>
                                      <label className='text-xs font-semibold text-gray-600 mb-1 block w-[55px]'>
                                        Relation
                                      </label>
                                      <input
                                        type='text'
                                        value={key.relation || ''}
                                        onChange={(e) =>
                                          handleUpdateKey(
                                            item,
                                            method,
                                            keyIndex,
                                            'relation',
                                            e.target.value
                                          )
                                        }
                                        className='w-full px-2 py-1 border rounded text-sm h-fit'
                                        placeholder='Nhập relation'
                                      />
                                    </div>
                                  ) : null}

                                  {!key.relation ? (
                                    <>
                                      <div className='flex gap-2 items-center col-span-1'>
                                        <label className='text-xs font-semibold text-gray-600 mb-1 block w-[55px]'>
                                          Pattern
                                        </label>
                                        <input
                                          type='text'
                                          value={key.pattern || ''}
                                          onChange={(e) =>
                                            handleUpdateKey(
                                              item,
                                              method,
                                              keyIndex,
                                              'pattern',
                                              e.target.value
                                            )
                                          }
                                          className='w-full px-2 py-1 border rounded text-sm h-fit'
                                          placeholder='Nhập pattern'
                                        />
                                      </div>

                                      <div className='flex gap-2 items-center col-span-1'>
                                        <label className='text-xs font-semibold text-gray-600 mb-1 block w-[55px]'>
                                          Function
                                        </label>
                                        <input
                                          type='text'
                                          value={key.function || ''}
                                          onChange={(e) =>
                                            handleUpdateKey(
                                              item,
                                              method,
                                              keyIndex,
                                              'function',
                                              e.target.value
                                            )
                                          }
                                          className='w-full px-2 py-1 border rounded text-sm h-fit'
                                          placeholder='Nhập function'
                                        />
                                      </div>

                                      <div className='flex flex-col col-span-2 gap-2'>
                                        <div className='flex gap-2 items-center w-full'>
                                          <label className='text-xs font-semibold text-gray-600 mb-1 block'>
                                            Enum
                                          </label>
                                          <input
                                            type='text'
                                            className='w-full px-2 py-1 border rounded text-sm h-fit'
                                            placeholder='Nhập enum rồi nhấn Enter'
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter' && e.target.value.trim()) {
                                                e.preventDefault();
                                                const value = e.target.value.trim();
                                                const newRoles = JSON.parse(JSON.stringify(roles));
                                                const selectedRole = newRoles.find(
                                                  (i) => i?.title === item?.title
                                                );
                                                const keyObj =
                                                  selectedRole.methods[method].keys[keyIndex];

                                                if (!keyObj.enum) keyObj.enum = [];
                                                keyObj.enum.push(value);

                                                setRoles(newRoles);
                                                e.target.value = '';
                                              }
                                            }}
                                          />
                                        </div>

                                        <div className='flex flex-wrap gap-2'>
                                          {(key.enum || []).map((tag, tagIndex) => (
                                            <div
                                              key={tagIndex}
                                              className='flex items-center bg-gray-200 px-2 py-1 rounded text-sm'>
                                              <span>{tag}</span>
                                              <button
                                                type='button'
                                                className='ml-2 text-red-600 hover:text-red-800'
                                                onClick={() => {
                                                  const newRoles = JSON.parse(
                                                    JSON.stringify(roles)
                                                  );
                                                  const selectedRole = newRoles.find(
                                                    (i) => i?.title === item?.title
                                                  );
                                                  const keyObj =
                                                    selectedRole.methods[method].keys[keyIndex];
                                                  keyObj.enum.splice(tagIndex, 1);
                                                  setRoles(newRoles);
                                                }}>
                                                ×
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <Button
                                  variant='outline'
                                  onClick={() => handleDeleteKey(item, method, keyIndex)}>
                                  <Trash2 className='size-4' />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>{' '}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RBAC;
