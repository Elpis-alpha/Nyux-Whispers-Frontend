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

import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const location = useLocation()

  const [startedSocket, setStartedSocket] = useState(false)

  useEffect(() => { processCookies() }, []) // Queries user for permisission to use cookies

  useEffect(() => { if (!startedSocket) { setStartedSocket(true); socket() } }, [startedSocket]) // configure sockets

  return (

    <div className="App">

      <FetchAppData />

      <ConfigureQuery />

      <Routes location={location} key={location.pathname}>

        <Route path='/' element={<IndexPage />} />

        <Route path='/me' element={<Protect page={HomePage}/>} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>

      <BackgroundImage />

    </div>

  )

}

export default App;
