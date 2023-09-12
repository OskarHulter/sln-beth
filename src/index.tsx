import { html } from '@elysiajs/html'
import { eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import * as elements from 'typed-html'
import { OpenPropsExample } from './components/openPropsExample'
import { TodoItem } from './components/todoItem'
import { TodoList } from './components/todoList'
import { db } from './db'
import { todos } from './db/schema'

export const BaseHtml = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="description" content="🙂">
  <meta name="color-scheme" content="dark light">
  <title>THE BETH STACK</title>
  <script src="/hmtx.js"></script>
  <script src="/hyperscript.js"></script>
  <link href="/styles.css" rel="stylesheet">
</head>
${children}
`

const app = new Elysia({
  strictPath: false,
})
  .use(html())
  .get('/', ({ html }) =>
    html(
      <BaseHtml>
        <body hx-get='/design-system' hx-swap='innerHTML' hx-trigger='load' />
      </BaseHtml>
    )
  )
  .get('/design-system', async () => {
    return <OpenPropsExample />
  })
  .get('/todos', async () => {
    const data = await db.select().from(todos).all()
    return <TodoList todos={data} />
  })
  .post(
    '/todos/toggle/:id',
    async ({ params }) => {
      const oldTodo = await db
        .select()
        .from(todos)
        .where(eq(todos.id, params.id))
        .get()
      const newTodo = await db
        .update(todos)
        .set({ completed: !oldTodo.completed })
        .where(eq(todos.id, params.id))
        .returning()
        .get()
      return <TodoItem {...newTodo} />
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .delete(
    '/todos/:id',
    async ({ params }) => {
      await db.delete(todos).where(eq(todos.id, params.id)).run()
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .post(
    '/todos',
    async ({ body }) => {
      const newTodo = await db.insert(todos).values(body).returning().get()
      return <TodoItem {...newTodo} />
    },
    {
      body: t.Object({
        content: t.String({ minLength: 1 }),
      }),
    }
  )
  .get('/styles.css', () => Bun.file('./style-gen/styles.css'))
  .get('/htmx.js', () => Bun.file('./dist/hyperscript.min.js'))
  .get('/hyperscript.js', () => Bun.file('./dist/hyperscript.min.js'))
  .listen(3000)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
)
