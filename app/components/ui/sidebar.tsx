'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Github } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsCollapsed(window.document.documentElement.clientWidth < 768)
  }, [])

  return (
    <aside
      className={`relative flex flex-col justify-between bg-gray-900 p-4 transition-all duration-300 ${
        isCollapsed ? 'w-4 p-0' : 'w-52'
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className='absolute -right-3 top-6 rounded-full bg-gray-700 p-1.5 shadow hover:bg-gray-600'
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <nav>
        {!isCollapsed && (
          <Link
            href='/'
            className={`text-lg font-bold p-2`}
          >
            Dnd Kit Demo
          </Link>
        )}
        <div className='space-y-2 mt-4'>
          {!isCollapsed && (
            <Link
              href='/basic'
              className={`block px-4 py-2 hover:bg-gray-700 rounded ${pathname === '/basic' ? 'bg-gray-700' : ''}`}
            >
              {'Basic'}
            </Link>
          )}
          {!isCollapsed && (
            <Link
              href='/sortable'
              className={`block px-4 py-2 hover:bg-gray-700 rounded ${pathname === '/sortable' ? 'bg-gray-700' : ''}`}
            >
              {'Sortable'}
            </Link>
          )}
          {!isCollapsed && (
            <Link
              href='/sortable-multiple'
              className={`block px-4 py-2 hover:bg-gray-700 rounded ${
                pathname === '/sortable-multiple' ? 'bg-gray-700' : ''
              }`}
            >
              {'Sortable Multiple'}
            </Link>
          )}
          {!isCollapsed && (
            <Link
              href='/handle'
              className={`block px-4 py-2 hover:bg-gray-700 rounded ${pathname === '/handle' ? 'bg-gray-700' : ''}`}
            >
              {'Handle'}
            </Link>
          )}
          {!isCollapsed && (
            <Link
              href='/kanban-board'
              className={`block px-4 py-2 hover:bg-gray-700 rounded ${
                pathname === '/kanban-board' ? 'bg-gray-700' : ''
              }`}
            >
              {'Kanban Board'}
            </Link>
          )}
        </div>
      </nav>
      <Link
        href='/'
        className='hover:bg-gray-700 rounded p-2'
      >
        <div className='flex items-center gap-2'>
          <svg
            className='w-6 h-6'
            role='img'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>GitHub</title>
            <path
              className='fill-white'
              d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
            />
          </svg>
          <div className='text-xs'>Jubeatt</div>
        </div>
      </Link>
    </aside>
  )
}
