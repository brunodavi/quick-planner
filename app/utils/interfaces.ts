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
