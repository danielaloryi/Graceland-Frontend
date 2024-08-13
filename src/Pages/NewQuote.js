import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import "../Pages/Print.css";
import { Button, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import BASEURL from '../Connection/BASEURL';
import axios from 'axios';
import { Add_Productlist, selectProductlist } from '../Redux/Slice/ProductList';
import { Add_Client, selectClient } from '../Redux/Slice/ClientsDetails';
import { useDispatch, useSelector } from 'react-redux';
import { Add_Payment, selectPayment } from '../Redux/Slice/Payment';

const NewQuote = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const productData = useSelector(selectProductlist);
    const [Get_Open_closing, setGet_Open_closing] = useState("");
    const [refreshData, setrefreshData] = useState(false);
    const ClientData = useSelector(selectClient);
    const paymentamount = useSelector(selectPayment);




    const [Get_D, setGet_Deceased] = useState({})


    useEffect(() => {
        axios.get(`${BASEURL}/clients/${location?.state?.id}`).then((response) => {
            const data = response.data;
            setGet_Deceased(data);
            setrefreshData(true);
            dispatch(Add_Client({
                fname: data.fname,
                lname: data.lname,
                daddress: data.daddress,
                phone: data.phone
            }))
            dispatch(Add_Productlist({
                sale_of_grave: data.sale_of_grave,
                open_and_closing: data.open_and_closing
            }));
            dispatch(Add_Payment({
                payment: data.payment_amount
            }))

        }).catch((err) => {
            console.log(err);
        })
    }, [])


    useEffect(() => {
        axios.get(`${BASEURL}/onc/1/${productData?.open_and_closing}`).then((response) => {
            const data = response.data;
            setGet_Open_closing(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [refreshData]);




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
            console.log("lowering_device", data);
        }).catch((err) => {
            console.log(err);
        })
    }, [refreshData]);


    const Subtotal_Calculation = parseFloat(Get_All_Fees);


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


    // NHIL / GET FUND  for sale_of_grace
    const percentage_NHIL_SALE_OF_GARVE = getnhil;
    const amount_NHIL_SALE_OF_GARVE = Get_All_Fees;
    const result_amount_NHIL_SALE_OF_GARVE = ((percentage_NHIL_SALE_OF_GARVE / 100) * amount_NHIL_SALE_OF_GARVE).toFixed(2);
    console.log(result_amount_NHIL_SALE_OF_GARVE);

    const NewNHLVALUE = parseFloat(result_amount_NHIL_SALE_OF_GARVE) + parseFloat(Get_All_Fees);



    // Vat Calculation for sale_of_grace
    const percentageSALE_OF_GARVE = gettax;
    const resultSALE_OF_GARVE = ((percentageSALE_OF_GARVE / 100) * NewNHLVALUE).toFixed(2);
    console.log(resultSALE_OF_GARVE); // Output: 131.3


    const GRAND_TOAL = parseFloat(NewNHLVALUE) + parseFloat(resultSALE_OF_GARVE);


    function printDiv() {
        // dispatch(Clear_Productlist());
        // dispatch(Clear_Client());
        window.print();

    }

    return (
        <div className=' grid grid-cols-9'>
            <div className=' col-span-2'>
                <SideBar />
            </div>
            <div className=' col-span-7 bg-[#D2D2CF]'>
                <Header />
                <div className=' mx-8'>
                    <div className=" flex items-center justify-between">
                        <h1 className=" text-4xl font-bold  text-[#111927] py-2">
                            New Quote
                        </h1>
                        <Button onClick={printDiv} variant="contained" style={{ backgroundColor: "#083050", color: "white" }}>Print Reciept</Button>
                    </div>
                    <Paper elevation={3}
                        className=" bg-white  mt-8 p-5 mb-8"
                        style={{ borderRadius: 20 }}>
                        <div id="printableContent">
                            <div className=" flex justify-between ">
                                <h1 className=" font-bold">{`Quote Date: ${formattedDate} `}<span></span></h1>
                                <div>
                                    <h1 className="font-bold text-xl">GRACELAND MEMORIAL GARDEN</h1>
                                    <h1 className="text-center font-bold text-xl">(Berekuso)</h1>
                                    <h1 className="text-center font-bold">BEREKUSO, GHANA</h1>
                                    <h1 className="text-center font-bold">Email:<span>info@armadillogh.com</span></h1>
                                    <h1 className="text-center font-bold">Website:<span>www.armadillogh.com</span></h1>
                                </div>
                                <h1 className=" font-bold text-base">Quote #: <span>{`Q00${random5DigitNumber}`}</span></h1>
                            </div>
                            <div className=" mt-4 py-2 pl-1" style={{ border: "2px solid #000000", width: "40%" }}>
                                <h1 className="font-bold">Customer Information</h1>
                            </div>
                            <div className=" flex space-x-3 ">
                                <div className="p-1" style={{ borderBottom: "2px solid #000000", borderLeft: "2px solid #000000", borderRight: "2px solid #000000", width: "40%" }}>
                                    <h1 className="font-bold uppercase">{ClientData?.fname} {ClientData?.lname}</h1>
                                    <h1 className="font-bold uppercase">{ClientData?.daddress}</h1>
                                    <h1 className="font-bold uppercase">{`0${ClientData?.phone}`}</h1>
                                    <h1 className="font-bold uppercase">GHANA</h1>
                                </div>
                                <h1 className=" font-bold text-xl">Sales Quote</h1>
                            </div>
                            <div className=" grid grid-cols-10 mt-4">

                                <div className=" col-span-2">
                                    <h1 className="py-2 px-2 text-center font-bold" style={{ border: "2px solid #000000", width: "100%" }}>Transaction Type</h1>
                                    <div className=" space-y-3">
                                        <h1 className=" font-bold pt-5">SALE OF GRAVE</h1>
                                        {/* <h1 className=" font-bold">OPENING AND CLOSING</h1>
                                        <h1 className=" font-bold">LOWERING DEVICE/CANO PY/PLAQUE</h1> */}
                                    </div>
                                </div>
                                <div className=" col-span-4">
                                    <h1 className="py-2 px-2 text-center font-bold" style={{ border: "2px solid #000000", width: "100%" }}>Description</h1>
                                    <div className=" space-y-3 pl-2">
                                        <h1 className=" uppercase font-bold pt-5">{productData?.sale_of_grave} WITHOUT NHIL/GET FUND LEVY</h1>
                                        {/* <h1 className=" uppercase font-bold">{productData?.open_and_closing} WITHOUT NHIL/GET FUND LEVY</h1>
                                        <h1 className="font-bold">LOWERING DEVICE/CANO PY/PLAQUE WITHOUT NHIL/GET FUND LEVY</h1> */}

                                    </div>
                                </div>
                                <div className=" col-span-1">
                                    <h1 className="py-2 px-2 text-center font-bold" style={{ border: "2px solid #000000", width: "100%" }}>Detils</h1>
                                    <div className=" space-y-3">

                                    </div>
                                </div>
                                <div className=" col-span-1">
                                    <h1 className="py-2 px-2 text-center font-bold" style={{ border: "2px solid #000000", width: "100%" }}>Qty</h1>
                                    <div className=" space-y-3">
                                        <h1 className=" text-center font-bold pt-5">1</h1>
                                        {/* <h1 className=" text-center font-bold">1</h1>
                                        <h1 className=" text-center font-bold">1</h1> */}
                                    </div>
                                </div>
                                <div className=" col-span-2">
                                    <h1 className="py-2 px-2 text-center font-bold" style={{ border: "2px solid #000000", width: "100%" }}>Price</h1>
                                    <div className=" space-y-3">
                                        <h1 className=" text-center font-bold pt-5">{`GH₵ ${Get_All_Fees.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                        {/* <h1 className=" text-center font-bold">{`GH₵ ${Get_Open_closing.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `}</h1>
                                        <h1 className=" text-center font-bold">{`GH₵ ${Get_Lowering_Device?.Lowering_Device?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1> */}
                                    </div>
                                </div>


                            </div>

                            <div style={{ borderTop: "2px solid #000000", marginTop: 10 }}>
                            </div>
                            <div className=" flex justify-end">
                                <div className=" mt-5 space-y-5">
                                    <div className=" py-1 px-2" style={{ border: "2px solid #000000" }}>
                                        <h1 className=" font-bold">VALUE ADDED TAX: <span className="p-1 text-end" >{`GH₵ ${resultSALE_OF_GARVE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span></h1>
                                    </div>
                                    <div className=" py-1 px-2" style={{ border: "2px solid #000000" }}>
                                        <h1 className=" font-bold "> SUB TOTAL: <span className="p-1 text-end" >{`GH₵ ${Subtotal_Calculation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span></h1>
                                    </div>
                                    <div className=" py-1 px-2" style={{ border: "2px solid #000000" }}>
                                        <h1 className=" font-bold text-end">NHIL & GET FUND LEVY: <span className="p-1 text-end">{`GH₵ ${NewNHLVALUE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span></h1>
                                    </div>

                                    <div className=" py-1 px-2" style={{ border: "2px solid #000000" }}>
                                        <h1 className=" font-bold">TOTAL: <span className="p-1 text-end" >{`GH₵ ${GRAND_TOAL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span></h1>
                                    </div>
                                </div>
                            </div>
                            <div className=" mt-6">
                                <h1 className=" font-bold">NOTE : PAYMENT SHOULD BE MADE TO :</h1>
                            </div>

                            <div className=" mt-5">
                                <h1 className=" font-bold">ACCOUNT NAME : ARMADILLO CO. LTD</h1>
                                <h1 className=" font-bold">ACCOUNT NO. : 01111525403503</h1>
                                <h1 className=" font-bold">BANK NAME : UNITED BANK OF AFRICA</h1>
                                <h1 className=" font-bold">ADDRESS : EAST LEGON 1</h1>
                                <h1 className=" font-bold pt-5">INVOICE VALID FOR 7 DAYS</h1>
                                <h1 className=" font-bold pt-5">CONTACT US : 0534939934/0534902803</h1>
                               
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default NewQuote;