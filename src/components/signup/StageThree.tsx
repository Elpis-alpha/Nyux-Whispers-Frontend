import { useEffect, useMemo, useRef, useState } from "react"
import { SpinnerCircular } from "spinners-react"
import styled, { useTheme } from "styled-components"
import { v4 } from "uuid"
import { waitFor } from "../../controllers/TimeCtrl"
import { getApiJson } from "../../controllers/APICtrl"
import InputComponent from "../general/InputComponent"
import { userExistenceUID, userFindNames } from "../../api"
import { sendMiniMessage } from "../../controllers/MessageCtrl"
import { removeFullLoader, sendFullLoader } from "../../controllers/LoadingCtrl"


const StageThree = ({ signupData, setSignupData, setSignupStage }: SignUpStages) => {

  const innerRef = useRef(null)

  const { rgbaOpp } = useTheme()

  const [pageStage, setPageStage] = useState(0)

  const [validText, setValidText] = useState("")

  const [uniqueID, setUniqueID] = useState("")

  const [nameList, setNameList] = useState<string[]>([])

  const elementStages = useMemo(() => [[0, 2300], [1, 1500], [2, 1600], [3], [4], [5, 1850]], [])

  const stageAction = elementStages[pageStage]

  const showOn = (index: number) => {

    return stageAction[0] === index ? " show " : ""

  }

  useEffect(() => {

    const doStuff = async () => {

      const stageAction = elementStages[pageStage]

      if (typeof stageAction[1] === "number") {

        await waitFor(stageAction[1])

        if (pageStage === elementStages.length - 1) setSignupStage("stage-4")

        else setPageStage(pageStage + 1)

      }

    }

    doStuff()

  }, [pageStage, elementStages, setSignupStage])

  // set name list
  useEffect(() => {

    const runAFunction = async () => {

      const { listOfNames, finalData, error } = await getApiJson(userFindNames(signupData.name))

      if (error) {

        setPageStage(prev => prev + 1)

        return sendMiniMessage({

          icon: { name: "times" },

          content: { text: "An Error Occured" }

        }, 2000)

      }

      // filter out the bad names
      const goodNames = (listOfNames as string[]).filter(name => !(finalData as { uniqueName: string, verify: boolean }[]).map(data => data.uniqueName).includes(name))

      if (goodNames.length === 0) {

        setPageStage(prev => prev + 1)

        return sendMiniMessage({

          icon: { name: "times" },

          content: { text: "We couldn't get you a name" }

        }, 2000)

      }

      setNameList(goodNames.sort((a, b) => a.length - b.length).slice(0, 3))

    }

    if (nameList.length === 0 && pageStage === 3) runAFunction()

  }, [nameList, signupData.name, pageStage])

  const submitForm = async (e: any) => {

    e.preventDefault()

    setValidText("")

    const val = uniqueID.trim()

    if (val.length < 1) {

      setValidText("Invalid UID")

      return sendMiniMessage({

        icon: { name: "times" },

        content: { text: "Invalid UID" }

      }, 2000)

    }

    sendFullLoader({ text: "Validating UID" })

    const existData = await getApiJson(userExistenceUID(val))

    if (existData.message === 'user does not exist') {

      sendMiniMessage({

        icon: { name: "ok" },

        content: { text: "Valid UID" }

      }, 2000)

      setSignupData({ ...signupData, uniqueName: val })

      setPageStage(pageStage + 1)

    } else {

      setValidText("UID is taken")

    }

    removeFullLoader()

  }

  const nameListClickHandler = (name: string) => {
    setUniqueID(name)
    setPageStage(prev => prev + 1)
  }

  const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {

    setUniqueID((e.target as HTMLInputElement).value.toLowerCase().trim())

  }

  return (

    <StageThreeStyle>

      <div className="inner" ref={innerRef}>

        <div className="stage-list">

          <p className={showOn(0)}>As part of the registration, you need to provide a unique name (UID) that no one here has</p>

          <p className={showOn(1)}>Sounds stressful right?</p>

          <p className={showOn(2)}>That's why we thought up three different ones for you</p>

          <div className={showOn(3)}>

            {nameList.length === 0 && <div>

              <SpinnerCircular size="8pc" color={rgbaOpp(1)} secondaryColor={rgbaOpp(.2)} />

              <p>Loading names...</p>

            </div>}

            {nameList.length > 0 && <>

              <p>You can still edit them if you want</p>

              <div className="bt-hol">

                {nameList.map(it => <button key={v4()} onClick={() => nameListClickHandler(it)}>{it}</button>)}

                <button onClick={() => nameListClickHandler("")}>None</button>

              </div>

            </>}

          </div>

          <form onSubmit={submitForm} className={showOn(4)}>

            <div className="inp-cont">

              <InputComponent label="Enter your Unique ID (UID)" valid={validText}

                input={<input required id="ny-ID-inp" name="ny-ID-inp"

                  onInput={inputHandler} value={uniqueID}

                  type="text" autoComplete="ny-ID-inp" />} />

            </div>

            <button>Validate</button>

          </form>

          <p className={showOn(5)}>Now your identity is established</p>

        </div>

      </div>

    </StageThreeStyle>

  )

}

const StageThreeStyle = styled.div`
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

    .stage-list {
      display: block;

      p {

        &.heavy {
          font-size: 2pc;
          line-height: 3pc;
        }

        font-weight: bold;
        font-size: 1.3pc;
        line-height: 2.5pc;
      }

      > * {
        display: none;

        &.show {
          display: block;
          width: 100%;
          ${props => props.theme.useAnimation("opacity", "kjasdk")}
        }
      }

      .bt-hol {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 1pc;
        
        button {
          display: block;
          margin: .5pc 1pc;
          /* margin-bottom: .5pc; */
          border: 0 none;
          padding: 0pc 2pc;
          border-radius: 0.5pc;
          background-color: ${props => props.theme.bg};
          box-shadow: -2px -2px 4px ${props => props.theme.rgbaFullSame(.5)}, 2px 2px 4px ${props => props.theme.rgbaFullOpp(.3)};

          &:hover {
            box-shadow: inset -2px -2px 8px ${props => props.theme.rgbaFullSame(.5)}, inset 2px 2px 8px ${props => props.theme.rgbaFullOpp(.1)};
          }

          &:disabled {
            opacity: 0.3;
          }
        }
      }

      form {

        &.show {
          ${p => p.theme.flexing("center", "stretch")}

          @media screen and (max-width: 500px) {
            flex-direction: column;
  
            .inp-cont {
              width: 100%;
            }
            
            button {
              width: 100%;
              margin: 0;
            }
          }
        }

        .inp-cont {
          flex: 1;
        }
        
        button {
          display: block;
          margin: 0 auto;
          margin-left: 1pc;
          /* margin-bottom: .5pc; */
          border: 0 none;
          padding: 0pc 2pc;
          border-radius: 0.5pc;
          background-color: ${props => props.theme.bg};
          box-shadow: -2px -2px 4px ${props => props.theme.rgbaFullSame(.5)}, 2px 2px 4px ${props => props.theme.rgbaFullOpp(.3)};

          &:hover {
            box-shadow: inset -2px -2px 8px ${props => props.theme.rgbaFullSame(.5)}, inset 2px 2px 8px ${props => props.theme.rgbaFullOpp(.1)};
          }

          &:disabled {
            opacity: 0.3;
          }
        }
      }
    }
  }
`

export default StageThree
