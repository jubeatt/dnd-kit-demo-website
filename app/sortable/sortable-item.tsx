'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { HTMLAttributes } from 'react'
import cx from 'classnames'
import { UniqueIdentifier } from '@dnd-kit/core'

type SortableItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'id'> & {
  id: UniqueIdentifier
}

export function SortableItem({ id, children, className, ...props }: SortableItemProps) {
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
          'text-white px-4 py-8 text-center rounded-md bg-gray-800 opacity-50 outline outline-2 outline-rose-500',
          className,
        )}
        {...attributes}
        {...listeners}
      >
        <span className='invisible'>{children}</span>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cx('text-white px-4 py-8 text-center rounded-md bg-gray-800', className)}
      {...attributes}
      {...listeners}
      {...props}
    >
      <div>{children}</div>
    </div>
  )
}
