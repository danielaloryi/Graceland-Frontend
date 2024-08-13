import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import BASEURL from '../Connection/BASEURL';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CreateBeds = () => {
    const [loading, setloading] = useState(false);
    const [value, setvalue] = useState("");
    const [bedNameId, setbedNameId] = useState("");
    const [selectMultiple, setselectMultiple] = useState([]);
    const [AlphabetMultiple, setAlphabetMultiple] = useState([]);
    const [numberMultiple, setnumberMultiple] = useState([]);
    const [multipleField, setmultipleField] = useState("");
    const [alphabt, setalphabt] = useState("");

    const [Get_Numbers, setGet_Numbers] = useState([]);
    const [Get_Alphabets, setGet_Alphabets] = useState([]);
    const [Get_Fieds, setGet_Fieds] = useState([]);


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



    const Bed_SubSections = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII'];
    const Section_AlHabets = ['A', 'B', 'C', 'D', 'E', 'F'];
    const Numbers = ["01", "02", "03", "04", "05", "06"];
    const [subsectionLoading, setsubsectionLoading] = useState(false);



    const [get_letters, setget_letters] = useState([]);
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

    



    const Submit_Substion = () => {
        setsubsectionLoading(true);
        const payload = {
            name: selectMultiple,
            bedNameId: bedNameId
        }

        axios.post(`${BASEURL}/fields/create_section/`, payload).then((response) => {
            setsubsectionLoading(false);
            const data = response.data;
            if (data) {
                toast.success("Section Created Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                });
                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
            setsubsectionLoading(false);
            setsubsectionLoading(true);

        })
    }

    const [Get_All_Beds, setGet_All_Beds] = useState([]);
    useEffect(() => {
        axios.get(`${BASEURL}/beds/`).then((response) => {
            const data = response.data;
            setGet_All_Beds(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    const Create_Bed = () => {
        const Payload = {
            name: value
        }
        setloading(true);
        axios.post(`${BASEURL}/beds/create_bed`, Payload).then((response) => {
            const data = response.data;
            setloading(false);
            if (data) {
                toast.success("Bed Created Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                });
                window.location.reload();

            }

        }).catch((err) => {
            setloading(false);
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                // className:" bg"
            })
        })
    }

    const [letterloading, setletterloading] = useState(false);

    const Create_Letter = () => {
        setletterloading(true);
        const payload = {
            name: AlphabetMultiple,
            fieldId: multipleField
        }

        axios.post(`${BASEURL}/letters/create_letter/`, payload).then((response) => {
            setletterloading(false);
            const data = response.data;
            if (data) {
                toast.success("Sub-Sec Created Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                });
                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
            setletterloading(false);
            setletterloading(true);

        })
    }


    const [numberloading, setnumberloading] = useState(false);

    const Create_Number = () => {
        setnumberloading(true);
        const payload = {
            number: numberMultiple,
            letterId: alphabt,
        }

        axios.post(`${BASEURL}/numbers/create_number/`, payload).then((response) => {
            setnumberloading(false);
            const data = response.data;
            if (data) {
                toast.success("Division Created Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                });
                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
            setnumberloading(false);
            setnumberloading(true);

        })
    }

    return (
        <>
            <ToastContainer />
            <div className=' grid grid-cols-9'>
                <div className='col-span-2 hidden lg:block'>
                    <SideBar />
                </div>
                <div className='col-span-10 lg:col-span-7 bg-[#D2D2CF]'>
                    <Header />
                    <div className='mx-2 lg:mx-8 mt-3'>

                        <h1 className=" text-2xl lg:text-4xl font-bold  text-[#111927] py-2 pt-2">
                            Create New Beds
                        </h1>

                        <h1 className=" text-xl lg:text-xl font-bold  text-[#111927] py-2 pt-1 mt-3">
                            Add Bed
                        </h1>
                        <div className=' bg-white shadow-lg py-5 mt-5 px-4 rounded-[4px]'>

                            <div className=' flex items-center'>
                                <TextField value={value} onChange={(e) => {
                                    setvalue(e.target.value);
                                }} fullWidth label="Bed Name" placeholder='Bed Name' />
                                {loading ? <Button style={{ backgroundColor: "#083050", color: "white", width: "20%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}><CircularProgress size={17} style={{ color: "white" }} /></Button> :
                                    <Button disabled={!value} onClick={Create_Bed} style={{ backgroundColor: "#083050", color: "white", width: "20%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}>Create </Button>
                                }
                            </div>
                        </div>

                        <h1 className=" text-xl lg:text-xl font-bold  text-[#111927] py-2 pt-2 mt-5">
                            Select Bed to Create Section
                        </h1>
                        <div className=' grid grid-cols-3 gap-4 bg-[white] py-5 mt-2  px-4 rounded-[4px] shadow-lg'>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Bed</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"

                                        label="Select Bed"
                                        value={bedNameId}
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
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                                    <Select
                                        multiple
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectMultiple}
                                        label="Select Section"
                                        onChange={(e) => {
                                            setselectMultiple(e.target.value);
                                        }}
                                    >
                                        {Get_Fieds.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.fieldlist}
                                                >{list.fieldlist}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className=' flex justify-end'>
                                {subsectionLoading ? <Button style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}><CircularProgress size={17} style={{ color: "white" }} /></Button> :
                                    <Button disabled={!bedNameId || !selectMultiple} onClick={Submit_Substion} style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}>Create </Button>
                                }
                            </div>

                        </div>



                        <h1 className=" text-xl lg:text-xl font-bold  text-[#111927] py-2 pt-2 mt-5">
                            Select Bed to Create Sub-Section
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
                                    <InputLabel id="demo-simple-select-label">Select Sub-Section</InputLabel>
                                    <Select
                                        multiple
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={AlphabetMultiple}
                                        label="Select Sub-section"
                                        onChange={(e) => {
                                            setAlphabetMultiple(e.target.value);
                                        }}
                                    >
                                        {Get_Alphabets.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.alphabetlist}
                                                >{list.alphabetlist}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className=' flex justify-end'>
                                {letterloading ? <Button style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}><CircularProgress size={17} style={{ color: "white" }} /></Button> :
                                    <Button onClick={Create_Letter} style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}>Create</Button>}

                            </div>

                        </div>
                        <h1 className=" text-xl lg:text-xl font-bold  text-[#111927] py-2 pt-2 mt-5">
                            Select to create division
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
                                    <InputLabel id="demo-simple-select-label">Select Sub-Section</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={alphabt}
                                        label="Select Sub-Section"
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
                                        multiple
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={numberMultiple}
                                        label="Select Division"
                                        onChange={(e) => {
                                            setnumberMultiple(e.target.value);
                                        }}
                                    >
                                        {Get_Numbers.map((list) => {
                                            return (
                                                <MenuItem
                                                    value={list.numberlist}
                                                >{list.numberlist}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className=' flex justify-end'>
                                {numberloading ? <Button style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}><CircularProgress size={17} style={{ color: "white" }} /></Button> :
                                    <Button onClick={Create_Number} style={{ backgroundColor: "#083050", color: "white", width: "45%", paddingTop: 15, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}>Create</Button>}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateBeds;