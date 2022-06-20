import React, { useState, useEffect, useRef } from "react";
import {Link} from 'react-router-dom'
import {connect, useDispatch, useSelector} from 'react-redux';
import { useMoralis } from "react-moralis";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, ADAPTER_EVENTS } from "@web3auth/base";
import {SET_THEME, SET_MENU, SET_PROJECT_DATA, SET_LOGIN, SET_CATEGORY_BUTTON} from "../actionTypes";
import {Bright_Theme, Dark_Theme, Backendurl, ClientId} from "../Constants";


const loginSelModal = (props) => {
    
}

const Footer = () => {
    const dispatch = useDispatch()
    const { authenticate, isAuthenticated, logout,signup,  account, chainId } = useMoralis();
    const [walletAddress,setWalletAddress]=useState('')
    const [headerSignBtn,getHeaderSignBtn]=useState('Sign in')
    const [getForkModal,setForkModal]=useState(false)
    const [getLoading, setLoading] = useState(false)
    const [getSaveModal, setSaveModal] = useState(false)
    const [getSaveModalFlag, setSaveModalFlag] = useState(false)
    
    let getModal_f=false
    const [getSignBtn,setSignBtn]=useState(false)
    const setTheme = useSelector(state => state.setTheme)
    const setMenu = useSelector(state => state.setMenu)
    const setModal = useSelector(state => state.setLogin)
    const getCategoryBtn = useSelector(state=> state.setCategory_btn)

    const web3auth = new Web3Auth({
        chainConfig: { chainNamespace: CHAIN_NAMESPACES.EIP155 },
        clientId: ClientId
    });
    
    return (
        <div className="footer-bar" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground,
                                    borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
            <div className="footer-title-div">
                <h5 className="first-h5">About us</h5>
                <h5 className="mid-h5">Terms Conditions</h5>
                <h5 className="last-h5">Legal</h5>
            </div>
            <div className="footer-link-div">
                <a href="mailto:info@forkscreener.com" target="blank" style={{marginRight: '5px'}}>info@forkscreener.com</a>
                <p className="mid-footerlink-text" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                    |</p>
                <h5 style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                 Ads & Marketing:</h5>
                <a href="mailto:Marketing@forkscreener.com" target="blank">Marketing@forkscreener.com</a>
            </div>
            <div className="copyright-div">
                <p style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                    &copy; ForkScreener.com - 2022 </p>
                <p className="mid-copyright-text" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                    |</p>    
                <p style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                    All Rights Reserved</p>
            </div>
            <div className="heart-div d-flex">
                <p style={{color:setTheme=='brightness'?'#999999':'#888888'}}>Made with </p>
                <img className="heart-img" src="../images/icons/heart.png"/>
                <p className="" style={{color:setTheme=='brightness'?'#999999':'#888888'}}>
                    by &nbsp;
                    <span className="bold-font" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>TrustKid&nbsp;</span>
                    team
                    <span className="bold-font" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>&nbsp;v1.1</span>
                </p>
            </div>
        </div>
    )
}
export default Footer;