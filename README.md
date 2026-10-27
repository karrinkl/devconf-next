# DEVCONF 2026 - лендинг IT-конференции на Next.js (SSR и SSG)

Лабораторная работа № 25. Перенос веб-приложения на Next.js
и гибридная стратегия рендеринга.

Вариант 2: лендинг IT-конференции. Проект продолжает работы № 19-23:
компоненты, данные, тема Bootstrap и хранилище Redux перенесены
из `devconf-react-bootstrap` в структуру Next.js.

## Страницы и стратегии рендеринга

| Маршрут | Файл | Стратегия | Функция получения данных |
|---|---|---|---|
| `/` | `pages/index.js` | статическая (автоматическая оптимизация) | нет |
| `/schedule` | `pages/schedule.js` | **SSR**, HTML на каждый запрос | `getServerSideProps` |
| `/speakers` | `pages/speakers/index.js` | **SSG**, HTML при сборке | `getStaticProps` |
| `/speakers/[id]` | `pages/speakers/[id].js` | **SSG**, 8 страниц при сборке | `getStaticPaths` + `getStaticProps` |

На каждой SSR- и SSG-странице есть плашка с отметкой времени.
Для `/schedule` это момент запроса, она меняется при каждом обновлении.
Для `/speakers` это момент сборки, она остаётся прежней до следующего
`npm run build`.

## Стек

- Next.js 16 (Pages Router), React 19
- React Bootstrap 2 и Bootstrap 5.3
- Redux Toolkit 2 и React-Redux 9 - избранные спикеры
- @fontsource/inter - шрифт Inter без обращения к Google Fonts

## Требования

- Node.js 20.9 или новее, npm 10

Arch Linux:

```bash
sudo pacman -S nodejs npm git
```

Windows: установщик Node.js LTS с сайта nodejs.org.

## Запуск

```bash
git clone https://github.com/karrinkl/devconf-next.git
cd devconf-next
npm install
```

Production-режим, в котором видна разница между SSR и SSG:

```bash
npm run build
npm run start
```

Сайт открывается по адресу http://localhost:3000.

Режим разработки с горячей перезагрузкой:

```bash
npm run dev
```

В режиме разработки Next.js вызывает `getStaticProps` на каждый
запрос, поэтому отметка времени на `/speakers` тоже будет меняться.
Проверять SSG нужно после `npm run build` и `npm run start`.

Если порт 3000 занят:

```bash
npm run start -- -p 3001
```

## Как убедиться, что рендеринг серверный

1. Открыть http://localhost:3000/speakers и нажать Ctrl+U.
   В исходном коде уже есть имена спикеров и строка
   «Страница собрана: <дата и время сборки>».
2. Открыть http://localhost:3000/schedule и нажать Ctrl+U.
   В исходном коде есть таблица со статусами и строка
   «Страница сформирована сервером: <время запроса>».
3. Обновить исходный код `/schedule` (F5 на вкладке view-source):
   время меняется. Для `/speakers` оно не меняется.

Готовые HTML-файлы SSG-страниц после сборки лежат в
`.next/server/pages/speakers.html` и `.next/server/pages/speakers/*.html`.

Из терминала то же самое видно по заголовкам:

```bash
curl -I http://localhost:3000/speakers   # x-nextjs-cache: HIT
curl -I http://localhost:3000/schedule   # Cache-Control: no-store
```

## Структура проекта

```
devconf-next/
├── pages/
│   ├── _app.js              глобальные стили, Provider, общий Layout
│   ├── _document.js         шаблон HTML, язык страницы
│   ├── index.js             главная: первый экран, FAQ, регистрация
│   ├── schedule.js          SSR, getServerSideProps
│   ├── 404.js               страница «не найдено»
│   └── speakers/
│       ├── index.js         SSG, getStaticProps
│       └── [id].js          SSG, getStaticPaths + getStaticProps
├── components/              компоненты, перенесённые из ЛР № 23
├── data/                    mock-данные: спикеры, FAQ, расписание
├── store/                   Redux Toolkit, срез favorites
├── lib/formatDate.js        форматирование отметки времени
├── styles/theme.css         тема поверх Bootstrap из ЛР № 23
└── public/                  иконки и изображения из ЛР № 17
```

## Что изменилось при переносе с Vite

| Vite (ЛР № 23) | Next.js (ЛР № 25) |
|---|---|
| `index.html` | `pages/_document.js` |
| `src/main.jsx` | `pages/_app.js` |
| `src/App.jsx`, одна страница | файлы в `pages/`, маршрут = путь к файлу |
| `import photo from './assets/...'` | файлы в `public/`, путь `/images/...` |
| одно хранилище на модуль | фабрика `makeStore()`, хранилище на запрос |
| `<a href>` | `<Link href>` из `next/link` |
