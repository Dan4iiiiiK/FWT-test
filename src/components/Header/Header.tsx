import { useContext } from "react"
import Logo from "../icons/Logo"
import Moon from "../icons/Moon"
import styles from './Header.module.scss'
import { ThemeContext } from "../../provider/ThemeProvider"
import Sun from "../icons/Sun"

function Header() {
  const [theme, setTheme] = useContext(ThemeContext)

  const changeTheme = () => {
    if(typeof setTheme === 'string') {
      null
    } else {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <header className={styles.header}>
      <a href="" className={styles.header_logo}>
        <Logo/>
      </a>
      <button className={styles.button__theme} onClick={changeTheme}>
        {theme === 'light' ? <Moon /> : <Sun/>}
      </button>
    </header>
  )
}

export default Header