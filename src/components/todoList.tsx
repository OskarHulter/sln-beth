import { Elysia } from 'elysia'
import { type Todo } from '../db/schema'
import { TodoItem } from './todoItem'
import { TodoForm } from './todoForm'

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