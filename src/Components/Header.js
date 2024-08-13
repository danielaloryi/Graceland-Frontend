import { Avatar, Button, IconButton, ListItemIcon, MenuItem,Menu,Divider } from "@mui/material";
import React from "react";
import Avatarimage from "../Assets/avatar-omar-darboe.png";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch, useSelector } from "react-redux";
import { ClearUser, selectUser } from "../Redux/Slice/UserSlice";
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import DashboardMobileHeader from "./DashoardMobileHeader";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Header = () => {
const dispatch = useDispatch();
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
  return (
    <>
    <DashboardMobileHeader />
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
              navigate("/");
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
      
      
      
      <MenuItem onClick={handleClickOpenDialog}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>

      <MenuItem onClick={() => {
        navigate("/change-password")
      }}>
        <ListItemIcon>
          <LockClockOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Change Password
      </MenuItem>
    </Menu>
    <div
      style={{ borderBottom: "1px solid #DBD9E4" }}
      className="hidden lg:flex items-center  bg-white justify-between px-4 shadow-sm py-2 sticky z-50 top-0"
    >
      <div>
        <h1 className=" font-bold text-lg lg:text-[20px] text-[#888AB0]">
        GRACELAND MEMORIAL MGT SYSTEM   
        </h1>
      </div>
      <div className=" flex items-center space-x-3">
        <h1 className=" font-semibold">{user?.username}</h1>
        <IconButton onClick={handleClick}>
        <Avatar src={Avatarimage} />
        </IconButton>
      </div>
    </div>
    </>
  );
};

export default Header;
