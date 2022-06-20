import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
import ForkCard from "../Components/ForkCard"
import ProjectCard from "../Components/ProjectCard"
import TopAds from "../Components/TopAds"
import { connect, useDispatch, useSelector } from 'react-redux';
import { SET_THEME, PROJECT_CATEGORY, SET_CATEGORY_BTN } from "../actionTypes";
import { Bright_Theme, Dark_Theme, Backendurl } from "../Constants";
import { category_buttons } from "../initialState";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import axios from "axios";
import LoadingSpin from "react-loading-spin";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const CategoryProject = () => {
    const location = useLocation();
    const dispatch = useDispatch()

    const getProjectData = useSelector(state => state.setProjectData)
    const getCategory = useSelector(state => state.getCategory)
    const [getUpcoming, setUpcoming] = useState([])
    const getLoading = useSelector(state => state.setLoading)
    const getSelNum = useSelector(state => state.setCategory_list)
    const getCategoryBtn = useSelector(state => state.setCategory_btn)
    console.log('Line 28', getProjectData)
    // const ds = useSelector(state => console.log('Line 28', state.setProjectData))
    // console.log('getProjectData')
    useEffect(() => {
        let titleText = location.pathname.split('/')[1]
        let title
        let currentDate = new Date().getTime() / 1000
        console.log(getProjectData)
        switch (titleText) {
            case 'networks': setUpcoming(
                [...getProjectData.filter(item => {
                    if (location.pathname.split('/')[2].toLowerCase() == item.network.toLowerCase())
                        return item
                })]); break
            case 'hot_project_list': setUpcoming([...getProjectData.filter(item => { if (item.hot && item.ruged != true && item.dead != true) return item })]); break

            case 'explore':
                setUpcoming([...getProjectData]); break
            default: setUpcoming([...getProjectData.filter(item => {
                switch (titleText) {
                    case 'upcoming_project': if (item.launchDate > currentDate) return item; break
                    case 'rugs': if (item.ruged) return item; break
                    case 'dead_project': if (item.dead) return item; break
                    case 'featured_project': if (item.featured) return item; break
                    case 'watchlist': if (item.watchlist == true) return item; break
                    case 'launches': if (currentDate > item.launchDate - 172800 && currentDate <= item.launchDate + 172800) return item; break
                }
            })]); break
        }

    }, [location, CategoryProject, getProjectData, getCategoryBtn, getCategory]);

    const getPageTitle = () => {
        let a = location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1)
        let b = ''
        if (location.pathname.split('/').length > 2) b = '-' + location.pathname.split('/')[2]
        return a + b
    }

    const onFearDateBtn = (num) => {
        dispatch({ type: PROJECT_CATEGORY, payload: num })
        let a = getCategory
        a.forEach(item => {
            item.state = false
        });
        a[num].state = true
        dispatch({ type: SET_CATEGORY_BTN, payload: a })
    }
    const setTheme = useSelector(state => state.setTheme)
    return (
        <div className="main-board" style={{ backgroundColor: setTheme == 'brightness' ? Bright_Theme.divBackground : Dark_Theme.divBackground }}>
            <div className="board-title">
                <h5 className="title" style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>{getPageTitle()}</h5>

                <div className="category-div" >
                    {getCategory.map((item, index) => {
                        return <button key={index} className="category-button" onClick={() => onFearDateBtn(index)}
                            style={{
                                backgroundColor: item.state ? setTheme == 'brightness' ? '#c3c3c3' : '#555555' : setTheme == 'brightness' ? '#ffffff' : '#111827',
                                color: setTheme == 'brightness' ? '#333333' : '#ffffff',
                                borderColor: setTheme == 'brightness' ? '#f1f1f1' : '#333333'
                            }}>{item.fork}
                        </button>
                    })}
                </div>
            </div>
            <div className="advertisement" style={{
                backgroundColor: setTheme == 'brightness' ? 'white' : Dark_Theme.cardBackground,
                borderColor: setTheme == 'brightness' ? Bright_Theme.card_border : Dark_Theme.card_border
            }}>
                <TopAds title={"defi Arif"} description={"project"} />
            </div>

            <div className="board-main " style={{ backgroundColor: setTheme == 'brightness' ? '#efefef' : '#101624' }}>
                <div className="ad-board-project">
                    <div className=" sticky-top ad-board-project-content" >
                        {/* <img className="ad-project-image" src='../images/icons/ad_play.png'/>
                        <img className="ad-project-image" src='../images/icons/ad_about.png'/> */}
                        <AutoplaySlider
                            play={true}
                            cancelOnInteraction={false}
                            interval={1000}
                            animation="cubeAnimation"
                            mobileTouch={true}
                            bullets={false}
                            organicArrows={false}
                            className="ad-project-image"
                        >
                            <div data-src="../images/icons/enjoy_free_ad.png"></div>
                            <div data-src="../images/icons/ad_play.png"></div>
                        </AutoplaySlider>
                        <AutoplaySlider
                            play={true}
                            cancelOnInteraction={false}
                            interval={1500}
                            animation="cubeAnimation"
                            mobileTouch={true}
                            bullets={false}
                            organicArrows={false}
                            className="ad-project-image"
                        >
                            <div data-src="../images/icons/ad_about.png"></div>
                            <div data-src="../images/icons/ad_play.png"></div>
                        </AutoplaySlider>
                    </div>
                </div>

                {getLoading ? <div className={"ExampleOfUsage"}>
                    <div className='loading'><LoadingSpin /></div>
                </div> :
                    <div className="project-items row">
                        {
                            getProjectData?.map((item, index) => {
                                if (
                                    (!getSelNum && getSelNum == 0 || item.fork.toLowerCase() == getCategory[getSelNum].fork.toLowerCase()) && item.featured) {
                                    return (
                                        <div key={index} className="card-div" >
                                            <ForkCard
                                                // onWatchList={onWatchList}
                                                avata={item.image}
                                                featured={item.featured}
                                                title={item.forkName}
                                                chain={item.network}
                                                text={item.description}
                                                launchDate={item.launchDate}
                                                socialData={item.socialData}
                                                ruged={item.ruged}
                                                dead={item.dead}
                                                checkValue={item.checkValue}
                                                id={item._id}
                                                watchlist={item.watchlist}
                                                projectLink={'/project/' + index}
                                                functionalityData={item.functionalityData} />
                                        </div>
                                    )
                                }
                            })
                        }
                        {
                            (
                                getProjectData.length == 0 || getProjectData.filter(item => {
                                    if (!getSelNum && getSelNum == 0 || item.fork.toLowerCase() == getCategory[getSelNum].fork.toLowerCase()) return item
                                }).length == 0) && <div className="no-data">
                                <h3 style={{ color: setTheme == 'brightness' ? Bright_Theme.font_color : Dark_Theme.font_color }}>
                                    {"There is no data."}
                                </h3>
                            </div>
                        }
                    </div>
                }

            </div>
        </div>
    )
}
export default CategoryProject;