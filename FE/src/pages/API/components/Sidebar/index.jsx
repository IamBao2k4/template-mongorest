'use client';

import { buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus } from 'lucide-react';
import Row from './Row';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useApi } from '../context';
import { entityDataApi } from '@/services/entity-data';
import clsx from 'clsx';
import { Link } from '@/components/ui/Link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import FolderUI from './Folder';

function Sidebar({ entity }) {
  const [data, setData] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const search = useDebounce(textSearch, 500);
  const [showOptions, setShowOptions] = useState(''); //folder = folder + id, method = method + id
  const [selectedRow, setSelectedRow] = useState(''); //folder = folder + id, method = method + id
  const { id, method, dataSidebar, openSidebar, handleChangeOpenSidebar, setRefresh } = useApi();

  const getData = async () => {
    try {
      const response = await entityDataApi().getData({
        entity,
        params: { limit: 50, ...(search ? { 'search[title:contains]': search } : {}) },
      });
      setData(response?.data);
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  const _data = textSearch ? data : dataSidebar;
  useEffect(() => {
    //Refresh Selected Row
    const handleRefreshSelectRow = () => {
      if (selectedRow) setSelectedRow('');
    };

    window.addEventListener('mousedown', handleRefreshSelectRow);
    return () => {
      window.removeEventListener('mousedown', handleRefreshSelectRow);
    };
  }, [selectedRow]);

  const uniqueFirstLetters = [
    ...new Set(
      dataSidebar
        ?.filter((item) => item.title)
        .map((item) => item.title?.split(' ')[0]?.toLowerCase())
        .map((word) => (word.endsWith('s') ? word.replace('s', '') : word))
        .filter(Boolean)
    ),
  ].sort(); // Sắp xếp từ bé đến lớn

  return (
    <div className='w-[250px] h-full bg-[#F9F9F9] shrink-0 flex flex-col pb-5'>
      <div className='w-full p-2 flex gap-2'>
        <Link
          className={clsx(buttonVariants({ variant: 'ghost' }), 'w-7 h-7 relative bg-slate-300')}
          href={entity === 'role-settings' ? '/role-settings' : '/workflow-settings'}>
          <Plus className='size-4 absolute text-black/60' />
        </Link>
        <Input
          className='h-8 text-xs'
          placeholder='Search...'
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
        />
      </div>
      <div className='flex-1 relative overflow-auto basis-1'>
        {textSearch
          ? data?.map((item) => {
              return (
                <Row
                  key={item?._id}
                  showOptions={showOptions}
                  setShowOptions={setShowOptions}
                  selectedRow={selectedRow}
                  setSelectedRow={setSelectedRow}
                  id={item?._id}
                  data={item}
                  selected={id}
                  methodSelected={method}
                  {...item}
                  entity={entity}
                />
              );
            })
          : uniqueFirstLetters?.map((d, index) => {
              const _d = _data?.filter((item) => item?.title?.toLowerCase()?.startsWith(d));
              const isActive = openSidebar?.includes(d);

              return (
                _d.length > 0 && (
                  <Collapsible
                    key={index}
                    open={openSidebar?.includes(d)}
                    onOpenChange={() => handleChangeOpenSidebar(d)}>
                    <div className=''>
                      <CollapsibleTrigger
                        className={clsx(
                          'flex items-center justify-between w-full px-[14px] h-7 hover:bg-[#e6e6e6]'
                        )}>
                        <div className='flex items-center gap-2'>
                          <FolderUI chevronClassName={isActive ? 'rotate-0' : '-rotate-90'} />
                          <p className='text-xs text-[#212121] line-clamp-1'>{d}</p>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {_d?.map((item) => {
                          return (
                            <Row
                              key={item?._id}
                              id={item?._id}
                              showOptions={showOptions}
                              setShowOptions={setShowOptions}
                              selectedRow={selectedRow}
                              setSelectedRow={setSelectedRow}
                              data={item}
                              selected={id}
                              methodSelected={method}
                              {...item}
                              entity={entity}
                            />
                          );
                        })}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                )
              );
            })}
      </div>
    </div>
  );
}

export default Sidebar;
