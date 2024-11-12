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
import { Droppable } from './droppable'
import { Draggable } from './draggable'
import { useState, useId } from 'react'

const items = Array.from({ length: 3 }, (_, index) => `container-${index + 1}`)

export function Basic() {
  const [parentId, setParentId] = useState<UniqueIdentifier | null>('container-1')
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
    const { over } = event
    if (!over) return
    setParentId(over.id)
    setActiveId(null)
  }

  const handleDragStart: DndContextProps['onDragStart'] = (event) => {
    setActiveId(event.active.id)
  }

  return (
    <div className='flex flex-col gap-4 md:flex-row my-8'>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        id={contextId}
      >
        {items.map((id) => (
          <Droppable
            id={id}
            key={id}
          >
            {id === parentId && <Draggable>Draggable</Draggable>}
          </Droppable>
        ))}
        <DragOverlay>{activeId && <Draggable className='cursor-grab'>Draggable</Draggable>}</DragOverlay>
      </DndContext>
    </div>
  )
}
