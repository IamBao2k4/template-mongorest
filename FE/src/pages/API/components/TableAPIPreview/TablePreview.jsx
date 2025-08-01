'use client';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

import clsx from 'clsx';
import { DataTablePagination } from '@/components/common/ContainerTable/Table/DataTablePagination';
import { getHeaders } from './utils';

export const uniqueArray = (array, keySelected) => {
  const _arr = JSON.parse(JSON.stringify(array));
  return _arr.reduce((acc, item) => {
    if (!acc.some((a) => a[keySelected] === item[keySelected])) {
      acc.push(item);
    }
    return acc;
  }, []);
};

const TablePreview = ({
  header,
  data = [],
  select = [],
  setSelect,
  filter,
  total = 0,
  typeSelectRow = 'checkbox',
  setFilter,
  keySelected = '_id',
  onClickRow,
}) => {
  const [rowSelectionState, setRowSelectionState] = useState(() => {
    if (select && select?.length > 0) {
      const _res = {};
      select.map((item) => (_res[item] = true));
      return _res;
    }

    return {};
  });

  const getRowId = useCallback((row) => {
    return row[keySelected];
  }, []);

  const onRowSelectionChange = (updater) => {
    const nextState = updater(rowSelectionState); //TODO: Hàm này có vấn đề khi xóa item được chọn
    setRowSelectionState(nextState);
    setSelect && setSelect(Object.keys(nextState));
  };

  const onChangePage = (val) => {
    localStorage.setItem('pageSizePreview', val.pageSize);
    setFilter((pre) => ({ ...pre, page: val.current, limit: val.pageSize }));
  };

  const _data = useMemo(() => {
    if (data && data.length > 0) {
      return data;
    }
    return data;
  }, [data, select]);

  const table = useReactTable({
    data: _data,
    columns: getHeaders({ header, onClickRow: () => {}, typeSelectRow }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange,
    state: {
      rowSelection: rowSelectionState,
      pagination: {
        pageIndex: (filter?.page || 1) - 1,
        pageSize: filter?.limit || 10,
      },
    },
    manualPagination: true,
    rowCount: total,
    getRowId,
    enableMultiRowSelection: typeSelectRow !== 'radio',
  });

  return (
    <>
      <div className='overflow-x-auto flex-1'>
        <Table className='border-y border-y-default-border'>
          <TableHeader className='bg-[#f4f4f5] sticky top-0 z-50'>
            {table.getHeaderGroups().map((headerGroup, i) => {
              return (
                <TableRow key={i}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={clsx(
                          'h-[34px] font-semibold text-[12px] border-x border-x-default-border',
                          header.id === 'select' ? 'w-[45px]' : '!w-max',
                          index === 0 && 'sticky top-0 left-0 bg-[#f4f4f5]',
                          index === 1 && 'sticky top-0 left-[45px] z-50 bg-[#f4f4f5]'
                        )}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => {
                return (
                  <TableRow
                    key={'row-' + row.id + '-' + i}
                    className='group cursor-pointer'
                    data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <TableCell
                          className={clsx(
                            'text-[13px] font-normal py-[6px] px-4 bg-white group-hover:bg-black/10',
                            index === 0 && 'sticky left-0 z-20',
                            index === 1 && 'sticky left-[45px] z-20'
                          )}
                          onClick={() => {
                            if (index === 0) return;
                            onClickRow && onClickRow?.(row?.original);
                          }}
                          key={'cell-' + cell._id + '-' + index}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={header.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        total={total}
        table={table}
        onChangePage={onChangePage}
      />
    </>
  );
};

export default TablePreview;
