import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Add_Productlist, selectProductlist } from '../Redux/Slice/ProductList';
import { Add_Client, selectClient } from '../Redux/Slice/ClientsDetails';
import { Add_Bed, selectBed } from '../Redux/Slice/BedAllocation';
import { Add_Deceased, selectDeceased } from '../Redux/Slice/DeceasedDetails';
import axios from 'axios';
import BASEURL from '../Connection/BASEURL';
import { Button, Paper, Step, StepLabel, Stepper } from '@mui/material';
import dayjs from 'dayjs';
import { Add_Payment, selectPayment } from '../Redux/Slice/Payment';

const DeceasedInvoice = () => {
    const navigate = useNavigate();
    const productData = useSelector(selectProductlist);
    const ClientData = useSelector(selectClient);
    const paymentamount = useSelector(selectPayment);
    const BedData = useSelector(selectBed);
    const DeceasedData = useSelector(selectDeceased);
    const [Get_Open_closing, setGet_Open_closing] = useState("");
    const [refreshData, setrefreshData] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const steps = ["Invoice Receipt", "Interment Cert"];
    const [activeStep, setActiveStep] = useState(0);


    const [bed, setbed] = useState("");
    const [field, setfield] = useState("");
    const [letter, setletter] = useState("");
    const [number, setnumber] = useState("");
    const [loading4, setloading4] = useState(false);



    function printDiv() {
        window.print();
    }


    useEffect(() => {
        axios.get(`${BASEURL}/clients/deceased_data/${location?.state?.id}`).then((response) => {
            const data = response.data;
            console.log("new", data);
            setrefreshData(true);
            dispatch(Add_Client({
                fname: data.fname,
                lname: data.lname,
                daddress: data.daddress,
                phone: data.phone
            }))
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const [Get_D, setGet_Deceased] = useState({})


    useEffect(() => {
        axios.get(`${BASEURL}/deceased/${location?.state?.id}`).then((response) => {
            const data = response.data;
            console.log(data);
            setGet_Deceased(data);
            setrefreshData(true);
            // dispatch(Add_Client({
            //     fname: data.fname,
            //     lname: data.lname,
            //     daddress: data.daddress,
            //     phone: data.phone
            // }))
            dispatch(Add_Productlist({
                sale_of_grave: data.sale_of_grave,
                open_and_closing: data.open_and_closing
            }));

            dispatch(Add_Payment({
                payment: data.payment_amount
            }))

            dispatch(Add_Bed({
                bedname: data?.bed
            }));

            dispatch(Add_Deceased({
                fname: data?.fname,
                lname: data?.lname,
                dod: data?.dod,
                aged: data?.Aged,
                dobrial: data?.dobrial
            }))

        }).catch((err) => {
            console.log(err);
        })
    }, []);



    useEffect(() => {
        axios.get(`${BASEURL}/deceased/${location.state.id}`).then((response) => {
            const data = response.data;
            setGet_Deceased(data);
        })
    }, [])







    useEffect(() => {
        axios.get(`${BASEURL}/onc/1/${productData?.open_and_closing}`).then((response) => {
            const data = response.data;
            setGet_Open_closing(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [refreshData])




    const [Get_All_Fees, setGet_All_Fees] = useState("");

    useEffect(() => {
        const Get_One = () => {
            axios.get(`${BASEURL}/fee/1/${productData?.sale_of_grave}`).then((response) => {
                const data = response.data;
                setGet_All_Fees(data)
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
        }
        Get_One()
    }, [refreshData])


    const [Get_Lowering_Device, setGet_Lowering_Device] = useState({})

    useEffect(() => {
        axios.get(`${BASEURL}/fee/1`).then((response) => {
            const data = response.data;
            setGet_Lowering_Device(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [refreshData]);

    function getCurrentDate() {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const currentDate = new Date().toLocaleDateString(undefined, options);
        return currentDate;
    }

    // Call the function to get the current date in the desired format
    const formattedDate = getCurrentDate();


    function generateRandom5DigitNumber() {
        const min = 10000; // Minimum 5-digit number
        const max = 99999; // Maximum 5-digit number
        const random5DigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return random5DigitNumber;
    }

    // Call the function to get a random 5-digit number
    const random5DigitNumber = generateRandom5DigitNumber();




    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    const [loading1, setloading1] = useState(false);
    const [loading2, setloading2] = useState(false);


    function printDiv() {
        // dispatch(Clear_Productlist());
        // dispatch(Clear_Client());
        window.print();

    }

    const [gettax, settax] = useState("");

    useEffect(() => {
        axios.get(`${BASEURL}/tax/1/vat`).then((response) => {
            const data = response.data;
            settax(data);
        }).catch((err) => {
            console.lo(err);
        });

    }, []);

    const [getnhil, setgetnhil] = useState("");

    useEffect(() => {
        axios.get(`${BASEURL}/tax/1/nhil_levy`).then((response) => {
            const data = response.data;
            setgetnhil(data);
        }).catch((err) => {
            console.lo(err);
        });

    }, []);



    const percentage_NHIL_SALE_OF_GARVE = getnhil;
    const amount_NHIL_SALE_OF_GARVE = Get_All_Fees;
    const result_amount_NHIL_SALE_OF_GARVE = ((percentage_NHIL_SALE_OF_GARVE / 100) * amount_NHIL_SALE_OF_GARVE)

    // const AmountLeft = parseFloat(Total_VAT_CALCULATION) + parseFloat(Subtotal_Calculation) + parseFloat(Toal_NHIL_GETFUND) - parseFloat(paymentamount?.payment);
    const Total_Combination_of_Tax1 = parseFloat(Get_All_Fees) + parseFloat(result_amount_NHIL_SALE_OF_GARVE);



    // Vat Calculation for sale_of_grace
    const percentageSALE_OF_GARVE = gettax;
    const amountSALE_OF_GARVE = Get_All_Fees;
    const resultSALE_OF_GARVE = ((percentageSALE_OF_GARVE / 100) * Total_Combination_of_Tax1)
    console.log(resultSALE_OF_GARVE); // Output: 131.3





    const TOTAL_NHILGETFUND = parseFloat(result_amount_NHIL_SALE_OF_GARVE);
    const TOTAL_TAX = parseFloat(resultSALE_OF_GARVE);
    const Ext_PriceTotal = parseFloat(Get_All_Fees);
    const GRAND_TOTAL = parseFloat(Total_Combination_of_Tax1) + parseFloat(resultSALE_OF_GARVE);
    const AmountLeft = parseFloat(GRAND_TOTAL) - parseFloat(paymentamount?.payment);


    return (
        <div className=' grid grid-cols-9'>
            <div className=' col-span-2'>
                <SideBar />
            </div>
            <div className=' col-span-7 bg-[#D2D2CF]'>
                <Header />
                <div className=' mx-8 my-6'>
                    <div className=" flex items-center justify-between mt-3">
                        <h1 className=" text-4xl font-bold  text-[#111927] py-2">
                            New Invoice
                        </h1>
                        <Button onClick={printDiv} variant="contained" style={{ backgroundColor: "#083050", color: "white" }}>Print Reciept</Button>
                    </div>

                    <Paper elevation={3}
                        className=" bg-white  mt-8 p-5"
                        style={{ borderRadius: 20 }}>

                        <div className=" py-8">
                            <Stepper
                                activeStep={activeStep}
                                nonLinear
                            // alternativeLabel
                            >
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel
                                            style={{
                                                color: "#A4A8AD",
                                                fontSize: 20,
                                                fontFamily: "'Poppins', sans-serif",
                                            }}
                                        >
                                            {label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                        {
                            activeStep === 0 && (
                                <>
                                    <div id="printableContent">
                                        <div className=" flex justify-between ">
                                            <h1 className=" font-bold">Quote Date: {formattedDate}<span></span></h1>
                                            <div>
                                                <h1 className="font-bold text-xl">GRACELAND MEMORIAL GARDEN</h1>
                                                <h1 className="text-center font-bold text-xl">(Berekuso)</h1>
                                                <h1 className="text-center font-bold">BEREKUSO, GHANA</h1>
                                                <h1 className="text-center font-bold">Email:<span>info@armadillogh.com</span></h1>
                                                <h1 className="text-center font-bold">Website:<span>www.armadillogh.com</span></h1>
                                            </div>
                                            <h1 className=" font-bold">Quote #: <span>{`Q00${random5DigitNumber}`}</span></h1>
                                        </div>
                                        <div className=" mt-4 py-2" style={{ border: "2px solid #000000", width: "40%" }}>
                                            <h1 className=" pl-1 font-bold uppercase">Customer Information</h1>
                                        </div>
                                        <div className=" flex space-x-3 ">
                                            <div className="p-1" style={{ borderBottom: "2px solid #000000", borderLeft: "2px solid #000000", borderRight: "2px solid #000000", width: "40%" }}>
                                                <h1 className="font-bold uppercase">{ClientData?.fname} {ClientData?.lname}</h1>
                                                <h1 className=" font-bold uppercase">{ClientData?.daddress}</h1>
                                                <h1 className=" font-bold uppercase">{`0${ClientData?.phone}`}</h1>
                                                <h1>GHANA</h1>
                                            </div>
                                            <h1 className=" font-bold text-xl">Sales Invoice</h1>
                                        </div>
                                        <div style={{ border: "2px solid #000000" }} className=" grid grid-cols-10 mt-4">
                                            <div className=" col-span-6 py-2">
                                                <h1 className=" text-center font-bold">SALE OF A GRAVE</h1>
                                            </div>
                                            <div style={{ borderLeft: "2px solid #000000" }} className=" col-span-4">
                                                <h1 className=" text-center font-bold">Place Information</h1>
                                            </div>
                                        </div>
                                        <div style={{ border: "2px solid #000000" }} className=" grid grid-cols-10 ">
                                            <div className=" col-span-3 py-2">
                                                <h1 className="font-bold pl-2">Product Description</h1>
                                            </div>
                                            <div style={{ borderLeft: "2px solid #000000" }} className=" col-span-5 py-2">
                                                <div className=" grid grid-cols-3 pl-3">
                                                    <div>
                                                        <h1 className=" font-bold">Unit Price/Disc Price</h1>
                                                    </div>
                                                    <div>
                                                        <h1 className=" text-center  font-bold">Qty</h1>
                                                    </div>
                                                    <div>
                                                        <h1 className="font-bold">Ext. Price</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ borderLeft: "2px solid #000000" }} className=" col-span-2 py-2">
                                                <h1 className="font-bold pl-2">Total Price</h1>
                                            </div>
                                        </div>
                                        <div className=" grid grid-cols-10  mb-4">
                                            <div className=" col-span-3 py-2">
                                                <h1 className="font-bold pl-2 ">{`${productData?.sale_of_grave} GRAVE`}</h1>
                                                <div className=" pl-5 font-bold">
                                                    <h1 className=" text-sm font-bold">Transfer Information</h1>
                                                    <h1 className=" text-sm font-bold">Transfer Site(s)</h1>
                                                    <h1 className=" font-bold">{BedData?.bed}</h1>
                                                    <h1 className=" font-bold">Right Holder Information</h1>
                                                    <h1 className=" font-bold">{ClientData?.fname} {ClientData?.lname}</h1>
                                                </div>
                                            </div>
                                            <div className=" col-span-5">
                                                <div className=" grid grid-cols-3 pl-3 pt-2">
                                                    <div>
                                                        <h1 className=" font-bold">{`GH₵ ${Get_All_Fees.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                    </div>
                                                    <div>
                                                        <h1 className=" text-center font-bold">1</h1>
                                                    </div>
                                                    <div>
                                                        <h1 className=" font-bold">{`GH₵ ${Get_All_Fees.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                    </div>
                                                </div>
                                                <div className=" grid grid-cols-1 p-2">
                                                    <div className=" flex items-center space-x-14 pl-7">
                                                        <h1 className=" font-bold">VALUE ADDED TAX</h1>
                                                        <h1 className=" font-bold">{`GH₵ ${resultSALE_OF_GARVE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                    </div>
                                                    
                                                    <div className=" flex items-center  space-x-14 pl-7">
                                                        <h1 className=" font-bold">NHIL & GET FUND LEVY</h1>
                                                        <h1 className=" font-bold">{`GH₵ ${result_amount_NHIL_SALE_OF_GARVE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" col-span-2">
                                            </div>
                                        </div>

                                        <div className=" flex justify-end">
                                            <h1 className=" font-bold">{`GH₵ ${Total_Combination_of_Tax1.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                        </div>
                                        <div className=" mb-5" style={{ borderTop: "2px solid #000000" }}>
                                        </div>

                                        {/* <div style={{ border: "2px solid #000000" }} className=" grid grid-cols-10 mt-4">
                                        <div className=" col-span-6 py-2">
                                            <h1 className=" text-center font-bold">LOWERING DEVICE/CANOPY /PLAQUE</h1>
                                        </div>
                                        <div style={{ borderLeft: "2px solid #000000" }} className=" col-span-4">
                                            <h1 className=" text-center font-bold">Place Information</h1>
                                        </div>
                                    </div> */}
                                        {/* <div style={{ border: "2px solid #000000" }} className=" grid grid-cols-10 ">
                                        <div className=" col-span-3 py-2">
                                            <h1 className="font-bold pl-2">Product Description</h1>
                                        </div>
                                        <div style={{ borderLeft: "2px solid #000000" }} className=" col-span-5 py-2">
                                            <div className=" grid grid-cols-3 pl-3">
                                                <div>
                                                    <h1 className=" font-bold">Unit Price/Disc Price</h1>
                                                </div>
                                                <div>
                                                    <h1 className=" text-center  font-bold">Qty</h1>
                                                </div>
                                                <div>
                                                    <h1 className="font-bold">Ext. Price</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ borderLeft: "2px solid #000000" }} className=" col-span-2 py-2">
                                            <h1 className="font-bold pl-2">Total Price</h1>
                                        </div>
                                    </div> */}
                                        {/* <div className=" grid grid-cols-10 ">
                                        <div className=" col-span-3 py-2">
                                            <h1 className="font-bold pl-2">LOWERING DEVICE WITHOUT NHIL/GET FUND LEVY</h1>
                                        </div>
                                        <div className=" col-span-5">
                                            <div className=" grid grid-cols-3 pl-3 pt-2">
                                                <div>
                                                    <h1 className=" font-bold">{`GHS ${Get_Lowering_Device.Lowering_Device.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                </div>
                                                <div>
                                                    <h1 className=" text-center font-bold">1</h1>
                                                </div>
                                                <div>
                                                    <h1 className=" font-bold">{`GHS ${Get_Lowering_Device.Lowering_Device.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                </div>
                                            </div>
                                            <div className=" grid grid-cols-1 py-2">
                                                <div className=" flex items-center space-x-8 pl-7">
                                                    <h1 className=" font-bold">VALUE ADDED TAX</h1>
                                                    <h1 className=" font-bold">{`GHS ${resultLOWERING_DEVICE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                </div>
                                                <div className=" flex items-center space-x-8 pl-7">
                                                    <h1 className=" font-bold">NHIL & GET FUND LEVY</h1>
                                                    <h1 className=" font-bold">{`GHS ${result_amount_NHIL_LOWERING_device.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" col-span-2">
                                        </div>
                                    </div> */}
                                        {/* <div className=" flex justify-end">
                                        <h1 className=" font-bold">{`GHS ${Total_Combination_of_Tax2.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                    </div> */}
                                        {/* <div className=" mb-11" style={{ borderTop: "2px solid #000000" }}>
                                    </div> */}

                                        {/* <div style={{ border: "2px solid #000000" }} className=" grid grid-cols-10 mt-4">
                                        <div className=" col-span-6 py-2">
                                            <h1 className=" text-center font-bold">OPEN AND CLOSING</h1>
                                        </div>
                                        <div style={{ borderLeft: "2px solid #000000" }} className=" col-span-4">
                                            <h1 className=" text-center font-bold">Place Information</h1>
                                        </div>
                                    </div> */}
                                        {/* <div style={{ border: "2px solid #000000" }} className=" grid grid-cols-10 ">
                                        <div className=" col-span-3 py-2">
                                            <h1 className="font-bold pl-2">Product Description</h1>
                                        </div>
                                        <div style={{ borderLeft: "2px solid #000000" }} className=" col-span-5 py-2">
                                            <div className=" grid grid-cols-3 pl-3">
                                                <div>
                                                    <h1 className=" font-bold">Unit Price/Disc Price</h1>
                                                </div>
                                                <div>
                                                    <h1 className=" text-center  font-bold">Qty</h1>
                                                </div>
                                                <div>
                                                    <h1 className="font-bold">Ext. Price</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ borderLeft: "2px solid #000000" }} className=" col-span-2 py-2">
                                            <h1 className="font-bold pl-2">Total Price</h1>
                                        </div>
                                    </div> */}
                                        <div className=" grid grid-cols-10 ">
                                            <div className=" col-span-3 py-2">
                                                {/* <h1 className="font-bold pl-2">{` ${productData?.open_and_closing}WITHOUT NHIL/GET FUND LEVY`}</h1> */}
                                                <div className=" pl-5">
                                                    <h1 className=" text-base font-semibold">Intement Information</h1>

                                                    <h1 className=" text-base font-semibold">Date of Intement :  {dayjs(DeceasedData?.dobrial).format('MMMM DD, YYYY')} </h1>
                                                    <h1 className=" text-base font-semibold">intement Site(s) : {BedData?.bedname}</h1>
                                                    <h1 className=" font-bold">Deceased Information</h1>
                                                    <h1 className=" font-bold">{DeceasedData?.fname} {DeceasedData?.lname}</h1>
                                                    <h1 className=" font-bold">{`Age: ${DeceasedData?.aged} years`}</h1>
                                                    <h1 className="font-bold">{`Date of Death: ${dayjs(DeceasedData?.dod).format('MMMM DD, YYYY')}`}</h1>
                                                </div>
                                            </div>
                                            <div className=" col-span-5">
                                                <div className=" grid grid-cols-3 pl-3 pt-2">
                                                    <div>
                                                        <h1>{Get_Open_closing}</h1>
                                                    </div>
                                                    {/* <div>
                                                    <h1 className=" text-center">1</h1>
                                                </div> */}
                                                    <div>
                                                        <h1>{Get_Open_closing}</h1>
                                                    </div>
                                                </div>
                                                <div className=" grid grid-cols-1">
                                                    {/* <div className=" flex items-center space-x-8 pl-7">
                                                    <h1>VALUE ADDED TAX</h1>
                                                    <h1>{`GHS ${resultOPEN_CLOSING}`}</h1>
                                                </div> */}
                                                    {/* <div className=" flex items-center space-x-8 pl-7">
                                                    <h1>NHIL & GET FUND LEVY</h1>
                                                    <h1>{`GHS ${result_amount_NHIL_OPEN_CLOSING}`}</h1>
                                                </div> */}
                                                </div>
                                            </div>
                                            <div className=" col-span-2">
                                            </div>
                                        </div>

                                        {/* <div className=" flex justify-end">
                                        <h1>{`GHS ${Total_Combination_of_Tax3}`}</h1>
                                    </div> */}
                                        <div className=" mb-6" style={{ borderTop: "2px solid #000000" }}>
                                        </div>

                                        <div className=" flex justify-end">
                                            <div className=" mt-5 space-y-5">
                                                <div className=" py-1 px-2" style={{ border: "2px solid #000000" }}>
                                                    <h1 className=" font-bold">VALUE ADDED TAX: <span className="p-1" >{`GH₵ ${resultSALE_OF_GARVE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span></h1>
                                                </div>
                                                <div className=" py-1 px-2" style={{ border: "2px solid #000000" }}>
                                                    <h1 className=" font-bold">Ext. Price Total: <span className="p-1" >{`GH₵ ${Ext_PriceTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span></h1>
                                                </div>
                                                <div className=" py-1 px-2" style={{ border: "2px solid #000000" }}>
                                                    <h1 className=" font-bold">NHIL & GET FUND LEVY: <span className="p-1">{`GH₵ ${Total_Combination_of_Tax1.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span></h1>
                                                </div>
                                                <div className=" py-1 px-2" style={{ border: "2px solid #000000" }}>
                                                    <h1 className=" font-bold">TOTAL: <span className="p-1" >{`GH₵ ${GRAND_TOTAL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span></h1>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" mt-4">
                                            <h1 className=" font-bold underline">Payments(s)</h1>
                                            <div className=" grid grid-cols-5">
                                                <div>
                                                    <h1 className=" font-bold">Payment Date</h1>
                                                    <h1 className=" pl-4">{formattedDate}</h1>
                                                </div>
                                                <div>
                                                    <h1 className=" font-bold">Receipt Number</h1>
                                                    <h1 className=" pl-4">{`RC${random5DigitNumber}`}</h1>
                                                </div>

                                                <div>
                                                    <h1 className=" font-bold">Payment Method </h1>
                                                    <h1 className=" pl-4">CHEQUE</h1>
                                                </div>
                                                <div>
                                                    <h1 className=" font-bold">Payment Amount</h1>
                                                    <h1 className=" pl-4 font-semibold">
                                                        {`₵ ${paymentamount?.payment?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}

                                                    </h1>
                                                </div>
                                                <div>
                                                    <div className="">
                                                        <h1 className=" font-bold">Paid By</h1>
                                                        <h1>{ClientData?.fname} {ClientData?.lname}</h1>
                                                    </div>
                                                    <div className=" py-2 space-y-2">
                                                        <div className=" flex items-center justify-between">
                                                            <h1 className=" font-bold">Total Paid: </h1>
                                                            <h1 className=" font-bold">
                                                                {`₵ ${paymentamount?.payment?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                                            </h1>
                                                        </div>

                                                        <div className=" flex items-center justify-between">
                                                            <h1 className=" font-bold">Balance Owing</h1>
                                                            <h1 className=" font-bold">{`₵ ${AmountLeft?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex justify-end py-4">
                                        <Button variant="contained" style={{ backgroundColor: "#083050", color: "white", paddingLeft: 13, paddingRight: 13 }} onClick={() => {
                                            setActiveStep((prevActiveStep) => prevActiveStep + 1);
                                        }} >Next</Button>
                                    </div>
                                </>
                            )
                        }

                        {
                            activeStep === 1 && (
                                <>
                                    <div classNam=" mt-9" id="printableContent">
                                        <h1 className=" font-bold">{`No:T000${random5DigitNumber}`}</h1>
                                        <div>
                                            <h1 className=" text-center text-xl font-bold">GRACELAND MEMORAL GRADEN (Berekuso)</h1>
                                            <h1 className=" font-bold text-center">P.O BOX 14322</h1>
                                            <h1 className=" font-bold text-center">BEREKUSO</h1>
                                        </div>

                                        <div>
                                            <h1 className=" font-bold text-3xl text-center py-4"> Interment Rights Certificate</h1>
                                        </div>

                                        <div className=" space-y-3 pt-2">
                                            <h1 className=" font-bold">This indenture, made on <span>{formattedDate}</span></h1>
                                            <h1 className=" font-bold">Between: <span>GRACELAND MEMORIAL GARDEN (Berekuso)</span></h1>
                                        </div>

                                        <div className=" py-3">
                                            <h1 className=" font-bold">hereinafter called the Lessor, of the first part, and:</h1>
                                            <h1 className=" font-bold uppercase">{ClientData?.fname} {ClientData?.lname}</h1>
                                            <h1 className=" font-bold uppercase">{ClientData?.daddress}</h1>
                                            <h1 className=" font-bold uppercase">{ClientData?.phone}</h1>
                                            <h1 className=" font-bold">BEREKUSO, GHANA</h1>
                                        </div>

                                        <div className=" py-2">
                                            <h1 className="font-bold">herinafter called the Lessee, to include the plural should more than one names appear above, of the second part.</h1>

                                            <div className=" py-3">
                                                <h1 className="font-bold">Witness that for the sum of</h1>
                                                <div className=" pt-5 pl-4 space-y-2">
                                                    <div className=" flex items-center space-x-5">
                                                        <h1 className=" font-bold">Site Price</h1>
                                                        <h1 className=" font-bold"> : {`GH₵ ${GRAND_TOTAL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                    </div>
                                                    <div className=" flex items-center space-x-5">
                                                        <h1 className=" font-bold">VAT :</h1>
                                                        <h1 className=" font-bold">{`GH₵ ${resultSALE_OF_GARVE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" space-y-4 py-5">
                                                <h1 className=" text-center font-bold">The Lessor does hereby sell the Lessee, interment right in the following locations:</h1>
                                                <h1 className=" text-center font-bold">{`${BedData?.bedname} (${productData?.sale_of_grave})`}</h1>
                                            </div>
                                            <div className=" pt-8">
                                                <h1 className=" text-center font-bold">This Certificate cannoted be transferre. It must be returned to Armadillo Ghana </h1>
                                                <h1 className=" text-center font-bold">Company Limited , who will issue a new certificate to the transferee</h1>
                                            </div>

                                            <div className=" flex justify-end mt-16">
                                                <div>
                                                </div>
                                                <h1 className="font-bold text-end" style={{ borderTop: "2px solid #000000", width: "30%" }}>Manager of the Cemetry</h1>
                                            </div>


                                        </div>
                                    </div>

                                    <div className=" flex justify-between py-4">
                                        <Button variant="contained" style={{ backgroundColor: "#083050", color: "white", paddingLeft: 13, paddingRight: 13 }} onClick={() => {
                                            setActiveStep((prevActiveStep) => prevActiveStep - 1);
                                        }} >BACK</Button>
                                        <Button variant="contained" style={{ backgroundColor: "#083050", color: "white", paddingLeft: 13, paddingRight: 13 }} onClick={() => {
                                            navigate("/all-deceased");
                                            window.location.reload();
                                        }} >Done</Button>
                                    </div>
                                </>
                            )
                        }

                    </Paper>






                </div>
            </div>
        </div >
    )
}

export default DeceasedInvoice;





