import { useEffect, useState } from 'react';

import FetchAppData from './components/general/FetchAppData';

import { Route, Routes, useLocation } from 'react-router-dom';

import ConfigureQuery from './components/general/ConfigureQuery';

import { processCookies } from './controllers/GeneralCtrl';

import NavBar from './components/general/NavBar';

import BackgroundImage from './components/general/BackgroundImage';

import IndexPage from './pages/IndexPage';

import PageNotFound from './pages/PageNotFound';

import socket from './socket/socket';

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

      <NavBar />

      <Routes location={location} key={location.pathname}>

        <Route path='/' element={<IndexPage />} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>

      <BackgroundImage />

    </div>

  )

}

export default App;
