import { afterEach, describe, expect, it, vi } from 'vitest'
import fs from 'file-saver'
import ics, { EventAttributes } from 'ics'

import * as utils from '../app/utils/helpers'

describe("Test Mock downloadICS", () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('test saveAs and Blob called corretly', () => {
    const spySaveAs = vi.spyOn(fs, 'saveAs').mockReturnThis()
    const spyBlob = vi.spyOn(globalThis, 'Blob').mockReturnThis()

    utils.downloadICS('test')

    expect(spyBlob).toHaveBeenNthCalledWith(1, ['test'], { type: "text/calendar;charset=utf-8" })
    expect(spySaveAs).toHaveBeenNthCalledWith(1, new Blob(), "QuickPlanner.ics")
  })
})


describe('Test exportICS', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Mock events returned', () => {
    vi.setSystemTime(new Date(2024, 0, 1, 12, 10))
    const spyCreateEvent = vi.spyOn(ics, 'createEvents')

    const expectedEvents: EventAttributes[] = [
      {
        title: 'Launch',
        start: [2024, 1, 1, 12, 10],
        duration: { minutes: 30 },
        startOutputType: 'local',
      },
      {
        title: 'Exercises',
        start: [2024, 1, 1, 13, 0],
        duration: { hours: 0, minutes: 45 },
        startOutputType: 'local',
        recurrenceRule: "FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1"
      },
      {
        title: 'Work',
        start: [2024, 1, 1, 14, 30],
        duration: { hours: 1, minutes: 0 },
        startOutputType: 'local',
        recurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1"
      },
    ]

    const { value } = utils.exportICS([
      {
        Event: {
          time: '12h10',
          title: 'Launch',
        }
      },
      {
        CommandSplit: {
          split: '3,5',
          time: '45m',
        }
      },
      {
        Event: {
          time: '13h',
          title: 'Exercises'
        }
      },
      {
        CommandRange: {
          range: '2-6',
          time: '1h',
        }
      },
      {
        Event: {
          time: '14h30m',
          title: 'Work', 
        }
      }
    ])

    expect(spyCreateEvent).toHaveBeenNthCalledWith(1, expectedEvents)
    expect(value).toContain('Launch')
    expect(value).toContain('T1210')
    expect(value).toContain('PT30M')

    expect(value).toContain('Exercises')
    expect(value).toContain('T1300')
    expect(value).toContain('PT45M')

    expect(value).toContain('Work')
    expect(value).toContain('T1430')
    expect(value).toContain('PT1H')
  })
})
