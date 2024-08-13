import React, { useState } from "react";
// import logo from "../Assets/icon.png";
import { CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import axios from "axios";
import BASEURL from "../Connection/BASEURL";
import SnackBar from "../Components/SnackBar";
import { useDispatch } from "react-redux";
import { Add_User } from "../Redux/Slice/UserSlice";
import backgroundImage from "../Assets/cemetry.jpg";
import image4 from "../Assets/4.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [openErrorMessageModal, setopenErrorMessageModal] = useState("");


  const SignUser = () => {

    setloading(true);
    const payload = {
      username,
      password
    }
    axios.post(`${BASEURL}/users/login`, payload).then((response) => {
      setloading(false);
      const data = response.data;
      // console.log(data);
      if (data) {
        navigate("/dashboard");
        dispatch(Add_User({
          username: data.user.username,
          password: data.user.password,
          role: data.user.role
        }))
      }
    }).catch((err) => {
      setloading(false);
      setopenErrorMessageModal(true);
      if (err.response.data.error)
        return setErrorMessage(err.response.data.error);
      else return setErrorMessage(err.response.data.message);
    })
  }

  return (


    <>
      <SnackBar
        action="error"
        autoHideDuration={4000}
        message={ErrorMessage}
        open={openErrorMessageModal}
        onClose={() => {
          setopenErrorMessageModal(false);
        }}
      />
      <div className=" grid grid-cols-10">
        <div style={{
          backgroundImage: `linear-gradient(to bottom, rgba(14, 36, 74, 0.8), rgba(14, 36, 74, 0.4)), url(${backgroundImage})`,
          backgroundSize: "cover",
        }} className=" col-span-5 hidden lg:block bg-[#083050]">
        
          <div className=" lg:w-[80%] w-[100%] grid place-items-center h-screen">
            <div className=" pl-0 lg:pl-5 space-y-3">
              <h1 className=" text-2xl lg:text-5xl text-white font-bold">
                WELCOME TO
              </h1>
              <h1 className="  text-2xl lg:text-5xl text-white font-bold">GRACELAND MEMORIAL</h1>
              <h1 className="  text-2xl lg:text-5xl text-white font-bold"> MANAGEMENT  <span className=" text-[#CC3426]  text-2xl lg:text-5xl font-bold text-center">SYSTEM</span></h1>
            </div>
          </div>
        </div>
        <div className="col-span-10 lg:col-span-5">
          <div className="  grid place-items-center h-screen lg:mx-16 mx-2">
            <div
              style={{ border: "1px solid #F5F6F8" }}
              className=" bg-white rounded-3xl shadow-xl w-full px-6 mx-4 "
            >
              <div className=" space-y-3 pb-7 pt-9">
                <h1 className=" font-bold text-3xl">Login</h1>
                <p className=" text-[#888294]">
                  Kindly login with a valid credential
                </p>
              </div>
              <div>
                <div className=" space-y-8">
                  <TextField value={username} onChange={(e) => {
                    setuser(e.target.value)
                  }} fullWidth placeholder="" label="username" />
                  <TextField value={password} type="password" onChange={(e) => {
                    setpassword(e.target.value)
                  }} fullWidth label="Password" />
                </div>
                <div className=" mt-5 pb-10">
                  {loading ?
                    <button

                      className=" bg-[#083050] w-full p-4 text-white rounded-[6px] font-bold"
                    >
                      <CircularProgress size={17} style={{ fontSize: 14, color: "white" }} />
                    </button> :
                    <button
                      disabled={!username || !password}
                      onClick={SignUser}
                      className=" bg-[#083050] w-full p-4 text-white rounded-[6px] font-bold"
                    >
                      Log in
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Login;
