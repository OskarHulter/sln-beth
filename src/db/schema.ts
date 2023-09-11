import { InferModel } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

export const todos = sqliteTable('todos', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false)
})

export type Todo = InferModel<typeof todos>
// Schema for inserting a Todo - can be used to validate API requests
export const insertTodoSchema = createInsertSchema(todos)

// Schema for selecting a Todo - can be used to validate API responses
export const selectTodoSchema = createSelectSchema(todos)

// Usage
// const isTodoValid: boolean = Value.Check(insertTodoSchema, {
// 	name: 'John Doe',
// 	email: 'johndoe@test.com',
// 	role: 'admin',
// });