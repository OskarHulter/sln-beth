import { Elysia } from 'elysia'

export function TodoForm() {
  return (
    <form hx-post='/todos' hx-swap='beforebegin' _='on submit target.reset()'>
      <input type='text' name='content' />
      <button type='submit'>Add</button>
    </form>
  )
}
