'use client'

import {
  DndContext,
  DndContextProps,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useId, useState } from 'react'
import { SortableItem } from './sortable-item'

export function Handle() {
  const [items, setItems] = useState<UniqueIdentifier[]>(['A', 'B', 'C'])
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const contextId = useId()

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
  )

  const handleDragEnd: DndContextProps['onDragEnd'] = (event) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.toString())
        const newIndex = items.indexOf(over.id.toString())

        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  const handleDragStart: DndContextProps['onDragStart'] = (event) => {
    setActiveId(event.active.id)
  }

  return (
    <DndContext
      id={contextId}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={items}>
        {items.map((id) => (
          <SortableItem
            id={id}
            key={id}
          >
            {id}
          </SortableItem>
        ))}
      </SortableContext>
      <DragOverlay>
        {activeId && (
          <SortableItem
            id={activeId}
            handleClassName='cursor-grab text-rose-500'
          >
            {activeId}
          </SortableItem>
        )}
      </DragOverlay>
    </DndContext>
  )
}
