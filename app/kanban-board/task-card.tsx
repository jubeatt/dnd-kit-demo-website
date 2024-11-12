'use client'

import { Task } from './types'
import { DeleteButton } from '../components/ui/delete-button'
import { useCallback, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export type TaskCardProps = {
  task: Task
  showDeleteBtn?: boolean
  onDeleteTask?: (id: Task['id']) => void
  onTaskContentChange?: (id: Task['id'], content: string) => void
}

export default function TaskCard({ task, showDeleteBtn = true, onDeleteTask, onTaskContentChange }: TaskCardProps) {
  const [editMode, setEditMode] = useState(false)

  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const toggleEditMode = useCallback(() => setEditMode((prev) => !prev), [])

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='opacity-50 relative shrink-0 flex p-2.5 h-[100px] bg-gray-900 rounded-md ring-rose-500 ring-2 ring-inset'
      />
    )
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='group relative shrink-0 flex p-2.5 h-[100px] bg-gray-900 rounded-md cursor-grab ring-rose-500 hover:ring-2 hover:ring-inset'
      >
        <textarea
          className='bg-transparent w-full h-[90%] resize-none focus:outline-none'
          value={task.content}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode()
            }
          }}
          placeholder='add some task...'
          onBlur={toggleEditMode}
          onChange={(e) => onTaskContentChange?.(task.id, e.target.value)}
          autoFocus
        />
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='group relative shrink-0 p-2.5 h-[100px] bg-gray-900 rounded-md cursor-grab ring-rose-500 hover:ring-2 hover:ring-inset'
      onClick={toggleEditMode}
    >
      <p className='h-full overflow-y-auto scroll-inner whitespace-pre-wrap'>{task.content}</p>
      {showDeleteBtn && (
        <DeleteButton
          className='absolute right-4 top-1/2 -translate-y-1/2 hidden group-hover:block'
          onClick={() => onDeleteTask?.(task.id)}
        />
      )}
    </div>
  )
}
