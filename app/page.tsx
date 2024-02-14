"use client"

import { useTheme } from 'next-themes'

import CodeMiror from "@uiw/react-codemirror"
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { quickPlanner } from "codemirror-lang-quick-planner";
import ThemeSwitcher from './ThemeSwitcher';

export default function Home() {
  const { theme } = useTheme()

  const githubTheme = (theme === 'light')
    ? githubLight
    : githubDark

  return (
    <main className="h-screen">
      <CodeMiror
        height="100vh"
        theme={githubTheme}
        extensions={[quickPlanner()]}
      />
      <ThemeSwitcher />
    </main>
  );
}
