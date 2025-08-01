function WrapperField({ title, des, children }) {
  return (
    <div className='flex flex-col'>
      <p className='text-sm font-semibold mb-1 text-black/70'>{title}</p>
      <p className='text-xs mb-1 text-black/60'>{des}</p>
      {children}
    </div>
  );
}

export default WrapperField;
