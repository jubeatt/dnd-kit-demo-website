'use client'

import { PlusCircle } from 'lucide-react'
import { Column, Task } from './types'
import { useMemo, useState } from 'react'
import { ColumnContainer } from './column-container'
import {
  DndContext,
  DndContextProps,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import TaskCard from './task-card'

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const columnIds = useMemo(() => columns.map((c) => c.id), [columns])
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
  )

  const handleCreateColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    }
    setColumns([...columns, newColumn])
  }

  const handleCreateTask = (columnId: Column['id']) => {
    const newTask: Task = {
      id: generateId(),
      content: `Task ${tasks.length + 1}`,
      columnId,
    }
    setTasks([...tasks, newTask])
  }

  const handleDeleteColumn = (id: Column['id']) => {
    setColumns(columns.filter((c) => c.id !== id))
    setTasks((tasks) => tasks.filter((t) => t.columnId !== id))
  }

  const handleDeleteTask = (id: Task['id']) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleColumnTitleChange = (id: Column['id'], title: string) => {
    setColumns((columns) => {
      const column = columns.find((c) => c.id === id)
      if (!column) return columns
      column.title = title
      return [...columns]
    })
  }

  const handleTaskContentChange = (id: Task['id'], content: string) => {
    setTasks((tasks) => {
      const task = tasks.find((t) => t.id === id)
      if (!task) return tasks
      task.content = content
      return [...tasks]
    })
  }

  const handleDragStart: DndContextProps['onDragStart'] = (event) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
    }
  }

  const handleDragOver: DndContextProps['onDragOver'] = (event) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (active.id === over.id) return

    const isActiveTask = active.data.current?.type === 'Task'
    const isOverTask = over.data.current?.type === 'Task'
    const isOverColumn = over.data.current?.type === 'Column'

    if (!isActiveTask) return

    if (isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)
        tasks[activeIndex].columnId = tasks[overIndex].columnId
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    if (isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        tasks[activeIndex].columnId = over.id
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  const handleDragEnd: DndContextProps['onDragEnd'] = (event) => {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    if (active.data.current?.type === 'Column') {
      setColumns((columns) => {
        const oldIndex = columns.findIndex((c) => c.id === activeId)
        const newIndex = columns.findIndex((c) => c.id === overId)
        return arrayMove(columns, oldIndex, newIndex)
      })
    }
  }

  return (
    <div>
      <div className='mb-4'>
        <button
          className='ml-auto flex items-center gap-2 px-4 py-2 rounded ring-rose-500 hover:ring-2'
          onClick={handleCreateColumn}
        >
          <PlusCircle size={22} />
          Add Column
        </button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className='flex gap-4'>
          <SortableContext items={columnIds}>
            {columns.map((c) => (
              <ColumnContainer
                key={c.id}
                column={c}
                tasks={tasks.filter((t) => t.columnId === c.id)}
                onDeleteColumn={handleDeleteColumn}
                onDeleteTask={handleDeleteTask}
                onColumnTitleChange={handleColumnTitleChange}
                onTaskContentChange={handleTaskContentChange}
                onAddTaskBtn={handleCreateTask}
              />
            ))}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              tasks={tasks.filter((t) => t.columnId === activeColumn.id)}
            />
          )}
          {activeTask && (
            <TaskCard
              task={activeTask}
              showDeleteBtn={false}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

function generateId() {
  return Math.random().toString(36).substring(2, 15)
}
