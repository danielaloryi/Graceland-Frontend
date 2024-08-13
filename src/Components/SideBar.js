import {
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../Assets/logo.png";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/Slice/UserSlice";
import image1 from "../Assets/3.png";


const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);



  const handleClickRoute = (route) => {
    navigate(route);
  };

  const isActive = (route) => {
    return location.pathname === route;
  };
  const Icon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
      color="#8B91A1"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
      />
    </svg>
  );

  const AccountStatements = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
      color="#8B91A1"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
      />
    </svg>
  );

  const MembersIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
      color="#8B91A1"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  );

  const Debit = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
        color="#8B91A1"
      />
    </svg>
  );
  const Loan = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      color="#8B91A1"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        color="#8B91A1"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const AccountMember = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      color="#8B91A1"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );

  const [CreditDropDown, setCreditDropDown] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [FeeMgtDropDown, setFeeMgtDropDown] = useState(false);
  const [registerDrown, setregisterDrown] = useState(false);
  const [BedAllocationDropdown, setBedAllocationDropdown] = useState(false);

  return (

    <div
      style={{}}
      className="bg-[#083050] h-screen sticky z-50  top-0 overflow-y-auto"
    >
      <div className=" flex space-x-3 items-center py-7  px-7">
        <div className="">
          <h1 className=" text-white">GRACELAND MEMORIAL GARDEN</h1>

          <div className=" flex items-center mt-5 space-x-5">
            <Avatar
              src={image1}
              style={{ backgroundColor: "#CC3426", width: 80, height: 80 }}
            > </Avatar>
            <div>
              <h1 className=" text-lg font-bold text-white">{user?.role}</h1>
              <p className=" text-[#9299A6]">{user?.username}</p>
            </div>

          </div>
        </div>

      </div>
      <List style={{ paddingLeft: 10, paddingRight: 10 }}>
        <ListItemButton
          selected={isActive("/dashboard")}
          onClick={() => handleClickRoute("/dashboard")}
          style={{
            margin: 8,
            paddingTop: 6,
            paddingBottom: 6,
            borderRadius: 5,
            backgroundColor: isActive("/dashboard") ? "#CC3426" : "initial",
          }}
        >
          <ListItemIcon>
            <svg color={isActive("/dashboard") ? "white" : "#8B91A1"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>

          </ListItemIcon>
          <ListItemText
            className={
              location.pathname === "/dashboard"
                ? " text-white font-bold"
                : "text-[14px] text-[#9299A6] font-bold"
            }
            // className=" text-[14px] text-[#9299A6]"
            // style={{ fontWeight: "bold" }}
            primary="Dashboard"
          // Manage Done Assigning
          />

        </ListItemButton>








        <div className="px-2">
          <ListItemButton
            onClick={() => {
              setregisterDrown(!registerDrown);
            }}

          >
            <ListItemIcon>
              <svg color={isActive("/register") ? "white" : "#8B91A1"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>

            </ListItemIcon>
            <ListItemText
              className={
                location.pathname === "/register"
                  ? " text-white font-bold"
                  : "text-[14px] text-[#9299A6] font-bold"
              }
              primary="Register"
            />
            {registerDrown ? (
              <ExpandMore style={{ color: "#9299A6" }} />
            ) : (
              <ChevronRightIcon style={{ color: "#9299A6" }} />
            )}
          </ListItemButton>
        </div>
        <div className=" pl-16">
          <Collapse in={registerDrown} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                selected={isActive("/issue-quote")}
                onClick={() => handleClickRoute("/issue-quote")}
                style={{
                  margin: 8,
                  paddingTop: 4,
                  paddingBottom: 4,
                  borderRadius: 5,
                  backgroundColor: isActive("/issue-quote") ? "#CC3426" : "initial",
                }}
              >
                <ListItemText
                  primary="Issue Quote"
                  className={
                    location.pathname === "/issue-quote"
                      ? " text-white font-bold text-xs"
                      : "text-[14px] text-[#9299A6] font-bold"
                  }
                />
              </ListItemButton>
              <ListItemButton
                selected={isActive("/issue-invoice")}
                onClick={() => handleClickRoute("/issue-invoice")}
                style={{
                  margin: 8,
                  paddingTop: 4,
                  paddingBottom: 4,
                  borderRadius: 5,
                  backgroundColor: isActive("/issue-invoice") ? "#CC3426" : "initial",
                }}
              >
                <ListItemText
                  primary="Issue Invoice"
                  className={
                    location.pathname === "/issue-invoice"
                      ? " text-white font-bold text-xs"
                      : "text-[14px] text-[#9299A6] font-bold"
                  }
                />
              </ListItemButton>
            </List>
          </Collapse>
        </div>

        <ListItemButton
          selected={isActive("/all-data")}
          onClick={() => handleClickRoute("/all-data")}
          style={{
            margin: 8,
            paddingTop: 6,
            paddingBottom: 6,
            borderRadius: 5,
            backgroundColor: isActive("/all-data") ? "#CC3426" : "initial",
          }}
        >
          <ListItemIcon>
            <svg color={isActive("/all-data") ? "white" : "#8B91A1"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>

          </ListItemIcon>
          <ListItemText
            className={
              location.pathname === "/all-data"
                ? " text-white font-bold"
                : "text-[14px] text-[#9299A6] font-bold"
            }
            // className=" text-[14px] text-[#9299A6]"
            // style={{ fontWeight: "bold" }}
            primary="All Customers"
          // Manage Done Assigning
          />
        </ListItemButton>


        <ListItemButton
          selected={isActive("/all-deceased")}
          onClick={() => handleClickRoute("/all-deceased")}
          style={{
            margin: 8,
            paddingTop: 6,
            paddingBottom: 6,
            borderRadius: 5,
            backgroundColor: isActive("/all-deceased") ? "#CC3426" : "initial",
          }}
        >
          <ListItemIcon>
            <svg color={isActive("/all-deceased") ? "white" : "#8B91A1"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>

          </ListItemIcon>
          <ListItemText
            className={
              location.pathname === "/all-deceased"
                ? " text-white font-bold"
                : "text-[14px] text-[#9299A6] font-bold"
            }
            // className=" text-[14px] text-[#9299A6]"
            // style={{ fontWeight: "bold" }}
            primary="All Deceased"
          // Manage Done Assigning
          />
        </ListItemButton>




        {user.role === "Manager" ? null :
          <>
            <div className=" px-2">
              <ListItemButton
                onClick={() => {
                  setFeeMgtDropDown(!FeeMgtDropDown);
                }}
              >
                <ListItemIcon
                >
                  <svg color={isActive("/fee-management") ? "white" : "#8B91A1"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>

                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/fee-management"
                      ? " text-white font-bold"
                      : "text-[14px] text-[#9299A6] font-bold"
                  }
                  // className=" text-[14px] text-[#9299A6]"
                  // style={{ fontWeight: "bold" }}
                  primary="Fee Management"
                // Manage Done Assigning
                />
                {FeeMgtDropDown ? (
                  <ExpandMore style={{ color: "#9299A6" }} />
                ) : (
                  <ChevronRightIcon style={{ color: "#9299A6" }} />
                )}
              </ListItemButton>
            </div>

            <div className=" pl-16">
              <Collapse in={FeeMgtDropDown} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    selected={isActive("/fee-payment")}
                    onClick={() => handleClickRoute("/fee-payment")}
                    style={{ borderRadius: 10, paddingTop: 4, paddingBottom: 4 }}
                  >
                    <ListItemText
                      primary="Set/ Edit Fees"
                      className={
                        location.pathname === "/fee-payment"
                          ? " text-white font-bold text-xs"
                          : "text-[14px] text-[#9299A6] font-bold"
                      }
                    />
                  </ListItemButton>

                 
                </List>
              </Collapse>
            </div>


            <ListItemButton
              selected={isActive("/users")}
              onClick={() => handleClickRoute("/users")}
              style={{
                margin: 8,
                paddingTop: 6,
                paddingBottom: 6,
                borderRadius: 5,
                backgroundColor: isActive("/users") ? "#CC3426" : "initial",
              }}
            >
              <ListItemIcon>
                <svg color={isActive("/users") ? "white" : "#8B91A1"}
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>

              </ListItemIcon>
              <ListItemText
                className={
                  location.pathname === "/users"
                    ? " text-white font-bold"
                    : "text-[14px] text-[#9299A6] font-bold"
                }
                // className=" text-[14px] text-[#9299A6]"
                // style={{ fontWeight: "bold" }}
                primary="Users"
              // Manage Done Assigning
              />
            </ListItemButton>
          </>
        }



















        <div className=" px-2">
          <ListItemButton
            onClick={() => {
              setBedAllocationDropdown(!BedAllocationDropdown);
            }}
          >
            <ListItemIcon
            >
              <svg color={isActive("/fee-management") ? "white" : "#8B91A1"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>

            </ListItemIcon>
            <ListItemText
              className={
                location.pathname === "/fee-management"
                  ? " text-white font-bold"
                  : "text-[14px] text-[#9299A6] font-bold"
              }
              // className=" text-[14px] text-[#9299A6]"
              // style={{ fontWeight: "bold" }}
              primary="Bed Allocations"
            // Manage Done Assigning
            />
            {FeeMgtDropDown ? (
              <ExpandMore style={{ color: "#9299A6" }} />
            ) : (
              <ChevronRightIcon style={{ color: "#9299A6" }} />
            )}
          </ListItemButton>
        </div>
        <div className=" pl-16  bg-[#083050]">
          <Collapse in={BedAllocationDropdown} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
           
            <ListItemButton
            selected={isActive("/naming-convention")}
            onClick={() => handleClickRoute("/naming-convention")}
            style={{ borderRadius: 10, paddingTop: 4, paddingBottom: 4 }}
          >
            <ListItemText
              primary="Bed Naming"
              className={
                location.pathname === "/naming-convention"
                  ? " text-white font-bold text-xs"
                  : "text-[14px] text-[#9299A6] font-bold"
              }
            />
          </ListItemButton>
              <ListItemButton
                selected={isActive("/all-beds")}
                onClick={() => handleClickRoute("/all-beds")}
                style={{ borderRadius: 10, paddingTop: 4, paddingBottom: 4 }}
              >
                <ListItemText
                  primary="All Beds"
                  className={
                    location.pathname === "/all-beds"
                      ? " text-white font-bold text-xs"
                      : "text-[14px] text-[#9299A6] font-bold"
                  }
                />
              </ListItemButton>

              <ListItemButton
                selected={isActive("/create-new-bed")}
                onClick={() => handleClickRoute("/create-new-bed")}
                style={{ borderRadius: 10, paddingTop: 4, paddingBottom: 4 }}
              >
                <ListItemText
                  primary="Create New Beds"
                  className={
                    location.pathname === "/create-new-bed"
                      ? " text-white font-bold text-xs"
                      : "text-[14px] text-[#9299A6] font-bold"
                  }
                />
              </ListItemButton>

              <ListItemButton
                selected={isActive("/edit/bed/")}
                onClick={() => handleClickRoute("/edit/bed/")}
                style={{ borderRadius: 10, paddingTop: 4, paddingBottom: 4 }}
              >
                <ListItemText
                  primary="Edit Beds"
                  className={
                    location.pathname === "/edit/bed/"
                      ? " text-white font-bold text-xs"
                      : "text-[14px] text-[#9299A6] font-bold"
                  }
                />
              </ListItemButton>

              <ListItemButton
                selected={isActive("/delete/beds/")}
                onClick={() => handleClickRoute("/delete/beds/")}
                style={{ borderRadius: 10, paddingTop: 4, paddingBottom: 4 }}
              >
                <ListItemText
                  primary="Delete Beds"
                  className={
                    location.pathname === "/delete/beds/"
                      ? " text-white font-bold text-xs"
                      : "text-[14px] text-[#9299A6] font-bold"
                  }
                />
              </ListItemButton>

            </List>
          </Collapse>
        </div>



      </List>
    </div>
  );
};

export default SideBar;



// <ListItemButton
//   selected={isActive("/edit-fees")}
//   onClick={() => handleClickRoute("/edit-fees")}
//   style={{ borderRadius: 10, paddingTop: 4, paddingBottom: 4 }}
// >
//   <ListItemText
//     primary="Edit Fees and Tax"
//     className={
//       location.pathname === "/edit-fees"
//         ? " text-white font-bold text-xs"
//         : "text-[14px] text-[#9299A6] font-bold"
//     }
//   />
// </ListItemButton>