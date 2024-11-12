'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'

type DraggableProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Draggable({ children, className, ...props }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'draggable',
  })

  return (
    <button
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      className={`p-4 bg-rose-500 text-white rounded-md text-center ${cx(className, {
        'opacity-0': isDragging,
      })}`}
      {...listeners}
      {...attributes}
      {...props}
    >
      {children}
    </button>
  )
}
