import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import axios from 'axios';
import BASEURL from '../Connection/BASEURL';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, IconButton, Paper, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const GetClients = () => {
    const navigate = useNavigate();
    const [Get_D, setGet_Deceased] = useState({});
    const location = useLocation();

    useEffect(() => {
        axios.get(`${BASEURL}/clients/${location.state.id}`).then((response) => {
            const data = response.data;
            setGet_Deceased(data);
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    return (
        <>
            <ToastContainer />
            <div className=' grid grid-cols-9'>
                <div className=' col-span-2'>
                    <SideBar />
                </div>
                <div className=' col-span-7 bg-[#D2D2CF]'>
                    <Header />
                    <div className=' mx-8'>
                        <div className=' flex items-center justify-between'>
                            <h1 className=" font-bold text-4xl pt-5"> Customer Details</h1>
                            <div className=' flex items-center space-x-6 mt-4'>

                                <Button style={{ backgroundColor: "#083050", color: "white" }} onClick={() => {
                                    navigate("/new-quote", {
                                        state: {
                                            id: Get_D.tblid
                                        }
                                    });
                                }}>
                                    GET QUOTE
                                </Button>



                                <Button style={{ backgroundColor: "#083050", color: "white" }} onClick={() => {
                                    if (Get_D.tbldeceased === null) {
                                        toast.error("Customer not representing any deceased!! add to generate invoice", {
                                            position: toast.POSITION.TOP_CENTER
                                        });
                                    }
                                    else {
                                        navigate("/new-invoice", {
                                            state: {
                                                id: Get_D.tblid
                                            }
                                        });
                                    }

                                }}>
                                    GET INVOICE
                                </Button>

                                <Button onClick={() => {
                                    navigate(-1);
                                }} style={{ backgroundColor: "#083050", color: "white" }}>BACK</Button>
                            </div>
                        </div>

                        <Paper style={{ marginTop: 20, padding: 15, borderRadius: 15 }}>
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
                                <h1 className=' text-lg text-[#083050] font-semibold '>Address:</h1>

                                <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.daddress}</h1>
                            </div>
                            <div className=' flex items-center space-x-3 pb-2'>
                                <h1 className=' text-lg text-[#083050] font-semibold'>Phone :</h1>
                                <h1 className=' text-lg text-[#083050] font-semibold'>{`0${Get_D.phone}`}</h1>
                            </div>
                            <div className=' flex items-center space-x-3 pb-2'>
                                <h1 className=' text-lg text-[#083050] font-semibold'>Email</h1>
                                <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.email}</h1>
                            </div>
                            <div className=' flex items-center space-x-3 pb-2'>
                                <h1 className=' text-lg text-[#083050] font-semibold '>Relationship :</h1>
                                <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D.relationship}</h1>
                            </div>

                            {
                                Get_D.tbldeceased === null ?
                                    <div className=' py-5 space-y-3'>
                                        <h1 className=' text-[#CC3426]'>Representing No Deceased</h1>
                                        <Button onClick={() => {
                                            navigate("/d-representing");
                                        }} style={{ backgroundColor: "#083050", color: "white" }}>ADD DECEASED INFOrmation</Button>
                                    </div> :
                                    <div className=' mt-6'>
                                        <h1 className=' text-lg text-[#ffffff]  bg-[#CC3426] px-3 w-[22%]'>Deceased Representing</h1>
                                        <div>
                                            <div className=' pb-1 flex items-center space-x-3'>
                                                <h1 className=' text-lg text-[#083050] font-semibold'>Name:</h1>
                                                <div className=' flex items-center space-x-3'>
                                                    <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D?.tbldeceased?.fname}</h1>
                                                    <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D?.tbldeceased?.mname}</h1>
                                                    <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D?.tbldeceased?.lname}</h1>
                                                </div>
                                            </div>
                                            <div className=' flex items-center space-x-3 pb-2'>
                                                <h1 className=' text-lg text-[#083050] font-semibold '>Aged :</h1>
                                                <h1 className=' text-lg text-[#083050] font-semibold'>{Get_D?.tbldeceased?.Aged}</h1>
                                            </div>
                                        </div>
                                    </div>

                            }


                        </Paper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetClients;