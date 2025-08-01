import clsx from 'clsx';

function Tabs({ values, tabs, tabSelected, setTabSelected, className }) {
  const handleSelect = (value) => {
    setTabSelected(value);
  };
  const _tabSelected = tabSelected || 'validate';

  return (
    <div className={clsx('flex gap-6', className)}>
      {tabs.map((item) => {
        const status = item.status;
        return (
          <div
            key={item.value}
            className='relative h-8 flex items-center justify-center cursor-pointer px-1'
            onClick={() => handleSelect(item.value)}>
            <p className='text-[11px] relative'>
              {item.label}
              {typeof status === 'number' && status > 0
                ? `(${status})`
                : typeof status === 'boolean' &&
                  status && (
                    <span className='text-[#0CBB52] absolute text-xl leading-[14px] -right-[14px]'>
                      •
                    </span>
                  )}
            </p>
            {_tabSelected === item.value && (
              <div className='absolute bottom-0 h-[2px] w-full bg-primary' />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Tabs;
