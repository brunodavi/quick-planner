import { it, expect } from 'vitest'

import * as utils from '../app/utils/helpers'

it.each([
  ['1h', [1, 0]],
  ['12h', [12, 0]],
  ['24h', [24, 0]],

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

  ['01m', [0, 1]],
  ['10m', [0, 10]],
  ['30m', [0, 30]],
  ['59m', [0, 59]],

  ['0h', [0, 0]],
  ['0m', [0, 0]],

  ['-1h', [0, 0]],
  ['25h', [0, 0]],

  ['1h60', [0, 0]],
  ['25h10m', [0, 0]],

  ['60m', [0, 0]],
  ['0m', [0, 0]],
  ['-1m', [0, 0]],
])("convertTime(%s)\n\tReturn: %s\n", (time, expectedResult) => {
  const result = utils.convertTime(time)
  expect(result).toStrictEqual(expectedResult)
})

it.each([
  [1, 7, undefined, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1"],
  [1, 3, undefined, "FREQ=WEEKLY;BYDAY=SU,MO,TU;INTERVAL=1"],
  [5, 7, undefined, "FREQ=WEEKLY;BYDAY=TH,FR,SA;INTERVAL=1"],

  [1, 2, 3, "FREQ=WEEKLY;BYDAY=SU,MO;INTERVAL=3"],
  [1, 1, 5, "FREQ=WEEKLY;BYDAY=SU;INTERVAL=5"],
  [1, -1, 2, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=2"],
  [0, -1, 3, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=3"],
  [-10, 10, 50, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=50"],
  [10, -10, undefined, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1"],
  [-10, -10, 0, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1"],
  [-10, 0, 0, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1"],
  [0, 0, 0, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1"],
])("createWeeklyRange(%s, %s, %s)\n\tReturn: %s\n", (from, to, interval, expectedResult) => {
  const result = utils.createWeeklyRange(from, to, interval)
  expect(result).toStrictEqual(expectedResult)
})

it.each([
  [[1, 2, 3, 4, 5, 6, 7], undefined, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1"],
  [[3, 5], undefined, "FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1"],
  [[1, 7], undefined, "FREQ=WEEKLY;BYDAY=SU,SA;INTERVAL=1"],

  [[1, 2, 3, 4, 5, 6, 7], 2, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=2"],
  [[2, 4, 6], 5, "FREQ=WEEKLY;BYDAY=MO,WE,FR;INTERVAL=5"],

  [[1, 2, 3, 4, 5, 6, 7, 8], undefined, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1"],
  [[1, 2, 3, 0, 5, 6, 7], undefined, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1"],
  [[0, 2, 3, 4, 5, 6, 7], undefined, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1"],

  [[1, 2, 3, 4, 5, 6, 7], 0, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1"],
  [[1, 2, 3, 4, 5, 6, 7], -10, "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1"],

  [[4, 3], -10, "FREQ=WEEKLY;BYDAY=TU,WE;INTERVAL=1"],
  [[7, 1], undefined, "FREQ=WEEKLY;BYDAY=SU,SA;INTERVAL=1"],
])("createWeeklySplit(%s, %s)\n\tReturn: %s\n", (indexes, interval, expectedResult) => {
  const result = utils.createWeeklySplit(indexes, interval)
  expect(result).toStrictEqual(expectedResult)
})
