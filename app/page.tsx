"use client"

import { useTheme } from 'next-themes'

import CodeMiror from "@uiw/react-codemirror"
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { quickPlanner } from "codemirror-lang-quick-planner";
import ThemeSwitcher from './components/ThemeSwitcher';
import Export from './components/Export';

type NodeValues = {
  name: string,
  from: number,
  to: number,
}

const value = `12h Almoço
17h Jogar Lixo`


function setNestedJSON(obj: object, path: string, value: any) {
    const keys = path.split('.');
    let currentObj = obj;

    for (const key of keys.slice(0, -1)) {
        currentObj[key] ??= {};
        currentObj = currentObj[key];
    }

    currentObj[keys[keys.length - 1]] = value;
}

export default function Home() {
  const { theme } = useTheme()

  const githubTheme = (theme === 'light')
    ? githubLight
    : githubDark

  function handleChange(text: string) {
    const parser = quickPlanner().language.parser
    const tree = parser.parse(text)

    const jsonTree: any = {}
    const commands = [
      'Event',
      'CommandRange',
      'CommandSplit',
    ]

    let command = ''
    let index = -1

    tree.iterate({
      enter({ name, from, to }: NodeValues) {
        if (!name || name === 'Program') return

        if (commands.includes(name)) {
          command = name
          index++
          return
        }

        const prop = name.toLowerCase()
        const value = text.slice(from, to)

        setNestedJSON(jsonTree, `${index}.${command}.${prop}`, value)
      }
    })
  }

  return (
    <main className="h-screen">
      <CodeMiror
        onChange={handleChange}
        value={value}

        height="100vh"
        theme={githubTheme}
        extensions={[quickPlanner()]}
      />
      <Export />
      <ThemeSwitcher />
    </main>
  );
}
