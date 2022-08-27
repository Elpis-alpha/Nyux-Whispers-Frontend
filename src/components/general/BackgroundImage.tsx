import styled from "styled-components"
import { reformImage } from "../../controllers/SpecialCtrl"


const BackgroundImage = () => {

  return (

    <BackgroundImageStyle>

      <img src="/images/assets/blur/text.png" alt="Text Logo" onLoad={e => reformImage(e, false)} />

    </BackgroundImageStyle>

  )

}

const BackgroundImageStyle = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 80%;
    display: block;
    opacity: .3;
  }
`

export default BackgroundImage