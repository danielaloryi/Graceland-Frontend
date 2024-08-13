import React, { useState, useEffect } from 'react'
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import {
    Button,
    CircularProgress,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import BASEURL from '../Connection/BASEURL';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slice/UserSlice';



const Users = () => {
    const user = useSelector(selectUser);

    const navigate = useNavigate();

    const [allexecutives, setallexecutives] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [refreshData, setrefreshData] = useState(false);
    const [allAlldata, setallAlldata] = useState(false);
    const RollArray = ["Admin", "Manager"];

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [executives, setexecutives] = React.useState("");


    useEffect(() => {
        setallAlldata(true);
        axios.get(`${BASEURL}/executives/one`).then((response) => {
            const data = response.data;
            setallAlldata(false);
            setallexecutives(data);
            // console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [refreshData]);

    const [search_Data, setsearch_Data] = useState([]);
    const [loading, setloading] = useState(false);


    const [showingEmpte, setshowingEmpte] = useState(false);

    const All_This_when_Empty = () => {
        if (search_Data.length === 0) {
            setshowingEmpte(true);
        }
    }


    const Search_Executive = () => {
        // setloading(true);
        axios.get(`${BASEURL}/executives/stat1/${searchvalue}`).then((response) => {
            //   setloading(false);
            const data = response.data;
            setsearch_Data(data);
            // All_This_when_Empty();
        }).catch((err) => {
            console.log(err);
        })
    }

    const [updateLoad, setupdateLoading] = useState(false);
    const [successModal, setsuccessModal] = useState(false);


    const [openLoading, setopenLoading] = useState(false);
    const [openModal, setopenModal] = useState(false);




    useEffect(() => {

        axios.get(`${BASEURL}/users/all_users`).then((response) => {
            const data = response.data;
            setGet_All_Users(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [refreshData])


    const [Get_All_Users, setGet_All_Users] = useState([]);
    const [searchvalue, setsearchvalue] = useState("");

    const filteredusers = Get_All_Users.filter((user) =>
        user.username.toLowerCase().includes(searchvalue.toLowerCase())
    );

    filteredusers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [role, setrole] = useState("");
    const [userloading, setuserloading] = useState(false);


    const Create_User = () => {
        setuserloading(true);
        const payload = {
            username,
            password,
            role
        }
        axios.post(`${BASEURL}/users/create-account`, payload).then((response) => {
            const data = response.data;
            setuserloading(false);
            if (data) {
                setopenModal(false);
                toast.success("User Created Successfully!", {
                    position: toast.POSITION.TOP_CENTER
                });
                setrefreshData(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <>
            <ToastContainer />
            <Modal footer={null} open={openModal} onCancel={() => {
                setopenModal(false);
            }} title={<h1 className=' text-center'>Add New User</h1>}>
                <div className=' space-y-5 pt-4'>
                    <TextField onChange={(e) => {
                        setusername(e.target.value);
                    }} value={username} label="Username" fullWidth placeholder='Username' />
                    <TextField value={password} onChange={(e) => {
                        setpassword(e.target.value);
                    }} label="Password" fullWidth placeholder='Password' />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                        <Select
                            label="Select Role"
                            labelId="demo-simple-select-label"
                            name="religion"
                            value={role}
                            onChange={(e) => {
                                setrole(e.target.value);
                            }}
                        >
                            {RollArray.map((list) => {
                                return <MenuItem value={list}>{list}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    {userloading ? <Button style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}><CircularProgress size={16} style={{ color: "white" }} /></Button> :
                        <Button disabled={!username || !password || !role} onClick={Create_User} style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}>Submit</Button>}
                </div>
            </Modal>
            <div className=' grid grid-cols-9'>
                <div className=' col-span-2 hidden lg:block'>
                    <SideBar />
                </div>
                <div className='col-span-10 lg:col-span-7 bg-[#D2D2CF]'>
                    <Header />
                    <div>
                        {user?.role === "Manager" ? <div className=' mx-2 lg:mx-8 mt-2 lg:mt-5'> <h1 className=" font-bold text-4xl"> Users</h1></div> : <div className=" mx-8 flex justify-between mt-5">
                            <h1 className=" font-bold text-2xl lg:text-4xl"> Users</h1>
                            <Button variant="contained" onClick={() => {
                                setopenModal(true);
                            }} >Add User</Button>
                        </div>}


                        <div className=" mx-2 lg:mx-8 lg:my-10 my-5">
                            <>
                                {
                                    // allAlldata ?
                                    //   <div className=" grid place-items-center mt-36">
                                    //     <CircularProgress size={50} style={{ color: "#122E76" }} />
                                    //   </div>
                                    //   :
                                    <TableContainer
                                        elevation={3}
                                        component={Paper}
                                        style={{ borderRadius: 10 }}
                                    >
                                        <div className=" flex items-center  space-x-7 px-6 p-9 pb-7">
                                            <TextField
                                                onChange={(e) => {
                                                    setsearchvalue(e.target.value)
                                                }}
                                                value={searchvalue}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton edge="start" size="small">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke-width="1.5"
                                                                    stroke="currentColor"
                                                                    className="w-6 h-6"
                                                                >
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                                    />
                                                                </svg>
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}

                                                size="medium"
                                                placeholder="Search for Users"
                                                label="Search for Users"
                                            />
                                        </div>
                                        <Table>
                                            <TableHead style={{ backgroundColor: "#F8F9FA" }}>
                                                <TableRow>
                                                    <TableCell
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "16px",
                                                            fontFamily: "'Poppins', sans-serif",
                                                            paddingLeft: 21,
                                                        }}
                                                    >
                                                        Username
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "16px",
                                                            fontFamily: "'Poppins', sans-serif",
                                                        }}
                                                    >
                                                        Role
                                                    </TableCell>

                                                    <TableCell
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "16px",
                                                            fontFamily: "'Poppins', sans-serif",
                                                        }}
                                                    >
                                                        Action
                                                    </TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {search_Data.length === 0 ?
                                                    filteredusers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((row) => (
                                                            <TableRow key={row.studentid}>
                                                                <TableCell
                                                                    style={{
                                                                        fontFamily: "'Poppins', sans-serif",
                                                                        paddingLeft: 21,
                                                                    }}
                                                                >
                                                                    {row.username}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                >
                                                                    {row.role}
                                                                </TableCell>
                                                                
                                                                    <TableCell
                                                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                    >
                                                                        <Button onClick={() => {
                                                                            Modal.warning({
                                                                                content: "Are you sure you want to delete?",
                                                                                closable: true,
                                                                                okType: "dashed",
                                                                                onOk: () => {
                                                                                    axios.delete(`${BASEURL}/users/${row.tblid}`).then((response) => {
                                                                                        const data = response.data;
                                                                                        if (data) {
                                                                                            toast.success("User Deleted Successfully!", {
                                                                                                position: toast.POSITION.TOP_CENTER
                                                                                            });
                                                                                            setrefreshData(true);
                                                                                            window.location.reload();
                                                                                        }

                                                                                    }).catch((err) => {
                                                                                        console.log(err);
                                                                                    })
                                                                                }
                                                                            });
                                                                        }} style={{ backgroundColor: "#CC3426", color: "white" }}>Delete</Button>
                                                                    </TableCell>
                                                                   

                                                            </TableRow>
                                                        )) :

                                                    search_Data
                                                        .map((row) => (
                                                            <TableRow key={row.studentid}>
                                                                <TableCell
                                                                    style={{
                                                                        fontFamily: "'Poppins', sans-serif",
                                                                        paddingLeft: 21,
                                                                    }}
                                                                >
                                                                    {row.username}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                >
                                                                    {row.role}
                                                                </TableCell>



                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                >
                                                                    <div className=" flex items-center space-x-5">


                                                                        <Button
                                                                            onClick={() => {
                                                                                setopenLoading(true);
                                                                                const payload = {
                                                                                    tblstatus: 0
                                                                                }
                                                                                axios.put(`${BASEURL}/executives/${row.tblid}`, payload).then((response) => {
                                                                                    const data = response.data;
                                                                                    setopenLoading(false);
                                                                                    if (data) {
                                                                                        setTimeout(() => {
                                                                                            window.location.reload();
                                                                                        }, 2000);
                                                                                        // setrefreshData(true);
                                                                                        setsuccessModal(true);


                                                                                    }
                                                                                }).catch((err) => {
                                                                                    console.log(err);
                                                                                })
                                                                            }}
                                                                            variant="contained"
                                                                            style={{
                                                                                paddingLeft: 10,
                                                                                paddingRight: 10,
                                                                                backgroundColor: "#CC3426",
                                                                                color: "white",

                                                                            }}
                                                                        >Delete</Button>

                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                }
                                            </TableBody>
                                        </Table>
                                        <TablePagination
                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={allexecutives.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableContainer>
                                }
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users;