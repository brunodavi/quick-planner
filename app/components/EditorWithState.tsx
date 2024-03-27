import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { historyField } from '@codemirror/commands';
import { quickPlanner } from 'codemirror-lang-quick-planner';
import { githubDark } from '@uiw/codemirror-theme-github';
import { Dispatch, SetStateAction, useEffect } from 'react';

const stateFields = { history: historyField };

const template = `
16h Go to the dentist

> 2-6 30m
12h Lunch
14h Exercise
16h30 Meeting
18h45m Dinner

> 3,5 1h
17h Take out the trash
`.slice(1, -1)

export default function EditorWithInitialState(props: { setJsonTree: Dispatch<SetStateAction<JsonTree>> }) {
  const serializedState = localStorage.getItem('EditorState');
  const value = localStorage.getItem('EditorValue') ?? template;

  function parseTokens(text: string) {
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

    return jsonTree
  }

  function saveState(text: string, viewUpdate: ViewUpdate) {
    localStorage.setItem('EditorValue', text);

    const state = viewUpdate.state.toJSON(stateFields);
    localStorage.setItem('EditorState', JSON.stringify(state));
  }

  function handleChange(text: string, viewUpdate: ViewUpdate) {
    const jsonTree = parseTokens(text)
    saveState(text, viewUpdate)
    props.setJsonTree(jsonTree)
  }

  useEffect(() => {
    const jsonTree = parseTokens(value)
    props.setJsonTree(jsonTree)
  }, [])

  return (
    <CodeMirror
      value={value}
      initialState={
        serializedState
          ? {
              json: JSON.parse(serializedState ?? ''),
              fields: stateFields,
          }
          : undefined
      }
      onChange={handleChange}
      height="90vh"
      theme={githubDark}
      className="text-xl"
      extensions={[quickPlanner()]}
    />
  );
}
