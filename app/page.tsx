'use client'

import Link from 'next/link'
import { List } from './components/ui/list'

export default function Home() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Dnd Kit Demo</h1>
      <div className='space-y-4'>
        <p>
          嗨，歡迎來到 Dnd Kit Demo 網站，這個網站是我在學習
          <Link
            className='external-link'
            href='https://dndkit.com/'
            target='_blank'
          >
            dnd-kit
          </Link>
          時做的一些範例。
        </p>
        <p>
          dnd kit 本身的功能其實還挺豐富的，在官方的
          <Link
            className='external-link'
            href='https://master--5fc05e08a4a65d0021ae0bf2.chromatic.com/?path=/story/core-draggable-hooks-usedraggable--basic-setup'
            target='_blank'
          >
            storybook
          </Link>
          可以看到相當多的範例。但有一個小問題是官方文件寫的真的是有點簡陋，就算看完官方文件以後再去參考 storybook
          的原始碼，還是蠻難理解實際上在寫什麼？尤其是比較複雜的範例。‘
        </p>
        <p>
          另外官方也沒有提供比較明確的
          pattern，同樣的功能你可能會看到蠻多不同的寫法。像我這裡的內容也有可能是你沒看過的寫法，不過我還是盡力簡化啦，如果還是太難理解的話先說聲
          Sorry！
        </p>
        <p>個人覺得如果能夠像 Redux 那樣整個社群裡有一個明確的 pattern 的話會更好一些。</p>
        <p>總而言之，以上是個人的小小抱怨，目前這個範例網頁主要的內容有這些：</p>
        <div className='pl-4'>
          <List
            paragraphs={[
              `Basic：怎麼設定可拖拉元件（draggable）和可拖放元件（droppable）`,
              `Sortable：怎麼製作可排序的列表？（單欄）`,
              `Sortable Multiple：怎麼製作可排序的列表？（多欄）`,
              `Handle：怎麼自定義拖拉用的按鈕？`,
            ]}
          />
        </div>
        <p>
          雖然內容沒有很多，但我覺得這些功能是我目前工作上最常見的幾種拖拉情境（<del>絕對不是因為太懶惰</del>
          ），所以希望這次學玩以後，將來碰到相關的情境時能夠用更優雅的方式來解決。
        </p>
        <p>
          將來有時間或靈感的話也會陸續在新增一些更多內容，如果各位讀者看了覺得還不錯，有幫助到你的話也歡迎到我的 GitHub
          幫我點個 star 啦~~~
        </p>
      </div>
    </div>
  )
}
