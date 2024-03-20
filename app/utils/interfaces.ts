type EventArgs = {
  time: string,
  title: string,
}

type SplitArgs = {
  time: string,
  split: string,
}

type RangeArgs = {
  time: string,
  range: string,
}


type CommandEvent = {
  Event: EventArgs
}

type CommandSplit = {
  CommandSplit: SplitArgs
}

type CommandRange = {
  CommandRange: RangeArgs
}


type TimeCommands = CommandEvent | CommandSplit | CommandRange


type JsonTree = TimeCommands[];


type NodeValues = {
  name: string,
  from: number,
  to: number,
}
