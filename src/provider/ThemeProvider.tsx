import React, { createContext, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

export const ThemeContext = createContext(['', (value: string) => {value}])

const ThemeProvider: React.FC <{ children : React.ReactNode }> = ({children})  => {
  
  const [theme, setTheme] = useLocalStorage('theme', 'light')


  useEffect(() => {
    if(theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark') 
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider