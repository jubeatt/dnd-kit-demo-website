import { ExplainArea } from '../components/ui/explain-area'
import { List } from '../components/ui/list'
import { Basic } from './basic'

export const metadata = {
  title: 'dnd-kit demo | Basic',
}

export default function BasicPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Basic</h1>
      <p>最簡單的範例，可以將物件拖曳到不同的格子裡。</p>

      <Basic />

      <div className='space-y-4'>
        <ExplainArea title='思路'>
          <List
            paragraphs={[
              `利用 DndContext 包裹 Draggable 和 Droppable 元素，並在 onDragEnd 事件中更新 state 來改變目前 Draggable 元素的位置`,
              `其中 Draggable 和 Droppable 元件分別是透過 useDroppable 和 useDraggable 來實作的。使用方法可以看一下原始碼，應該不難理解。`,
            ]}
          />
        </ExplainArea>
        <ExplainArea
          type='note'
          title='備註'
        >
          <List
            paragraphs={[
              `useDroppable 有提供一個 isOver 的狀態，用來表示目前是否有被某個 Draggable 元素覆蓋，我們可以藉此來調整不同的樣式`,
              `useDraggable 有提供一個 isDragging 的狀態，用來表示目前是否為拖拉狀態，我們可以藉此來調整不同的樣式`,
              `為了避免 Draggable 在拖拉時影響排版流或者是畫面溢出的問題，官方建議使用 DragOverlay 元件來解決。從思路上來說就是在拖拉的時後多顯示一層 Layer，並且把拖拉中的元件顯示在這層 Layer 上。`,
              `useSensors 這個 hook 是用來控制拖拉元件的一些細節設定，像是能不能支援觸控拖拉（例如：手機）？判斷是否進入拖拉狀態的靈敏度等等。`,
            ]}
          />
        </ExplainArea>
      </div>
    </div>
  )
}
