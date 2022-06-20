import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import ForkCard from "../Components/ForkCard"
import ProjectCard from "../Components/ProjectCard"
import TopAds from "../Components/TopAds"
import {connect, useDispatch, useSelector} from 'react-redux';
import {Bright_Theme, Dark_Theme} from "../Constants";
import SocialList from "../Components/SocialList";
import {category_buttons} from "../initialState";
import {SET_THEME,PROJECT_CATEGORY,SET_CATEGORY_BTN} from "../actionTypes";
// import "@trendmicro/react-sidenav/dist/react-sidenav.css";
// import { connect, useSelector, useDispatch } from 'react-redux'
// import { Link, } from "react-router-dom";
// import { menu_data } from "../service/constants";
// import ProgressBar from "@ramonak/react-progress-bar";
// import { SELECT_MENU, PORTFOLIO_DATA, SET_LOADING } from "../actionTypes";
// const axios = require('axios');
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const SvgStar = (props) => {
    const [getStarColor_1, setStarColor_1]=useState('#dcdce6')
    const [getStarColor_2, setStarColor_2]=useState('#dcdce6')
    const [getStarColor_3, setStarColor_3]=useState('#dcdce6')
    const [getStarColor_4, setStarColor_4]=useState('#dcdce6')
    const [getStarColor_5, setStarColor_5]=useState('#dcdce6')
    useEffect(() => {
        switch (props.score){
            case 0: setStarColor_1('#dcdce6');
                    setStarColor_2('#dcdce6');
                    setStarColor_3('#dcdce6');
                    setStarColor_4('#dcdce6');
                    setStarColor_5('#dcdce6');break;
            case 1: setStarColor_1('#ff3722');
                    setStarColor_2('#dcdce6');
                    setStarColor_3('#dcdce6');
                    setStarColor_4('#dcdce6');
                    setStarColor_5('#dcdce6');break;
            case 2: setStarColor_1('#ff8622');
                    setStarColor_2('#ff8622');
                    setStarColor_3('#dcdce6');
                    setStarColor_4('#dcdce6');
                    setStarColor_5('#dcdce6');break;
            case 3: setStarColor_1('#95b600');
                    setStarColor_2('#95b600');
                    setStarColor_3('#95b600');
                    setStarColor_4('#dcdce6');
                    setStarColor_5('#dcdce6');break;
            case 4: setStarColor_1('#17b600');
                    setStarColor_2('#17b600');
                    setStarColor_3('#17b600');
                    setStarColor_4('#17b600');
                    setStarColor_5('#dcdce6');break;
            case 5: setStarColor_1('#00b67a');
                    setStarColor_2('#00b67a');
                    setStarColor_3('#00b67a');
                    setStarColor_4('#00b67a');
                    setStarColor_5('#00b67a');break;
        }
      });
    return(
    <svg role="img" aria-labelledby="starRating" viewBox="0 0 251 46" xmlns="http://www.w3.org/2000/svg" style={{ width: props.width+'px', left: 0, top: 0,}}>

            <g className="tp-star">
                <path className="tp-star__canvas" fill={getStarColor_1} d="M0 46.330002h46.375586V0H0z"></path>
                <path className="tp-star__shape" d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z" fill="#FFF"></path>
            </g>
            <g className="tp-star">
                <path className="tp-star__canvas" fill={getStarColor_2} d="M51.24816 46.330002h46.375587V0H51.248161z M51.24816 46.330002h23.187793V0H51.248161z"></path>
                {/* <path className="tp-star__canvas--half" fill="#00b67a" d=""></path> */}
                <path className="tp-star__shape" d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z" fill="#FFF"></path>
            </g>
            <g className="tp-star">
                <path className="tp-star__canvas" fill={getStarColor_3} d="M102.532209 46.330002h46.375586V0h-46.375586z M102.532209 46.330002h23.187793V0h-23.187793z"></path>
                {/* <path className="tp-star__canvas--half" fill="#00b67a" d=""></path> */}
                <path className="tp-star__shape" d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z" fill="#FFF"></path>
            </g>
            <g className="tp-star">
                <path className="tp-star__canvas" fill={getStarColor_4} d="M153.815458 46.330002h46.375586V0h-46.375586z M153.815458 46.330002h23.187793V0h-23.187793z"></path>
                {/* <path className="tp-star__canvas--half" fill="#dcdce6" d=""></path> */}
                <path className="tp-star__shape" d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"></path>
            </g>
            <g className="tp-star">
                <path className="tp-star__canvas" fill={getStarColor_5} d="M205.064416 46.330002h46.375587V0h-46.375587z M205.064416 46.330002h23.187793V0h-23.187793z"></path>
                {/* <path className="tp-star__canvas--half" fill="#dcdce6" d=""></path> */}
                <path className="tp-star__shape" d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"></path>
            </g>
        </svg>
    )
}

const Ad_peopleList = (props) => {
    return(
        <div className="people-list-item-div d-flex">
            <img className="people-list-avatar" src={props.image}/>
            <div className="people-list-content-div">
                <h4 className="people-list-content-title">{props.title}</h4>
                <div className="d-flex">
                    <SvgStar  score={props.score} width={80}/>
                    <p className="people-list-content-count margin-l-auto">{props.count}</p>
                </div>
                <div className="d-flex" style={{display:props.asked?'block':'none'}}>
                    <img className="people-list-asking-image" src="../images/icons/checked.png"/>
                    <p className="people-list-asking-text" >Asking for reviews</p>
                </div>
            </div>
        </div>
    )
}

