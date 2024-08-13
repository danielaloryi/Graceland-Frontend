import React from "react";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";

const DashBoardCards = ({name,number}) => {
  return (
    <div className=" px-5 py-5 shadow-md rounded-[20px] bg-[white] flex items-center justify-between">
      <div>
        <h1 className=" font-bold text-2xl text-[#111927]">{number}</h1>
        <p className=" text-[#9BA6AC] text-[14px]">{name}</p>
      </div>
      <div>
        <SupervisedUserCircleOutlinedIcon
          style={{ color: "#2E3192", fontSize: 50 }}
        />
      </div>
    </div>
  );
};

export default DashBoardCards;
