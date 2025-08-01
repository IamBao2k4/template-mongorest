'use client';

import PageHeader from '@/components/common/PageHeader';
import { useToast } from '@/hooks/use-toast';
import { entityDataApi } from '@/services/entity-data';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormSchemaAPI from './components/FormSchemaAPI';

function APISchemaDetail() {
  const [formData, setFormData] = useState({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    (async () => {
      try {
        if (id === 'new') return;
        const response = await entityDataApi().getDetail({
          entity: 'api-schema',
          id,
        });
        setFormData(response?.data);
      } catch (error) {
        console.log('🚀 ~ error:', error);
      }
    })();
  }, []);

  const callbackOk = () => {
    toast({ description: 'Thành công' });
    navigate('/api-schema');
  };

  return (
    <div className='pb-28 h-full overflow-y-auto relative'>
      <PageHeader
        title={formData?.title}
        entity={'api-schema'}
      />
      <div className='p-4'>
        {id === 'new' || (id !== 'new' && Object.keys(formData).length) ? (
          <FormSchemaAPI
            id={id}
            defaultValues={formData}
            callbackOk={callbackOk}
          />
        ) : null}
      </div>
    </div>
  );
}

export default APISchemaDetail;
