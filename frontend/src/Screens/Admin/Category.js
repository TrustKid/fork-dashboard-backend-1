import React, { useState, useEffect, useRef } from "react"
import {  useLocation} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {getUpdateProjectData} from '../../services/networkService';
import {SET_FORK_DATA, 
        SET_NETWORK_DATA,
        UPDATE_NETWORK_DATA,
        UPDATE_FORK_DATA} from "../../actionTypes";
import {Bright_Theme, Dark_Theme, Backendurl} from "../../Constants";
import {category_buttons, functionBtn} from "../../initialState";
import Switch from '@mui/material/Switch';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import SocialList from "../../Components/SocialList";
import RemoveProjectIcon from '../../Components/Icons/RemoveProjectIcon';
import EditIcon from '../../Components/Icons/EditIcon';
import AddForkModal from '../../Components/AddForkModal';
import { useMoralis } from "react-moralis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { BASE_URL } from "../../New folder/service/constants";
import axios from "axios"


const Category = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const forkInput = useRef(null)
    const networkInput = useRef(null)
    const [isUpdateNetwork, setIsUpdateNetwork] = useState(false)
    const [selNetworkNum, setSelNetworkNum] = useState(0)
    const [isUpdateFork, setIsUpdateFork] = useState(false)
    const [selForkNum, setSelForkNum] = useState(0)
    const getFork = useSelector(state => state.getFork)
    const getNetwork = useSelector(state => state.getNetwork)
    const setTheme = useSelector(state => state.setTheme)

    const onAdd = (router) => {
        if(router=='addfork'?forkInput.current.value!='': networkInput.current.value!=''){
            axios.post(Backendurl+router,{data:router=='addfork'?forkInput.current.value:networkInput.current.value})
            .then((res)=>{
                switch (router){
                    case 'addfork':
                        let a=getFork
                        a.push(res.data.result)
                        dispatch({type:SET_FORK_DATA,payload: a})
                        forkInput.current.value='';break
                    case 'addnetwork':
                        let b=getNetwork
                        b.push(res.data.result)
                        dispatch({type:SET_NETWORK_DATA,payload: b})
                        networkInput.current.value='';break
                }
            })
        }
    }

    const onEditNetwork = (num) => {
        setIsUpdateNetwork(true)
        setSelNetworkNum(num)
        networkInput.current.value = getNetwork[num].network
    }
    const onCancelNetwork = () => {
        setIsUpdateNetwork(false)
        networkInput.current.value = ''
    }

    const onEditFork = (num) => {
        setIsUpdateFork(true)
        setSelForkNum(num)
        forkInput.current.value = getFork[num].fork
    }
    const onCancelFork = () => {
        setIsUpdateFork(false)
        forkInput.current.value = ''
    }

    const onUpdateNetwork = () => {
        axios.post(Backendurl+'updateNetwork',{_id:getNetwork[selNetworkNum]._id,network:networkInput.current.value, created_at:getNetwork[selNetworkNum].created_at})
        .then((res)=>{
            dispatch({type:SET_NETWORK_DATA,payload:getUpdateNetwork(res.data,'updateNetwork')})
            onCancelNetwork()
        })
    }
    const onUpdateFork = () => {
        axios.post(Backendurl+'updateFork',{_id:getFork[selForkNum]._id,fork:forkInput.current.value,state:getFork[selForkNum].state, created_at:getFork[selForkNum].created_at})
        .then((res)=>{
            dispatch({type:SET_FORK_DATA,payload:getUpdateNetwork(res.data,'updateFork')})
            onCancelFork()
        })
    }
