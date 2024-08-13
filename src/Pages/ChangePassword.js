import React, { useState } from 'react'
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import { Button, CircularProgress, TextField } from '@mui/material';
import axios from 'axios';
import BASEURL from '../Connection/BASEURL';
import SnackBar from '../Components/SnackBar';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slice/UserSlice';

const ChangePassword = () => {

    //#F4C506
    const user = useSelector(selectUser);
    const [username, setusername] = useState(user?.username);
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [successMessgae, setsuccessMessgae] = useState("");
    const [loading, setloading] = useState(false);
    const [successModal, setsuccessModal] = useState(false);
    const [errorMessage, seterrorMessage] = useState("");
    const [erroModal, seterroModal] = useState(false);

    const Change_Password = () => {
        setloading(true);
        const payload = {
            username,
            oldPassword,
            newPassword
        }
        axios.put(`${BASEURL}/users/change-user-password`, payload).then((response) => {
            const data = response.data.message;
            setloading(false);
            setsuccessMessgae(data);
            setsuccessModal(true);
            setnewPassword("");
            setoldPassword("");
        }).catch((err) => {
            setloading(false);
            seterroModal(true);
            if (err.response.data.message)
                return seterrorMessage(err.response.data.message);
            //   else return setErrorMessage(err.response.data.message);
        })
    }

    return (

        <>
            <SnackBar
                action="success"
                autoHideDuration={4000}
                message={successMessgae}
                open={successModal}
                onClose={() => {
                    setsuccessModal(false);
                }}
            />
            <SnackBar
                action="error"
                autoHideDuration={4000}
                message={errorMessage}
                open={erroModal}
                onClose={() => {
                    seterroModal(false);
                }}
            />
            <div className=' grid grid-cols-9'>
                <div className=' col-span-2'>
                    <SideBar />
                </div>
                <div className=' col-span-7 bg-[#D2D2CF]'>
                    <Header />
                    <div className=" mx-8">
                        <h1 className=" font-bold text-3xl pt-5">Change Password</h1>
                    </div>
                    <div className=' mx-72'>
                        <div className=' grid place-items-center mt-20'>
                            <div style={{ border: "1px solid #F5F6F8" }} className=' bg-white shadow-md rounded-[15px] py-8 px-8'>
                                <div className=' space-y-4'>
                                    <TextField label="username" disabled value={username} onChange={(e) => {
                                        setusername(e.target.value);
                                    }} fullWidth placeholder='username' />
                                    <TextField type='password' label="Old password" value={oldPassword} onChange={(e) => {
                                        setoldPassword(e.target.value);
                                    }} fullWidth placeholder='Old Password' />
                                    <TextField type="password" label="New Password" value={newPassword} onChange={(e) => {
                                        setnewPassword(e.target.value);
                                    }} fullWidth placeholder='New Password' />
                                    {loading ? <button className=" bg-[#083050] w-full  p-4 text-white rounded-[6px] font-bold"><CircularProgress size={17} style={{ color: "white" }} /></button> :
                                        <button disabled={!username || !oldPassword || !newPassword} onClick={Change_Password} className=" bg-[#083050] w-full  p-4 text-white rounded-[6px] font-bold">Change Password</button>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>

    )
}

export default ChangePassword;