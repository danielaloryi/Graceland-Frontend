import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import axios from 'axios';
import BASEURL from '../Connection/BASEURL';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Paper } from '@mui/material';
import dayjs from 'dayjs';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';

const GetDeceased = () => {
    const navigate = useNavigate();
    const [Get_D, setGet_Deceased] = useState({});
    const location = useLocation();

    useEffect(() => {
        axios.get(`${BASEURL}/deceased/${location.state.id}`).then((response) => {
            const data = response.data;
            setGet_Deceased(data);
        })
    }, [])


    return (
        <div className=' grid grid-cols-9'>
            <div className=' col-span-2'>
                <SideBar />
            </div>
            <div className=' col-span-7 bg-[#D2D2CF]'>
                <Header />
                <div className=' mx-8'>
                    <div className=' flex items-center justify-between'>
                        <h1 className=" font-bold text-4xl pt-5"> Deceased Details</h1>
                        <div className=' flex space-x-3 items-center mt-3'>
                            <Button onClick={() => {
                                navigate("/new-deceased-invoice", {
                                    state: {
                                        id: Get_D.tblid
                                    }
                                })
                            }} style={{ backgroundColor: "#083050", color: "white" }}>Print invoice</Button>
                            <Button onClick={() => {
                                navigate(-1);
                            }} style={{ backgroundColor: "#083050", color: "white" }}>BACK</Button>
                        </div>
                    </div>

                    <Paper style={{ marginTop: 20, padding: 15, borderRadius: 15,marginBottom:20 }}>
                        <div className=' pb-2 flex items-center space-x-3'>
                            <h1 className=' text-lg text-[#083050] font-semibold'>Name:</h1>
                            <div className=' flex items-center space-x-3'>
                                <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.fname}</h1>
                                <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.mname}</h1>
                                <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.lname}</h1>
                            </div>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold' >Gender :</h1>
                            <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.gender}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold' >Aged :</h1>
                            <h1 className=' text-lg text-[#083050] font-semibold'>{`${Get_D.Aged} Years`}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold'>Date of Birth :</h1>

                            <h1 className=' text-lg text-[#083050] font-semibold'>{dayjs(Get_D.dob).format('MMMM DD, YYYY')}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold'>Date of Death :</h1>
                            <h1 className=' text-lg text-[#083050] font-semibold'>{dayjs(Get_D.dod).format('MMMM DD, YYYY')}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold' >Bed Position :</h1>
                            <h1 className=' text-lg text-[#CC3426] font-semibold '>{Get_D.bed}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold '>Place of Death : </h1>
                            <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.placeofdeath}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold'>Occupation :</h1>
                            <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.occupation}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold'>Religion :</h1>
                            <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.religion}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold'>Name of Witness :</h1>
                            <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.nameofwitness}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold'> Address of Witness :</h1>
                            <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.daddressofwitness}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold'>Phone of Witness :</h1>
                            <h1 className=' text-lg text-[#083050] font-semibold'>{`0${Get_D.phoneofwitness}`}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold'>Digital Address of Witness :</h1>
                            <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.daddressofwitness}</h1>
                        </div>
                        <div className=' flex items-center space-x-3 pb-2'>
                            <h1 className=' text-lg text-[#083050] font-semibold '>Date of Burial :</h1>
                            <h1 className=' text-lg text-[#083050] font-semibold'>{dayjs(Get_D.dobrial).format('MMMM DD, YYYY')}</h1>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default GetDeceased