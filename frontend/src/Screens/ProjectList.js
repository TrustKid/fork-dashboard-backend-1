import React, { useState, useEffect } from "react"
import { Link,useLocation  } from "react-router-dom";
import ForkCard from "../Components/ForkCard"
import ProjectCard from "../Components/ProjectCard"
import TopAds from "../Components/TopAds"
import {connect, useDispatch, useSelector} from 'react-redux';
import {SET_THEME} from "../actionTypes";
import {Bright_Theme, Dark_Theme} from "../Constants";
import SocialList from "../Components/SocialList";
import CommunityCard from "../Components/CommunityCard";
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";

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

const LinearProgressBar = (props) => {
    const setTheme = useSelector(state => state.setTheme)
    return(
        <div className="review-linear-div d-flex">
            <div className="review-type review-progress-type d-flex">
                <img className="" src="../"/>
                <h5 className="progress-label">{props.label}</h5>
            </div>

            <div className="review-linear-progress" style={{backgroundColor:setTheme=='brightness'?'#dddddd':'#888888'}}>
                <div className="review-linear-progress-val" style={{width:props.percent+'%',backgroundColor:setTheme=='brightness'?'#888888':'#eeeeee'}}></div>
            </div>
            <div className="review-val review-progress-type"><h5 className="progress-label">{props.percent}%</h5></div>
        </div>
    )
}

