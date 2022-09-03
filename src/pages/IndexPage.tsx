import styled from "styled-components"

import { siteName } from "../__env"

import { Link } from "react-router-dom"

import NavBar from "../components/general/NavBar"


const IndexPage = () => {

  return (

    <IndexPageStyle>

      <NavBar />

      <h1>Welcome to {siteName}</h1>

      <Link to="/signup">Sign up</Link>

      <Link to="/login">Log in</Link>

      <Link to="/me">Enter</Link>

    </IndexPageStyle>

  )

}

const IndexPageStyle = styled.div`
  width: 100%;
  padding: 1pc;

  a {
    display: inline-block;
    padding: 1pc;
  }
`

export default IndexPage
