import { Button, buttonVariants } from '@/components/ui/Button';
import { useApi } from '../context';
import { methods } from '../Method';
import { Plus, X } from 'lucide-react';
import { Link } from '@/components/ui/Link';
import { useEffect } from 'react';
import clsx from 'clsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/ContextMenu';
import { useParams } from 'react-router-dom';

function TabLayout({ entity }) {
  const {
    tabs,
    selectedTab,
    setSelectedTab,
    handleChangeMethod,
    handleChangeApi,
    handleChangeTab,
    typeAddTab,
    setTypeAddTab,
  } = useApi();
  const params = useParams();

  useEffect(() => {
    if (params.id && tabs?.length > 0) {
      const checkInTabs = tabs?.findIndex((item) => item?.id === params.id);
      if (checkInTabs > -1) {
        setSelectedTab(checkInTabs);
      }
    }
  }, [params.id, tabs]);

  const handleRemoveTab = (index) => {
    const data = [...tabs];
    data.splice(index, 1);
    handleChangeTab(data);
  };

  const handleCloseAll = () => {
    const data = [];
    handleChangeTab(data);
  };

  const handleCloseOther = (i) => {
    const data = tabs?.filter((item, index) => index === i);
    handleChangeTab(data);
  };

  const handleCloseRight = (i) => {
    const data = tabs?.filter((item, index) => index <= i);
    handleChangeTab(data);
  };
  return (
    <div className='h-10 border-b flex items-center'>
      <div className='flex flex-1'>
        {tabs?.map((item, index) => {
          const isActive = selectedTab === index;
          return (
            <ContextMenu key={index}>
              <ContextMenuTrigger className='flex-1'>
                <TooltipProvider delayDuration={500}>
                  <Tooltip>
                    <TooltipTrigger className='flex-1 w-full'>
                      <div
                        className={clsx(
                          'relative group hover:opacity-100 flex-1',
                          isActive ? 'opacity-100' : 'opacity-70'
                        )}>
                        <Link
                          href={`/${entity}/${item.id}${
                            item?.method ? '?method=' + item?.method : ''
                          }`}
                          className='h-10 flex items-center justify-center flex-1 relative py-2 cursor-pointer'
                          onClick={() => {
                            if (item.method) {
                              handleChangeMethod(item?.id, item?.method);
                            } else {
                              handleChangeApi(item?.id);
                            }
                          }}
                          onDoubleClick={() => {
                            setTypeAddTab('new');
                          }}
                          key={index}>
                          <div className='flex items-center justify-center gap-2 border-l px-2 w-full'>
                            {item.method ? (
                              <span
                                className='text-[9px] font-semibold leading-[16px] w-max whitespace-nowrap line-clamp-1'
                                style={{ color: methods?.[item?.method]?.color }}>
                                {methods?.[item?.method]?.label}
                              </span>
                            ) : null}
                            <span
                              className={clsx(
                                'text-[12px] leading-[16px] line-clamp-1',
                                typeAddTab === 'replace' ? 'italic' : ''
                              )}>
                              {item.title}
                            </span>
                            {isActive && (
                              <div className='absolute bottom-0 left-2 right-2 h-px bg-black  ' />
                            )}
                          </div>
                        </Link>
                        <div
                          className='hidden absolute right-0 top-0 bottom-0 z-10 group-hover:flex items-center justify-center cursor-pointer'
                          onClick={() => handleRemoveTab(index)}>
                          <div className='size-8 flex items-center justify-center bg-white'>
                            <div className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                              <X className='size-3' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className='text-sm font-light'>{item?.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  className='text-xs cursor-pointer'
                  onClick={() => handleCloseAll()}>
                  Close All Tabs
                </ContextMenuItem>
                <ContextMenuItem
                  className='text-xs cursor-pointer'
                  onClick={() => handleCloseOther(index)}>
                  Close Other Tabs
                </ContextMenuItem>
                <ContextMenuItem
                  className='text-xs cursor-pointer'
                  onClick={() => handleCloseRight(index)}>
                  Close Tabs To The Right
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>
      <Button
        className='shrink-0'
        variant='ghost'
        size='sm'>
        <Plus className='size-3' />
      </Button>
    </div>
  );
}

export default TabLayout;
