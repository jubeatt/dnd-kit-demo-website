import cx from 'classnames'

type ExplainAreaProps = {
  children: React.ReactNode
  title: string
  type?: 'note' | 'principle'
}

export function ExplainArea({ children, title, type = 'principle' }: ExplainAreaProps) {
  return (
    <div
      className={cx(
        'border-l-4  bg-gray-800 p-4 rounded-md',
        { 'border-rose-500': type === 'principle' },
        { 'border-yellow-500': type === 'note' },
      )}
    >
      <div className='font-bold text-lg mb-2'>{title}</div>
      {children}
    </div>
  )
}
