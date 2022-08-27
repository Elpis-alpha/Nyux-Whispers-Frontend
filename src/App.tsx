import { useEffect } from 'react';

import FetchAppData from './components/general/FetchAppData';

import { Route, Routes, useLocation } from 'react-router-dom';

import ConfigureQuery from './components/general/ConfigureQuery';

import { processCookies } from './controllers/GeneralCtrl';

import NavBar from './components/general/NavBar';

import BackgroundImage from './components/general/BackgroundImage';

import IndexPage from './pages/IndexPage';

import PageNotFound from './pages/PageNotFound';

import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const location = useLocation()

  useEffect(() => { processCookies() }, []) // Queries user for permisission to use cookies


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
