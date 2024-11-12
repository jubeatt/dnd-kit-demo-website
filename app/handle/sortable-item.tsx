import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { HTMLAttributes } from 'react'
import cx from 'classnames'
import { UniqueIdentifier } from '@dnd-kit/core'
import { GripVertical } from 'lucide-react'

type SortableItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'id'> & {
  id: UniqueIdentifier
  handleClassName?: HTMLButtonElement['className']
}

export function SortableItem({ id, children, className, handleClassName, ...props }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cx(
          'text-white px-4 py-8 text-center rounded-md select-none bg-black opacity-50 outline outline-2 outline-rose-500 ',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cx('text-white px-4 py-8 text-center rounded-md select-none bg-gray-800', className)}
      {...props}
    >
      <div className={cx('relative', { 'opacity-0': isDragging })}>
        <button
          className={cx('absolute top-1/2 left-0 -translate-y-1/2', handleClassName)}
          {...attributes}
          {...listeners}
        >
          <GripVertical size={32} />
        </button>
        {children}
      </div>
    </div>
  )
}
