import React from 'react';

import Loader from './controllers/Loaders/Loader';

import Message from './controllers/Messages/Message';

import GlobalStyles from './components/general/GlobalStyles';

import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import store from './store/store';

import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';

import ElpisTheme from './theme/ElpisTheme';

import { ToastContainer } from 'react-toastify';

import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(

  document.getElementById('root') as HTMLElement

);

root.render(

  <React.StrictMode>

    <Provider store={store}>

      <ElpisTheme>

        <Router>

          <GlobalStyles />

          <App />

          <Message />

          <ToastContainer />

          <Loader />

        </Router>

      </ElpisTheme>

    </Provider>

  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
