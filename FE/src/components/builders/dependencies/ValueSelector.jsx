import React, { useState } from 'react';
import { CardEnumOptions } from '../elements';
import { getRandomId } from '@/helpers/utils';
import CardSelector from './CardSelector';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { Airplay } from 'lucide-react';

export default function ValueSelector({
  possibility,
  onChange,
  parentEnums,
  parentType,
  parentName,
  parentSchema,
  path,
}) {
  const [elementId] = useState(getRandomId());
  if (possibility.value) {
    if (parentEnums) {
      return (
        <CardSelector
          possibleChoices={parentEnums?.map((val) => val.value)}
          chosenChoices={possibility.value.enum}
          onChange={(chosenChoices) => onChange({ ...possibility, value: { enum: chosenChoices } })}
          placeholder='Allowed value'
          path={path}
        />
      );
    }

    if (parentType === 'boolean') {
      return (
        <Switch
          id='airplane-mode'
          checked={possibility.value.enum && possibility.value.enum[0]}
          onCheckedChange={() => {
            if (possibility.value.enum && possibility.value.enum[0]) {
              onChange({
                ...possibility,
                value: { enum: [false] },
              });
            } else {
              onChange({
                ...possibility,
                value: { enum: [true] },
              });
            }
          }}
        />
      );
    }

    if (parentType === 'object') {
      const enumArr = possibility.value.enum;

      return (
        <div>
          {enumArr.map((combination, index) => (
            <li key={`${elementId}_possibleValue${index}`}>
              {Object.keys(combination).map((key) => {
                const val = combination[key];
                return (
                  <div key={key}>
                    <h5>{key}:</h5>
                    {
                      {
                        string: (
                          <Input
                            value={val || ''}
                            placeholder='String value'
                            type='string'
                            onChange={(ev) => {
                              const newVal = ev.target.value;
                              const oldCombo = possibility.value.enum[index];
                              onChange({
                                ...possibility,
                                value: {
                                  enum: [
                                    ...enumArr.slice(0, index),
                                    { ...oldCombo, [key]: newVal },
                                    ...enumArr.slice(index + 1),
                                  ],
                                },
                              });
                            }}
                            className='card-modal-text'
                          />
                        ),
                        number: (
                          <Input
                            value={val || ''}
                            placeholder='Number value'
                            type='number'
                            onChange={(ev) => {
                              const newVal = Number.parseFloat(ev.target.value);
                              const oldCombo = possibility.value.enum[index];
                              onChange({
                                ...possibility,
                                value: {
                                  enum: [
                                    ...enumArr.slice(0, index),
                                    { ...oldCombo, [key]: newVal },
                                    ...enumArr.slice(index + 1),
                                  ],
                                },
                              });
                            }}
                            className='card-modal-number'
                          />
                        ),
                        array: (
                          <Input
                            value={JSON.stringify(val) || ''}
                            placeholder='Array in JSON'
                            type='string'
                            onChange={(ev) => {
                              let newVal = val;
                              try {
                                newVal = JSON.parse(ev.target.value);
                              } catch (error) {
                                console.error('invalid JSON array input');
                              }
                              const oldCombo = possibility.value.enum[index];
                              onChange({
                                ...possibility,
                                value: {
                                  enum: [
                                    ...enumArr.slice(0, index),
                                    { ...oldCombo, [key]: newVal },
                                    ...enumArr.slice(index + 1),
                                  ],
                                },
                              });
                            }}
                            className='card-modal-text'
                          />
                        ),
                        object: (
                          <Input
                            value={JSON.stringify(val) || ''}
                            placeholder='Object in JSON'
                            type='string'
                            onChange={(ev) => {
                              let newVal = val;
                              try {
                                newVal = JSON.parse(ev.target.value);
                              } catch (error) {
                                console.error('invalid JSON object input');
                              }
                              const oldCombo = possibility.value.enum[index];
                              onChange({
                                ...possibility,
                                value: {
                                  enum: [
                                    ...enumArr.slice(0, index),
                                    { ...oldCombo, [key]: newVal },
                                    ...enumArr.slice(index + 1),
                                  ],
                                },
                              });
                            }}
                            className='card-modal-text'
                          />
                        ),
                      }[typeof val]
                    }
                  </div>
                );
              })}
              <div
                onClick={() =>
                  onChange({
                    ...possibility,
                    value: {
                      enum: [...enumArr.slice(0, index), ...enumArr.slice(index + 1)],
                    },
                  })
                }>
                <Airplay className='w-4 h-4' />
              </div>
            </li>
          ))}

          <Button
            type='primary'
            onClick={() => {
              const newCase = {};
              const propArr = parentSchema ? parentSchema.properties : {};
              Object.keys(propArr).forEach((key) => {
                if (propArr[key].type === 'number' || propArr[key].type === 'integer') {
                  newCase[key] = 0;
                } else if (propArr[key].type === 'array' || propArr[key].enum) {
                  newCase[key] = [];
                } else if (propArr[key].type === 'object' || propArr[key].properties) {
                  newCase[key] = {};
                } else {
                  newCase[key] = '';
                }
              });
              onChange({
                ...possibility,
                value: { enum: [...enumArr, newCase] },
              });
            }}>
            Primary Button
          </Button>
        </div>
      );
    }
    return (
      <CardEnumOptions
        initialValues={possibility.value.enum}
        onChange={(newEnum) => onChange({ ...possibility, value: { enum: newEnum } })}
        type={parentType || 'string'}
        showNames={false}
      />
    );
  } else {
    return <h5> Appear if defined </h5>;
  }
}
