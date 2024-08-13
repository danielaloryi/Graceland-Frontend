import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import BASEURL from "../Connection/BASEURL";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const FeePayment = () => {

    const [refreshData, setrefreshData] = useState(false);
    const [loading, setloading] = useState(false);
    const productListArray = [
        "Adult_Single",
        "Adult_Double",
        "Child_Single",
        "Infant",
        // "Lowering_Device"
    ];

    const OpenClosingArray = [
        "OC_Single",
        "OC_Double"
    ];

    const TaxArray = [
        "nhil_levy",
        "vat"
    ]

    const [onc, setonc] = useState("");
    const [oncSelect, setoncSelect] = useState("");


    const Update_ONC = () => {
        setloading(true);
        const payload = {
            [oncSelect]: onc
        }
        axios.put(`${BASEURL}/onc/${oncSelect}`, payload).then((response) => {
            const data = response.data;
            setloading(false);
            if (data) {
                setonc("");
                toast.success("Fee Added Successfully!!", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                })
                window.location.reload();
                setrefreshData(true);

            }

        }).catch((err) => {
            console.log(err);
            setloading(false);
        })
    }

    const [product, setproduct] = useState("");
    const [productselect, setproductselect] = useState("");
    const [loading2, setloading2] = useState(false);

    const Update_ProductList = () => {
        setloading2(true);
        const payload = {
            [productselect]: product
        }
        axios.put(`${BASEURL}/fee/${productselect}`, payload).then((response) => {
            const data = response.data;
            setloading2(false);
            setrefreshData(true);
            if (data) {
                setonc("");
                toast.success("Fee Added Successfully!!", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                })
                window.location.reload();

            }

        }).catch((err) => {
            console.log(err);
            setloading(false);
        })
    }




    const [all_fees, setall_fees] = useState([]);

    useEffect(() => {
        axios.get(`${BASEURL}/fee/`).then((response) => {
            const data = response.data;
            setall_fees(data);
        }).catch((err) => {
            console.lo(err);
        })

    }, [refreshData]);

    const [get_all_onc, setget_all_onc] = useState([]);
    useEffect(() => {
        axios.get(`${BASEURL}/onc/`).then((response) => {
            const data = response.data;
            setget_all_onc(data);
        }).catch((err) => {
            console.lo(err);
        })

    }, [refreshData]);


    const [Tax, setTax] = useState("");
    const [selectTax, setselectTax] = useState("");
    const [loading5, setloading5] = useState(false);


    const SetTax = () => {
        setloading5(true);
        const payload = {
            [selectTax]: Tax
        }
        axios.put(`${BASEURL}/tax/${selectTax}`, payload).then((response) => {
            const data = response.data;
            setloading5(false);
            if (data) {
                setrefreshData(true);
                setTax("");
                toast.success("Tax Added Successfully!!", {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                })
                window.location.reload();

            }

        }).catch((err) => {
            console.log(err);
            setloading5(false);
        })
    }

    const [get_all_tax, setget_all_tax] = useState([]);

    useEffect(() => {
        axios.get(`${BASEURL}/tax/`).then((response) => {
            const data = response.data;
            setget_all_tax(data);
        }).catch((err) => {
            console.lo(err);
        });

    }, [refreshData]);


    return (
        <>
            <ToastContainer />
            <div className=' grid grid-cols-9'>
                <div className='col-span-2 hidden lg:block'>
                    <SideBar />
                </div>
                <div className=' col-span-10 lg:col-span-7 bg-[#D2D2CF]'>
                    <Header />
                    <div className=" mx-2 lg:mx-8">
                        <div>
                            <h1 className=" text-2xl lg:text-4xl font-bold  text-[#111927] py-2 pt-5">
                                Fee and Tax Setting
                            </h1>
                        </div>
                        <div className=' grid grid-cols-2 lg:grid-cols-5 gap-2 mt-5'>
                            {
                                all_fees.map((list) => {
                                    return (
                                        <div className=' bg-white text-center'>
                                            <div className=' bg-[#083050] text-white'>
                                                <h1> Adult Single</h1>
                                            </div>
                                            <div className=' py-2'>
                                                {`GHS ${list.Adult_Single.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            </div>
                                        </div>
                                    );
                                })
                            }

                            {
                                all_fees.map((list) => {
                                    return (
                                        <div className=' bg-white text-center'>
                                            <div className=' bg-[#083050] text-white'>
                                                <h1> Adult Double</h1>
                                            </div>
                                            <div className=' py-2'>
                                                {`GHS ${list.Adult_Double.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            </div>
                                        </div>
                                    );
                                })
                            }

                            {
                                all_fees.map((list) => {
                                    return (
                                        <div className=' bg-white text-center'>
                                            <div className=' bg-[#083050] text-white'>
                                                <h1>Child Single</h1>
                                            </div>
                                            <div className=' py-2'>
                                                {`GHS ${list.Child_Single.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            </div>
                                        </div>
                                    );
                                })
                            }

                            {
                                all_fees.map((list) => {
                                    return (
                                        <div className=' bg-white text-center'>
                                            <div className=' bg-[#083050] text-white'>
                                                <h1>Infant</h1>
                                            </div>
                                            <div className=' py-2'>
                                                {`GHS ${list.Infant.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            </div>
                                        </div>
                                    );
                                })
                            }

                            {/* {
                                all_fees.map((list) => {
                                    return (
                                        <div className=' bg-white text-center'>
                                            <div className=' bg-[#083050] text-white'>
                                                <h1>Lowering Device</h1>
                                            </div>
                                            <div className=' py-2'>
                                                {`GHS ${list.Lowering_Device.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            </div>
                                        </div>
                                    );
                                })
                            } */}
                            {/* {
                                get_all_onc.map((list) => {
                                    return (
                                        <div className=' bg-white text-center'>
                                            <div className=' bg-[#083050] text-white'>
                                                <h1>OC_Single</h1>
                                            </div>
                                            <div className=' py-2'>
                                                {`GHS ${list.OC_Single.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            </div>
                                        </div>
                                    );
                                })
                            } */}

                            {/* {
                                get_all_onc.map((list) => {
                                    return (
                                        <div className=' bg-white text-center'>
                                            <div className=' bg-[#083050] text-white'>
                                                <h1>OC Double</h1>
                                            </div>
                                            <div className=' py-2'>
                                                {`GHS ${list.OC_Double.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            </div>
                                        </div>
                                    );
                                })
                            } */}

                            {
                                get_all_tax.map((list) => {
                                    return (
                                        <div className=' bg-white text-center'>
                                            <div className=' bg-[#083050] text-white'>
                                                <h1>VAT</h1>
                                            </div>
                                            <div className=' py-2'>
                                                {`${list.vat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`}
                                            </div>
                                        </div>
                                    );
                                })
                            }

                            {
                                get_all_tax.map((list) => {
                                    return (
                                        <div className=' bg-white text-center'>
                                            <div className=' bg-[#083050] text-white'>
                                                <h1>NHIL LEVY</h1>
                                            </div>
                                            <div className=' py-2'>
                                                {`${list.nhil_levy.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`}
                                            </div>
                                        </div>
                                    );
                                })
                            }


                        </div>
                        <div className=' grid grid-cols-1 lg:grid-cols-3 pt-8 gap-10'>
                            {/* <div style={{ border: "1px solid #dddddd" }} className=' shadow-md p-4 rounded-[10px]  bg-white'>
                                <h1 className=' text-center'>SET OPEN AND CLOSING FEE</h1>
                                <div className=' space-y-6 px-4 py-4'>
                                    <FormControl fullWidth>
                                        <InputLabel label="Tax Amount" id="demo-simple-select-label">Select Open and Closing</InputLabel>
                                        <Select
                                            value={oncSelect}
                                            onChange={(e) => {
                                                setoncSelect(e.target.value);
                                            }}
                                            labelId="demo-simple-select-label"
                                            name="religion"
                                            label="Select Open and Closing"
                                        >
                                            {OpenClosingArray.map((list) => {
                                                return <MenuItem value={list}>{list}</MenuItem>;
                                            })}
                                        </Select>
                                    </FormControl>
                                    <TextField type="number" value={onc} onChange={(e) => {
                                        setonc(e.target.value);
                                    }} placeholder=' Amount' fullWidth />

                                    {loading ? <Button variant="contained" style={{ width: "100%", backgroundColor: "#0F1D48", color: "white", padding: 14 }}><CircularProgress size={17} style={{ color: "white" }} /></Button>
                                        : <Button disabled={!oncSelect || !onc} onClick={Update_ONC} variant="contained" style={{ width: "100%", backgroundColor: "#0F1D48", color: "white", padding: 14 }}>Submit</Button>}
                                </div>
                            </div> */}
                            <div style={{ border: "1px solid #dddddd" }} className=' shadow-md p-4 rounded-[10px] bg-[white] '>
                                <h1 className=' text-center'>SET PRODUCTS FEES</h1>
                                <div className=' space-y-6 px-4 py-4'>
                                    <FormControl fullWidth>
                                        <InputLabel label="Tax Amount" id="demo-simple-select-label">Select Product</InputLabel>
                                        <Select
                                            value={productselect}
                                            label="Select Product"
                                            onChange={(e) => {
                                                setproductselect(e.target.value);
                                            }}
                                            labelId="demo-simple-select-label"
                                            name="religion"
                                        >
                                            {productListArray.map((list) => {
                                                return <MenuItem value={list}>{list}</MenuItem>;
                                            })}
                                        </Select>
                                    </FormControl>
                                    <TextField value={product} onChange={(e) => {
                                        setproduct(e.target.value)
                                    }} label="Amount" placeholder=' Amount' fullWidth />

                                    {loading2 ? <Button variant="contained" style={{ width: "100%", backgroundColor: "#0F1D48", color: "white", padding: 14 }}><CircularProgress size={17} style={{ color: "white" }} /></Button>
                                        : <Button disabled={!productselect || !product} onClick={Update_ProductList} variant="contained" style={{ width: "100%", backgroundColor: "#0F1D48", color: "white", padding: 14 }}>Submit</Button>}

                                </div>
                            </div>

                            <div style={{ border: "1px solid #dddddd" }} className=' shadow-md p-4 rounded-[10px] bg-[white]'>
                                <h1 className=' text-center'>SET TAXES</h1>
                                <div className=' space-y-6 px-4 py-4'>
                                    <FormControl fullWidth>
                                        <InputLabel label="Select Tax" id="demo-simple-select-label">Select Tax</InputLabel>
                                        <Select
                                            value={selectTax}
                                            onChange={(e) => {
                                                setselectTax(e.target.value);
                                            }}
                                            labelId="demo-simple-select-label"
                                        >
                                            {TaxArray.map((list) => {
                                                return <MenuItem value={list}>{list}</MenuItem>;
                                            })}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        value={Tax} onChange={(e) => {
                                            setTax(e.target.value)
                                        }}
                                        label="Tax Percentage" placeholder='Tax Percentage' fullWidth />

                                    {loading5 ? <Button variant="contained" style={{ width: "100%", backgroundColor: "#0F1D48", color: "white", padding: 14 }}><CircularProgress size={17} style={{ color: "white" }} /></Button>
                                        : <Button disabled={!Tax || !selectTax} onClick={SetTax} variant="contained" style={{ width: "100%", backgroundColor: "#0F1D48", color: "white", padding: 14 }}>Submit</Button>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeePayment;