import React, { useState, useEffect } from "react";
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";
import {connect, useDispatch, useSelector} from 'react-redux';
import {SET_THEME} from "../actionTypes";
import {imoji_icon, imoji_icon_1, fearGreedBtn} from "../initialState";
import {Bright_Theme, Dark_Theme} from "../Constants";
const CommunityCard = () => {
    const dispatch = useDispatch()
    const setTheme = useSelector(state => state.setTheme)
    const [getFearDateBtn, setFearDateBtn] = useState(fearGreedBtn)
    const props = {
        percent: 60, // is requirestyle={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}
        colorSlice: "#f7931a",
        colorCircle: setTheme=='brightness'?"#c8c8c8":'#27272a',
        fontColor: "#f7931a",
        fontSize: "1.7rem",
        size: 120,
        fontWeight: 700
      };
    // console.log(setTheme)
    const setDark = () => {
        dispatch({type:SET_THEME, payload:'darkness'})
    }
    const setBright = () => {
        dispatch({type:SET_THEME, payload:'brightness'})
    }

    const onFearDateBtn = (num) => {
        // console.log(num)
        let a = getFearDateBtn
        for(var i=0;i<4;i++)a[i].state=false
        a[num].state = true 
        setFearDateBtn([...a])
    }
    return (
        <div className="fear-card" style={{backgroundColor:setTheme=='brightness'?'white':Dark_Theme.cardBackground,
        borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
            <div className="d-flex fear-top-div">
                <p className="fear-top-text">COMMUNITY TRUST (15 VOTES)</p>
            </div>
            <div className="community-progress-div d-flex">
                <div className="high-votes votes">
                    <img className="" src="../images/icons/vote_2.png"/>
                    93.3%
                </div>
                <div className="community-progress">
                    <div className="community-progress-1"></div>
                </div>
                <div className="low-votes votes">
                <img className="" src="../images/icons/vote_1.png"/>
                    6.7%
                </div>
            </div>
        </div>
    )
}
export default CommunityCard;