import { useApi } from '../context';
import TableEdit from '../TableEdit';

function TabTable({ handleChangeRow, tabSelected }) {
  const { method, settings } = useApi();
  const _default = JSON.parse(
    JSON.stringify(settings?.[method]?.default?.[tabSelected.replace('s', '')] || [])
  );

  return (
    <>
      <TableEdit
        title={'Default'}
        data={settings?.[method]?.[tabSelected] || []}
        onChange={handleChangeRow}
      />
      {_default?.length > 0 && (
        <TableEdit
          title={'In Validate anf Response'}
          data={_default.map((item) => ({ key: item, value: item }))}
          onChange={handleChangeRow}
        />
      )}
    </>
  );
}

export default TabTable;
