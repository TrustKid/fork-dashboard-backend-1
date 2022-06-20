// import logo from './logo.svg';
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router,Routes, Route , useLocation, useNavigate} from "react-router-dom";
import Menu from "../../Components/Menu";
import Header from "../../Components/Header";
import Dashboard from "../Dashboard.js";
import Projects from "./Projects.js";
import WhiteList from "./WhiteList.js";
import Users from "./User.js";
import Category from "./Category.js";
import Footer from "../../Components/Footer.js";
import { adminMenu} from "../../initialState";
import {connect, useDispatch, useSelector} from 'react-redux';
import {SET_LOADING,
        SET_PROJECT_DATA,
        SET_LOGIN,
        SET_PROJECT_DATA_DEFAULT,
        SET_USER_DATA,
        SET_FORK_DATA,
        SET_NETWORK_DATA,
        SET_WHITELIST_DATA
      } from "../../actionTypes";
import {Bright_Theme, Dark_Theme, Backendurl, ClientId} from "../../Constants";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, ADAPTER_EVENTS } from "@web3auth/base";
import axios from 'axios';
import '../../App.css';


function Admin() {
  const location = useLocation() 
  const navigate = useNavigate()
  const setTheme = useSelector(state => state.setTheme)
  const setLoginUser = useSelector(state => state.setLoginUser)
  const dispatch = useDispatch();
  const [user, setUser] = useState(localStorage.getItem('login-user'));
  const [getLoading, setLoading] = useState(false)
  const web3auth = new Web3Auth({
    chainConfig: { chainNamespace: CHAIN_NAMESPACES.EIP155 },
    clientId: ClientId // get your clientId from https://developer.web3auth.io
});
  useEffect(() => {
    setUser(localStorage.getItem('login-user'))
    console.log(location)
    if(!user)navigate('/login',{replace:false})
    dispatch({type:SET_LOADING, payload:true})
    axios.get(Backendurl).then(resp => {      
      dispatch({type:SET_PROJECT_DATA, payload:resp.data})
      dispatch({type:SET_PROJECT_DATA_DEFAULT, payload:resp.data})
      dispatch({type:SET_LOADING, payload:false})
      axios.get(Backendurl+'getUser').then(resp1 => {
        dispatch({type:SET_USER_DATA, payload:resp1.data})
        axios.get(Backendurl+'getCategory').then(resp2 => {
          dispatch({type:SET_FORK_DATA, payload:resp2.data.fork})
          dispatch({type:SET_NETWORK_DATA, payload:resp2.data.network})
          axios.get(Backendurl+'getwhitelist').then(resp3 => {
            dispatch({type:SET_WHITELIST_DATA, payload:resp3.data})
            
          })
        })
          
      })

    });
},[]);

  const initModal = async () => {
    await web3auth.initModal();
    const provider = await web3auth.connect();
  }
  web3auth.on(ADAPTER_EVENTS.CONNECTED, (adapterName)=>{
    dispatch({type:SET_LOGIN, payload:adapterName})
    console.log("connected to wallet", adapterName, web3auth.provider)
    })
    web3auth.on(ADAPTER_EVENTS.CONNECTING, ()=>{
        console.log("connecting")
    })
    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, ()=>{
        console.log("disconnected")
    })
    web3auth.on(ADAPTER_EVENTS.ERRORED, (error)=>{
        console.log("errored", error)
    })
    const onFullMenu = () => {
    }
  return (
      <div className="App">
            <div className='body-main'>
                <Menu menu = {adminMenu}/>
                <div className='main-body' style={{backgroundColor:setTheme=='brightness'?'#f4f5f5':Dark_Theme.divBackground}}>
                    <Header />
                    <Routes>
                        {user!=undefined &&<>
                          <Route  path='/' element={<Projects/>}/>
                          <Route  path={'users'} element={<Users/>}/>
                          <Route  path={'category'} element={<Category/>}/>
                          <Route  path={'whitelist'} element={<WhiteList/>}/>
                        </>}
                    </Routes>
                </div>
            </div>
        <Footer/>
    </div>
  );
}

// function App(){
//   return(
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route  path='/admin' element={<Admin/>}/>
//           <Route  path='/' render={<Client/>}/>
//         </Routes>
//       </Router>
      
//     </div>
//   )
// }


export default Admin;
