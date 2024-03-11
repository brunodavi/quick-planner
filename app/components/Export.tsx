import { AiOutlineExport } from "react-icons/ai";
import { createEvents, DateArray, EventAttributes } from "ics";
import { saveAs } from "file-saver";

type Event = {
  time: string;
  title: string;
};

type CommandSplit = {
  split: string;
  time: string;
};

type CommandRange = {
  range: string;
  time: string;
};

type JsonTree = (Event | CommandSplit | CommandRange)[];

const weeks = ",SU,MO,TU,WE,TH,FR,SA".split(",");

function createWeeklyRange(from: number, to: number, interval: number = 1) {
  const weeksSelected = weeks
    .slice(from, to + 1)
    .join(",");

  return `FREQ=WEEKLY;BYDAY=${weeksSelected};INTERVAL=${interval}`;
}

function createWeeklySplit(indexes: number[], interval: number = 1) {
  const weeksSelected = weeks
    .filter((_, index) => indexes.includes(index))
    .join(",");

  return `FREQ=WEEKLY;BYDAY=${weeksSelected};INTERVAL=${interval}`;
}

function convertTime(time: string): [number?, number?] {
  const matchResult = time.match(/(?:(^\d\d?)[h:])?(?:(\d\d?)m?)?/)

  const [_, hours, minutes] = (
    (matchResult ?? [])
    .filter(Boolean)
    .map(Number)
  )

  if (hours && minutes) return [hours, minutes]
  else if (hours) return [hours]

  return [hours, minutes]
}

export default function Export({ jsonTree }: { jsonTree: JsonTree }) {
  function downloadICS(content: string) {
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    saveAs(blob, "QuickPlanner.ics");
  }
  function exportICS() {
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

    for (const tree of Object.values(jsonTree)) {
      const converter: any = {
        Event(arg: { time: string; title: string }) {
          const dateArray: any = [
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

        CommandRange(arg: { range: string; time: string }) {
          const [from, to] = arg.range.split("-").map(Number);
          const [hours, minutes] = convertTime(arg.time);

          eventConfig.duration = { hours, minutes },
            eventConfig.recurrenceRule = createWeeklyRange(from, to);
        },

        CommandSplit(arg: { split: string; time: string }) {
          const indexes = arg.split.split(",").map(Number);
          const [hours, minutes] = convertTime(arg.time);

          eventConfig.duration = { hours, minutes },
            eventConfig.recurrenceRule = createWeeklySplit(indexes);
        },
      };

      for (const [comand, arg] of Object.entries(tree)) {
        converter[comand](arg);
      }
    }

    createEvents(events, (err, value) => {
      if (err) {
        throw err;
      }

      downloadICS(value);
    });
  }

  return (
    <button onClick={exportICS} className="flex text-white rounded-md items-center justify-between bg-transparent">
      <AiOutlineExport className="mx-1" size="90%" />
      <span className="hidden lg:block lg:text-nowrap">
        Export ICS
      </span>
    </button>
  );
}
