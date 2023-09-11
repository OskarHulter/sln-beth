import { html } from '@elysiajs/html'
import { eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'
import * as elements from 'typed-html'
import { TodoItem } from './components/todoItem'
import { TodoList } from './components/todoList'
import { db } from './db'
import { todos } from './db/schema'
import { OpenPropsExample } from './components/openPropsExample'

export const BaseHtml = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>THE BETH STACK</title>
  <script src="dist/htmx.min.js"></script>
  <script src="dist/hyperscript.min.js"></script>
  <link href="/styles.css" rel="stylesheet">
</head>
${OpenPropsExample}
${children}
`

const app = new Elysia({
  strictPath: false
})
  .use(html())
  .get('/', ({ html }) =>
    html(
      <BaseHtml>
        <body hx-get='/todos' hx-swap='innerHTML' hx-trigger='load' />
      </BaseHtml>
    )
  )
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
  .get('/styles.css', () => Bun.file('./open-props/styles.css'))
  .listen(3000)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
)
