import styled from "styled-components"

import { useSelector } from "react-redux"

import MiniMessage from "./MiniMessage"


const MiniMessageHolder = () => {

  const { miniMessage } = useSelector((store: any) => store.messages)

  return (

    <MiniMessageHolderStyle>

      {miniMessage.map((msg: any) => <MiniMessage key={msg.id} msg={msg} />)}

    </MiniMessageHolderStyle>

  )

}

const MiniMessageHolderStyle = styled.div`

  position: fixed;
  right: 20vw;
  left: 20vw;
  bottom: 1pc;
  margin: 0 auto;
  display: block;
`

export default MiniMessageHolder
