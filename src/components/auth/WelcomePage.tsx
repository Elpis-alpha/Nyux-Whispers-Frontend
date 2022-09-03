import { SpinnerCircular } from "spinners-react";

import styled, { useTheme } from "styled-components"

import { reformImage } from "../../controllers/SpecialCtrl";

import { siteName } from "../../__env";


const WelcomePage = ({ hide }: { hide: boolean }) => {

  const theme = useTheme()

  return (

    <WelcomePageStyle className={hide ? "hide" : ""}>

      <div className="inner">

        <img src="/images/assets/blur/logo-small.png" alt={siteName + ' logo'} onLoad={e => reformImage(e)} />

        <h6>{siteName}</h6>

      </div>

      <div className="spinner-hol">

        <SpinnerCircular color={theme.col} secondaryColor={theme.name === 'light' ? "#bbb" : "#444"} size="3pc" />

      </div>

    </WelcomePageStyle>

  )

}

const WelcomePageStyle = styled.div`

  padding: 1pc;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.bg};
  transition: background-color .5s, opacity .49s;

  &.hide {
    opacity: 0;
  }

  .inner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      width: 50vw;
      max-width: 150px;
    }

    h6 {
      padding-top: .5pc;
    }
  }  
  
  .spinner-hol {
    position: fixed;
    bottom: 2pc;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default WelcomePage
