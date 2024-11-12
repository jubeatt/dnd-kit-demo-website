'use client'

import {
  UniqueIdentifier,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  DndContextProps,
  DndContext,
  closestCenter,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useState, useId } from 'react'
import { SortableItem } from './sortable-item'
import cx from 'classnames'

type SortableProps = {
  direction: 'vertical' | 'horizontal'
}

export function Sortable({ direction }: SortableProps) {
  const [items, setItems] = useState<UniqueIdentifier[]>(['A', 'B', 'C', 'D', 'E'])
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
  )

  const contextId = useId()

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
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      id={contextId}
    >
      <SortableContext
        items={items}
        strategy={direction === 'horizontal' ? horizontalListSortingStrategy : verticalListSortingStrategy}
      >
        {items.map((id) => (
          <SortableItem
            className={cx({ 'flex-1': direction === 'horizontal' })}
            key={id}
            id={id}
          >
            {id}
          </SortableItem>
        ))}
      </SortableContext>
      <DragOverlay>
        {activeId && (
          <SortableItem
            id={activeId}
            className='cursor-grab'
          >
            {activeId}
          </SortableItem>
        )}
      </DragOverlay>
    </DndContext>
  )
}
