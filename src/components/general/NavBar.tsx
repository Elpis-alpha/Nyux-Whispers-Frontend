import styled from "styled-components"

import { Link, useNavigate } from "react-router-dom"

import { siteName, tokenCookieName } from "../../__env"

import { useDispatch, useSelector } from "react-redux"

import { Squeeze as Hamburger } from "hamburger-react"

import { useState } from "react"

import { stateClass } from "../../controllers/UICtrl"

import Cookies from "universal-cookie"

import { sendMiniMessage, sendXMessage } from "../../controllers/MessageCtrl"

import { logoutUser } from "../../api"

import { postApiJson } from "../../controllers/APICtrl"

import { removeUserData } from "../../store/slice/userSlice"

import { removeConversationData } from "../../store/slice/conversationSlice"


const NavBar = () => {

  const navigate = useNavigate()

  const cookies = new Cookies()

  const dispatch = useDispatch()

  const { available } = useSelector((store: any) => store.user)

  const [navStatus, setNavStatus] = useState("closed")

  const closeNav = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    const target = (e.target as HTMLDivElement).classList

    if (target.contains("r-side") && target.contains("show")) setNavStatus("closed")

  }

  const logoutThisUser = async (e: any) => {

    e.preventDefault()

    setNavStatus("opened")

    const res = await sendXMessage({

      heading: { text: "Confirm Logout" },

      content: {

        text: "Do you want to log out your account from all devices or just from this one?"

      },

      buttons: [

        { text: 'All Devices', waitFor: 'se', style: { backgroundColor: '#092549' } },

        { text: 'Just This One', waitFor: 'je', style: { backgroundColor: '#3e3b10' } },

        { text: 'Go Back', waitFor: 're', style: { backgroundColor: '#607d8b' } },

      ],

    })

    if (res !== "se" && res !== "je") return false

    const logLoad = sendMiniMessage({

      icon: { name: "loading", style: {} },

      content: { text: "Logging Out!", style: {} },

      style: {}

    })

    const logoutData = await postApiJson(logoutUser(res === "se"))

    if (logoutData.error) {

      sendMiniMessage({

        id: logLoad,

        icon: { name: "times", style: {} },

        content: { text: "An Error Occured!", style: {} },

        style: {}

      }, 2000)

    } else {

      sendMiniMessage({

        id: logLoad,

        icon: { name: "ok" },

        content: { text: "Logged Out!" }

      }, 2000)

      cookies.remove(tokenCookieName, { path: '/' })

      dispatch(removeUserData())

      dispatch(removeConversationData())

      navigate("/login")

    }

  }

  return (

    <NavBarStyle style={{ zIndex: 80 }}>

      <nav>

        <div className="in-nav">

          <div className="header">

            <h1><Link to="/">{siteName}</Link></h1>

          </div>

          <div className={"r-side " + stateClass(navStatus === "opened", "show")} onClick={closeNav}>

            {available ?

              <ul className="children">

                <li className="only-small"><Link to="/" onClick={() => setNavStatus("closed")}>Home</Link></li>

                <li><Link to="/signup" onClick={logoutThisUser}>Logout</Link></li>

              </ul>

              :

              <ul className="children">

                <li className="only-small"><Link to="/" onClick={() => setNavStatus("closed")}>Home</Link></li>

                <li><Link to="/signup" onClick={() => setNavStatus("closed")}>Signup</Link></li>

                <li><Link to="/login" onClick={() => setNavStatus("closed")}>Login</Link></li>

              </ul>

            }

          </div>

          <div className="nav-ham">

            <Hamburger

              toggled={navStatus === "opened"}

              toggle={val => setNavStatus(val ? "opened" : "closed")}

              size={35} distance="sm" rounded

              color={navStatus === "opened" ? "white" : "#6a3e26"} />

          </div>

        </div>

      </nav>

    </NavBarStyle>

  )

}

const NavBarStyle = styled.div`

  width: 100%;
  /* padding-bottom: 2rem; */

  nav {
    z-index: 15;
    background: linear-gradient(rgba(166, 111, 81, .3), transparent);

    .in-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 a {
        padding: 2rem 1.5rem;
        display: block;
        color: inherit;
        text-decoration: none;
      }

      ul.children {
        display: flex;
        list-style-type: none;
        padding-right: 1.5rem;

        li a {
          padding: .75rem 1.5rem;
          display: block;
          color: inherit;
          text-decoration: none;
        }
      }

      .nav-ham {
        padding-right: 1rem;
        display: none;
      }

      .nav-ham-in {
        display: none;
      }

      .only-small {
        display: none;
      }

      @keyframes scale-int {
        from{ transform: scale(0) }
        to{ transform: scale(1) }
      }

      @keyframes scale-int-r {
        from{ transform: scale(1) }
        to{ transform: scale(0) }
      }

      @media screen and (max-width: 800px) {

        @media screen and (max-width: 500px) {
          h1 { font-size: 1.6pc;}
        }
        
        @media screen and (max-width: 350px) {
          h1 { font-size: 1.5pc }
        }
        
        .r-side {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          background-color: rgba(0, 0, 0, 0);
          
          position: fixed;
          left: -105%;
          width: 100%;
          top: 0; bottom: 0;

          transition: left .5s, background-color .2s;
          
          &.show {
            left: 0;
            background-color: rgba(0, 0, 0, .3);
            transition: left .5s, background-color 1.7s;
          }
          
          ul.children {
            width: 70%;
            height: 100%;
            background-color: #6a3e26;
            /* padding: 3rem 0; */
            flex-direction: column;
            overflow: hidden;
            padding-right: 0;

            li a {
              width: 100%;
              padding: 2rem 0;

              /* border: 2px solid white; */
              color: white;
              text-align: center;
              /* transition: background-color .5s; */

              &:hover {
                background-color: rgba(0, 0, 0, .3);
              }
            }
          }

          &.close {
            transform: scale(0);
            animation: scale-int-r .5s 1;
          }
        }

        .nav-ham {
          display: flex;
        }
        
        .nav-ham-in {
          display: flex;
          color: red;
          position: fixed;
          top: 2rem;
          right: 1rem;
          animation: opacity-in 1s 1;
        }

        .only-small {
          display: initial;
        }
      }
    }
  }
`

export default NavBar