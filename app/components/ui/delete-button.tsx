'use client'

import { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'
import { Trash2 } from 'lucide-react'

export function DeleteButton({ className, onClick }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cx('p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-gray-800', className)}
      onClick={onClick}
    >
      <Trash2 />
    </button>
  )
}
