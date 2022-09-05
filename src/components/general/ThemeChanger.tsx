import { useDispatch } from "react-redux";

import styled, { useTheme } from "styled-components";

import Switch from "react-switch";

import { setTheme } from "../../store/slice/displaySlice";

import { BsMoonStars, BsSun } from "react-icons/bs";


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

      <label>

        <Switch onChange={changeTheme} checked={theme.name === "light"}

          aria-label="Switch to change site theme"

          offColor="#444" onColor="#ccc"

          height={2 * 16} width={4 * 16}

          handleDiameter={1.4 * 16}

          offHandleColor="#777"

          onHandleColor="#ededed"

          activeBoxShadow="0px 0px 1px 2px rgba(18, 18, 18, 0.1)"

          checkedIcon={<div className="icon-hol">

            <BsSun color="#f0a305" size="1.2pc" />

          </div>}

          uncheckedIcon={<div className="icon-hol">

            <BsMoonStars />

          </div>}

        />

      </label>

    </ThemeChangerStyle>

  )

}

const ThemeChangerStyle = styled.div`
  
  position: fixed;
  top: .5pc;
  right: .5pc;

  .icon-hol {
    height: 100%;
    width: 100%;
    color: ${props => props.theme.lightBg};
    
    ${props => props.theme.flexing()}
  }
`

export default ThemeChanger
