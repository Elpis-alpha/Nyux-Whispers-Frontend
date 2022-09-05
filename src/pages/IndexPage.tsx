import styled from "styled-components"

import { siteName } from "../__env"

import { Link } from "react-router-dom"


const IndexPage = () => {

  return (

    <IndexPageStyle>

      <h1>Welcome to {siteName}</h1>

      <Link to="/signup">Sign up</Link>

      <Link to="/login">Log in</Link>

      <Link to="/me">Enter</Link>

    </IndexPageStyle>

  )

}

const IndexPageStyle = styled.div`
  width: 100%;
  padding: 2pc;

  h1 {
    text-align: center;
  }

  a {
    display: inline-block;
    padding: 1pc;
  }
`

export default IndexPage