const WhiteList = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const getProjectData = useSelector(state => state.setProjectData)
    const [getUpcoming, setUpcoming] = useState(getProjectData)
    // const [getCategory, setCategory] = useState(category_buttons)
    const getCategoryBtn = useSelector(state=> state.setCategory_btn)
    const getSelNum = useSelector(state=> state.setCategory_list)
    const getWhitelist = useSelector(state => state.getWhitelist)
    const getCategory = useSelector(state => state.getCategory)
    const navigate = useNavigate ();

 useEffect(() => {
     let a=getCategory
    a.forEach(item=>{
        return item.state=false
    })
    dispatch({type:SET_CATEGORY_BTN,payload:a})
        
    },[location,getProjectData,getCategoryBtn]);

    const setTheme = useSelector(state => state.setTheme)

    const onFearDateBtn = (num) => {
        dispatch({type:PROJECT_CATEGORY,payload:num})
        let a = getCategory
        a.forEach(item => {
            item.state=false
        });
        a[num].state = true 
        dispatch({type:SET_CATEGORY_BTN,payload:a})
        navigate("/explore",{replace:false});
    }
    return (
        <div className="main-board" 
                style={{backgroundColor:setTheme=='brightness'?Bright_Theme.divBackground:Dark_Theme.divBackground}}>
            <div className="board-title">
                <h5 className="title" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                    {location.pathname.split('/')[1]!=""?location.pathname.split('/')[1].charAt(0).toUpperCase()+location.pathname.split('/')[1].slice(1):'Dashboard'}
                </h5>
                <div className="category-div">
                    {getCategory.map((item,index)=>{
                        return<button key={index} className="category-button" onClick={()=>onFearDateBtn(index)}
                                    style={{backgroundColor:item.state?setTheme=='brightness'?'#c3c3c3':'#555555':setTheme=='brightness'?'#ffffff':'#111827',
                                            color:setTheme=='brightness'?'#333333':'#ffffff',
                                            borderColor:setTheme=='brightness'?'#f1f1f1':'#333333'}}>{item.fork}
                            </button>
                    })}
                    {/* {getCategory.map((item,index)=>{return<button key={index} className="category-button" onClick={()=>onFearDateBtn(index)}
                    style={{backgroundColor:item.state?setTheme=='brightness'?'#c3c3c3':'#555555':setTheme=='brightness'?'#ffffff':'#111827',
                    color:setTheme=='brightness'?'#333333':'#ffffff',
                    borderColor:setTheme=='brightness'?'#f1f1f1':'#333333'}}>{item.title}</button>})} */}
                </div>
            </div>

            <div className="advertisement"style={{backgroundColor:setTheme=='brightness'?'white':Dark_Theme.cardBackground,
                                            borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
                    <TopAds title={"defi"} description={"project"} />
            </div>
            
            <div className="board-main-project-detail" 
                    style={{backgroundColor:setTheme=='brightness'?'#f4f5f5':Dark_Theme.divBackground,
                            color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>  
                <div className="project-deatil"style={{backgroundColor:setTheme=='brightness'?'white':Dark_Theme.divBackground,
                            color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                    <div className="review-body d-flex">
                        <div className="review-write-body">
                            <div className="">
                                <h3 className="white-list-title">WHTIELIST</h3>
                                <p className="white-list-description">Current list of ICOs where Whitelist is active. Registation is required for participation.</p>
                            </div>

                            <table className="table table-striped" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Projects</th>
                                        <th>Network</th>
                                        <th>whitelist</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getWhitelist.map((item, index)=>{
                                        // if(!getSelNum && getSelNum==0||item.project==getCategory[getSelNum].title)
                                        return <tr key={index} style={{borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}> 
                                            <td>{index+1}</td>
                                            <td className="d-flex">
                                                <img className="list-image" src={item.image}/>
                                                <p>{item.project}</p>
                                                {/* {item.isNew&&<div className="new-label">NEW</div>} */}
                                            </td>
                                            <td>{item.network}</td>
                                            <td>{item.whitelist?'Open':'Close'}</td>
                                            <td className="last-td">{item.website&&<a href={item.website} target='_blank' className="d-flex"><p style={{color:'#326dec'}}>{item.website!=''?'JOIN NOW':''}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{display:item.website!=''?'block':'none'}}
                                                            height="20px" width="20px" viewBox="0 0 24 24" className="new-window">
                                                        <path  d="M12 11.9998L20 4M20 4H14.1817M20 4L19.9999 9.81802M9.81819 6.90946H5.77777C4.79594 6.90946 4 7.70537 4 8.68718V18.2223C4 19.2041 4.79594 20 5.77778 20H15.3131C16.295 20 17.0909 19.2041 17.0909 18.2223V14.182" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">

                                                        </path>
                                                    </svg>
                                                </a>}
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                        
                        <div className="" style={{width:'320px', padding:'10px'}}>
                            <div className="sticky-top" style={{width:'100%',height:'711px'}}>
                                    {/* <img className="ad-image padding-v-15" src="../images/icons/ad_play.png"/>
                                    <img className="ad-image padding-v-15" src="../images/icons/ad_about.png"/> */}
                                    <AutoplaySlider
                                        play={true}
                                        cancelOnInteraction={false}
                                        interval={2000}
                                        mobileTouch={true}
                                        bullets={false}
                                        organicArrows={false}
                                        className="ad-image padding-v-15"
                                    >
                                        <div data-src="../images/icons/ad_about.png"></div>
                                        <div data-src="../images/icons/ad_play.png"></div>
                                    </AutoplaySlider>

                                    <AutoplaySlider
                                        play={true}
                                        cancelOnInteraction={false}
                                        interval={1500}
                                        mobileTouch={true}
                                        bullets={false}
                                        organicArrows={false}
                                        className="ad-image padding-v-15"
                                    >
                                        <div data-src="../images/icons/enjoy_free_ad.png"></div>
                                        <div data-src="../images/icons/ad_play.png"></div>
                                    </AutoplaySlider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WhiteList;