const getUpdateNetwork = (data,router) =>{
        switch (router){
            case 'updateFork':let aa = getFork;
                                let a = aa.map(item=>{return item._id}).indexOf(data._id)
                                aa[a]=data
                                return [...aa];break
            case 'updateNetwork':let bb = getNetwork;
                                let b = bb.map(item=>{return item._id}).indexOf(data._id)
                                bb[b]=data
                                return [...bb];break
            }
}
    
    const onDelete = (id,router) => {
            axios.post(Backendurl+router,{id})
            .then((res)=>{
                dispatch({type:router=='deletefork'?SET_FORK_DATA:SET_NETWORK_DATA,payload:getDeleteFork(res.data,router)})
            })
    }
    const getDeleteFork = (data,router) =>{
        switch (router){
            case 'deletefork':let aa = getFork;
                                let a = aa.map(item=>{return item._id}).indexOf(data)
                                aa.splice(a,1)
                                return [...aa];break
            case 'deletenetwork':let bb = getNetwork;
                                let b = bb.map(item=>{return item._id}).indexOf(data)
                                bb.splice(b,1)
                                return [...bb];break
            }
}
    return (
        <div className="main-board" 
                style={{backgroundColor:setTheme=='brightness'?Bright_Theme.divBackground:Dark_Theme.divBackground,
                        marginTop: '34px'}}>
            {/* {getUpcoming.length>0&&<RemoveModal data={getUpcoming[getRemoveProjectIndex]} onUpdateProject={onUpdateProject}/>} */}
            <div className="category-board d-flex"style={{backgroundColor:setTheme=='brightness'?'white':'#161e30'}}>
                <div className="sub-category sub-category-1" style={{borderColor:setTheme=='brightness'?'#bababa':'#666666'}}>
                    <h4 style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>Fork categories</h4>
                    <table className="table table-striped" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Fork</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getFork.map((item, index)=>{
                                return<tr key={index}> 
                                    <td>{index+1}</td>
                                    <td>{item.fork}</td>
                                    <td className="d-flex">
                                        <div className="project-remove-div" onClick={()=>onEditFork(index)}>
                                            <EditIcon color={setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color} />
                                        </div>
                                        <div className="project-remove-div" onClick={()=>onDelete(item._id,'deletefork')} data-toggle="modal" data-target="#myRemoveModalwhitelist">
                                            <RemoveProjectIcon 
                                                color={setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color} />
                                        </div>
                                    </td>
                                    </tr>
                            })}
                        </tbody>
                    </table>
                    <div className="d-flex">
                        <input ref={forkInput}  className="form-control"  
                                style={{backgroundColor:setTheme=='brightness'?'#f3f4f6':'#292f3d',
                                color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color,
                                    borderColor:setTheme=='brightness'?'#bababa':'#666666'}}/>
                        {!isUpdateFork?<button className="btn btn-primary category-add-btn"
                            onClick={()=>onAdd('addfork')}>Add</button>
                        :<><button className="btn btn-primary category-add-btn"
                            onClick={()=>onUpdateFork('addfork')}>Update</button>
                        <button className="btn btn-danger category-add-btn"
                            onClick={()=>onCancelFork()}>Cancel</button>
                        </>}

                    </div>
                </div>
                <div className="sub-category">
                <h4 style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>Network categories</h4>
                    <table className="table table-striped" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Network</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getNetwork.map((item, index)=>{
                                return<tr key={index}> 
                                    <td>{index+1}</td>
                                    <td>{item.network}</td>
                                    <td className="d-flex">
                                        <div className="project-remove-div" onClick={()=>onEditNetwork(index)}>
                                            <EditIcon color={setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color} />
                                        </div>
                                        <div className="project-remove-div" onClick={()=>onDelete(item._id,'deletenetwork')} data-toggle="modal" data-target="#myRemoveModalwhitelist">
                                            <RemoveProjectIcon 
                                                color={setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color} />
                                        </div>
                                    </td>
                                    </tr>
                            })}
                        </tbody>
                    </table>
                    <div className="d-flex">
                        <input ref={networkInput}  className="form-control" 
                                style={{backgroundColor:setTheme=='brightness'?'#f3f4f6':'#292f3d',
                                color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color,
                                borderColor:setTheme=='brightness'?'#bababa':'#666666'}} />
                        {!isUpdateNetwork?<button className="btn btn-primary category-add-btn"
                            onClick={()=>onAdd('addnetwork')}>Add</button>
                        :<><button className="btn btn-primary category-add-btn"
                            onClick={()=>onUpdateNetwork('addnetwork')}>Update</button>
                        <button className="btn btn-danger category-add-btn"
                            onClick={()=>onCancelNetwork()}>Cancel</button>
                        </>}

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Category;