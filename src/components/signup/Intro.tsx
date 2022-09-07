import { Link } from "react-router-dom"

import styled from "styled-components"
import { sendFullLoader } from "../../controllers/LoadingCtrl"
import { sendMiniMessage, sendNormalMessage, sendSmallMessage, sendXMessage } from "../../controllers/MessageCtrl"


import { siteName } from "../../__env"


const Intro = ({ setSignupStage }: SignUpIntro) => {

  return (

    <IntroStyle>

      <div className="inner">

        <div className="heading">

          <h1>Welcome to {siteName}</h1>

        </div>

        <div className="body">

          <p>Choose your experience</p>

          <div className="but-hol">

            <button onClick={() => setSignupStage('stage-1')}>An Immersive Experience</button>

            <button onClick={() => setSignupStage('final')}>An Average Experience</button>

          </div>

        </div>

        <div className="foot">

          <Link to="/login">New here?</Link>

        </div>

      </div>

    </IntroStyle>

  )

}

const IntroStyle = styled.div`
  width: 100%;
  flex: 1;

  ${p => p.theme.flexing()}

  ${props => props.theme.useAnimation("opacity", "kjsdkdfsj")}

  .inner {
    width: 90%;
    text-align: center;
    padding: 5pc 0;

    .heading h1 {
      font-size: 2.5pc;
      line-height: 4pc;
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

    .foot {
      padding-top: .5pc;
      line-height: 2pc;
    }
  }
`

export default Intro
