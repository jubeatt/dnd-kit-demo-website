# Dnd Kit Demo Website

## 簡介

嗨，歡迎來到 Dnd Kit Demo 網站，這個網站是我在學習 dnd-kit 時做的一些範例。

會有這個網站是因為我自己覺得 dnd-kit 的官方文件有點太簡陋了，在我讀完以後要開始做一些功能時，還是會有一種摸不著頭緒的感覺，因此才決定整理了一份我覺得比較好理解的範例與說明。

網站中的範例大多是以我自己比較常見的需求來設計，也有盡量排除掉跟拖拉不相關的花俏功能，目的是希望能把焦點在拖拉的實作上，也避免讓原始碼變得太雜亂。

不過還是要特別提一下，這個範例網站終究還是比較偏向於我的個人筆記，所以在說明的部分會比較簡潔，建議有想要參考的人還是先稍微看過官方文件的基礎介紹以後再來看會比較好一點。

網站連結：[https://dnd-kit-demo-website.vercel.app/](https://dnd-kit-demo-website.vercel.app/)

![screenshot.png](./screenshot.png)

## 使用技術

這份專案是以 Next.js（App Router）製作，並包含底下項目：

- @dnd-kit/core
- @dnd-kit/sortable
- TypeScript
- TailwindCSS

## 開發相關

這份專案使用的 Node 版本為 `v20.10.0`

1\. 安裝依賴項目：

```
npm ci
```

2\. 啟動 dev server：：

```
npm run dev
```

3\. 部署

此專案部署在 Vercel 上，因此只要用 `git push` 更新遠端上的原始碼以後就會自動跑部署流程。
