"use client"

import CodeMiror from "@uiw/react-codemirror"
import { githubDark } from '@uiw/codemirror-theme-github';
import { quickPlanner } from "codemirror-lang-quick-planner";
import Export from './components/Export';
import { useEffect, useState } from 'react';
import Help from "./components/Help";

type NodeValues = {
  name: string,
  from: number,
  to: number,
}

const value = `
16h Go to the dentist

> 2-6 30m
12h Lunch
14h Exercise
16h30 Meeting
18h45m Dinner

> 3,5 1h
17h Take out the trash
`.slice(1, -1)


export default function Home() {
  const [jsonTree, setJsonTree] = useState([])
  const [loaded, setLoaded] = useState(false)

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

  useEffect(() => {
    handleChange(value)
    setLoaded(true)
  }, [])

  return (
    <main>
      <header className="h-[10vh] flex justify-between items-center p-3">
        <h1 className="font-bold text-xl text-white">Quick Planner</h1>

        <div className="flex justify-between border-white h-8 w-24 lg:w-60">
          <Help />
          <Export jsonTree={jsonTree} />
        </div>
      </header>
      <div className="bg-[#0D1117]">
        {
          (loaded)
            ? (
              <CodeMiror
                onChange={handleChange}
                value={value}

                height="90vh"
                theme={githubDark}
                className="text-xl"
                extensions={[quickPlanner()]}
              />
            )
            : (
              <div role="status" className="flex gap-1 animate-pulse">
                <div className="bg-gray-700 h-[90vh] w-12 rounded" />
                <div className="flex flex-col gap-1 pt-1">
                  <div className="bg-gray-700 w-60 h-6 rounded-full" />
                  <div className='h-6' />
                  <div className="bg-gray-700 w-24 h-6 rounded-full" />
                  <div className="bg-gray-700 w-20 h-6 rounded-full" />
                  <div className="bg-gray-700 w-24 h-6 rounded-full" />
                  <div className="bg-gray-700 w-28 h-6 rounded-full" />
                  <div className="bg-gray-700 w-32 h-6 rounded-full" />
                  <div className='h-6' />
                  <div className="bg-gray-700 w-20 h-6 rounded-full" />
                  <div className="bg-gray-700 w-64 h-6 rounded-full" />
                </div>
              </div>
            )
        }
      </div>
    </main>
  );
}
