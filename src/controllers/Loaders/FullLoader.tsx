import { useDispatch, useSelector } from "react-redux"

import { SpinnerCircular } from "spinners-react"

import styled, { useTheme } from "styled-components"

import { useEffect } from "react"
import { resetFullLoader } from "../../store/slice/loadingSlice"



const FullLoader = () => {

  const dispatch = useDispatch()

  const { bg, col } = useTheme()

  const { text, style, show } = useSelector((store: any) => store.loading.fullLoader)

  // remove loader if show is false
  useEffect(() => {

    if (!show) setTimeout(() => dispatch(resetFullLoader()), 400);

  }, [show, dispatch])


  if (text.trim() === "") return <></>

  return (

    <FullLoaderStyle className={show ? "" : "hide"} style={style}>

      <div className="inner">

        <SpinnerCircular size="8pc" color={bg} secondaryColor={col} />

        <span>{text}</span>

      </div>

    </FullLoaderStyle>

  )

}

const FullLoaderStyle = styled.div`

  position: fixed;
  right: 0; left: 0;
  bottom: 0; top: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 650;
  /* background-color: ${props => props.theme.rgbaOpp(.6)}; */
  background-color: rgba(0, 0, 0, .6);
  text-align: center;
  opacity: 1;
  ${props => props.theme.useAnimation("opacity", "ldsfhhdos")}
  transition: opacity .5s;

  &.hide {
    opacity: 0;
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 80%;

    span {
      color: ${props => props.theme.darkCol};
      font-size: 1.5pc;
      line-height: 3pc;
    }
  }
`

export default FullLoader
