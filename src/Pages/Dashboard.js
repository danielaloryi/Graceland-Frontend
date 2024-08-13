import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../Assets/icon.png";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import DashBoardCards from "../Components/DashboardCards";
import Graph from "../Components/Graph";
import axios from "axios";
import BASEURL from "../Connection/BASEURL";

const Dasboard = () => {
  const [all_client, setall_client] = useState([]);
  useEffect(() => {

    axios.get(`${BASEURL}/clients/all_clients`).then((response) => {
      const data = response.data;
      setall_client(data)
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  const [all_deaceased, setall_deaceased] = useState([]);

  useEffect(() => {

    axios.get(`${BASEURL}/deceased/`).then((response) => {
      const data = response.data;
      setall_deaceased(data)
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  const [All_Users, setAll_Users] = useState([])

  useEffect(() => {

    axios.get(`${BASEURL}/users/all_users`).then((response) => {
      const data = response.data;
      setAll_Users(data)
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div className=" grid grid-cols-9">
      <div className="col-span-2 hidden lg:block">
        <SideBar />
      </div>
      <div className="col-span-10 lg:col-span-7 bg-[#D2D2CF]">
        <Header />
        <div className="  h-screen p-3 lg:p-7">
          <h1 className=" text-2xl lg:text-4xl font-bold  text-[#111927]">Dashboard</h1>
          <div className=" grid grid-cols-1 lg:grid-cols-3 gap-3 pt-5 ">
            <DashBoardCards name="Customers" number={all_client?.length} />
            <DashBoardCards name="Deceased" number={all_deaceased?.length} />
            <DashBoardCards name="Users" number={All_Users?.length} />
          </div>
          <div>
            <div className=" mt-4 ">
              <Graph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
