import { Fields } from '@/components/builders/fields/fields';
import { Checkbox } from '@/components/ui/Checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';

const _renderHeader = ({ header, onClickRow }) => {
  return header?.map((item) => {
    return {
      accessorKey: item.dataIndex,
      header: item.title,
      cell: ({ row }) => {
        const Component = Fields[item.component];
        if (!Component) return <></>;

        const rowValue = row.original;
        let value = item?.group
          ? rowValue?.[item?.group]?.[item?.key] || rowValue?.[item?.group]?.[item?.dataIndex]
          : rowValue?.[item?.key] || rowValue?.[item?.dataIndex];
        return (
          <div className='flex flex-1'>
            <div className='w-max flex flex-1 max-w-[400px]'>
              <Component
                type='table'
                inforFields={{
                  key: item?.typeRelation?.title,
                  keyTable: item?.key,
                }}
                value={['title', 'name'].includes(item.key) ? (value ? value : 'NO DATA') : value}
                onClick={onClickRow}
                schema={{
                  ...item,
                }}
              />
            </div>
          </div>
        );
      },
    };
  });
};

export function getHeaders({ header, typeSelectRow, onClickRow }) {
  const _header = _renderHeader({
    header,
    onClickRow,
  });

  return [
    {
      id: 'select',
      header: ({ table }) =>
        typeSelectRow === 'radio' ? (
          <div className='w-7'></div>
        ) : (
          <div className='w-7'>
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label='Select all'
              className='size-[14px]'
            />
          </div>
        ),
      cell: ({ row }) => {
        if (typeSelectRow === 'radio') {
          const value = row.original._id;
          return (
            <RadioGroup
              className='flex items-center justify-center'
              value={row.getIsSelected() ? value : null}
              onValueChange={() => {
                row.toggleSelected(true);
              }}>
              <RadioGroupItem
                className='size-[14px] cursor-default rounded-full bg-white shadow-blackA4 outline-none hover:bg-violet3  focus:shadow-black'
                value={value}
                id={value}
              />
            </RadioGroup>
          );
        }
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
            className='size-[14px]'
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    ,
    ...(_header || []),
  ];
}
