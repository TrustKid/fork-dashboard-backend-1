import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers';
import './index.css';
import App from './App';
import Admin from "./Screens/Admin/Admin.js";
import Login from "./Screens/Auth/Login.js";
import Signup from "./Screens/Auth/Signup.js";
import reportWebVitals from './reportWebVitals';
import { DAppProvider } from "@usedapp/core";
import { MoralisProvider, useTokenPrice } from "react-moralis";
const APP_ID = "FWm7tpnQR8GZWawIAJcsPwDafoEwGr9XDhzFva5V";
const SERVER_URL = "https://efmjd0tjt2w2.usemoralis.com:2053/server";
const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(
<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
  
  <React.StrictMode>
    
    <DAppProvider config={{}}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route  path='/login' element={<Login/>}/>
            <Route  path='/signup' element={<Signup/>}/>
            <Route  path='/dappdefi/*' element={<Admin/>}/>
            
            <Route  path='/*' element={<App/>}/>
          </Routes>
        </Router>
      </Provider>
    </DAppProvider>
    
  </React.StrictMode>
  </MoralisProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
