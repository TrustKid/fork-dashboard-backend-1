import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, useNavigate, useLocation } from "react-router-dom";
import {menuList,social_inks, adminMenu} from "../initialState";
import {connect, useDispatch, useSelector} from 'react-redux';
import {SET_THEME, SET_MENU} from "../actionTypes";
import {Bright_Theme, Dark_Theme} from "../Constants";
import MenuArrow from './Icons/MenuArrow';
import PiggyModal from './PiggyModal'

// import "@trendmicro/react-sidenav/dist/react-sidenav.css";
// import { connect, useSelector, useDispatch } from 'react-redux'
// import { Link, } from "react-router-dom";
// import { menu_data } from "../service/constants";
// import ProgressBar from "@ramonak/react-progress-bar";
// import { SELECT_MENU, PORTFOLIO_DATA, SET_LOADING } from "../actionTypes";
// const axios = require('axios');

const Menu = (props) => {
    const location = useLocation()
    const setTheme = useSelector(state => state.setTheme)
    const setMenu = useSelector(state => state.setMenu)
    const getNetwork = useSelector(state => state.getNetwork)
    const dispatch = useDispatch()
    const [getMenulist, setMenulist] =useState(menuList)
    // useEffect(() => {
    //     let a = location.pathname.split('/')[1]
    //     if(a==='admin')setMenulist(adminMenu)
    //     else setMenulist(menuList)
    // },[location]);
console.log(getNetwork)
    const setFullMenu = () =>{
        dispatch({type:SET_MENU, payload:'partmenu'})
    }
    return (
    <div style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground,
            color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color,
            borderRight:'1px solid',
            borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border,
            width:setMenu=='fullmenu'?'210px':'50px'
            }}>
        <PiggyModal/>
        <div className="sidebar d-flex" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground,
                                            width:setMenu=='fullmenu'?'210px':'50px'}}>
            <div className="menu-icons" style={{width:setMenu=='fullmenu'?'50px':0, zIndex:1035}}>
                <div className=" defi-logo" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground,
                                                    display:setMenu=='fullmenu'?'block':'none'}}>
                    <Link  to='/' >
                        <div className="logo-div">
                            <img className="logo-image" src="../images/icons/bitcoin.png" />
                            {/* <h4 className="defi-title" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>My website</h4> */}
                        </div>
                    </Link>
                </div>
                <nav className="navbar side-bar" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground,
                                                        display:setMenu=='fullmenu'?'block':'none'}}>

                    <ul className="navbar-nav navbar-body" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                    <div className="row-menu-img"></div>
                        {props.menu.map((item,index)=>{
                        return <div key={index}> {index==3&&<div className="row-menu-img"></div>}
                                 {!item.submenu?<Link  className="nav-link navbar-item" to={item.link} >
                                    <div className="" title={item.label} data-toggle="collapse" data-target={'#'+item.label} style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                                    {setTheme=='brightness'?item.brightImage:item.darkImage}
                                        {/* <li className="nav-item" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>{item.label}</li> */}
                                    </div>
                                </Link>:<div className="nav-link navbar-item"><div className="image-link" title={item.label} data-toggle="collapse" data-target={'#'+item.label} style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                                    {setTheme=='brightness'?item.brightImage:item.darkImage}
                                        {/* <li className="nav-item" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>{item.label}</li> */}
                                    </div>
                                    </div>}
                                {item.submenu?<div className="sub-img-menu panel-collapse collapse" id={item.label} style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                                {item.label=='Networks'?getNetwork.map((item1,index1)=>{
                                    return <Link to={'networks/'+item1.network} key={index1}> <img  title={item1.network.toUpperCase()} className="menu-image menu-image-sub" src={'../images/icons/info_black.png'} style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}/></Link>})
                                :
                                item.submenu.map((item1,index1)=>{return<Link to={item1.link} key={index1}> 
                                    <img title={item1.label} className="menu-image menu-image-sub" src={item1.brightImage} style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}/>
                                </Link>})}
                                </div>:<></>}
                            </div>
                        })}
                    </ul>

                </nav>
            </div>
            <div className="menu-icons-sub" >
                <div className=" defi-logo" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground,
                                                    }}>
                    <Link  to='/' >
                        <div className="logo-div">
                            <img className="logo-image" src="../images/icons/bitcoin.png" />
                        </div>
                    </Link>
                </div>
                <nav className="navbar side-bar" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground,
                                                        }}>

                    <ul className="navbar-nav navbar-body" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                    <div className="row-menu-img"></div>
                        {props.menu.map((item,index)=>{
                        return<div key={index}>{index==3&&<div className="row-menu-img" ></div>}
                                 {!item.submenu?<Link  className="nav-link navbar-item" to={item.link} >
                                    <div className="" title={item.label} data-toggle="collapse" data-target={'#'+item.label} style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                                    {setTheme=='brightness'?item.brightImage:item.darkImage}
                                        
                                    </div>
                                </Link>:<div className="nav-link navbar-item"><div className="image-link" title={item.label} data-toggle="collapse" data-target={'#'+item.label} style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                                    {setTheme=='brightness'?item.brightImage:item.darkImage}
                                        
                                    </div>
                                    </div>}
                                {item.submenu?<div className="sub-img-menu panel-collapse collapse" id={item.label} style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                                {item.label=='Networks'?getNetwork.map((item1,index1)=>{
                                    return <Link to={'networks/'+item1.network} key={index1}> <img  title={item1.network.toUpperCase()} className="menu-image menu-image-sub" src={'../images/icons/info_black.png'} style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}/></Link>})
                                : item.submenu.map((item1,index1)=>{return<Link to={item1.link} key={index1}> <img  title={item1.label} className="menu-image menu-image-sub" src={item1.brightImage} style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}/>
                                </Link>})}
                                </div>:<></>}
                            </div>
                        })}
                    </ul>

                </nav>
            </div>
            <div className="menu-detail" style={{width:setMenu=='fullmenu'?'160px':0, 
                                                borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
                <div className=" defi-logo menu-detal-logo" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground,
                                                    display:setMenu=='fullmenu'?'flex':'none'}}>
                    <Link  to='/' >
                        <div className="logo-div">
                            <h4 className="defi-title" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>My website</h4>
                        </div>
                    </Link>
                    <div className="menu-button-mobile" onClick={()=>setFullMenu()}>
                        <div className="menu-button-line" style={{backgroundColor:setTheme=='brightness'?Dark_Theme.header_divBackground:'#c7c9cc'}}></div>
                        <div className="menu-button-line" style={{backgroundColor:setTheme=='brightness'?Dark_Theme.header_divBackground:'#c7c9cc'}}></div>
                        <div className="menu-button-line" style={{backgroundColor:setTheme=='brightness'?Dark_Theme.header_divBackground:'#c7c9cc'}}></div>
                    </div>
                </div>
                <nav className="navbar side-bar" style={{paddingLeft: '0px',backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground,
                                                            display:setMenu=='fullmenu'?'block':'none'}}>

                    <ul className="navbar-nav navbar-body" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                        <div className="row-menu" style={{color:setTheme=='brightness'?Bright_Theme.fontColor_3:Dark_Theme.fontColor_3,
                                                        borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>OVERVIEW</div>
                        {props.menu.map((item,index)=>{
                        return <div key={index} >{index==3&&<div className="row-menu" style={{color:setTheme=='brightness'?Bright_Theme.fontColor_3:Dark_Theme.fontColor_3,
                                            borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>EXPLORER TOOLS</div>}
                                {!item.submenu?<Link className="nav-link navbar-item" to={item.link} style={{paddingTop: '8px'}}>
                                    <div className="" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                                        <li className="nav-item d-flex" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}
                                            data-toggle="collapse" data-target={'#'+item.label}><p>{item.label}</p>
                                            {item.submenu?<MenuArrow color={'#000000'} rotation={'rotate(90deg)'}/>:<></>}
                                        </li>
                                        
                                    </div>
                                </Link>:
                                <div className="nav-link navbar-item" style={{paddingTop: '8px'}}>
                                    <div className="sub-menu-li" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                                        <li className="nav-item d-flex" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}
                                            data-toggle="collapse" data-target={'#'+item.label}><p>{item.label}</p>
                                            {item.submenu?<MenuArrow color={'#000000'} rotation={'rotate(90deg)'}/>:<></>}
                                        </li>
                                        
                                    </div>
                                </div>}
                                {item.submenu?<div className="sub-menu-div panel-collapse collapse" id={item.label} style={{backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                                    {item.label=='Networks'?getNetwork.map((item1,index1)=>{
                                    return <Link to={'networks/'+item1.network} key={index1}> <li  className="nav-item sub-nav-item" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>{item1.network}</li></Link>})
                                :
                                    item.submenu.map((item1,index1)=>{return<Link key={index1} to={item1.link}><li  className="nav-item sub-nav-item" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>{item1.label}</li></Link>})}
                                </div>:<></>}
                            </div>
                        })}
                    </ul>
                    {location.pathname.split('/')[1]!='admin'&&<div className="menu-footer" style={{display:setMenu=='fullmenu'?'block':'none',
                                backgroundColor:setTheme=='brightness'?Bright_Theme.header_divBackground:Dark_Theme.header_divBackground}}>
                        <p>Join Fork Screener community</p>   
                        <div className="d-flex menu-footer-div">
                        {social_inks.map((item,index)=>{return<a key={index} href={item.link} target="_blank">
                            {/* <div className="d-flex social-image-footer" style={{backgroundColor:setTheme=='brightness'?'black':'white'}}> */}
                                <img className="menu-footer-image" src={setTheme=='brightness'?item.black_image:item.white_image}/>
                            {/* </div>     */}
                        </a>})}  
                        </div>   
                        <div className="d-flex piggy-div">
                            <p className="piggy-text">Help us keep the Lights on!</p>
                            <img className="piggy-img"data-toggle="modal" data-target="#piggyModal" src={setTheme=='brightness'?'../images/icons/piggy_black.png':'../images/icons/piggy_white.png'}/>
                         </div>  
                    </div>
                    }
                </nav>
            </div>
        </div>
    </div>

    )
}
export default Menu;