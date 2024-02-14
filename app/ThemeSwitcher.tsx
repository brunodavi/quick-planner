"use client"

import { MdLightMode, MdNightlight } from "react-icons/md";
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const ThemeIcon = (theme === 'light')
    ? MdNightlight
    : MdLightMode

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-5 right-5">
      <ThemeIcon size={24} onClick={toggleTheme} />
    </div>
  )
}
