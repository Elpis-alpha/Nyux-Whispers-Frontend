import { useSelector } from "react-redux"

import styled from "styled-components"

import { FaTimes } from "react-icons/fa"

import { removeSmallMessage } from "../MessageCtrl"


const SmallMessage = () => {

  const { show, heading, content, style } = useSelector((store: any) => store.messages.smallMessage)

  if (!show) { return <></> }

  return (

    <SmallMessageStyle>

      <div className="small-message" style={style}>

        <div className="heading" style={heading.style}>{heading.text}</div>

        <div className="content" style={content.style}>{content.text}</div>

        <div className="close-x" onClick={e => removeSmallMessage()}><FaTimes size="1pc" color="darkred" /></div>

      </div>

    </SmallMessageStyle>

  )

}

const SmallMessageStyle = styled.div`
  
  @keyframes slide-small-message-left{
    0%{top: 0vh; opacity: 0;}
    100%{top: 10vh; opacity: 1;}
  }

  position: fixed;
  top: 10vh; left: 15vw;
  z-index: 250;
  align-items: center;
  justify-content: center;
  display: flex;
  animation: slide-small-message-left .5s 1 ease-in-out;

  div.small-message{
    min-height: 6pc;
    align-items: center;
    justify-content: center;
    width: 70vw;
    display: flex;
    border-radius: 1pc;
    padding: 1pc;
    text-align: center;
    ${props => props.theme.newMorphMessages}
    color: ${props => props.theme.col};
    font-size: 1pc;
    line-height: 2pc;
    flex-direction: column;
    transition: box-shadow .5s, color .5s, background-color .5s;

    .heading{
      font-size: 1.5pc;
      font-weight: bold;
    }

    .close-x{
      position: absolute;
      top: .7pc; right: .7pc;
      cursor: pointer;
    }
  }

`

export default SmallMessage
