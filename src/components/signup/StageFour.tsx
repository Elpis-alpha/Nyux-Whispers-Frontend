import { useEffect, useMemo, useRef, useState } from "react"
import { SpinnerCircular } from "spinners-react"
import styled, { useTheme } from "styled-components"
import { waitFor } from "../../controllers/TimeCtrl"
import { postApiJson } from "../../controllers/APICtrl"
import InputComponent from "../general/InputComponent"
import { createUser } from "../../api"
import { sendMiniMessage } from "../../controllers/MessageCtrl"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../../store/slice/userSlice"
import { tokenCookieName } from "../../__env"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"
import { setRefetchConversation } from "../../store/slice/conversationSlice"
import { requestFullScreen } from "../../controllers/SpecialCtrl"


const StageFour = ({ signupData, setSignupData, setSignupStage }: SignUpStages) => {

  const innerRef = useRef(null)

  const { rgbaOpp } = useTheme()

  const [pageStage, setPageStage] = useState(0)

  const [validText, setValidText] = useState("")

  const [signUpError, setSignUpError] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { available, tested } = useSelector((store: any) => store.conversation)

  const elementStages = useMemo(() => [[0, 2300], [1, 1500], [2], [3, 1500], [4], [5, 1500], [6], [7]], [])

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

  // save user
  useEffect(() => {

    let timeoutCancler: NodeJS.Timeout

    const runAFunction = async () => {

      const cookie = new Cookies()

      setSignUpError(false)

      const userCreationData = await postApiJson(createUser(), signupData)

      const { user, token, error } = userCreationData

      if (error) {

        console.log(error)

        setSignUpError(true)

        return sendMiniMessage({

          icon: { name: "times" },

          content: { text: "An Error Occured" }

        }, 2000)

      }

      dispatch(setUserData({ ...user, token }))

      dispatch(setRefetchConversation(true))

      cookie.set(tokenCookieName, token, { path: '/', expires: new Date(90 ** 7) })

    }

    if (pageStage === 6) runAFunction()

    if (pageStage === 7) timeoutCancler = setTimeout(() => { requestFullScreen(true); navigate('/me') }, 1800)

    return () => { clearTimeout(timeoutCancler) }

  }, [signupData, pageStage, dispatch, navigate])

  // wait for user conversations before progressing
  useEffect(() => {

    if (pageStage === 6 && (available && tested)) setPageStage(prev => prev + 1)

  }, [pageStage, available, tested])

  const submitForm1 = async (e: any) => {

    e.preventDefault()

    setValidText("")

    const form = e.target

    const val = form["ny-pass-inp"].value.trim()

    if (val.length < 5) {

      setValidText("Password is too short")

      return sendMiniMessage({

        icon: { name: "times" },

        content: { text: "Password is too short" }

      }, 2000)

    }

    setSignupData({ ...signupData, password: val })

    setPageStage(prev => prev + 1)

  }

  const submitForm2 = async (e: any) => {

    e.preventDefault()

    setValidText("")

    const form = e.target

    const val = form["ny-pass2-inp"].value.trim()

    if (val !== signupData.password) {

      setValidText("Passwords do not match")

      return sendMiniMessage({

        icon: { name: "times" },

        content: { text: "Passwords do not match" }

      }, 2000)

    }

    setPageStage(prev => prev + 1)

  }

  return (

    <StageFourStyle>

      <div className="inner" ref={innerRef}>

        <div className="stage-list">

          <p className={showOn(0)}>Finally, to wrap this up let's secure your account with a password</p>

          <p className={showOn(1)}>This is important so please think of a very secure password</p>

          <form onSubmit={submitForm1} className={showOn(2)}>

            <div className="inp-cont">

              <InputComponent label="Enter your Password" valid={validText}

                input={<input required id="ny-pass-inp" name="ny-pass-inp"

                  type="password" autoComplete="on" defaultValue={signupData.password} />} />

            </div>

            <button>Proceed</button>

          </form>

          <p className={showOn(3)}>Kindly confirm your password to prevent errors</p>

          <form onSubmit={submitForm2} className={showOn(4)}>

            <div className="inp-cont">

              <InputComponent label="Confirm your Password" valid={validText}

                input={<input required id="ny-pass2-inp" name="ny-pass2-inp"

                  type="password" autoComplete="on" />} />

            </div>

            <button type="button" onClick={() => setPageStage(prev => prev - 2)}>Go Back</button>

            <button>Proceed</button>

          </form>

          <p className={showOn(5)}>Perfect, you now have a complete and secure account</p>

          <div className={showOn(6)}>

            {!signUpError && <div>

              <SpinnerCircular size="8pc" color={rgbaOpp(1)} secondaryColor={rgbaOpp(.2)} />

              <p>Saving Account...</p>

            </div>}

            {signUpError && <>

              <p>An error occured, would you like to change any of these data</p>

              <div className="bt-hol">

                <button onClick={() => setSignupStage("stage-1")}>Change Name</button>

                <button onClick={() => setSignupStage("stage-2")}>Change Email</button>

                <button onClick={() => setSignupStage("stage-3")}>Change UID</button>

                <button onClick={() => setPageStage(0)}>Change Password</button>

                <button onClick={() => navigate("/")}>No, take me back to the home page</button>

              </div>

            </>}

          </div>

          <p className={showOn(7)}>Congratulations, you have successfully created your account</p>

        </div>

      </div>

    </StageFourStyle>

  )

}

const StageFourStyle = styled.div`
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
              
              &:nth-of-type(2) {
                margin-top: 1pc;
              }
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

export default StageFour
