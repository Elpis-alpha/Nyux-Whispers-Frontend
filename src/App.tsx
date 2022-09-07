import { useEffect, useState } from 'react';

import FetchAppData from './components/auth/FetchAppData';

import { Route, Routes, useLocation } from 'react-router-dom';

import ConfigureQuery from './components/general/ConfigureQuery';

import { processCookies } from './controllers/GeneralCtrl';

import BackgroundImage from './components/general/BackgroundImage';

import IndexPage from './pages/IndexPage';

import PageNotFound from './pages/PageNotFound';

import socket from './socket/socket';

import HomePage from './pages/HomePage';

import Protect from './components/auth/Protect';

import styled from 'styled-components';

import ThemeChanger from './components/general/ThemeChanger';

import SignupPage from './pages/SignupPage';

import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const location = useLocation()

  const [startedSocket, setStartedSocket] = useState(false)

  useEffect(() => { processCookies() }, []) // Queries user for permisission to use cookies

  useEffect(() => { if (!startedSocket) { setStartedSocket(true); socket() } }, [startedSocket]) // configure sockets

  return (

    <AppStyle className="App">

      <FetchAppData />

      <ConfigureQuery />

      <ThemeChanger />

      <Routes location={location} key={location.pathname}>

        <Route path='/' element={<IndexPage />} />

        <Route path='/signup' element={<SignupPage />} />

        <Route path='/me' element={<Protect page={HomePage} />} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>

      <BackgroundImage />

    </AppStyle>

  )

}

const AppStyle = styled.div`

  flex: 1;
  z-index: 10;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.col};
  transition: background-color .5s, color .5s;

  >div {
    z-index: 10;
  }

  button, a, input {
    transition: background-color .5s, color .5s;
    color: ${props => props.theme.col};
  }

  button, input {
    border: 1px solid ${props => props.theme.col};
    transition: background-color .5s, color .5s, border .5s;
  }

  svg {
    transition: fill .5s, color .5s, border .5s;
  }
`

export default App;
