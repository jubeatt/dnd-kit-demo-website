'use client'

import {
  DndContext,
  DndContextProps,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { Columns, Item } from './types'
import { Column } from './column'
import { SortableItem } from './sortable-item'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash-es'

export default function SortableMultiple() {
  const [columns, setColumns] = useState<Columns>({})

  const [activeItem, setActiveItem] = useState<null | Item>(null)

  const handleDragStart: DndContextProps['onDragStart'] = (e) => {
    setActiveItem(e.active.data.current?.item ?? null)
  }

  const handleDragOver: DndContextProps['onDragOver'] = (e) => {
    // 用 setTimeout 包起來的原因是為了避免「Maximum update depth exceeded」的錯誤，
    // 這個錯誤主要是來自於 onDragOver 時大量的 setState 而引起的，暴力解就是直接用 setTimeout 來用非同步的方式 setState
    // ref：https://github.com/clauderic/dnd-kit/issues/496
    setTimeout(() => {
      if (!e.over) return
      const isOverItem = e.over.data.current?.type === 'Item'
      const isOverColumn = e.over.data.current?.type === 'Column'

      const overId = e.over.id
      const activeItemData: Item | undefined = e.active.data.current?.item
      const overItemData: Item | undefined = e.over.data.current?.item

      if (isOverColumn && activeItemData) {
        setColumns((columns) => {
          const newColumns = cloneDeep(columns)
          newColumns[activeItemData.columnName] = newColumns[activeItemData.columnName].filter(
            (item) => item.id !== activeItemData.id,
          )
          newColumns[overId] = newColumns[overId].concat([{ ...activeItemData, columnName: overId as string }])
          return newColumns
        })
      }

      if (isOverItem && overItemData && activeItemData) {
        const sameColumnName = overItemData.columnName === activeItemData.columnName
        if (sameColumnName) {
          setColumns((columns) => {
            const newColumns = cloneDeep(columns)
            const activeItemIndex = newColumns[overItemData.columnName].findIndex((i) => i.id === activeItemData.id)
            const overItemIndex = newColumns[overItemData.columnName].findIndex((i) => i.id === overItemData.id)
            if (activeItemIndex < 0 || overItemIndex < 0) return columns
            newColumns[overItemData.columnName] = arrayMove(
              newColumns[overItemData.columnName],
              activeItemIndex,
              overItemIndex,
            )
            return newColumns
          })
        } else {
          setColumns((columns) => {
            const newColumns = cloneDeep(columns)
            newColumns[activeItemData.columnName] = newColumns[activeItemData.columnName].filter(
              (i) => i.id !== activeItemData.id,
            )
            const overItemIndex = newColumns[overItemData.columnName].findIndex((i) => i.id === overItemData.id)
            if (overItemIndex < 0) return columns
            newColumns[overItemData.columnName].splice(overItemIndex, 0, {
              ...activeItemData,
              columnName: overItemData.columnName,
            })
            return newColumns
          })
        }
      }
    }, 0)
  }

  useEffect(() => {
    setColumns(generateColumns())
  }, [])

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
  )

  return (
    <div className='my-8 flex gap-4'>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        sensors={sensors}
      >
        <div className='flex gap-4 w-full overflow-x-auto'>
          {Object.entries(columns).map(([key, value]) => {
            return (
              <Column
                key={key}
                id={key}
                data={value}
              />
            )
          })}
        </div>
        <DragOverlay>{activeItem && <SortableItem item={activeItem} />}</DragOverlay>
      </DndContext>
    </div>
  )
}

function generateColumns(): Columns {
  const columns: Columns = {}

  for (let i = 0; i < 3; i++) {
    const columnName = `column${i + 1}`

    columns[columnName] = Array.from({ length: 3 }, () => {
      const id = Math.random().toString(16).slice(3)
      return {
        id,
        message: id + ' - Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ratione earum tenetur',
        columnName,
      }
    })
  }
  return columns
}
