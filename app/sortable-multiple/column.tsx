'use client'

import { SortableContext } from '@dnd-kit/sortable'
import { SortableItem } from './sortable-item'
import { Item } from './types'
import { useDroppable } from '@dnd-kit/core'

type ColumnProps = {
  id: string
  data: Item[]
}

export function Column({ id, data }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: 'Column',
    },
  })

  const itemsId = data.map((d) => d.id)

  return (
    <div
      ref={setNodeRef}
      className='shrink-0 w-[400px] h-[400px] rounded-md p-4 bg-gray-900 overflow-y-auto space-y-4'
    >
      <SortableContext items={itemsId}>
        {data.map((d) => (
          <SortableItem
            key={d.id}
            item={d}
          />
        ))}
      </SortableContext>
    </div>
  )
}
