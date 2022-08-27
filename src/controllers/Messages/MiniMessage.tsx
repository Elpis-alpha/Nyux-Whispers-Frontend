import styled from "styled-components"

import { BiCheckShield } from "react-icons/bi"

import { FaCopy, FaInfo, FaSave, FaTimes } from "react-icons/fa"

import { SpinnerCircular } from "spinners-react"

import { useEffect } from "react"

import { useDispatch } from "react-redux"

import { removeMiniMessage } from "../../store/slice/messagesSlice"


const MiniMessage = ({ msg }: any) => {

  const { id, show, icon, content, style } = msg

  const dispatch = useDispatch()

  const iconObject: any = {

    'ok': <BiCheckShield size="1.2pc" />,

    'copy': <FaCopy size="1.2pc" />,

    'save': <FaSave size="1.2pc" />,

    'info': <FaInfo size="1.2pc" />,

    'times': <FaTimes size="1.2pc" />,

    'loading': <SpinnerCircular size="1.2pc" color="white" secondaryColor="#b3b3b3" />,

  }

  useEffect(() => {

    if (!show) setTimeout(() => dispatch(removeMiniMessage(id)), 500);

  }, [show, dispatch, id])


  return (

    <MiniMessageStyle className={show ? "" : "remove"}>

      <div className="mini-message" style={style}>

        <div className="mini-icon" style={icon.style}>{iconObject[icon.name]}</div>

        <div className="mini-divider"></div>

        <div className="mini-text" style={content.style}>{content.text}</div>

      </div>

    </MiniMessageStyle>

  )

}

const MiniMessageStyle = styled.div`

  @keyframes slide-mini-message-up{
    0%{ 
      bottom: -3pc; 
      height: 0; 
      opacity: 0;
    }
    100%{ 
      bottom: 0; 
      height: 4pc; 
      opacity: 1;
    }
  }

  /* position: fixed;
  right: 0;
  left: 0; 
  bottom: 1pc;
  z-index: 550; */
  z-index: 550;
  left: 0;
  opacity: 1;
  margin: .5pc auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: slide-mini-message-up .5s 1;
  transition: left .5s, opacity .5s;

  &.remove {
    left: 80vw;
    opacity: 0;
  }

  div.mini-message{
    background-color: rgb(53, 53, 53);
    color: white;
    fill: white;
    display: flex;
    border-radius: .5pc;

    .mini-divider{
      align-self: stretch;
      width: 1px;
      background-color: #878787;
    }

    .mini-text{
      padding: 1pc;
      font-size: 1pc;
      display: flex;
      align-items: center;
      justify-content: center;
      /* max-width: 50vw; */
      text-align: center;
    }

    .mini-icon{
      padding: 1pc;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

`

export default MiniMessage