const ReviewList = (props) => {
    const setTheme = useSelector(state => state.setTheme)
    const getDeltaDate = (time) => {
        var timeNow = new Date().getTime();
        return Math.floor((timeNow-time*1000)/86400000)
    }
    return(
        <div className="review-list-div " >
            <div className="review-list-body padding-h-25 margin-top-10" style={{borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
                <div className="d-flex review-list-user-top border-bottom-1" style={{borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
                    <div className="review-user-avatar-div">LD</div>

                    <div className="review-list-user-name-div">
                        <p className="review-list-user-name">{props.reviewName}</p>
                        <div className="d-flex">
                            <img className="review-edit-image" src="../images/icons/edit_black.png"/>
                            <p className="review-list-user-reviewNum">{props.reviewCount} review</p>
                        </div>
                    </div>
                </div>

                <div className="" >
                    <div className="d-flex revie-list-user-date-div">
                        <SvgStar  score={props.score} width={100}/>
                        <p className="review-list-user-date margin-l-auto">{getDeltaDate(props.date)} days ago</p>
                    </div>

                    <div className="review-title-div border-bottom-1" style={{borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
                        <p className="review-title-text">{props.reveiwTitle}</p>
                        <p className="review-title-content">{props.reviewContent}</p>
                    </div>

                    <div className="d-flex padding-v-5" >
                        <div className="d-flex">
                            <img className="review-list-user-vote padding-10" 
                            src={setTheme=='brightness'?"../images/icons/vote_black.png":"../images/icons/vote_white.png"}/>
                            <p className="useful-text">Useful</p>
                        </div>
                        <p className="review-report margin-l-auto">Report/flag</p>
                    </div>
                </div>
            </div>
        </div>
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
                    <p className="people-list-content-count margin-l-auto">{props.count.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                </div>
                <div className="d-flex" style={{display:props.asked?'block':'none'}}>
                    <img className="people-list-asking-image" src="../images/icons/checked.png"/>
                    <p className="people-list-asking-text" >Asking for reviews</p>
                </div>
            </div>
        </div>
    )
}

const WebsiteScore = (props) => {
    console.log(props)
    const setTheme = useSelector(state => state.setTheme)
    const props_progress = {
        percent: props.progress, 
        colorSlice: props.progress>=80?"green":props.progress>=50?"orange":"red",
        colorCircle: setTheme=='brightness'?"#c8c8c8":'#27272a',
        fontColor: props.progress>=80?"green":props.progress>=50?"orange":"red",
        fontSize: "1.7rem",
        size: 200,
        fontWeight: 700
    };

    return(
        <div className="web-score" 
            style={{backgroundColor:setTheme=='brightness'?'white':Dark_Theme.cardBackground,
                borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
            <h4 className="web-score-title"  style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>{props.websiteName}</h4>
            
            <div className="web-score-progress">
                <CircularProgressBar {...props_progress} />
            </div>

            <div className="d-flex project-title">
                <img className="card-image" src={props.avatar}/>
                <div className="card-title">
                    <h4 className="card-title-text card-title-text-1" 
                        style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>{props.title}</h4>
                    <h4 className="card-title-net text-left">{props.chain}</h4>
                </div>
            </div>
        </div>
    )
}

const ProjectList = () => {
    const location = useLocation();
    const getProjectData = useSelector(state => state.setProjectData)
    console.log(getProjectData)
    const [getProjectId, setProjectId] = useState(0)
    const [getTotalProgress, setTotalProgress] = useState(0)
    const projectState = 1

    useEffect(() => {
        setProjectId(location.pathname.split('/')[2]*1)
        let sum=0
       getProjectData.length>0&& getProjectData[location.pathname.split('/')[2]*1].functionData.forEach(item=>{
            sum+=item
        })
        setTotalProgress(sum)
    },[location,ProjectList,getProjectData]);

    const setTheme = useSelector(state => state.setTheme)

    return (
        <div className="main-board" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.divBackground:Dark_Theme.divBackground}}>
            <div className="board-title">
                <h5 className="title" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                    {location.pathname.split('/')[1]!=""?location.pathname.split('/')[1].charAt(0).toUpperCase()+location.pathname.split('/')[1].slice(1):'Dashboard'}
                </h5>
            </div>

            <div className="advertisement" style={{backgroundColor:setTheme=='brightness'?'white':Dark_Theme.cardBackground,
                                            borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
                <TopAds title={"defi"} description={"project"} />
            </div>

            <div className="board-main-project-detail" 
                style={{backgroundColor:setTheme=='brightness'?'white':Dark_Theme.divBackground,
                        color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>  

                <div className="project-deatil" >
                    <div className="project-detail-title" >
                        <img className="project_avatar border-radius-50-p"
                            style={{borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}
                                    src={getProjectData[getProjectId]?getProjectData[getProjectId].image:'../images/icons/question-white.png'}/>
                        <div className="project-detail-data-div">
                            <div className="d-flex">
                                <div className="project-user-name-div">
                                    <p className="project-user project-name">{getProjectData[getProjectId]?getProjectData[getProjectId].forkName:''}</p>
                                    <p className="project-user project-chain">{getProjectData[getProjectId]?getProjectData[getProjectId].network:''}</p>
                                </div>

                                <div className="review-v">
                                    <div className="d-flex ">
                                        <div className="review-div">
                                            <div style={{width:'10px',height:'40px'}}></div>
                                        </div>

                                        <div className="review-div" >
                                        </div>
                                    </div>

                                    <div className="d-flex">
                                        {projectState==0&&<div className="d-flex verified-div">
                                            <img className="verified-image" src="../"/>
                                            <p className="verified-text">VERIFIED COMPANY</p>
                                        </div>}
                                        {projectState==1&&<div className="claim-text">Claim This Listing</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="project-detail-overview">
                                {getProjectData[getProjectId]?getProjectData[getProjectId].description:''}                            
                            </div> 

                            <div className="social-list d-flex">
                                <SocialList data={getProjectData[getProjectId]?getProjectData[getProjectId].socialData:''}/>                            
                            </div>
                        </div>
                        
                    </div>
                    <div className="review-body project-ad">
                        <div className=" row" style={{flex:1}}>
                            <div className=" margin-top-10 col-12 col-sm-12 col-lg-12 col-xl-5">
                                <div className="website-score" >
                                    <WebsiteScore progress={getTotalProgress} websiteName={'Websitename Score'} title={'Power Nodes'} chain={'FANTOM'} avatar={'../images/icons/bitcoin.png'}/>                             
                                </div>
                            </div>

                            <div className="review-write-body col-12 col-sm-12 col-lg-12 col-xl-7">

                                <div className="review-div grey-border margin-top-10" style={{backgroundColor:setTheme=='brightness'?'white':Dark_Theme.cardBackground,
                                            borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>

                                    <div className="margin-v-10 ">
                                        <h4 className="project-progress-title">Project reliablity score based on:</h4>
                                        <LinearProgressBar label={'KYC'} percent={getProjectData.length>0&&getProjectData[getProjectId].functionData[0]*10}/>
                                        <LinearProgressBar label={'Doxxed'} percent={getProjectData.length>0&&getProjectData[getProjectId].functionData[1]*10}/>
                                        <LinearProgressBar label={'Liquidity Lock'} percent={getProjectData.length>0&&getProjectData[getProjectId].functionData[2]*10}/>
                                        <LinearProgressBar label={'Multisign'} percent={getProjectData.length>0&&getProjectData[getProjectId].functionData[3]*10}/>
                                        <LinearProgressBar label={'Audit'} percent={getProjectData.length>0&&getProjectData[getProjectId].functionData[4]*10}/>
                                        <LinearProgressBar label={'Renounced'} percent={getProjectData.length>0&&getProjectData[getProjectId].functionData[5]*10}/>
                                        <LinearProgressBar label={'Mint'} percent={getProjectData.length>0&&getProjectData[getProjectId].functionData[6]*10}/>
                                        <LinearProgressBar label={'Anti-rug'} percent={getProjectData.length>0&&getProjectData[getProjectId].functionData[7]*10}/>
                                        <LinearProgressBar label={'Sustainability'} percent={getProjectData.length>0&&getProjectData[getProjectId].functionData[8]*10}/>
                                        <LinearProgressBar label={'invest Staked or Sunk'} percent={getProjectData.length>0&&getProjectData[getProjectId].functionData[9]*10}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" margin-top-10 ">
                            <div className="sticky-top" style={{maxWidth:'280px',width:'100%',height:'711px',margin: 'auto'}}>
                                <CommunityCard/>
                                <img className="ad-image" 
                                    style={{backgroundColor:setTheme=='brightness'?'white':Dark_Theme.cardBackground,
                                            borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}} src="../images/icons/ad_play.png"/>
                                   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProjectList;