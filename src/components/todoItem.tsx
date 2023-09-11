import { Elysia } from 'elysia'
import { Todo } from '../db/schema'

export function TodoItem({ content, completed, id }: Todo) {
    return (
      <div>
        <p>{content}</p>
        <input
          type='checkbox'
          checked={completed}
          hx-post={`/todos/toggle/${id}`}
          hx-swap='outerHTML'
          hx-target='closest div'
        />
        <button
          type='button'
          hx-delete={`/todos/${id}`}
          hx-swap='outerHTML'
          hx-target='closest div'
        >
          X
        </button>
      </div>
    )
  }
  
  