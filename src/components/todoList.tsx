import { Elysia } from 'elysia'
import { type Todo } from '../db/schema'
import { TodoForm } from './todoForm'
import { TodoItem } from './todoItem'

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  )
}
