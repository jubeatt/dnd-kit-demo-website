import { List } from '../components/ui/list'
import { ExplainArea } from '../components/ui/explain-area'
import SortableMultiple from './sortable-multiple'

export const metadata = {
  title: 'dnd-kit demo | Sortable Multiple',
}

export default function SortableMultiplePage() {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Sortable Multiple</h2>
      <p>Sortable 的延伸，變成多個欄位的排序，以及跨欄位拖拉的功能。</p>

      <SortableMultiple />

      <div className='space-y-4'>
        <ExplainArea title='思路'>
          <p className='mb-3 font-bold'>
            注意：大部分的基礎概念都跟 Sortable （單個容器）差不多，所以請先稍微複習過後再來看這個單元。
          </p>
          <List
            paragraphs={[
              `原本在單個容器時只需要在 onDragEnd 時修改狀態即可，但在多個容器時會改用 onDragOver 來處理。`,
              `主要是因為在跨欄位拖拉的畫面 dnd-kit 沒辦法再像之前一樣直接修改 DOM 來處理畫面，因此必須透過更新 state
              的方式來達到畫面上的跨欄拖拉效果。`,
              `每個容器（Column）必須是 droppable 的元件（用 useDroppable 實作），這樣子才有辦法在容器為空的時候把物件拖拉進去。`,
            ]}
          />
        </ExplainArea>
        <ExplainArea
          type='note'
          title='備註'
        >
          <List
            paragraphs={[
              `我在實作時碰到了一個「Maximum update depth exceeded」的錯誤，這個錯誤可能是來自於 onDragOver 時碰到大量的 setState 而引起的`,
              `目前的做法是先使用 setTimeout 的方式來解決，這個解法 100% 不是正確的解法，還是會有機率產生其他 bug，只是目前實在還沒想到其他解法所以暫時先這樣處理，之後有研究出新解法再來重構一下。`,
            ]}
          />
        </ExplainArea>
      </div>
    </div>
  )
}
