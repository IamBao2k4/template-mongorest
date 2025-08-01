import { useState } from 'react';
import { buttonVariants } from '@/components/ui/Button';
import { ChevronDown, Copy, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';

function HeaderCard({ itemValidate, indexValidate, handleClone, handleDelete, handleChangeTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(itemValidate?.title || `Validate ${indexValidate + 1}`);

  const handleDoubleClick = () => setIsEditing(true);
  const handleBlur = () => {
    handleChangeTitle(title, indexValidate);
    setIsEditing(false);
  };
  const handleChange = (e) => setTitle(e.target.value);

  return (
    <>
      <div className='flex gap-5'>
        <div className='flex flex-col text-start h-12 items-center justify-center'>
          {isEditing ? (
            <Input
              type='text'
              className='font-bold text-[20px] w-full'
              value={title}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <p
              className='font-bold text-[20px] mb-[2px] cursor-pointer'
              onDoubleClick={handleDoubleClick}>
              {title}
            </p>
          )}
        </div>
      </div>
      <div className='flex gap-2'>
        <div
          className={buttonVariants({ variant: 'ghost' })}
          onClick={handleClone}>
          <Copy className='size-4 cursor-pointer' />
        </div>

        <div
          className={buttonVariants({ variant: 'ghost' })}
          onClick={handleDelete}>
          <Trash2 className='size-4 cursor-pointer' />
        </div>

        <div className={buttonVariants({ variant: 'ghost' })}>
          <ChevronDown />
        </div>
      </div>
    </>
  );
}

export default HeaderCard;
