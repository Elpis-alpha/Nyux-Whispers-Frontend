import { useSelector } from "react-redux"

import styled from "styled-components"

import XButton from "./XButton"


const XMessage = () => {

  const { show, heading, content, buttons, style } = useSelector((store: any) => store.messages.XMessage)

  if (!show) { return <></> }

  const popMessage = (e: any) => {

    (e.target as HTMLElement).classList.add('poppy')

    setTimeout(() => {

      (e.target as HTMLElement).classList.remove('poppy')

    }, 100);

  }

  return (

    <XMessageStyle onClick={e => { if (!(e.target as HTMLElement).classList.contains('x-message')) popMessage(e) }}>

      <div className="x-message" style={style}>

        <div className="heading" style={heading.style}>{heading.text}</div>

        <div className="content" style={content.style}>{content.text}</div>

        <div className="buttons">

          {buttons.map((button: any) => <XButton text={button.text} waitFor={button.waitFor} styleX={button.style} key={button.waitFor} />)}

        </div>

      </div>

    </XMessageStyle>

  )

}

const XMessageStyle = styled.div`

  @keyframes fade-in-x-message-left{
    0%{opacity: 0;}
    100%{opacity: 1;}
  }

  @keyframes slide-in-x-message-left{
    0%{right: 80vw;}
    100%{right: 0;}
  }

  position: fixed;
  right: 0; top: 0;
  bottom: 0; left: 0;
  z-index: 200;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 1;
  display: flex;
  animation: fade-in-x-message-left .5s 1;
  
  &.poppy div.x-message{
    transform: scale(1.05);
  }

  div.x-message{
    justify-content: center;
    text-align: center;
    background-color: #e0e0e0;
    display: flex;
    border-radius: 1pc;
    padding: 1.5pc 2pc;
    width: 80vw;
    max-height: 70vh;
    overflow: auto;
    font-size: 1pc;
    transform: scale(1);
    transition: transform .1s;
    flex-direction: column;
    line-height: 2pc;
    animation: slide-in-x-message-left 1s 1 ease-out;
    justify-content: flex-start;
    ${props => props.theme.newMorphMessages}
    color: ${props => props.theme.col};

    .heading{
      font-size: 1.5pc;
      font-weight: bold;
    }

    .buttons{
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }

`

export default XMessage
