'use client'

import { UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import { HTMLAttributes } from 'react'
import cx from 'classnames'

type DroppableProps = HTMLAttributes<HTMLDivElement> & {
  id: UniqueIdentifier
}

export function Droppable({ id, children, className, ...props }: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`relative flex-1 min-h-[100px] p-4 rounded-md bg-gray-900 md:min-h-[300px] ${cx(className, {
        'outline outline-2 outline-rose-500': isOver,
      })}`}
      {...props}
    >
      <div className='relative z-10'>{children}</div>
      <span className='absolute top-0 left-0 w-full h-full flex justify-center items-center text-gray-500 select-none'>
        Droppable
      </span>
    </div>
  )
}
