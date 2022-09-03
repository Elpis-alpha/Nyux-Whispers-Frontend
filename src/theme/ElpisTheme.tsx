import { useEffect, useState } from "react"

import { useSelector } from "react-redux"

import { ThemeProvider } from "styled-components"

import light from "./light"

import dark from "./dark"


const ElpisTheme = ({ ...props }) => {

  const { theme: displayTheme } = useSelector((store: any) => store.display)

  const firstTheme = (displayTheme: string) => {

    if (displayTheme === "Dark") {

      return "dark"

    } else if (displayTheme === "Light") {

      return "light"

    } else { // if (displayTheme === "Auto")

      const d = new Date()

      if (d.getHours() >= 18) {

        return "dark"

      } else if (d.getHours() < 6) {

        return "dark"

      } else if (d.getHours() >= 6 && d.getHours() < 18) {

        return "light"

      } else {

        return "light"

      }

    }

  }

  const [theme, setTheme] = useState(firstTheme(displayTheme))

  useEffect(() => {

    let timeOut = 0

    const configureForAuto = () => {

      clearTimeout(timeOut)

      const d = new Date()

      if (d.getHours() >= 18) {

        setTheme("dark")

        resetAuto(getDiff(1, 0, 0, 5));

      } else if (d.getHours() < 6) {

        setTheme("dark")

        resetAuto(getDiff(0, 6, 0, 5));

      } else if (d.getHours() >= 6 && d.getHours() < 18) {

        setTheme("light")

        resetAuto(getDiff(0, 18, 0, 5));

      }

    }

    const resetAuto = (time: number) => {

      timeOut = window.setTimeout(() => {

        configureForAuto()

      }, time)

    }

    const getDiff = (days = 0, hour = 0, min = 0, sec = 0, mil = 0) => {

      const present = new Date()

      const future = new Date()

      future.setDate(future.getDate() + days)

      future.setHours(hour)

      future.setMinutes(min)

      future.setSeconds(sec)

      future.setMilliseconds(mil)

      return future.getTime() - present.getTime()

    }

    if (displayTheme === "Dark") {

      setTheme("dark")

    } else if (displayTheme === "Light") {

      setTheme("light")

    } else { // if (displayTheme === "Auto")

      configureForAuto()

    }

    return () => { clearTimeout(timeOut); }

  }, [displayTheme])

  useEffect(() => {

    const themex = theme === "light" ? light : dark

    document.querySelector('#theme-color')?.setAttribute('content', themex.bg)

    document.querySelector('#manifest-tag')?.setAttribute('href', `/manifest_${themex.name}.json`)

  }, [theme])


  return (

    <ThemeProvider theme={theme === "light" ? light : dark}>

      {props.children}

    </ThemeProvider>

  )

}

export default ElpisTheme
