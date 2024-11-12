import React from 'react'
import { Handle } from './handle'
import { ExplainArea } from '../components/ui/explain-area'
import { List } from '../components/ui/list'

export const metadata = {
  title: 'dnd-kit demo | Handle',
}

export default function HandlePage() {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Handle</h2>
      <p>自定義用來拖拉的按鈕。</p>
      <div className='flex flex-col gap-4 my-8'>
        <Handle />
      </div>
      <div className='space-y-4'>
        <ExplainArea title='思路'>
          <List
            ordered
            paragraphs={[
              `在 SortableItem 元件中新增拖拉用的按鈕。`,
              `把 useSortable 回傳的 attributes 和 listeners 改傳給拖拉用的按鈕。`,
            ]}
          />
        </ExplainArea>
        <ExplainArea
          type='note'
          title='什麼時候使用？'
        >
          <List paragraphs={[`內容區塊可能有其他的操作，因此需要獨立的拖拉按鈕。`]} />
        </ExplainArea>
      </div>
    </div>
  )
}
