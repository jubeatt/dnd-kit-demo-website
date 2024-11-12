import Link from 'next/link'
import { ExplainArea } from '../components/ui/explain-area'
import { List } from '../components/ui/list'
import { Sortable } from './sortable'

export const metadata = {
  title: 'dnd-kit demo | Sortable',
}

export default function SortablePage() {
  return (
    <>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Sortable Vertical</h2>
        <p>
          可排序的列表。需要另外下載
          <Link
            className='external-link'
            href='https://www.npmjs.com/package/@dnd-kit/sortable'
            target='_blank'
          >
            @dnd-kit/sortable
          </Link>
          來使用。
        </p>

        <div className='flex flex-col gap-4 my-8'>
          <Sortable direction='vertical' />
        </div>

        <div className='space-y-4'>
          <ExplainArea title='思路'>
            <List
              paragraphs={[
                `@dnd-kit/sortable 提供了 useSortable 這個 hook 來讓你實作可排序的物件（SortableItem），使用方式就跟 useDraggable, useDroppable 很類似，稍微看一下原始碼大概就會明白。`,
                `SortableContext 是作為 SortableItem 的父層使用，用來維護排序資料和排序策略`,
                `拖拉的畫面邏輯基本上 dnd-kit 都幫你封裝好了不用擔心，你只需要負責透過 onDragEnd 在拖拉結束時去更新排序順序即可。`,
              ]}
            />
          </ExplainArea>
          <ExplainArea
            title='備註'
            type='note'
          >
            <List
              paragraphs={[`arrayMove 是 @dnd-kit/sortable 提供的函式，會對根據我們給的 index 來做 swap（交換）。`]}
            />
          </ExplainArea>
        </div>
      </div>

      <div>
        <h2 className='text-2xl font-bold mb-4'>Sortable Horizontal</h2>
        <p>
          水平排序的列表，可以透過修改 SortableContext 的 strategy 來變更排序的方式，有哪些 strategy 可以參考
          <Link
            className='external-link'
            href='https://docs.dndkit.com/presets/sortable#sorting-strategies'
            target='_blank'
          >
            文件說明
          </Link>
          。
        </p>
        <div className='flex gap-4 my-8'>
          <Sortable direction='horizontal' />
        </div>
      </div>
    </>
  )
}
