import React, { useState, useEffect } from "react"
import {  useLocation} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {getUpdateProjectData} from '../../services/networkService';
import {SET_PROJECT_DATA,SET_PROJECT_DATA_DEFAULT} from "../../actionTypes";
import {Bright_Theme, Dark_Theme, Backendurl} from "../../Constants";
import {category_buttons, functionBtn, functionality} from "../../initialState";
import Switch from '@mui/material/Switch';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import SocialList from "../../Components/SocialList";
import RemoveProjectIcon from '../../Components/Icons/RemoveProjectIcon';
import FunctionalityIcon from '../../Components/Icons/FunctionalityIcon';
import EditIcon from '../../Components/Icons/EditIcon';
import AddForkModal from '../../Components/AddForkModal';
import { useMoralis } from "react-moralis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { BASE_URL } from "../../New folder/service/constants";
import axios from "axios"

const RemoveModal = (props) => {
    // console.log(props)
    const setTheme = useSelector(state => state.setTheme)
    return(
        <div className="modal" id="myRemoveModal" 
                >
            <div className="modal-dialog">
                <div className="modal-content"
                    style={{backgroundColor:setTheme=='brightness'?Bright_Theme.divBackground:Dark_Theme.divBackground,
                        color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color,
                        borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
                
                    <div className="modal-header"
                            style={{borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
                    <h4 className="modal-title">Removing Project</h4>
                    <button type="button" className="close" data-dismiss="modal"
                            style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color}}>&times;</button>
                    </div>
                    
                    <div className="modal-body">
                    Are you sure you want to remove {props.data.forkName}?
                    </div>
                    
                    <div className="modal-footer"
                        style={{borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal"
                            onClick = {()=>props.onUpdateProject(props.data._id, 'removeProject')}>Remove</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
const LinearProgressBar = (props) => {
    const setTheme = useSelector(state => state.setTheme)
    return(
        <div className="review-linear-div" 
                style={{margin:0}}>

            <div className="review-linear-progress" style={{backgroundColor:setTheme=='brightness'?'#dddddd':'#888888',padding:0}}>
                <div className="review-linear-progress-val" 
                    style={{width:props.percent+'%',backgroundColor:setTheme=='brightness'?'#888888':'#eeeeee',margin:0}}></div>
            </div>
            <div className="review-val review-progress-type"><h5 className="progress-label">{props.percent}%</h5></div>
        </div>
    )
}
const AdminProject = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const [getCategory, setCategory] = useState(category_buttons)
    const { authenticate, isAuthenticated, logout,signup,  account, chainId } = useMoralis();
    const [walletAddress,setWalletAddress]=useState('')
    const [getRemoveProject, setRemoveProject] = useState('')
    const [getRemoveProjectIndex, setRemoveProjectIndex] = useState(0)
    let getProjectData = useSelector(state => state.setProjectData)
    const [getForkModal,setForkModal]=useState(false)
    const [getEditData, setEditData] = useState({item:{},index:0})
    const [getEditModal, setEditModal] = useState(false)
    const [getUpcoming, setUpcoming] = useState(getProjectData)
    const [getFunctionBtn, setFunctionBtn] = useState(functionBtn)
    const [functionProgress, setFunctionProgress] = useState(functionBtn)
    const getLoading = useSelector(state => state.setLoading)
    const getSelNum = useSelector(state=> state.setCategory_list)
    const getCategoryBtn = useSelector(state=> state.setCategory_btn)
    useEffect(() => {
        setWalletAddress(account)
        console.log(getProjectData)
        getProjectData.sort((a,b)=>{return b.created_at-a.created_at})
        setUpcoming(getProjectData)
    },[location,AdminProject,getProjectData,getCategoryBtn]);

    const getNowDate = (data) =>{
        var a= new Date(data*1000)
        var b= a.getFullYear()+'-'+(a.getMonth()<9?'0'+(a.getMonth()+1):a.getMonth()+1)+'-'+(a.getDate()<9?'0'+(a.getDate()):a.getDate())

        return b
    }

    const onUpdateProject = async (id,router) => {
        let aa
        await getUpdateProjectData(id,router).then((result) => {
            setRemoveProjectIndex(0)
            switch (router){
                case 'removeProject': aa=getRemovedProject(result);break
                default: aa = getUpdateProject(result);break
            }
            dispatch({type:SET_PROJECT_DATA, payload:aa})
            dispatch({type:SET_PROJECT_DATA_DEFAULT, payload:aa})
        })
    }

    const getUpdateProject = (data) =>{
        let aa = getProjectData;
        let a = aa.map(item=>{return item._id}).indexOf(data._id)
        aa[a]=data
        return [...aa]
    }

    const getRemovedProject = (data) =>{
            let aa = getProjectData;
            let a = aa.map(item=>{return item._id}).indexOf(data)
            aa.splice(a,1)
            return [...aa]
    }
    const onRemove = async (id,index) =>{
        setRemoveProject(id)
        setRemoveProjectIndex(index)
    }

    const onEditModal = async (item,index) =>{
        setForkModal(true)
        setEditModal(true)
        setEditData({item,index})
    }

    const closeModal = () =>{
        setForkModal(false)
        setEditModal(false)
    }

    const sliderChange = (e,val) => {
        
        let num1 = e.target.name.split('-')[0]*1
        let num2 = e.target.name.split('-')[1]*1
        let a = getUpcoming[num1]
        a.functionData[num2] = val 
        setUpcoming([...getUpcoming])
    }

    const getFunctionProgress = (num) => {
        let val = 0
        getUpcoming[num].functionData.forEach(item => {
            val += item
        });
        return val
    }

    const onAdminProjectSave = (num) => {
        axios.post(Backendurl+'updateProjectFunction',getUpcoming[num])
        .then(res=>{
            toast(res.data)
        })
    }

    const onUpdateFunctionality = (num1,num2) => {
        let aa = getProjectData;
        // let a = aa.map(item=>{return item._id}).indexOf(data)
        aa[num1].functionalityData[num2]=!aa[num1].functionalityData[num2]
        // a.functionalityData[num]=!a.functionalityData[num]
        axios.post(Backendurl+'updateProjectFunction',aa[num1])
        .then(res=>{
            if(res.data){
                dispatch({type:SET_PROJECT_DATA, payload:aa})
                dispatch({type:SET_PROJECT_DATA_DEFAULT, payload:aa})
            }
        })    

    }

    const setTheme = useSelector(state => state.setTheme)
    const setMenu = useSelector(state => state.setMenu)

    return (
        <div className="main-board" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.divBackground:Dark_Theme.divBackground}}>
            {getUpcoming.length>0&&<RemoveModal data={getUpcoming[getRemoveProjectIndex]} onUpdateProject={onUpdateProject}/>}
            <AddForkModal walletAddress={account} setModal={getForkModal} data={getEditData} isEditModal={getEditModal} getSaveModal_f={false} closeModal={()=>closeModal()} />
            <ToastContainer/>
            <table className="table table-striped table-responsive" style={{color:setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color, width: (setMenu === "partmenu") ? "calc(100vw - 50px)" : "calc(100vw - 210px)" , overflow: "scroll"}}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Fork</th>
                        <th>Network</th>
                        <th>Social</th>
                        <th>Functions</th>
                        <th>Functionality</th>
                        <th>Landing</th>
                        <th>Featured</th>
                        <th>Hot</th>
                        <th>Trending</th>
                        <th>Top rated</th>
                        <th>Approve</th>
                        <th>Dead</th>
                        <th>Rug</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {getUpcoming.map((item, index)=>{
                        if(!getSelNum && getSelNum==0||item.fork==getCategory[getSelNum].title)
                        return <><tr key={index} style={{borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border,
                                                    position:'relative'}}> 
                            <td>{index+1}</td>
                            <td className="d-flex"><img className="table-avarta" src={item.image}/><p className="table-title">{item.forkName}</p>
                                {item.isNew==true&&<div className="new-label">NEW</div>}
                            </td>
                            <td>{item.checkValue=='yes'?getNowDate(item.launchDate):'In Developemnt'}</td>

                            <td>{item.fork}</td>
                            <td>{item.network}</td>
                            <td>
                                <div className="">
                                    <SocialList data={item.socialData}/>
                                </div>
                            </td>
                            <td>
                                <div className="row fear-button-div"
                                style={{padding:0,width:'100px'}}
                                data-toggle="collapse" data-target={'#project-sub-menu-'+index}>
                                {/* <BorderLinearProgress variant="determinate" value={50} /> */}
                                <LinearProgressBar label={'KYC'} percent={getFunctionProgress(index)}/>
                                </div>
                            </td>
                            <td>
                                <div className="functionality-div"
                                    data-toggle="collapse" data-target={'#project-sub-functionality-'+index}>
                                    <FunctionalityIcon/>
                                </div>
                            </td>
                            <td><Switch checked={item.landing==true?true:false} onChange={()=>onUpdateProject(item._id,'updateAdminLanding')} defaultValue/></td>
                            <td><Switch checked={item.featured==true?true:false} onChange={()=>onUpdateProject(item._id,'updateAdminFeatured')} defaultValue/></td>
                            <td><Switch checked={item.hot==true?true:false} onChange={()=>onUpdateProject(item._id,'updateAdminHot')} defaultValue/></td>
                            <td><Switch checked={item.trending==true?true:false} onChange={()=>onUpdateProject(item._id,'updateAdminTrending')} defaultValue/></td>
                            <td><Switch checked={item.top==true?true:false} onChange={()=>onUpdateProject(item._id,'updateAdminTop')} defaultValue/></td>
                            <td><Switch checked={item.approved==true?true:false} onChange={()=>onUpdateProject(item._id,'updateAdminApprove')} defaultValue/></td>
                            <td><Switch checked={item.dead==true?true:false} onChange={()=>onUpdateProject(item._id,'updateAdminDead')} defaultValue/></td>
                            <td><Switch checked={item.ruged==true?true:false} onChange={()=>onUpdateProject(item._id,'updateAdminRug')} defaultValue/></td>
                            <td className="d-flex">
                                <div className="project-remove-div" onClick={()=>onEditModal(item,index)}>
                                    <EditIcon 
                                        
                                        color={setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color} />
                                </div>
                                <div className="project-remove-div" onClick={()=>onRemove(item._id,index)} data-toggle="modal" data-target="#myRemoveModal">
                                    <RemoveProjectIcon 
                                        
                                        color={setTheme=='brightness'?Bright_Theme.font_color:Dark_Theme.font_color} />
                                </div>
                            </td>
                        </tr>
                        <tr className="collapse" id={'project-sub-menu-'+index} 
                             style={{borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
                            <td colSpan={15}>
                                <div  className="project-sub-menu panel-collapse rows" id='project-sub-menu' 
                                style={{borderColor:setTheme=='brightness'?'#d5d5d5':'#2a2a2a',
                                    backgroundColor:setTheme=='brightness'?'white':'#111827',
                                    position: 'absulute'}}>
                                        {item.functionData.map((item2,index2)=>{
                                            return<div key={index2} className="slider-div" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.divBackground:'#161e30'}}>
                                            <p>{functionBtn[index2].title}</p>
                                            {/* <Box width={300}> */}
                                            <div className="slider-con">
                                                <Slider defaultValue={0} name={index+'-'+index2} max={10} value={item2} onChange={sliderChange} aria-label="Default" valueLabelDisplay="auto" />
                                            </div>{/* </Box> */}
                                        </div>})}
                                </div>
                            </td>
                            <td>
                                <button onClick={()=>onAdminProjectSave(index)}>Save</button>
                            </td>
                        </tr>
                        <tr className="collapse" id={'project-sub-functionality-'+index} 
                             style={{borderColor:setTheme=='brightness'?Bright_Theme.card_border:Dark_Theme.card_border}}>
                            <td colSpan={16}>
                                <div  className="project-sub-menu panel-collapse rows" id='project-sub-menu' 
                                style={{borderColor:setTheme=='brightness'?'#d5d5d5':'#2a2a2a',
                                    backgroundColor:setTheme=='brightness'?'white':'#111827',
                                    position: 'absulute'}}>
                                        <div className=" row func1" style={{borderColor:setTheme=='brightness'?'#d5d5d5':'#2a2a2a'}}>
                                        {item.functionalityData.map((item2,index2)=>{
                                            if(index2<4)return <div key={index2}  className="slider-div slider-div-1 d-flex" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.divBackground:'#161e30'}}>
                                                    <p>{functionality[index2].title}</p>
                                                    <Switch checked={item2==true?true:false} onChange={()=>onUpdateFunctionality(index,index2)} defaultValue/>
                                                </div>
                                        })}
                                        </div>
                                        <div  className=" row func2">
                                        {item.functionalityData.map((item2,index2)=>{
                                            if(index2>3)return <div key={index2}  className="slider-div slider-div-1 d-flex" style={{backgroundColor:setTheme=='brightness'?Bright_Theme.divBackground:'#161e30'}}>
                                                    <p>{functionality[index2].title}</p>
                                                    <Switch checked={item2==true?true:false} onChange={()=>onUpdateFunctionality(index,index2)} defaultValue/>
                                                </div>
                                        })}
                                        </div>
                                </div>
                            </td>
                        </tr>
                        </>
                    })}

                </tbody>
            </table>
        </div>
    )
}
export default AdminProject;