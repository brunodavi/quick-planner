import { expect, test } from 'vitest'

import { convertTime } from '../app/utils/helpers'

test.each([
  ['1h', [1, undefined]],
  ['12h', [12, undefined]],
  ['24h', [24, undefined]],

  ['1h01', [1, 1]],
  ['1h10', [1, 10]],
  ['1h30', [1, 30]],
  ['1h59', [1, 59]],

  ['1h01m', [1, 1]],
  ['1h10m', [1, 10]],
  ['1h30m', [1, 30]],
  ['1h59m', [1, 59]],

  ['12h30m', [12, 30]],
  ['15h10m', [15, 10]],
  ['18h45m', [18, 45]],
  ['14h50m', [14, 50]],

  ['01m', [undefined, 1]],
  ['10m', [undefined, 10]],
  ['30m', [undefined, 30]],
  ['59m', [undefined, 59]],

  ['0h', [undefined, undefined]],
  ['0m', [undefined, undefined]],

  ['-1h', [undefined, undefined]],
  ['25h', [undefined, undefined]],

  ['1h60', [undefined, undefined]],
  ['25h10m', [undefined, undefined]],

  ['60m', [undefined, undefined]],
  ['0m', [undefined, undefined]],
  ['-1m', [undefined, undefined]],
])("convertTime(%s) === %s", (time, expectedResult) => {
  const result = convertTime(time)
  expect(result).toStrictEqual(expectedResult)
})
