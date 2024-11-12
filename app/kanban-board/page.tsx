import Link from 'next/link'
import { KanbanBoard } from './kanban-board'

export const metadata = {
  title: 'dnd-kit demo | Kanban Board',
}

export default function KanbanBoardPage() {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Kanban Board</h2>
      <p>
        這一頁的內容是從
        <Link
          className='external-link'
          href='https://www.youtube.com/watch?v=RG-3R6Pu_Ik'
          target='_blank'
        >
          youtube
        </Link>
        上的教學影片來的，當時在練習的時候參考了裡面的思路，我覺得還蠻簡單易懂的，有興趣的人推薦能去點進去看看。
      </p>
      <KanbanBoard />
    </div>
  )
}
