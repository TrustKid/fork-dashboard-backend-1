import React, { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import TradeViewChart from 'react-crypto-chart';
import { useDispatch, useSelector} from 'react-redux';
import {PROJECT_CATEGORY} from "../actionTypes";
import {Bright_Theme, Dark_Theme, Backendurl} from "../Constants";
import {category_buttons, chartCategoryBtn, chart_data} from "../initialState";
import axios from "axios";

const PriceText = (props) => {
    return(
        <div className="price-text-div d-flex">
            {props.data.map((item,index)=>{return<div key={index} className="price-text-box">
                <p className="price-label">{item.label}</p>
                <h5 className="price-val" style={{color:props.color}}>{item.val}</h5>
            </div>})}
        </div>
    )
}

const Chart = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const [getCategory, setCategory] = useState(category_buttons)
    const [getChartCategory, setChartCategory] = useState(chartCategoryBtn)
    const getProjectData = useSelector(state => state.setProjectData)
    const [getChartTable, setChartTable] = useState(chart_data)
    const [getTxn, setTxn] = useState(Object.assign(chart_data.txns.m5,{volume:chart_data.volume.m5}))//Object.assign(getChartTable.txns.m5,{volume:getChartTable.volume.m5})
    const [getLoading, setLoading] = useState(false)
    const getSelNum = useSelector(state=> state.setCategory_list)
    const getCategoryBtn = useSelector(state=> state.setCategory_btn)
// console.log(getProjectData)
    useEffect(() => {
        setLoading(true)
        // const fetchData = () => {
        //     axios.get('https://api.dexscreener.io/latest/dex/pairs/bsc/0x7213a321F1855CF1779f42c0CD85d3D95291D34C')
        //     .then(res=>{
        //         if(res.data){
        //             setLoading(false)
        //             setChartTable(res.data.pair)
        //             setTxn(Object.assign(res.data.pair.txns.m5,{volume:res.data.pair.volume.m5}))
        //             console.log(res.data)
        //         }

        // })
        setInterval(() => {
            axios.get('https://api.dexscreener.io/latest/dex/pairs/bsc/0x7213a321F1855CF1779f42c0CD85d3D95291D34C')
            .then(res=>{
                if(res.data){
                    let a = Object.assign(res.data.pair.txns.m5,{volume:res.data.pair.volume.m5})
                    setLoading(false)
                    setChartTable(res.data.pair)
                    setTxn(a)
                }})
            }, 5000);
    },[Chart])
    useEffect(() => {
        let titleText = location.pathname.split('/')[1]
        let title
        let currentDate = new Date().getTime()/1000
        // switch(titleText){
        //     case 'networks':setUpcoming(
        //             [...getProjectData.filter(item=>{
        //                 if(location.pathname.split('/')[2].toLowerCase()==item.network.toLowerCase())
        //                     return item})]);break
        //     case 'hot_project_list':setUpcoming([...getProjectData.sort((a, b) => a.hosts > b.hosts ? -1 : 1)
        //                         .filter(item=>{if(item.ruged!=true && item.dead!=true)return item})]) ;break
        
        //     case 'explore':
        //         setUpcoming([...getProjectData]);break
        //     default: setUpcoming([...getProjectData.filter(item=>{
        //         switch (titleText){
        //             case 'upcoming_project':if(item.launchDate>currentDate)return item; break
        //             case 'rugs':if(item.ruged)return item; break
        //             case 'dead_project':if(item.dead)return item; break
        //             case 'featured_project':if(item.featured)return item; break
        //             case 'watchlist':if(item.watchlist==true)return item; break
        //             case 'launches':if(item.launchDate>currentDate-172800 && item.launchDate<=currentDate)return item; break
        //         }
        //     })]);break
        // }
        
    },[location,Chart,getProjectData,getCategoryBtn]);

    const getPageTitle=()=>{
        return location.pathname.split('/')[1].charAt(0).toUpperCase()+location.pathname.split('/')[1].slice(1)
    }

    const onFearDateBtn = (num) => {
        dispatch({type:PROJECT_CATEGORY,payload:num})
        let a = getCategory
        for(var i=0;i<6;i++)a[i].state=false
        a[num].state = true 
        setCategory([...a])
    }

    const onChartCategoryBtn = (num) => {
        let a = chartCategoryBtn
        for(var i=0;i<4;i++)a[i].state=false
        a[num].state = true 
        setChartCategory([...a])
        switch (num){
            case 0: setTxn(Object.assign(getChartTable.txns.m5,{volume:getChartTable.volume.m5}));break
            case 1: setTxn(Object.assign(getChartTable.txns.h1,{volume:getChartTable.volume.h1}));break
            case 2: setTxn(Object.assign(getChartTable.txns.h6,{volume:getChartTable.volume.h6}));break
            case 3: setTxn(Object.assign(getChartTable.txns.h24,{volume:getChartTable.volume.h24}));break
        }
    }
    const setTheme = useSelector(state => state.setTheme)
    return (
        
        <div className="main-board-chart" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.divBackground:Dark_Theme.divBackground}}>
        <div className="board-title">
            <h5 className="title" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>{getPageTitle()}</h5>
            
            <div className="category-div" >
                {getCategory.map((item,index)=>{
                    return<button key={index} className="category-button" onClick={()=>onFearDateBtn(index)}
                                style={{backgroundColor:item.state?setTheme=='brightness'?'#c3c3c3':'#555555':setTheme=='brightness'?'#ffffff':'#111827',
                                        color:setTheme=='brightness'?'#333333':'#ffffff',
                                        borderColor:setTheme=='brightness'?'#f1f1f1':'#333333'}}>{item.title}
                        </button>
                })}
            </div>
        </div>
        
        <div className="chart-board-main"style={{backgroundColor:setTheme=='brightness'?'#efefef':'#101624'}}>
            <div className="chart-body">
                
                <TradeViewChart pair="AVAXBTC"
                    containerStyle={{      
                        maxWidth: '100%',
                        maxHeight: '100vh',
                        width:'100%',
                        height:'500px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                />
                <div className="token-data-table">
                    <table className="table table-striped" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>TIME</th>
                                <th>USD</th>
                                <th>THOR</th>
                                <th>WAVAX</th>
                                <th>PRICE</th>
                                <th>TXN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {getUpcoming.map((item, index)=>{
                                if(!getSelNum && getSelNum==0||item.fork==getCategory[getSelNum].title)return <tr key={index} style={{borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}> 
                                    <td className="d-flex"><img className="" src={item.image}/><p>{item.forkName}</p>
                                        {item.isNew&&<div className="new-label">NEW</div>}
                                    </td>
                                    <td>{item.network}</td>
                                    <td>{item.whitelist}</td>
                                    <td>{item.link&&<a href={item.link} target='_blank' className="d-flex"><p style={{color:'#326dec'}}>{item.link!=''?'JOIN NOW':''}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{display:item.link!=''?'block':'none'}}
                                                    height="20px" width="20px" viewBox="0 0 24 24" className="new-window">
                                                <path  d="M12 11.9998L20 4M20 4H14.1817M20 4L19.9999 9.81802M9.81819 6.90946H5.77777C4.79594 6.90946 4 7.70537 4 8.68718V18.2223C4 19.2041 4.79594 20 5.77778 20H15.3131C16.295 20 17.0909 19.2041 17.0909 18.2223V14.182" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">

                                                </path>
                                            </svg>
                                        </a>}
                                    </td>
                                </tr>
                            })} */}

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="chart-menu" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.divBackground:'#191919'}}>
                <div className="chart-menu-header"></div>
                <div className="chart-menu-body">
                    {/* <PriceText data={[{label:'PRICE USD', val:'$24.54'},{label:'PRICE', val:'0.2943WAVAX'}]} color={'white'}/> */}
                    <div className="price-text-div d-flex">
                        <div className="price-text-box first-box">
                            <p className="price-label">PRICE USD</p>
                            <h5 className="price-val" style={{color:setTheme=='brightness'?'#121212':'#efefef'}}>${getChartTable.priceUsd}</h5>
                        </div>
                        <div className="price-text-box last-box">
                            <p className="price-label">PRICE</p>
                            <h5 className="price-val" style={{color:setTheme=='brightness'?'#121212':'#efefef'}}>0.2943WAVAX</h5>
                        </div>
                    </div>
                    <div className="price-text-div d-flex">
                        <div className="price-text-box first-box">
                            <p className="price-label">LIQUIDITY</p>
                            <h5 className="price-val" style={{color:setTheme=='brightness'?'#121212':'#efefef'}}>${(getChartTable.liquidity.usd/1000000).toFixed(2)}M</h5>
                        </div>
                        <div className="price-text-box mid-box">
                            <p className="price-label">FDV</p>
                            <h5 className="price-val" style={{color:setTheme=='brightness'?'#121212':'#efefef'}}>${(getChartTable.fdv/1000000).toFixed(2)}M</h5>
                        </div>
                        <div className="price-text-box last-box">
                            <p className="price-label">MKT CAP</p>
                            <h5 className="price-val" style={{color:setTheme=='brightness'?'#121212':'#efefef'}}>$25M</h5>
                        </div>
                    </div>
                    
                    <div className="price-text-div d-flex">
                        <div className="price-text-box first-box">
                            <p className="price-label">5M</p>
                            <h4 className="price-val" style={{color:getChartTable.priceChange.m5>=0?setTheme=='brightness'?'black':'white':'red'}}>{getChartTable.priceChange.m5}%</h4>
                        </div>
                        <div className="price-text-box mid-box">
                            <p className="price-label">1H</p>
                            <h4 className="price-val" style={{color:getChartTable.priceChange.h1>=0?setTheme=='brightness'?'black':'white':'red'}}>{getChartTable.priceChange.h1}%</h4>
                        </div>
                        <div className="price-text-box mid-box">
                            <p className="price-label">6H</p>
                            <h4 className="price-val" style={{color:getChartTable.priceChange.h6>=0?setTheme=='brightness'?'black':'white':'red'}}>{getChartTable.priceChange.h6}%</h4>
                        </div>
                        <div className="price-text-box last-box">
                            <p className="price-label">24H</p>
                            <h4 className="price-val" style={{color:getChartTable.priceChange.h24>=0?setTheme=='brightness'?'black':'white':'red'}}>{getChartTable.priceChange.h24}%</h4>
                        </div>
                    </div>
                    <div className="chart-tab">
                        {/* style={{backgroundColor:setTheme=='brightness'?Bright_Theme.divBackground:'#191919'}} */}
                        <ul className="nav nav-tabs nav-justified">
                            {getChartCategory.map((item,index)=>{
                                return<li key={index} 
                                        onClick={()=>onChartCategoryBtn(index)} 
                                        style={{backgroundColor:item.state?setTheme=='brightness'?'white':'black':setTheme=='brightness'?'#e1e1e1':'#191919',
                                                color:setTheme=='brightness'?'#121212':'#efefef',    
                                                borderColor:setTheme=='brightness'?'#f4f5f5':'black'}} 
                                        className="nav-item chart-tab-btn">
                                            {item.title}
                                    </li>})}
                        </ul>
                        <div className="price-text-div price-text-div-1 d-flex" style={{backgroundColor:setTheme=='brightness'?'#fbfbfb':'#101010'}}>
                            <div className="price-text-box mid-box">
                                <p className="price-label">TXNS</p>
                                <h5 className="price-val" style={{color:setTheme=='brightness'?'#121212':'#efefef'}}>{getTxn.buys}</h5>
                            </div>
                            <div className="price-text-box mid-box">
                                <p className="price-label">BUYS</p>
                                <h5 className="price-val" style={{color:setTheme=='brightness'?'#121212':'#efefef'}}>{getTxn.buys}</h5>
                            </div>
                            <div className="price-text-box mid-box">
                                <p className="price-label">SELLS</p>
                                <h5 className="price-val" style={{color:setTheme=='brightness'?'#121212':'#efefef'}}>{getTxn.sells}</h5>
                            </div>
                            <div className="price-text-box mid-box">
                                <p className="price-label">VOLUME</p>
                                <h5 className="price-val" style={{color:setTheme=='brightness'?'#121212':'#efefef'}}>${getTxn.volume>999?(getTxn.volume/1000).toFixed(2):getTxn.volume}K</h5>
                            </div>
                        </div>
                    </div>
                    <div className="chart-setting-div">
                        <button className="chart-setting-btn"
                                style={{backgroundColor:setTheme=='brightness'?'#f4f5f5':'#191919',
                                        color:setTheme=='brightness'?'#101010':'#f4f5f5'}}>Add to watchlist</button>
                        <button className="chart-setting-btn"
                                style={{backgroundColor:setTheme=='brightness'?'#f4f5f5':'#191919',
                                        color:setTheme=='brightness'?'#101010':'#fbfbfb'}}>Set price alerts</button>
                        <button className="chart-setting-btn"
                                style={{backgroundColor:setTheme=='brightness'?'#f4f5f5':'#191919',
                                        color:setTheme=='brightness'?'#101010':'#fbfbfb'}}>Telegram price alerts</button>
                        <button className="chart-setting-btn"
                                style={{backgroundColor:setTheme=='brightness'?'#f4f5f5':'#191919',
                                        color:setTheme=='brightness'?'#101010':'#fbfbfb'}}>Report</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Chart;
