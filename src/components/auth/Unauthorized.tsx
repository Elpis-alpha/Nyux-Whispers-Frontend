import { FaBan } from "react-icons/fa"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Unauthorized = () => {

  return (

    <UnauthorizedStyle>

      <div className="inner">

        <div className="icon-hol">

          <FaBan size="10pc" />

        </div>

        <div className="txt-hol">

          <h1>Unauthorized</h1>

          <p>You are not logged in</p>

          <div className="options">

            <Link to="/signup">Signup</Link>

            <Link to="/login">Login</Link>

          </div>

        </div>

      </div>

    </UnauthorizedStyle>

  )

}

const UnauthorizedStyle = styled.div`

  ${props => props.theme.opacityAnimation()}

  padding: 1pc;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  animation: opacity-in .5s 1;

  .inner {
    width: 100%;
    ${props => props.theme.flexing()}

    .txt-hol {
      padding-left: 1.5pc;

      .options {
        display: flex;
        flex-wrap: wrap;

        a {
          display: inline-block;
          padding: 0 1pc;
          margin-right: 1pc;
          margin-bottom: 1pc;
          text-align: center;
          line-height: 2.3pc;
          background-color: ${props => props.theme.bg};
          text-decoration: none;
          border-radius: 0.5pc;

          ${props => props.theme.newMorph(5, 5, 10)};

          ${props => props.theme.transitions({ backgroundColor: '.5', boxShadow: '.5', transform: '.5' })};

          ${props => props.theme.scaleHover(1.08)};

        }
      }
    }

    @media screen and (orientation: portrait) {
      flex-direction: column;
      text-align: center;

      .txt-hol {
        padding-left: 0;
      }
      
      p {padding: .5pc 0}

      a {
        display: block;
        width: 100%;
      }
    }
  }
`

export default Unauthorized
