import React, { useEffect, useState } from "react";
import SideBar from "../Components/SideBar.js";
import axios from "axios";
import {
    Avatar,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Tooltip,
} from "@mui/material";
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
} from "@mui/material";
import Header from "../Components/Header.js";
import SnackBar from "../Components/SnackBar.js";
import BASEURL from "../Connection/BASEURL.js";
import LoadingBox from "../Components/LoadingBox.js";
import EmptyData from "../Components/EmptyData.js";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { Modal } from "antd";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const AllDeaceased = () => {
    const navigate = useNavigate();
    const GenderArray = ["Male", "Female"];

    const [allexecutives, setallexecutives] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [refreshData, setrefreshData] = useState(false);
    const [allAlldata, setallAlldata] = useState(false);


    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const [rowsPerPage, setRowsPerPage] = React.useState(200);
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
    const [searchvalue, setsearchvalue] = useState("");

    const [showingEmpte, setshowingEmpte] = useState(false);





    const [openLoading, setopenLoading] = useState(false);


    const [Get_Deasead, setGet_Deasead] = useState([]);
    const [allloading, setallloading] = useState(false);

    useEffect(() => {
        setallloading(true);
        axios.get(`${BASEURL}/deceased/`).then((response) => {
            const data = response.data;
            setallloading(false);
            setGet_Deasead(data);
        }).catch((err) => {
            console.log(err);
        })

    }, [refreshData]);


    const [gender, setgender] = useState("");
    const [dod, setdod] = useState("");
    const [dobrial, setdobrial] = useState("");
    const [Aged, setAged] = useState("");


    const url = `${BASEURL}/d/filter`;
    const params = {
        dod: dod,
        gender: gender,
        Aged: Aged,
        dobrial: dobrial,
    };

    const Get_Load = () => {
        axios.get(url, { params })
            .then((response) => {
                console.log(response.data);

            })
            .catch((error) => {
                console.error(error);
            });
    }


    const filteredcustomers = Get_Deasead.filter((customer) => {
        const customerName = (customer.fname + ' ' + customer.mname + ' ' + customer.lname).toLowerCase();
        return customerName.includes(searchvalue.toLowerCase());
    });

    filteredcustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);



    return (

        <>
            <ToastContainer />

            <div className=" grid grid-cols-9">
                <div className="col-span-2 hidden lg:block">
                    <SideBar />
                </div>
                <div className="col-span-10 lg:col-span-7 bg-[#D2D2CF]">
                    <Header />
                    <div className=" mx-2 lg:mx-8">
                        <h1 className=" font-bold text-2xl lg:text-4xl pt-5">All Deceased</h1>
                    </div>
                    <div className=" mx-2 lg:mx-8 my-5 lg:my-10">
                        <>
                            {
                                allloading ?
                                    <div className=" grid place-items-center mt-36">
                                        <CircularProgress size={50} style={{ color: "#122E76" }} />
                                    </div>
                                    :
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

                                                style={{ width: "85%" }}
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
                                                fullWidth
                                                placeholder="Search for Deceased"
                                                label="Search for Deceased"
                                            />
                                            {loading ? <Button onClick={() => {

                                            }} variant="contained" style={{
                                                backgroundColor: "#083050",
                                                color: "white",
                                                width: "15%",
                                                padding: 14
                                            }}> <CircularProgress size={17} style={{ color: "white" }} /></Button> : <Button disabled={!searchvalue} onClick={() => {

                                            }} variant="contained" style={{
                                                backgroundColor: "#083050",
                                                color: "white",
                                                width: "15%",
                                                padding: 14
                                            }}>Search</Button>}

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
                                                        First Name
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "16px",
                                                            fontFamily: "'Poppins', sans-serif",
                                                        }}
                                                    >
                                                        Last Name
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "16px",
                                                            fontFamily: "'Poppins', sans-serif",
                                                            paddingLeft: 21,
                                                        }}
                                                    >
                                                        Gender
                                                    </TableCell>

                                                    <TableCell
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "16px",
                                                            fontFamily: "'Poppins', sans-serif",
                                                            paddingLeft: 21,
                                                        }}
                                                    >
                                                        Date of Death
                                                    </TableCell>

                                                    <TableCell
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "16px",
                                                            fontFamily: "'Poppins', sans-serif",
                                                            paddingLeft: 21,
                                                        }}
                                                    >
                                                        Date of Burial
                                                    </TableCell>

                                                    <TableCell
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "16px",
                                                            fontFamily: "'Poppins', sans-serif",
                                                            paddingLeft: 21,
                                                        }}
                                                    >
                                                        Bed Location
                                                    </TableCell>



                                                    <TableCell
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "16px",
                                                            fontFamily: "'Poppins', sans-serif",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        All  Actions
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {search_Data.length === 0 ?
                                                    filteredcustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((row) => (
                                                            <TableRow key={row.studentid}>
                                                                <TableCell
                                                                    style={{
                                                                        fontFamily: "'Poppins', sans-serif",
                                                                        paddingLeft: 21,
                                                                    }}
                                                                >
                                                                    {row.fname}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                >
                                                                    {row.lname}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                >
                                                                    {row.gender}
                                                                </TableCell>

                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                >
                                                                    {dayjs(row.dod).format('MMMM DD, YYYY')}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                >
                                                                    {dayjs(row.dobrial).format('MMMM DD, YYYY')}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif", color: "#CC3426", fontWeight: "bold" }}
                                                                >
                                                                    {row.bed}
                                                                </TableCell>



                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                >
                                                                    <div className=" flex items-center space-x-5">
                                                                        <Tooltip title="View Details">
                                                                            <IconButton onClick={() => {
                                                                                navigate("/get-deceased", {
                                                                                    state: {
                                                                                        id: row.tblid
                                                                                    }
                                                                                })
                                                                            }}>
                                                                                <RemoveRedEyeIcon />
                                                                            </IconButton>
                                                                        </Tooltip>


                                                                        <IconButton onClick={() => {
                                                                            Modal.warning({
                                                                                content: "Are you sure you want to delete?",
                                                                                closable: true,
                                                                                okType: "dashed",
                                                                                onOk: () => {
                                                                                    axios.delete(`${BASEURL}/deceased/${row.tblid}`).then((response) => {
                                                                                        const data = response.data;
                                                                                        if (data) {
                                                                                            // setrefreshData(true);
                                                                                            toast.success("User Deleted Successfully!", {
                                                                                                position: toast.POSITION.TOP_CENTER
                                                                                            });
                                                                                            window.location.reload();
                                                                                            // setrefreshData(true);
                                                                                        }

                                                                                    }).catch((err) => {
                                                                                        console.log(err);
                                                                                    })
                                                                                }
                                                                            })
                                                                        }}
                                                                        >
                                                                            <DeleteIcon />
                                                                        </IconButton>



                                                                    </div>
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
                                                                    {row.membername}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                >
                                                                    {row.voterid}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                >
                                                                    {row.tblmemid}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                                >
                                                                    {row.memberid}
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
                                                                                        // setsuccessModal(true);


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
        </>



    );
}

export default AllDeaceased;







 // <div className="px-6 grid grid-cols-5 gap-3 pb-3">
                                        //     <TextField value={Aged} onChange={(e) => {
                                        //         setAged(e.target.value);
                                        //     }} type="number" placeholder="Age" />
                                        //     <FormControl fullWidth>
                                        //         <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
                                        //         <Select
                                        //             label="gender"
                                        //             name="gender"
                                        //             value={gender}
                                        //             onChange={(e) => {
                                        //                 setgender(e.target.value);
                                        //             }}

                                        //         >
                                        //             {GenderArray.map((list) => {
                                        //                 return <MenuItem value={list}>{list}</MenuItem>;
                                        //             })}
                                        //         </Select>

                                        //     </FormControl>
                                        //     <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        //         <DatePicker
                                        //             format="YYYY-MM-DD"
                                        //             label="Date of Death"
                                        //             name="dod"
                                        //             value={dod}

                                        //             onChange={(date) => {
                                        //                 const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                        //                 setdod(formattedDate)

                                        //             }}

                                        //         />
                                        //     </LocalizationProvider>
                                        //     <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        //         <DatePicker
                                        //             style={{ border: "1px solid #D2D2CF" }}
                                        //             format="YYYY-MM-DD"
                                        //             label="Date of dobrial"
                                        //             value={dobrial}
                                        //             onChange={(date) => {
                                        //                 const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                        //                 setdobrial(formattedDate);
                                        //             }}

                                        //         />
                                        //     </LocalizationProvider>
                                        //     <Button onClick={Get_Load} style={{ border: "2px solid #083050" }}>Filter</Button>
                                        // </div>