import { Drawer } from "antd/lib";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { ClearUser, selectUser } from "../Redux/Slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import SideBar from "../Components/SideBar";
import Avatarimage from "../Assets/avatar-omar-darboe.png"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DashboardMobileHeader = () => {
  const user = useSelector(selectUser);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const [openDrawer, setopenDrawer] = useState(false);

  const onClose = () => {
    setopenDrawer(false);
  };
  return (
    <>
      <Drawer
        closable={false}
        //  title={
        //    <p className="text-center text-white pt-2 text-xs">
        //      Digital Assets Register
        //    </p>
        //  }
        headerStyle={{ padding: 0, backgroundColor: "#3F3A64" }}
        destroyOnClose={true}
        bodyStyle={{ padding: 0, backgroundColor: "#3F3A64" }}
        width="80%"
        placement="left"
        onClose={onClose}
        open={openDrawer}
      >
        <SideBar />
      </Drawer>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Logout Notification"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              navigate("/login");
              dispatch(ClearUser());
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClickOpenDialog}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <div className="flex justify-between items-center px-3 lg:hidden py-2 bg-[white] shadow-md  sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <IconButton
            onClick={() => {
              setopenDrawer(true);
            }}
          >
            <MenuIcon style={{ color: "#3F3A64", fontSize: 30 }} />
          </IconButton>
          <p className="text-xl text-[#3F3A64]"></p>
        </div>
        <div>
          <h1 className=" text-[#3F3A64] font-semibold">GRACELAND MEMORIAL</h1>
        </div>
        <div>
          <Tooltip title="Account settings">
            <IconButton onClick={handleClick}>
              <Avatar
                style={{
                  backgroundColor: "#3F3A64",
                  cursor: "pointer",
                }}
                src={Avatarimage}
              >
              
              </Avatar>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default DashboardMobileHeader;