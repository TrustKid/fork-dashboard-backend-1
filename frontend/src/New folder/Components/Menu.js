import React, { useState, useEffect } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { connect, useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { menu_data } from "../service/constants";
import ProgressBar from "@ramonak/react-progress-bar";
import { SELECT_MENU, PORTFOLIO_DATA, SET_LOADING } from "../actionTypes";
const axios = require('axios');

const Menu = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [progressVal, setProgressVal] = useState(0)
    const [selectedChain, setSelectedChain] = useState(0)
    const [cntChain, setCntChain] = useState(0)
    const [chainProgress, setChainProgress] = useState(0)
    const [currentChainCnt, setCurrentChainCnt] = useState(0)
    const menuSelectItem = useSelector(state => state.menuSelectItem.item);
    const walletAddress = useSelector(state => state.walletAddress.address);
    const chainList = ['polygon', 'eth', 'bsc', 'avalanche', 'fantom']
    // const chainList = ['avalanche','fantom']
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)

    let progressTime = 0
    let count = 0;
    let preCnt = 0
    let intervalNum = 1
    let interval
    let cnt_item=0;
    let arr=[]
    useEffect(() => {
        
        switch (location.pathname.split('/')[1]) {
            case 'wallet': dispatch({ type: SELECT_MENU, payload: 0 }); break;
            case 'portfolio': dispatch({ type: SELECT_MENU, payload: 1 }); break;
            case 'feedback': dispatch({ type: SELECT_MENU, payload: 2 }); break;
        }
        if (walletAddress != '' && walletAddress != undefined) {

            axios.get('https://api.debank.com/portfolio/project_list?user_addr='+walletAddress)
            .then(response => {
                let data=response.data.data.filter(item=>item.chain=="matic"||item.chain=="bsc"||item.chain=="eth"||item.chain=="ftm"||item.chain=="avax")
                data.map(item=>{item.portfolio_list.map(
                    item1=>{
                        arr= arr.concat(item1.detail.supply_token_list?item1.detail.supply_token_list:
                    item1.detail.token_list?item1.detail.token_list:[])
                    })})
                    setCntChain(arr.length)
                    cnt_item=arr.length
            }
            )

            interval = setInterval(function () {
                // axios.get(' https://quiet-mountain-22563.herokuapp.com/state')
                axios.get(' http://localhost:2083/state')
                    .then(response => {
                        console.log(response.data.progress,cnt_item);
                        setChainProgress(response.data.progress)
                        if(cnt_item!==0)setProgressVal(parseInt(response.data.progress*100/cnt_item))
                        // let data=response.data.data.filter(item=>item.chain=="matic"||item.chain=="bsc"||item.chain=="eth"||item.chain=="ftm"||item.chain=="avax")
                        // data.map(item=>{item.portfolio_list.map(
                        //     item1=>{
                        //         arr= arr.concat(item1.detail.supply_token_list?item1.detail.supply_token_list:
                        //     item1.detail.token_list?item1.detail.token_list:[])
                        //     })})
                        //     setCntChain(arr.length)
                    }
                )
                // if(count<100){if (count <= intervalNum * 20) count++;
                // else if (count > intervalNum * 20){
                //     preCnt++
                //     if(preCnt>5) {
                //         preCnt=0
                //         count++;}}}
                // setProgressVal(count)

            }, 3200);

            setIsLoading(true)
            getPortfolioData(walletAddress, 0)

        }
    }, [walletAddress, Menu])
    let pre_portfolio_data = []
    let num

    const getPortfolioData = (walletAddress, chain_num) => {
        dispatch({ type: PORTFOLIO_DATA, payload: [] })//https://git.heroku.com/guarded-beach-12345.git
        num = chain_num
        setSelectedChain(chain_num)
        // axios.get(' https://quiet-mountain-22563.herokuapp.com/wallet/' + walletAddress + '/' + chainList[chain_num])
            axios.get('http://localhost:2083/wallet/'+walletAddress+'/'+chainList[chain_num])
            .then(response => {
                intervalNum++
                pre_portfolio_data = pre_portfolio_data.concat(response.data ? response.data : [])
                setCurrentChainCnt(pre_portfolio_data.length)
                // setProgressVal(parseInt(100/chainList.length*(num+1)))
                if (chainList.length > num + 1) {
                    num++
                    getPortfolioData(walletAddress, num)
                } else {
                    setProgressVal(100)
                    clearInterval(interval);
                    dispatch({ type: PORTFOLIO_DATA, payload: pre_portfolio_data })
                    console.log(pre_portfolio_data)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 500);

                }
            }
            ).catch((err) => {
                intervalNum++
                // pre_portfolio_data=pre_portfolio_data.concat([])
                if (chainList.length > num + 1) {
                    num++
                    getPortfolioData(walletAddress, num)
                } else {
                    setProgressVal(100)
                    clearInterval(interval);
                    dispatch({ type: PORTFOLIO_DATA, payload: pre_portfolio_data })
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 500);

                }
            })
    }

    const onMenuClick = (index) => {
        if ((walletAddress == "" || walletAddress == undefined) && index == 1) index = 0
        dispatch({ type: SELECT_MENU, payload: index });
    }

    const handleOpenJSON = (e) => {
        var input, file, fr;
        console.log(e.target.files[0])
        file = e.target.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
        var a = document.getElementById('open_json_file')
        a.value = ""
    }
    function receivedText(e) {
        let lines = e.target.result;
        let userData = null;

        try {
            userData = JSON.parse(lines);
        } catch (e) {
            userData = lines;
        }

        dispatch({ type: PORTFOLIO_DATA, payload: userData });


        //  navigate("/portfolio/"+walletAddress, { replace: true });
    }

    const progressNum = () => {
        return <text>56%</text>
    }

    return (
        <div className="sidebar">
            {/* { isLoading?<div style={{position:'absolute',left:0,top:0,bottom:0,right:0,backgroundColor:'#10003044',zIndex:100000}}><div id="loader"></div></div>:null} */}
             
            {isLoading ?<div style={{ position: 'absolute', width:window.screen.width,height:window.screen.height, backgroundColor: '#100030cc', zIndex: 100000 }}>
                <div style={{ paddingLeft: '25%', paddingRight: '25%', paddingTop: 500}}>
                    <div style={{ display:'flex', width: '100%', height:30,borderColor:'rgb(35,170,243)',borderWidth:1}}>
                        <div style={{ width: progressVal+'%', height:28,backgroundColor:'rgb(35,170,243)'}}>
                        <img style={{width:50,height:50,marginLeft:'auto',marginRight:-25,borderRadius: '50%',marginTop: '-10px'}}src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqXFsPG95gj44DderYzyl53PdlIMAz71GQ05hPWNDb7XXfnMNbMURT8HFWIK7mZtB-Low&usqp=CAU'/>
                        </div>
                        
                    </div>
                </div>
                <div style={{textAlign:'center',color:'#adadad',marginTop:30}}>
                    {
                    chainList[selectedChain].toUpperCase()+' :' + progressVal+'% (' + (chainProgress) +'/'+cntChain+')'
                    }
                </div>
            </div>: null}
            <div className=" defi-logo">
                <div className="logo d-flex">
                    <img className="defi-image" src="../assets/images/defi-icon.jpg" />
                    <h4 className="defi-title">DefiReturn</h4>
                </div>
            </div>
            <nav className="navbar bg-light left-navbar">
                <ul className="navbar-nav">
                    <Link className="nav-link" to="/wallet" >
                        <li className="nav-item  d-flex" onClick={() => onMenuClick(0)} style={{ backgroundColor: menuSelectItem == 0 ? '#081945' : '#14224f' }}>
                            <img className="menu-icon" src="../assets/images/wallet.jpg" />
                            <h6 className="menu-item-text">Wallet</h6>
                        </li>
                    </Link>
                    <Link className="nav-link" to={walletAddress != "" && walletAddress != undefined ? '/portfolio/' + walletAddress : '/wallet'}  >
                        <li className="nav-item d-flex" onClick={() => onMenuClick(1)} style={{ backgroundColor: walletAddress != "" ? menuSelectItem == 1 ? '#081945' : '#14224f' : '#14224f' }}>
                            <img className="menu-icon" src="../assets/images/portfolio.jpg" />
                            <h6 className="menu-item-text">Portfolio</h6>
                        </li>
                    </Link>
                    <Link className="nav-link" to="/feedback" >
                        <li className="nav-item d-flex" onClick={() => onMenuClick(2)} style={{ backgroundColor: menuSelectItem == 2 ? '#081945' : '#14224f' }}>
                            <img className="menu-icon" src="../assets/images/feedback.jpg" />
                            <h6 className="menu-item-text">Feedback</h6>
                        </li>
                    </Link>

                </ul>
                <span className="btn btn-default btn-file">
                    open JSON File  <input type="file" id="open_json_file" name="front" onChange={(e) => handleOpenJSON(e)} className="ImageUpload" accept="json/*" />
                </span>
            </nav>
            <div className="menu-image-div">
                <img className="menu-image" src="../assets/images/menu-image.jpg" />
            </div>
            <nav className="navbar bg-light left-navbar left-navbar-1">
            </nav>
        </div>
    )
}
const mapStateToProps = state => ({
    menuSelectItem: state.menuSelectItem,
    walletAddress: state.walletAddress
})

//connect function INJECTS dispatch function as a prop!!
export default connect(mapStateToProps)(Menu);