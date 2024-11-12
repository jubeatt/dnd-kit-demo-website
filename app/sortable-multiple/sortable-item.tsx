'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Item } from './types'

type SortableItemProps = {
  item: Item
}

export function SortableItem({ item }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    data: {
      type: 'Item',
      item,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='p-2.5 bg-gray-700 text-gray-700 opacity-50 rounded-md ring-rose-500 ring-2'
      >
        {item.message}
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='p-2.5 bg-gray-700 rounded-md ring-rose-500 hover:ring-2'
    >
      {item.message}
    </div>
  )
}
