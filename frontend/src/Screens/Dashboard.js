import React, { useState, useEffect } from "react"
import { Link, useLocation } from 'react-router-dom'
import FearGreed from "../Components/FearGreed"
import ForkCard from "../Components/ForkCard"
import ProjectCard from "../Components/ProjectCard"
import TopAds from "../Components/TopAds"
import { connect, useDispatch, useSelector } from 'react-redux';
import { SET_THEME, PROJECT_CATEGORY, SET_CATEGORY_BUTTON, SET_PROJECT_DATA, SET_PROJECT_DATA_DEFAULT } from "../actionTypes";
import { Bright_Theme, Dark_Theme, Backendurl } from "../Constants";
import { getData } from "../services/networkService";
import LoadingSpin from "react-loading-spin";
import { category_buttons } from "../initialState";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import axios from "axios";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Dashboard = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const setTheme = useSelector(state => state.setTheme)
    const getProjectData = useSelector(state => state.setProjectData)
    const getLoading = useSelector(state => state.setLoading)
    // const getHotProjectData = useSelector(state => state.setProjectData)
    // const getTrendingProjectData = useSelector(state => state.setProjectData)
    // const getRatedProjectData = useSelector(state => state.setProjectData)
    const getCategoryBtn = useSelector(state => state.setCategory_btn)
    const [getCategory, setCategory] = useState(category_buttons)
    const getSelNum = useSelector(state => state.setCategory_list)
    // const [getSelNum, setSelNum] = useState(0)

    useEffect(() => {
        dispatch({ type: SET_CATEGORY_BUTTON, payload: false })
    }, [])
    const data_1 = [
        { avatar: 'https://d13m59iw5ptu3d.cloudfront.net/_next/image?url=https://assets.coingecko.com/markets/images/254/small/Bitrue_Exchange.png?1637142776&w=32&q=75', title: 'Zenon', subTitle: 'ZNN', count: 243, mcap: 2345353326, val: 9.65, percent: 23.45 },
        { avatar: 'https://d13m59iw5ptu3d.cloudfront.net/_next/image?url=https://assets.coingecko.com/markets/images/254/small/Bitrue_Exchange.png?1637142776&w=32&q=75', title: 'Zenon', subTitle: 'ZNN', count: 243, mcap: 2345353326, val: 9.65, percent: 23.45 },
        { avatar: 'https://d13m59iw5ptu3d.cloudfront.net/_next/image?url=https://assets.coingecko.com/markets/images/254/small/Bitrue_Exchange.png?1637142776&w=32&q=75', title: 'Zenon', subTitle: 'ZNN', count: 243, mcap: 2345353326, val: 9.65, percent: 23.45 },
        { avatar: 'https://d13m59iw5ptu3d.cloudfront.net/_next/image?url=https://assets.coingecko.com/markets/images/254/small/Bitrue_Exchange.png?1637142776&w=32&q=75', title: 'Zenon', subTitle: 'ZNN', count: 243, mcap: 2345353326, val: 9.65, percent: 23.45 },
        { avatar: 'https://d13m59iw5ptu3d.cloudfront.net/_next/image?url=https://assets.coingecko.com/markets/images/254/small/Bitrue_Exchange.png?1637142776&w=32&q=75', title: 'Zenon', subTitle: 'ZNN', count: 243, mcap: 2345353326, val: 9.65, percent: 23.45 }
    ]

    const onFearDateBtn = (num) => {
        dispatch({ type: PROJECT_CATEGORY, payload: num })
        let a = getCategory
        for (var i = 0; i < 6; i++)a[i].state = false
        a[num].state = true
        setCategory([...a])
    }

    const getProjectCategory = () => {
        let a = getProjectData.filter((item) => { if (item.featured == true) return item })
        let b = getProjectData.filter((item) => { if (item.featured == false || item.featured == undefined) return item })
        let ab = a.concat(b)
        // console.log(ab)
        return ab
    }

    const getHotProjectData = () => {
        let a = getProjectData.filter((item) => { if (item.hot == true) return item })
        // let b=getProjectData.filter((item)=>{if(item.featured==false|| item.featured==undefined) return item})
        // let ab = a.concat(b)
        // console.log(ab)
        return a
    }

    const getTrendingProjectData = () => {
        let a = getProjectData.filter((item) => { if (item.trending == true) return item })
        // let b=getProjectData.filter((item)=>{if(item.featured==false|| item.featured==undefined) return item})
        // let ab = a.concat(b)
        // console.log(ab)
        return a
    }

    const getRatedProjectData = () => {
        let a = getProjectData.filter((item) => { if (item.top == true) return item })
        // let b=getProjectData.filter((item)=>{if(item.featured==false|| item.featured==undefined) return item})
        // let ab = a.concat(b)
        // console.log(ab)
        return a
    }

    return (
        <div className="main-board" style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.divBackground : Dark_Theme.divBackground }}>

            <div className="board-title">
                <h5 className="title" style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                    {location.pathname.split('/')[1] != "" ? location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1) : 'Dashboard'}
                </h5>

                {/* <div className="category-div" style={{display:getCategoryBtn?'block':'none'}}>
                    {getCategory.map((item,index)=>{
                        return<button key={index} className="category-button" onClick={()=>onFearDateBtn(index)}
                                style={{backgroundColor:item.state?setTheme=='brightness'?'#c3c3c3':'#555555':setTheme=='brightness'?'#ffffff':'#111827',
                                        color:setTheme=='brightness'?'#333333':'#ffffff',
                                        borderColor:setTheme=='brightness'?'#f1f1f1':'#333333'}}>{item.title}</button>
                    })}
                </div> */}
            </div>
            <div className="advertisement"
                style={{
                    backgroundColor: setTheme == 'brightness' ? 'white' : Dark_Theme.cardBackground,
                    borderColor: setTheme == 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
                }}>
                <TopAds title={"defi"} description={"project"} />
            </div>
            <div className="">
                <div className="board-main" style={{ backgroundColor: setTheme == 'brightness' ? '#efefef' : '#101624' }}>
                    <div className="card-div " >
                        <FearGreed />
                        <AutoplaySlider
                            play={true}
                            cancelOnInteraction={false}
                            interval={1000}
                            animation="cubeAnimation"
                            mobileTouch={true}
                            bullets={false}
                            organicArrows={false}
                        >
                            <div data-src="../images/icons/enjoy_free_ad.png"></div>
                            <div data-src="../images/icons/ad_play.png"></div>
                        </AutoplaySlider>
                        {/* <img className="free-ad-image" src=""/> */}
                    </div>

                    <div className="" >
                        {getLoading ? <div className={"ExampleOfUsage"}>
                            <div className='loading'><LoadingSpin /></div>
                        </div> :
                            <div className="row" style={{ margin: 0, justifyContent: 'center' }}>
                                {getProjectData.filter(item => { if (item.landing == true) return item }).map((item, index) => {
                                    if (index < 3) return <div key={index} className="card-div" >
                                        <ForkCard
                                            avata={item.image}
                                            featured={item.featured}
                                            title={item.forkName}
                                            chain={item.network}
                                            text={item.description}
                                            launchDate={item.launchDate}
                                            socialData={item.socialData}
                                            watchlist={item.watchlist}
                                            id={item._id}
                                            checkValue={item.checkValue}
                                            projectLink={'/project/' + index}
                                            functionalityData={item.functionalityData} />

                                    </div>
                                })}
                                { }
                            </div>
                        }

                        <div className="row" style={{ margin: 0, justifyContent: 'center' }}>
                            <div className="card-div" >
                                <ProjectCard title={'HOT'} data={getHotProjectData()} projectInfo={[{ kyc: true, audited: true }, { kyc: true, audited: false }, { kyc: false, audited: false }]} color={[{ bg: '#d3b646', txt: 'black' }, { bg: '#e1c763', txt: 'black' }, { bg: '#f7de7e', txt: 'black' }]} />
                            </div>
                            <div className="card-div" >
                                <ProjectCard title={'TRENDING'} data={getTrendingProjectData()} projectInfo={[{ kyc: true, audited: true }, { kyc: true, audited: false }, { kyc: false, audited: false }]} color={[{ bg: '#4338ca', txt: 'white' }, { bg: '#5d52e1', txt: 'white' }, { bg: '#847bfb', txt: 'white' }]} />
                            </div>
                            <div className="card-div" >
                                <ProjectCard title={'TOP RATED'} data={getRatedProjectData()} projectInfo={[{ kyc: true, audited: true }, { kyc: true, audited: false }, { kyc: false, audited: false }]} color={[{ bg: '#047857', txt: 'white' }, { bg: '#159973', txt: 'white' }, { bg: '#47b797', txt: 'white' }]} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="board-main row"></div>
            </div>
        </div>
    )
}
export default Dashboard;
