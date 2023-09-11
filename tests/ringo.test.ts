import { expect, spyOn, test } from 'bun:test'

const ringo = {
  name: 'Ringo',
  sayHi() {
    console.log(`Hello I'm ${this.name}`)
  },
}

const spy = spyOn(ringo, 'sayHi')

test('spyon', () => {
  expect(spy).toHaveBeenCalledTimes(0)
  ringo.sayHi()
  expect(spy).toHaveBeenCalledTimes(1)
})
