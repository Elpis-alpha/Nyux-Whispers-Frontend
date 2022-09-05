import { useEffect, useMemo, useRef, useState } from "react"

import styled from "styled-components"

import { waitFor } from "../../controllers/TimeCtrl"

import InputComponent from "./InputComponent"


const StageOne = ({ signupData, setSignupData, setSignupStage }: SignUpStages) => {

  const innerRef = useRef(null)

  const [pageStage, setPageStage] = useState(0)

  const [userName, setUserName] = useState("")

  const elementStages = useMemo(() => [[0, 0, 2000], [0, 1, 3000], [0, 2, 2000], ["input", 1], [2, 0, 1500], [2, 1, 2000], ["button", 3]], [])

  useEffect(() => {

    console.log('cat');

    const doStuff = async () => {

      const stageAction = elementStages[pageStage]

      Array.from((innerRef.current as any)?.children).forEach((parent: any) => {

        parent.classList.remove("show")

        if (parent.classList.contains("sn")) return

        Array.from(parent?.children).forEach((child: any) => {

          child.classList.remove("show")

        })

      })

      if (typeof stageAction[0] === "number") {

        // @ts-ignore
        const targetParent = innerRef.current?.children[stageAction[0]] as HTMLElement

        targetParent?.classList?.add('show')

        // @ts-ignore
        const target = innerRef.current?.children[stageAction[0]]?.children[stageAction[1]] as HTMLElement

        target?.classList?.add('show')

        // @ts-ignore
        await waitFor(stageAction[2])

        setPageStage(pageStage + 1)

      } else {

        // @ts-ignore
        const targetParent = innerRef.current?.children[stageAction[1]] as HTMLElement

        targetParent?.classList?.add('show')

      }

    }

    doStuff()

  }, [pageStage, elementStages])


  return (

    <StageOneStyle>

      <div className="inner" ref={innerRef}>

        <div className="start-list">

          <p className="heavy">Hello there</p>

          <p>Actually before we start courtesy demands we exchange names.</p>

          <p>We're Nyux Whispers, what's your name?</p>

        </div>

        <div className="reveal sn">

          <InputComponent id="ksdakjsda" label="Enter your name" type="text" value={userName} setValue={setUserName} />

        </div>

        <div className="end-list">

          <h3>{signupData.name}...</h3>

          <p>Has a nice ring to it</p>

        </div>

        <div className="end sn">

          <button onClick={() => setSignupStage("stage-2")}>Proceed</button>

        </div>

      </div>

    </StageOneStyle>

  )

}

const StageOneStyle = styled.div`
  width: 100%;
  flex: 1;

  ${p => p.theme.flexing()}

  .inner {
    width: 80%;
    text-align: center;
    padding: 5pc 0;
    
    @media screen and (max-width: 600px) {
      width: 90%;
    }

    .reveal, .end {
      display: none;

      &.show {
        display: block;
        ${props => props.theme.useAnimation("opacity")}
      }
    }

    .start-list, .end-list {
      display: none;

      p {

        &.heavy {
          font-size: 2pc;
          line-height: 3pc;
        }

        font-weight: bold;
        font-size: 1.3pc;
        line-height: 2.5pc;
      }

      &.show {
        display: block;
      }

      > * {
        display: none;

        &.show {
          display: block;
          width: 100%;
          ${props => props.theme.useAnimation("opacity")}
        }
      }
    }

    .body {

      .but-hol {
        ${p => p.theme.flexing("center", "stretch", "column")}
        
        button {
          display: block;
          margin: 1pc auto;
          margin-bottom: .5pc;
          border: 0 none;
          padding: .2pc 2pc;
          border-radius: 0.5pc;
          background-color: ${props => props.theme.bg};
          box-shadow: -4px -4px 6px ${props => props.theme.rgbaFullSame(.5)}, 4px 4px 6px ${props => props.theme.rgbaFullOpp(.3)};

          &:hover {
            box-shadow: inset -4px -4px 8px ${props => props.theme.rgbaFullSame(.5)}, inset 4px 4px 8px ${props => props.theme.rgbaFullOpp(.1)};
          }

          &:disabled {
            opacity: 0.3;
          }
        }
      }
    }

  }
`

export default StageOne













































