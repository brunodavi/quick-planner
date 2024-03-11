# Quick Planner

Quick Planner is a fast calendar routine generator.

## Demo
![quick-planner](https://github.com/brunodavi/quick-planner/assets/48166556/902a551a-0846-4714-8802-2c92c80ffec1)


Import into any calendar
![quick-planner-calendar](https://github.com/brunodavi/quick-planner/assets/48166556/878b02be-fb02-4a03-aac1-5b36d53383af)

## How to Use

### Event

Defines an event, by default set for today's date and lasts for 30 minutes.

Example:
```
9h Go to the doctor
13h Go to work
17h30 Go to the meeting
```

### CommandRange

Defines a repetition rule with a range between weekdays and the duration of upcoming events.

Example:
```
> 2-6 1h
12h Lunch
14h Do exercises
```

> In this example, the rule creates a repetition from Monday (2) to Friday (6) with a duration of one hour for each event.

### CommandSplit

Defines a repetition rule splitting weekdays and the duration of upcoming events.

Example:
```
> 3,5 45m
17h30m Take out the trash
```

> In this example, the rule creates a split between Tuesday (3) and Thursday (5) with a duration of 45 minutes in the next event.

### Weeks

Weeks are numbered from 1 to 7, as seen in the table below:

| Sunday | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| 1       | 2       | 3       | 4       | 5       | 6       | 7       |

### Time

The accepted formats for time and duration are these:

Example with `12:00`, `12:30`, and `45 minutes`:

```
12h

12h30
12h30m

45m
```

## Development

### Installation
```bash
npm install
```

### Scripts

Check code style:
```bash
npm run lint
```

Start application in development mode:

```bash
npm run dev
```

Start application in production:

```bash
npm run build
npm start
```
