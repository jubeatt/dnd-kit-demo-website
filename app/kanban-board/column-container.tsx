'use client'

import React, { useMemo, useState } from 'react'
import { Column, Task } from './types'
import { PlusCircleIcon } from 'lucide-react'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TaskCard, { TaskCardProps } from './task-card'
import { DeleteButton } from '../components/ui/delete-button'

type ColumnContainerProps = {
  column: Column
  tasks: Task[]
  onDeleteColumn?: (id: Column['id']) => void
  onColumnTitleChange?: (columnId: Column['id'], title: string) => void
  onAddTaskBtn?: (columnId: Column['id']) => void
} & Omit<TaskCardProps, 'task'>

export function ColumnContainer({
  column,
  tasks,
  onDeleteColumn,
  onDeleteTask,
  onColumnTitleChange,
  onTaskContentChange,
  onAddTaskBtn,
}: ColumnContainerProps) {
  const [editMode, setEditMode] = useState(false)

  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks])

  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='shrink-0 opacity-40 ring-2 ring-rose-500 bg-gray-800 w-[350px] h-[500px] rounded-md flex flex-col p-1'
      />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='shrink-0 bg-gray-800 w-[350px] h-[500px] rounded-md flex flex-col p-1'
    >
      {/* title */}
      <div
        className='flex items-center justify-between bg-gray-900 text-md p-3 cursor-grab rounded-md rounded-b-none font-bold'
        {...attributes}
        {...listeners}
      >
        <div
          className='flex gap-3'
          onClick={() => setEditMode(true)}
        >
          <div className='flex justify-center items-center bg-gray-700 px-2 py-1 text-sm rounded-full'>0</div>
          {!editMode && column.title}
          {editMode && (
            <input
              className='outline-none focus:ring-2 px-1 rounded-sm ring-rose-500 bg-gray-900'
              value={column.title}
              onBlur={() => setEditMode(false)}
              onChange={(e) => onColumnTitleChange?.(column.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditMode(false)
                }
              }}
              autoFocus
            />
          )}
        </div>
        <DeleteButton onClick={() => onDeleteColumn?.(column.id)} />
      </div>

      {/* content */}
      <div className='flex-grow flex flex-col gap-4 mt-2 py-1 px-2 overflow-y-auto'>
        <SortableContext items={taskIds}>
          {tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onDeleteTask={onDeleteTask}
              onTaskContentChange={onTaskContentChange}
            />
          ))}
        </SortableContext>
      </div>

      {/* footer */}
      <button
        className='flex gap-2 items-center p-3 hover:bg-gray-900 rounded-md hover:text-rose-500'
        onClick={() => onAddTaskBtn?.(column.id)}
      >
        <PlusCircleIcon size={22} />
        Add Task
      </button>
    </div>
  )
}
