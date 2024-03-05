"use client"

import { MdLightMode, MdNightlight } from "react-icons/md";
import { useTheme } from "next-themes"
import { useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const ThemeIcon = (theme === 'light')
    ? MdNightlight
    : MdLightMode

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const [mouse, setMouse] = useState(false);
  const [timeoutId, setTimeoutId] = useState(setTimeout(() => {}));

  function handleMouseEnter() {
    setTimeoutId(
      setTimeout(() => { setMouse(true); }, 500)
    )
  }

  function handleMouseLeave() {
    setMouse(false);
    clearTimeout(timeoutId)
  }

  return (
    <div className="fixed flex flex-col items-end cursor-pointer bottom-5 right-5">
      {
        mouse && (
          <div className="bg-black p-1 m-1 mr-5 text-sm">
            {
              (theme === 'light')
                ? 'Dark Theme'
                : 'Light Theme'
            }
          </div>
        ) 
      }
      <ThemeIcon
        className="cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
  
        size={30}
        onClick={toggleTheme}
      />
    </div>
  )
}
