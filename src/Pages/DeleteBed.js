import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import BASEURL from '../Connection/BASEURL';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const DeleteBed = () => {

    const [value, setvalue] = useState("");
    const [bedNameId, setbedNameId] = useState("");
    const [loading, setloading] = useState(false);
    const [editField, seteditField] = useState("")


    const [multipleField, setmultipleField] = useState("");

    const [get_all_bed_fiels, setget_all_bed_fiels] = useState([]);

    useEffect(() => {
        if (bedNameId) {
            axios.get(`${BASEURL}/fields/get_field_bed/${bedNameId}`).then((response) => {
                const data = response.data;
                setget_all_bed_fiels(data);
            })
        } else {
            setget_all_bed_fiels([]);
        }

    }, [bedNameId]);


    const [Get_All_Beds, setGet_All_Beds] = useState([]);
    useEffect(() => {
        axios.get(`${BASEURL}/beds/`).then((response) => {
            const data = response.data;
            setGet_All_Beds(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const Edit_Bed = () => {
        setloading(true);

       

        axios.delete(`${BASEURL}/beds/${bedNameId}`).then((response) => {
            const data = response.data;
            setloading(false);
            toast.success("deleted Successfully!", {
                position: toast.POSITION.TOP_CENTER,
                // className:" bg"
            });
            window.location.reload();
        }).catch((err) => {
            console.log(err);
            setloading(false);
            setloading(true);

        });

    }

    const [editloading, seteditloading] = useState(false)

    const EditField = () => {

        seteditloading(true);

       
        axios.delete(`${BASEURL}/fields/${bedNameId}`).then((response) => {
            const data = response.data;
            seteditloading(false);
            toast.success("deleted Successfully!", {
                position: toast.POSITION.TOP_CENTER,
                // className:" bg"
            });
            window.location.reload();
        }).catch((err) => {
            console.log(err);
            seteditloading(false);
            seteditloading(true);

        });

    }


    const [get_letters, setget_letters] = useState([]);


    useEffect(() => {
        if (multipleField) {
            axios.get(`${BASEURL}/letters/get_letters/${multipleField}`).then((response) => {
                const data = response.data;
                setget_letters(data);
            })
        } else {
            setget_letters([]);
        }

    }, [multipleField]);


    const [get_numbers, setget_numbers] = useState([]);

    useEffect(() => {
        if (multipleField) {
            axios.get(`${BASEURL}/numbers/get_letters/${multipleField}`).then((response) => {
                const data = response.data;
                setget_numbers(data);
            })
        } else {
            setget_numbers([]);
        }

    }, [multipleField]);


    const [numberloading, setnumberloading] = useState("");
    const [alphabt, setalphabt] = useState("");
    const [alphabeteditValue, setalphabeteditValue] = useState("");

    const Edit_Number = () => {
        setnumberloading(true)

        axios.delete(`${BASEURL}/letters/${alphabt}`).then((response) => {
            const data = response.data;
            setnumberloading(false);
            toast.success("deleted Successfully!", {
                position: toast.POSITION.TOP_CENTER,
                // className:" bg"
            });
            window.location.reload();

        }).catch((err) => {
            console.log(err);
            setnumberloading(false);
            setnumberloading(true);

        });
    }


    const [geteditNumbers, setgeteditNumbers] = useState([]);
    const [editnum, seteditnum] = useState("");
    const [neweditnumVlaue, setneweditnumVlaue] = useState("");
    const [lasteditnumloading, setlasteditnumloading] = useState(false)


    useEffect(() => {
        if (alphabt) {
            axios.get(`${BASEURL}/numbers/all_numbers_byletter/${alphabt}`).then((response) => {
                const data = response.data;
                setgeteditNumbers(data);
            })
        } else {
            setgeteditNumbers([]);
        }

    }, [alphabt]);



    const EditNumberValue = () => {

        setlasteditnumloading(true);

        axios.delete(`${BASEURL}/numbers/${editnum}`).then((response) => {
            const data = response.data;
            setlasteditnumloading(false);
            toast.success("deleted Successfully!", {
                position: toast.POSITION.TOP_CENTER,
                // className:" bg"
            });
            window.location.reload();
        }).catch((err) => {
            console.log(err);
            setlasteditnumloading(false);
            setlasteditnumloading(true);

        });

    }


    return (
        <>
            <ToastContainer />
            <div className=' grid grid-cols-9'>
                <div className=' col-span-2'>
                    <SideBar />
                </div>
                <div className=' col-span-7 bg-[#D2D2CF]'>
                    <Header />
                    <div className='  mx-2 lg:mx-8 mt-3'>
                        <h1 className=" text-2xl lg:text-4xl font-bold  text-[#111927] py-2 pt-2">
                            Delete Beds
                        </h1>

                        <h1 className=" text-xl lg:text-xl font-bold  text-[#111927] py-2 pt-2 mt-5">
                            Select Bed To Delete
                        </h1>


                        <div className=' grid grid-cols-3 gap-4 bg-[white] py-5 mt-2  px-4 rounded-[4px] shadow-lg'>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Bed</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={bedNameId}
                                        label="Select Bed"

                                        onChange={(e) => {
                                            setbedNameId(e.target.value);
                                        }}
                                    >
                                        {Get_All_Beds.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.id}
                                                >{list.name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className=' flex justify-end'>
                                {loading ? <Button style={{ backgroundColor: "#083050", color: "white", width: "40%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}><CircularProgress size={17} style={{ color: "white" }} /></Button> :
                                    <Button  onClick={Edit_Bed} style={{ backgroundColor: "#083050", color: "white", width: "40%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}>Delete</Button>
                                }
                            </div>
                        </div>

                        <h1 className=" text-xl lg:text-xl font-bold  text-[#111927] py-2 pt-2 mt-5">
                            Select to Delete Section
                        </h1>
                        <div className=' grid grid-cols-4 gap-4 bg-[white] py-5 mt-2  px-4 rounded-[4px] shadow-lg'>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Bed</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={classNm}
                                        label="Select Bed"
                                        value={bedNameId}
                                        onChange={(e) => {
                                            setbedNameId(e.target.value);
                                        }}
                                    // onChange={(e) => {
                                    //     setclassNm(e.target.value);
                                    // }}
                                    >
                                        {Get_All_Beds.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.id}
                                                >{list.name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={multipleField}
                                        label="Select Bed"
                                        onChange={(e) => {
                                            setmultipleField(e.target.value);
                                        }}
                                    >
                                        {get_all_bed_fiels.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.id}
                                                >{list.name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className=' flex justify-end'>
                                {editloading ? <Button style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}><CircularProgress size={17} style={{ color: "white" }} /></Button> :
                                    <Button onClick={EditField} style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}>Delete</Button>}

                            </div>
                        </div>


                        <h1 className=" text-xl lg:text-xl font-bold  text-[#111927] py-2 pt-2 mt-5">
                            Select to Delete Sub-section
                        </h1>
                        <div className=' grid grid-cols-4 gap-4 bg-[white] py-5 mt-2  px-4 rounded-[4px] shadow-lg'>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Bed</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={classNm}
                                        label="Select Bed"
                                        value={bedNameId}
                                        onChange={(e) => {
                                            setbedNameId(e.target.value);
                                        }}
                                    // onChange={(e) => {
                                    //     setclassNm(e.target.value);
                                    // }}
                                    >
                                        {Get_All_Beds.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.id}
                                                >{list.name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={multipleField}
                                        label="Select Bed"
                                        onChange={(e) => {
                                            setmultipleField(e.target.value);
                                        }}
                                    >
                                        {get_all_bed_fiels.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.id}
                                                >{list.name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Sub-Sec</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={alphabt}
                                        label="Select Bed"
                                        onChange={(e) => {
                                            setalphabt(e.target.value);
                                        }}
                                    >
                                        {get_letters.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.id}
                                                >{list.name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className=' flex justify-end'>
                                {numberloading ? <Button style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}><CircularProgress size={17} style={{ color: "white" }} /></Button> :
                                    <Button  onClick={Edit_Number} style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}>Delete</Button>}

                            </div>

                        </div>


                        <h1 className=" text-xl lg:text-xl font-bold  text-[#111927] py-2 pt-2 mt-5">
                            Select to Delete division
                        </h1>
                        <div className=' grid grid-cols-5 gap-4 bg-[white] py-5 mt-2  px-4 rounded-[4px] shadow-lg'>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Bed</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={classNm}
                                        label="Select Bed"
                                        value={bedNameId}
                                        onChange={(e) => {
                                            setbedNameId(e.target.value);
                                        }}
                                    // onChange={(e) => {
                                    //     setclassNm(e.target.value);
                                    // }}
                                    >
                                        {Get_All_Beds.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.id}
                                                >{list.name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={multipleField}
                                        label="Select Bed"
                                        onChange={(e) => {
                                            setmultipleField(e.target.value);
                                        }}
                                    >
                                        {get_all_bed_fiels.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.id}
                                                >{list.name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Sub-sec</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={alphabt}
                                        label="Select Bed"
                                        onChange={(e) => {
                                            setalphabt(e.target.value);
                                        }}
                                    >
                                        {get_letters.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.id}
                                                >{list.name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Division</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={editnum}
                                        label="Select Bed"
                                        onChange={(e) => {
                                            seteditnum(e.target.value);
                                        }}
                                    >
                                        {geteditNumbers.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.id}
                                                >{list.number}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className=' flex justify-end'>
                                {lasteditnumloading ? <Button style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}><CircularProgress size={17} style={{ color: "white" }} /></Button> :
                                    <Button onClick={EditNumberValue} style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}>Delete</Button>}

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteBed;