import React, { useState, useEffect } from "react";
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";
import {connect, useDispatch, useSelector} from 'react-redux';
import {SET_THEME} from "../actionTypes";
import {imoji_icon, email_icon, discord_icon, telegram_icon, twitter_icon, website_icon} from "../initialState";
import {Bright_Theme, Dark_Theme} from "../Constants";


const SocialList = (props) => {
    const dispatch = useDispatch()
    const setTheme = useSelector(state => state.setTheme)
    const setDark = () => {
        dispatch({type:SET_THEME, payload:'darkness'})
    }
    const setBright = () => {
        dispatch({type:SET_THEME, payload:'brightness'})
    }
    return(
        <div className="social-button d-flex" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.sub_divBackground:Dark_Theme.sub_divBackground}}>
            <div className="social-sub-div" disabled={props.data.tel!=''?true:false}>
                {props.data.tel!=''?<a href={props.data.tel} target='_blank'>
                    <img className="social-image" src={props.data.tel!=''?setTheme=='brightness'?"../images/icons/telegram_black.png":"../images/icons/telegram_white.png":"../images/icons/telegram_inactive.png"}/>
                </a>:
                    <img className="social-image" src={props.data.tel!=''?setTheme=='brightness'?"../images/icons/telegram_black.png":"../images/icons/telegram_white.png":"../images/icons/telegram_inactive.png"}/>
                }
            </div>
            <div className="social-sub-div" disabled={props.data.twt!=''?true:false}>
            {props.data.twt!=''?<a href={props.data.twt} target='_blank'>
                    <img className="social-image" src={props.data.twt!=''?setTheme=='brightness'?"../images/icons/twitter_black.png":"../images/icons/twitter_white.png":"../images/icons/twitter_inactive.png"}/>
                </a>:
                    <img className="social-image" src={props.data.twt!=''?setTheme=='brightness'?"../images/icons/twitter_black.png":"../images/icons/twitter_white.png":"../images/icons/twitter_inactive.png"}/>
                
}
            </div>
            <div className="social-sub-div" disabled={props.data.web!=''?true:false}>
                {props.data.web!=''?<a href={props.data.web} target='_blank'>
                    <img className="social-image" src={props.data.web!=''?setTheme=='brightness'?"../images/icons/website_black.png":"../images/icons/website_white.png":"../images/icons/website_inactive.png"}/>
                </a>:
                    <img className="social-image" src={props.data.web!=''?setTheme=='brightness'?"../images/icons/website_black.png":"../images/icons/website_white.png":"../images/icons/website_inactive.png"}/>
                
}
            </div>
            <div className="social-sub-div" disabled={props.data.dis!=''?true:false}>
                {props.data.dis!=''?<a href={props.data.dis} target='_blank'>
                    <img className="social-image" src={props.data.dis!=''?setTheme=='brightness'?"../images/icons/discord_black.png":"../images/icons/discord_white.png":"../images/icons/discord_inactive.png"}/>
                </a>:
                    <img className="social-image" src={props.data.dis!=''?setTheme=='brightness'?"../images/icons/discord_black.png":"../images/icons/discord_white.png":"../images/icons/discord_inactive.png"}/>
                
}
            </div>
            <div className="social-sub-div" disabled={props.data.face!=''?true:false}>
                {props.data.face!=''?<a href={props.data.face} target='_blank'>
                    <img className="social-image" src={props.data.face!=''?setTheme=='brightness'?"../images/icons/facebook_black.png":"../images/icons/facebook_white.png":"../images/icons/facebook_inactive.png"}/>
                </a>:
                    <img className="social-image" src={props.data.face!=''?setTheme=='brightness'?"../images/icons/facebook_black.png":"../images/icons/facebook_white.png":"../images/icons/facebook_inactive.png"}/>
                
}
            </div>
            <div className="social-sub-div" disabled={props.data.email!=''?true:false}>
                {props.data.email!=''?<a href={'mailto:'+props.data.email}>
                    <img className="social-image" src={props.data.email!=''?setTheme=='brightness'?"../images/icons/email_black.png":"../images/icons/email_white.png":"../images/icons/email_inactive.png"}/>
                </a>:
                    <img className="social-image" src={props.data.email!=''?setTheme=='brightness'?"../images/icons/email_black.png":"../images/icons/email_white.png":"../images/icons/email_inactive.png"}/>
                
}
            </div>
            
        </div>
    )
}
export default SocialList;