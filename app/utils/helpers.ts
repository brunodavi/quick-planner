import { createEvents, DateArray, EventAttributes } from "ics";
import { saveAs } from "file-saver";

const weeks = ",SU,MO,TU,WE,TH,FR,SA".split(",");

export function createWeeklyRange(from: number, to: number, interval: number = 1) {
  if ((from <= 0 || from > 7) || (to <= 0 || to > 7)) {
    from = 1
    to = 7
  }

  if (interval <= 0) {
    interval = 1
  }

  const weeksSelected = weeks
  .slice(from, to + 1)
  .join(",");

  return `FREQ=WEEKLY;BYDAY=${weeksSelected};INTERVAL=${interval}`;
}

export function createWeeklySplit(indexes: number[], interval: number = 1) {
  if (indexes.length > 7 || indexes.some(x => x <= 0 || x > 7)) {
    indexes = [1, 2, 3, 4, 5, 6, 7]
  }

  if (interval <= 0) {
    interval = 1
  }

  const weeksSelected = weeks
  .filter((_, index) => indexes.includes(index))
  .join(",");

  return `FREQ=WEEKLY;BYDAY=${weeksSelected};INTERVAL=${interval}`;
}

export function convertTime(time: string): [number, number] {
  const matchResult = time.match(/(?:(^\d\d?)[h:])?(?:(\d\d?)m?)?/)

  const [_, hours, minutes] = (
    (matchResult ?? [])
    .map(Number)
  )

  const invalidValues = [
    hours < 0 || hours > 24,
    minutes < 0 || minutes > 59,
  ]

  if (invalidValues.some(Boolean)) return [0, 0]

  if (hours && minutes) return [hours, minutes]
  else if (hours) return [hours, 0]
  else if (minutes) return [0, minutes]

  return [0, 0]
}


export function downloadICS(content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  saveAs(blob, "QuickPlanner.ics");
}

export function exportICS(jsonTree: JsonTree) {
  let events: EventAttributes[] = [];

  const date = new Date();
  const currentDate: [number, number, number] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];

  const dateTime: DateArray = [
    ...currentDate,
    date.getHours(),
    date.getMinutes(),
  ];

  const eventConfig: EventAttributes = {
    start: dateTime,
    duration: { minutes: 30 },
    startOutputType: 'local'
  };

  const converter: any = {
    Event(arg: EventArgs) {
      const dateArray: DateArray = [
        ...currentDate,
        ...convertTime(arg.time),
      ];

      events = [
        ...events,
        {
          ...eventConfig,

          title: arg.title,
          start: dateArray,
        },
      ];
    },

    CommandSplit(arg: SplitArgs) {
      const indexes = arg.split.split(",").map(Number);
      const [hours, minutes] = convertTime(arg.time);

      eventConfig.duration = { hours, minutes },
      eventConfig.recurrenceRule = createWeeklySplit(indexes);
    },

    CommandRange(arg: RangeArgs) {
      const [from, to] = arg.range.split("-").map(Number);
      const [hours, minutes] = convertTime(arg.time);

      eventConfig.duration = { hours, minutes },
      eventConfig.recurrenceRule = createWeeklyRange(from, to);
    },
  };

  for (const tree of Object.values(jsonTree)) {
    for (const [command, arg] of Object.entries(tree)) {
      converter[command](arg);
    }
  }

  return createEvents(events)
}
