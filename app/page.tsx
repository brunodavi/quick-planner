"use client"

import { useTheme } from 'next-themes'

import CodeMiror from "@uiw/react-codemirror"
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { quickPlanner } from "codemirror-lang-quick-planner";
import ThemeSwitcher from './components/ThemeSwitcher';
import Export from './components/Export';
import { useEffect, useState } from 'react';

type NodeValues = {
  name: string,
  from: number,
  to: number,
}

const value = `
16h Go to the dentist

> 2-6 30m
12:00 Lunch
14h Exercise
16h30 Meeting
18h45m Dinner

> 3,5 1h
17h Take out the trash
`.slice(1, -1)


export default function Home() {
  const { theme } = useTheme()
  const [jsonTree, setJsonTree] = useState([])

  const githubTheme = (theme === 'light')
    ? githubLight
    : githubDark

  function handleChange(text: string) {
    const parser = quickPlanner().language.parser
    const tree = parser.parse(text)

    const jsonTree: any = []
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

        jsonTree[index] ??= {}
        jsonTree[index][command] ??= {}

        jsonTree[index][command][prop] = value
      }
    })

    setJsonTree(jsonTree)
  }

  useEffect(() => { handleChange(value) }, [])

  return (
    <main className="h-screen">
      <CodeMiror
        onChange={handleChange}
        value={value}

        height="100vh"
        theme={githubTheme}
        extensions={[quickPlanner()]}
      />
      <Export jsonTree={jsonTree} />
      <ThemeSwitcher />
    </main>
  );
}
