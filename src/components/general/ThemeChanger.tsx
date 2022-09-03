import { useDispatch } from "react-redux";

import styled, { useTheme } from "styled-components";
import { capitalize } from "../../controllers/SpecialCtrl";

import { setTheme } from "../../store/slice/displaySlice";


const ThemeChanger = () => {

  const dispatch = useDispatch()

  const theme = useTheme()

  const changeTheme = () => {

    const newTheme = theme.name === 'light' ? 'Dark' : 'Light'

    dispatch(setTheme(newTheme));

    localStorage.setItem('theme', newTheme)
  }

  return (

    <ThemeChangerStyle style={{ zIndex: 15 }}>

      <button onClick={changeTheme}>{capitalize(theme.name)}</button>

    </ThemeChangerStyle>

  )

}

const ThemeChangerStyle = styled.div`
  
  position: fixed;
  top: .5pc;
  right: .5pc;
`

export default ThemeChanger
