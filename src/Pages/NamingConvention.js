import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import axios from 'axios';
import BASEURL from '../Connection/BASEURL';
import { Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Modal } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { Add_Sections, selectsection } from '../Redux/Slice/sections';

const NamingConvention = () => {
    const [Get_Numbers, setGet_Numbers] = useState([]);
    const [Get_Alphabets, setGet_Alphabets] = useState([]);
    const [Get_Fieds, setGet_Fieds] = useState([]);
    const [divisionModal, setdivisionModal] = useState(false);
    const [sectionsModal, setsectionsModal] = useState(false);
    const [sub_sectionModal, setsub_sectionModal] = useState(false);
    const [fieldloading, setfieldloading] = useState(false);
    const [numberloading, setnumberloading] = useState(false);
    const [alphateloading, setalphateloading] = useState(false);
    const dispatch = useDispatch();
    const id = useSelector(selectsection);




    const [field, setfield] = useState("");
    const [number, setnumber] = useState("");
    const [alphabet, setalphabet] = useState("");

    useEffect(() => {

        axios.get(`${BASEURL}/numberlist/`).then((response) => {
            const data = response.data;
            setGet_Numbers(data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        axios.get(`${BASEURL}/alphabet/`).then((response) => {
            const data = response.data;
            setGet_Alphabets(data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        axios.get(`${BASEURL}/fieldlist/`).then((response) => {
            const data = response.data;
            setGet_Fieds(data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    const Add_field = () => {
        setfieldloading(true);

        const payload = {
            fieldlist: field
        }
        axios.post(`${BASEURL}/fieldlist/add_field`, payload).then((response) => {
            const data = response.data;
            setfieldloading(false);
            if (data) {
                setsectionsModal(false);
                setfield("");
                window.location.reload();
                toast.success("Section AdddedSuccessfully", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const Add_Number = () => {
        setnumberloading(true);
        const payload = {
            numberlist: number
        }
        axios.post(`${BASEURL}/numberlist/add_number`, payload).then((response) => {
            const data = response.data;
            setnumberloading(false);
            if (data) {
                toast.success("Division Added Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                });
                setnumber("");
                setdivisionModal(false);
                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
        })

    }


    const Add_Alphabet = () => {
        setalphateloading(true);
        const payload = {
            alphabetlist: alphabet
        }
        axios.post(`${BASEURL}/alphabet/add_alphabet`, payload).then((response) => {
            const data = response.data;
            setalphateloading(false);
            if (data) {
                toast.success("Subsection Added Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                });
                setalphabet("");
                setsub_sectionModal(false);

                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
            setalphateloading(false);
            setalphateloading(true);
        })

    }


    const [editdivisionModal, seteditdivisionModal] = useState(false);
    const [editsectionsModal, seteditsectionsModal] = useState(false);
    const [editsub_sectionModal, seteditsub_sectionModal] = useState(false);

    const [editfieldloading, seteditfieldloading] = useState(false);
    const [editnumberloading, seteditnumberloading] = useState(false);
    const [editalphateloading, seteditalphateloading] = useState(false);

    const EditAdd_field = () => {

        seteditfieldloading(true);
        const payload = {
            fieldlist: field
        }
        axios.put(`${BASEURL}/fieldlist/${id?.id}`, payload).then((response) => {
            const data = response.data;
            seteditfieldloading(false);
            if (data) {
                toast.success("Section Edit Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                });
                setalphabet("");
                seteditsectionsModal(false);

                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
            seteditfieldloading(false);
            seteditfieldloading(true);
        })

    }

    const EditAdd_Alphabet = () => {
        seteditalphateloading(true);
        const payload = {
            alphabetlist: alphabet
        }
        axios.put(`${BASEURL}/alphabet/${id?.id}`, payload).then((response) => {
            const data = response.data;
            seteditalphateloading(false);
            if (data) {
                toast.success("Sub_Section Edit Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                });
                setalphabet("");
                seteditsub_sectionModal(false);

                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
            seteditalphateloading(false);
            seteditalphateloading(true);
        })
    }


    const EditAdd_Division = () => {
        seteditnumberloading(true);
        const payload = {
            numberlist: number
        }
        axios.put(`${BASEURL}/numberlist/${id?.id}`, payload).then((response) => {
            const data = response.data;
            seteditnumberloading(false);
            if (data) {
                toast.success("Division Edit Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                });
                setnumber("");
                seteditdivisionModal(false);
                

                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
            seteditnumberloading(false);
            seteditnumberloading(true);
        })
    }


    return (
        <>
            <ToastContainer />
            <Modal footer={null} title={<h1 className=' text-center'>Add Section</h1>} open={sectionsModal} onCancel={() => {
                setsectionsModal(false);
            }}>
                <div className=' px-3 space-y-4'>
                    <TextField value={field} onChange={(e) => {
                        setfield(e.target.value);
                    }} fullWidth label="Type Section" />

                    {fieldloading ? <Button style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}><CircularProgress size={16} style={{ color: "white" }} /></Button> :

                        <Button onClick={Add_field} disabled={!field} style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}>Submit</Button>}
                </div>
            </Modal>

            <Modal footer={null} title={<h1 className=' text-center'>Add Sub-section</h1>} open={sub_sectionModal} onCancel={() => {
                setsub_sectionModal(false);
            }}>
                <div className=' px-3 space-y-4'>
                    <TextField value={alphabet} onChange={(e) => {
                        setalphabet(e.target.value);
                    }} fullWidth label="Type Section" />

                    {alphateloading ? <Button style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}><CircularProgress size={16} style={{ color: "white" }} /></Button> :

                        <Button disabled={!alphabet} onClick={Add_Alphabet} style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}>Submit</Button>}
                </div>
            </Modal>

            <Modal footer={null} title={<h1 className=' text-center'>Add Division</h1>} open={divisionModal} onCancel={() => {
                setdivisionModal(false);
            }}>
                <div className=' px-3 space-y-4'>
                    <TextField value={number} onChange={(e) => {
                        setnumber(e.target.value);
                    }} fullWidth label="Type Section" />

                    {numberloading ? <Button style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}><CircularProgress size={16} style={{ color: "white" }} /></Button> :

                        <Button disabled={!number} onClick={Add_Number} style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}>Submit</Button>}
                </div>
            </Modal>







            <Modal footer={null} title={<h1 className=' text-center'>Edit Section</h1>} open={editsectionsModal} onCancel={() => {
                seteditsectionsModal(false);
            }}>
                <div className=' px-3 space-y-4'>
                    <TextField value={field} onChange={(e) => {
                        setfield(e.target.value);
                    }} fullWidth label="Type Section" />

                    {editfieldloading ? <Button style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}><CircularProgress size={16} style={{ color: "white" }} /></Button> :

                        <Button onClick={EditAdd_field} style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}>Submit</Button>}
                </div>
            </Modal>

            <Modal footer={null} title={<h1 className=' text-center'>Edit Sub-section</h1>} open={editsub_sectionModal} onCancel={() => {
                seteditsub_sectionModal(false);
            }}>
                <div className=' px-3 space-y-4'>
                    <TextField value={alphabet} onChange={(e) => {
                        setalphabet(e.target.value);
                    }} fullWidth label="Type Section" />

                    {editalphateloading ? <Button style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}><CircularProgress size={16} style={{ color: "white" }} /></Button> :

                        <Button disabled={!alphabet} onClick={EditAdd_Alphabet} style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}>Submit</Button>}
                </div>
            </Modal>

            <Modal footer={null} title={<h1 className=' text-center'>Add Division</h1>} open={editdivisionModal} onCancel={() => {
                seteditdivisionModal(false);
            }}>
                <div className=' px-3 space-y-4'>
                    <TextField value={number} onChange={(e) => {
                        setnumber(e.target.value);
                    }} fullWidth label="Type Section" />

                    {editnumberloading ? <Button style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}><CircularProgress size={16} style={{ color: "white" }} /></Button> :

                        <Button disabled={!number} onClick={EditAdd_Division} style={{ width: "100%", color: "white", backgroundColor: "#083050", padding: 15 }}>Submit</Button>}
                </div>
            </Modal>


            <div className=' grid grid-cols-9'>
                <div className=' col-span-2'>
                    <SideBar />
                </div>
                <div className=' col-span-7 bg-[#D2D2CF]'>
                    <Header />
                    <div className=" mx-8 mt-2">
                        <h1 className=" text-2xl lg:text-3xl font-bold  text-[#111927] py-2 ">
                            Add Sections, Sub-Sections and Divisions
                        </h1>
                    </div>
                    <div className=" mx-2 lg:mx-8 lg:my-5 my-3">

                        <div className=' grid grid-cols-3 gap-3'>
                            <TableContainer
                                elevation={3}
                                component={Paper}
                                style={{ borderRadius: 10 }}
                            >
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
                                                Section
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
                                            <TableCell
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    fontFamily: "'Poppins', sans-serif",

                                                }}
                                            >
                                                <Tooltip title="Add Section">
                                                    <IconButton onClick={() => {
                                                        setsectionsModal(true);
                                                    }}> <AddIcon /></IconButton>
                                                </Tooltip>
                                            </TableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            Get_Fieds.map((row) => (
                                                <TableRow key={row.studentid}>
                                                    <TableCell
                                                        style={{
                                                            fontFamily: "'Poppins', sans-serif",
                                                            paddingLeft: 21,
                                                        }}
                                                    >
                                                        {row.fieldlist}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                                    >
                                                        <div className=' flex space-x-2 items-center'>

                                                            <Tooltip title="Deletion Section">
                                                                <IconButton onClick={() => {
                                                                    Modal.warning({
                                                                        content: "Are you sure you want to delete?",
                                                                        closable: true,
                                                                        okType: "dashed",
                                                                        onOk: () => {
                                                                            axios.delete(`${BASEURL}/fieldlist/${row.id}`).then((response) => {
                                                                                const data = response.data;
                                                                                if (data) {
                                                                                    toast.success("User Deleted Successfully!", {
                                                                                        position: toast.POSITION.TOP_CENTER
                                                                                    });

                                                                                    window.location.reload();
                                                                                }

                                                                            }).catch((err) => {
                                                                                console.log(err);
                                                                            })
                                                                        }
                                                                    });
                                                                }}> <DeleteOutlineOutlinedIcon /></IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Edit Section">
                                                                <IconButton onClick={() => {
                                                                    dispatch(Add_Sections({
                                                                        id: row.id
                                                                    }));
                                                                    seteditsectionsModal(true)
                                                                }}> <ModeEditOutlinedIcon /></IconButton>
                                                            </Tooltip>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TableContainer
                                elevation={3}
                                component={Paper}
                                style={{ borderRadius: 10 }}
                            >
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
                                                Sub-Sec
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
                                            <TableCell style={{
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                fontFamily: "'Poppins', sans-serif",
                                            }}>
                                                <Tooltip title="Add Sub-Section">
                                                    <IconButton onClick={() => {
                                                        setsub_sectionModal(true);
                                                    }}> <AddIcon /></IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            Get_Alphabets.map((row) => (
                                                <TableRow key={row.studentid}>
                                                    <TableCell
                                                        style={{
                                                            fontFamily: "'Poppins', sans-serif",
                                                            paddingLeft: 21,
                                                        }}
                                                    >
                                                        {row.alphabetlist}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                                    >
                                                        <div className=' flex space-x-2 items-center'>

                                                            <Tooltip title="Deletion Sub-section">
                                                                <IconButton onClick={() => {
                                                                    Modal.warning({
                                                                        content: "Are you sure you want to delete?",
                                                                        closable: true,
                                                                        okType: "dashed",
                                                                        onOk: () => {
                                                                            axios.delete(`${BASEURL}/alphabet/${row.id}`).then((response) => {
                                                                                const data = response.data;
                                                                                if (data) {
                                                                                    toast.success("Sub-Division Deleted Successfully!", {
                                                                                        position: toast.POSITION.TOP_CENTER
                                                                                    });

                                                                                    window.location.reload();
                                                                                }

                                                                            }).catch((err) => {
                                                                                console.log(err);
                                                                            })
                                                                        }
                                                                    });
                                                                }}> <DeleteOutlineOutlinedIcon /></IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Edit Sub-section">
                                                                <IconButton onClick={() => {
                                                                    dispatch(Add_Sections({
                                                                        id: row.id
                                                                    }));
                                                                    seteditsub_sectionModal(true);
                                                                }}> <ModeEditOutlinedIcon /></IconButton>
                                                            </Tooltip>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TableContainer
                                elevation={3}
                                component={Paper}
                                style={{ borderRadius: 10 }}
                            >
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
                                                Divison
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
                                            <TableCell>
                                                <Tooltip title="Add Divison">
                                                    <IconButton onClick={() => {
                                                        setdivisionModal(true);
                                                    }}> <AddIcon /></IconButton>
                                                </Tooltip>
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            Get_Numbers.map((row) => (
                                                <TableRow key={row.studentid}>
                                                    <TableCell
                                                        style={{
                                                            fontFamily: "'Poppins', sans-serif",
                                                            paddingLeft: 21,
                                                        }}
                                                    >
                                                        {row.numberlist}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                                    >
                                                        <div className=' flex space-x-2 items-center'>

                                                            <Tooltip title="Deletion Division">
                                                                <IconButton
                                                                    onClick={() => {
                                                                        Modal.warning({
                                                                            content: "Are you sure you want to delete?",
                                                                            closable: true,
                                                                            okType: "dashed",
                                                                            onOk: () => {
                                                                                axios.delete(`${BASEURL}/numberlist/${row.id}`).then((response) => {
                                                                                    const data = response.data;
                                                                                    if (data) {
                                                                                        toast.success("Division Deleted Successfully!", {
                                                                                            position: toast.POSITION.TOP_CENTER
                                                                                        });

                                                                                        window.location.reload();
                                                                                    }

                                                                                }).catch((err) => {
                                                                                    console.log(err);
                                                                                })
                                                                            }
                                                                        });
                                                                    }}
                                                                > <DeleteOutlineOutlinedIcon /></IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Edit Division">
                                                                <IconButton onClick={() => {
                                                                    dispatch(Add_Sections({
                                                                        id: row.id
                                                                    }));
                                                                    seteditdivisionModal(true);
                                                                }}> <ModeEditOutlinedIcon /></IconButton>
                                                            </Tooltip>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>



                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NamingConvention;