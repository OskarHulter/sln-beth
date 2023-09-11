import { expect, mock, test } from 'bun:test'
const random = mock(() => Math.random())

test('random', async () => {
  const val = random()
  expect(val).toBeGreaterThan(0)
  expect(random).toHaveBeenCalled()
  expect(random).toHaveBeenCalledTimes(1)
})

// const random = mock((multiplier: number) => multiplier * Math.random());
// random(2);
// random(10);
// * random.mock.calls;
// [[ 2 ], [ 10 ]]
// * random.mock.results;
//  [
//    { type: "return", value: 0.6533907460954099 },
//    { type: "return", value: 0.6452713933037312 }
//  ]
