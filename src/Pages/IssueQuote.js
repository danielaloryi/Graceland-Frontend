import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Step,
    StepLabel,
    Stepper,
    TextField,
} from "@mui/material";
import PhotoCameraFrontOutlinedIcon from "@mui/icons-material/PhotoCameraFrontOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import BASEURL from "../Connection/BASEURL";
import "../Pages/Print.css";
import { useDispatch, useSelector } from "react-redux";
import { Add_Productlist, selectProductlist } from "../Redux/Slice/ProductList";
import { Add_Client, selectClient } from "../Redux/Slice/ClientsDetails";
import { useNavigate } from "react-router-dom";
import { Add_ClientID, selectClientID } from "../Redux/Slice/Clientid";
import { Add_Payment, selectPayment } from "../Redux/Slice/Payment";




const IssueQuote = () => {
    const productData = useSelector(selectProductlist);
    const [Get_Open_closing, setGet_Open_closing] = useState("");
    const [refreshData, setrefreshData] = useState(false);
    const ClientData = useSelector(selectClient);
    const ClientID = useSelector(selectClientID);
    const navigate = useNavigate();
    const paymentamount = useSelector(selectPayment);






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
    }, [])


    const Subtotal_Calculation = parseFloat(Get_All_Fees);



    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const GenderArray = ["Male", "Female"];
    const Religion = ["Muslim", "Chritian", "Other"]
    const RelationshipArray = ["Mother", "Father", "Aunty", "Uncle", "Niece", "Nephew", "Sister", "Brother", "Grand Mother", "Grand Father", "Other", "Friend"];
    const [loading1, setloading1] = useState("");
    const CategoryofPerson = ["Child", "Adult"];

    const steps = ["Customer Data", "Product Selection", "Quote Receipt"];

    const sale_of_grave_list = ["Adult_Single", "Adult_Double", "Child_Single", "Infant"];
    const Opening_Closing = ["OC_Single", "OC_Double"];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [sale_of_grave, setsale_of_grave] = useState("");
    const [opening_Closing, setopening_Closing] = useState("");
    const [productListLoading, setproductListLaoding] = useState(false);



    const Udate_ProductList = () => {

        dispatch(Add_Productlist({
            sale_of_grave: sale_of_grave,
            open_and_closing: opening_Closing
        }))
        setproductListLaoding(true);
        const payload = {
            sale_of_grave: sale_of_grave,
            open_and_closing: opening_Closing
        }
        axios.put(`${BASEURL}/clients/${ClientID?.id}`, payload).then((response) => {
            const data = response.data;
            setproductListLaoding(false);
            if (data) {
                setrefreshData(true);
                toast.success("Product Added Successfully", {
                    position: toast.POSITION.TOP_CENTER
                });

                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }).catch((err) => {
            console.log(err);
            setproductListLaoding(false);
            toast.success("Adding Products Failed!", {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }


    const formik = useFormik({
        initialValues: {
            fname: '',
            mname: "",
            lname: "",
            gender: "",
            daddress: "",
            phone: "",
            email: '',
            relationship: ""
        },
        validationSchema: Yup.object({
            fname: Yup.string().required(' First Name is required'),
            lname: Yup.string().required('Last Name is required'),
            mname: Yup.string().optional(),
            gender: Yup.string().required('Gender is required'),
            daddress: Yup.string().required("Address is required"),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
                .required('Phone number is required'),
            email: Yup.string().email().optional(),
            relationship: Yup.string().required('relationship is required'),
        }),
        onSubmit: (values) => {
            dispatch(Add_Client({
                fname: values.fname,
                lname: values.lname,
                daddress: values.daddress
            }))
            setloading1(true);
            console.log(values)
            axios.post(`${BASEURL}/clients/add_client`, values).then((response) => {
                setloading1(false);
                const data = response.data;
                formik.resetForm();
                dispatch(Add_ClientID({
                    id: data.tblid
                }))
                if (data) {
                    toast.success("Client Created Successfully", {
                        position: toast.POSITION.TOP_CENTER
                    });

                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
            }).catch((err) => {
                console.log(err);
            })

        },
    });

    const [amountvalue, setamountvalue] = useState("");
    const [amountloading, setamountloading] = useState(false);


    const submitAmount = () => {
        dispatch(Add_Payment({
            payment: amountvalue
        }));
        setamountloading(true);
        const payload = {
            payment_amount: amountvalue,

        }
        axios.put(`${BASEURL}/clients/${ClientID?.id}`, payload).then((response) => {
            const data = response.data;
            setamountloading(false);
            if (data) {
                setrefreshData(true);
                toast.success("Amount Added Successfully", {
                    position: toast.POSITION.TOP_CENTER
                });

                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }).catch((err) => {
            console.log(err);
            setamountloading(false);
            toast.success("Adding Amount Failed!", {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    function printDiv() {
        window.print();
    }


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









    return (
        <>
            <ToastContainer />
            <div className=" grid grid-cols-9">
                <div className="col-span-2 hidden lg:block">
                    <SideBar />
                </div>
                <div className=" col-span-10 lg:col-span-7 bg-[#D2D2CF]">
                    <Header />
                    <div

                        className=" px-6 py-6"
                    >
                        <div className=" flex items-center justify-between">
                            <h1 className=" text-2xl lg:text-4xl font-bold  text-[#111927] py-2">
                                Request For Quote
                            </h1>
                            {
                                activeStep === 2 && (<Button onClick={printDiv} variant="contained" style={{ backgroundColor: "#083050", color: "white" }}>Print Reciept</Button>)
                            }

                        </div>

                        <Paper
                            elevation={3}
                            // style={{ border: "1px solid #F5F6F8" }}
                            className=" bg-white mt-4 lg:mt-8 p-2 lg:p-5"
                            style={{ borderRadius: 20 }}
                        >
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
                            {activeStep === 0 && (
                                <div>
                                    <div>
                                        <form
                                            onSubmit={formik.handleSubmit}
                                        >
                                            <div className=" grid grid-cols-1 lg:grid-cols-2  gap-6 px-3">
                                                <TextField
                                                    fullWidth
                                                    placeholder="First Name"
                                                    label="First Name"
                                                    id="fname"
                                                    name="fname"
                                                    variant="outlined"
                                                    {...formik.getFieldProps('fname')}
                                                    error={formik.touched.fname && Boolean(formik.errors.fname)}
                                                    helperText={formik.touched.fname && formik.errors.fname}
                                                />
                                                <TextField
                                                    fullWidth
                                                    placeholder="Middle Name"
                                                    label="Middle Name"
                                                    id="mname"
                                                    name="mname"
                                                    variant="outlined"
                                                    {...formik.getFieldProps('mname')}
                                                    error={formik.touched.mname && Boolean(formik.errors.mname)}
                                                    helperText={formik.touched.mname && formik.errors.mname}
                                                />
                                                <TextField
                                                    fullWidth
                                                    placeholder="Last Name"
                                                    label="Last Name"
                                                    id="lname"
                                                    name="lname"
                                                    variant="outlined"
                                                    {...formik.getFieldProps('lname')}
                                                    error={formik.touched.lname && Boolean(formik.errors.lname)}
                                                    helperText={formik.touched.lname && formik.errors.lname}
                                                />
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
                                                    <Select
                                                        name="gender"
                                                        label="gender"
                                                        value={formik.values.gender}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                                    >
                                                        {GenderArray.map((list) => {
                                                            return <MenuItem value={list}>{list}</MenuItem>;
                                                        })}
                                                    </Select>
                                                    {formik.touched.gender && formik.errors.gender ? (
                                                        <div className="error pt-1"><p className=" text-xs text-[#D32F2F]">{formik.errors.gender}</p></div>
                                                    ) : null}
                                                </FormControl>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Address"
                                                    label="Address"
                                                    id="daddress"
                                                    name="daddress"
                                                    variant="outlined"
                                                    {...formik.getFieldProps('daddress')}
                                                    error={formik.touched.daddress && Boolean(formik.errors.daddress)}
                                                    helperText={formik.touched.daddress && formik.errors.daddress}
                                                />
                                                <TextField
                                                    fullWidth
                                                    placeholder="Phone"
                                                    label="Phone"
                                                    id="phone"
                                                    name="phone"
                                                    variant="outlined"
                                                    {...formik.getFieldProps('phone')}
                                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                    helperText={formik.touched.phone && formik.errors.phone}
                                                />
                                                <TextField
                                                    fullWidth
                                                    placeholder="Email"
                                                    label="Email"
                                                    id="email"
                                                    name="email"
                                                    variant="outlined"
                                                    {...formik.getFieldProps('email')}
                                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                                    helperText={formik.touched.email && formik.errors.email}
                                                />
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Select Relationship</InputLabel>
                                                    <Select
                                                        label="relastionship"
                                                        name="relationship"
                                                        value={formik.values.relationship}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.relationship && Boolean(formik.errors.relationship)}

                                                    >
                                                        {RelationshipArray.map((list) => {
                                                            return <MenuItem value={list}>{list}</MenuItem>;
                                                        })}
                                                    </Select>
                                                    {formik.touched.relationship && formik.errors.relationship ? (
                                                        <div className="error pt-1"><p className=" text-xs text-[#D32F2F]">{formik.errors.relationship}</p></div>
                                                    ) : null}
                                                </FormControl>



                                            </div>
                                            <div className=" flex justify-end items-center mt-7">

                                                {loading1 ? <Button
                                                    type="submit"
                                                    variant="contained"
                                                    style={{
                                                        fontFamily: "'Poppins', sans-serif",
                                                        borderRadius: 8,
                                                        paddingLeft: 20,
                                                        paddingRight: 20,
                                                        paddingTop: 10,
                                                        paddingBottom: 10,
                                                        backgroundColor: "#083050",
                                                        color: "white",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    <CircularProgress size={17} style={{ color: "white" }} />
                                                </Button> :
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        style={{
                                                            fontFamily: "'Poppins', sans-serif",
                                                            borderRadius: 8,
                                                            paddingLeft: 20,
                                                            paddingRight: 20,
                                                            paddingTop: 10,
                                                            paddingBottom: 10,
                                                            backgroundColor: "#083050",
                                                            color: "white",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Save and Continue
                                                    </Button>}
                                            </div>
                                        </form>

                                    </div>


                                </div>
                            )}
                            {
                                activeStep === 1 && (
                                    <div className=" pb-32 px-32">
                                        <div>
                                            <div>
                                                <h1 className="py-2 text-center">Sale of Grave</h1>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                                                    <Select
                                                        value={sale_of_grave}
                                                        onChange={(e) => {
                                                            setsale_of_grave(e.target.value);
                                                        }}
                                                        label="relastionship"
                                                        name="relationship"
                                                    >
                                                        {sale_of_grave_list.map((list) => {
                                                            return <MenuItem value={list}>{list}</MenuItem>;
                                                        })}
                                                    </Select>

                                                </FormControl>
                                            </div>
                                            {/* <div>
                                                <h1 className="py-2 text-center">Open & Closing</h1>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Open & Closing</InputLabel>
                                                    <Select
                                                        label="relastionship"
                                                        name="relationship"
                                                        value={opening_Closing}
                                                        onChange={(e) => {
                                                            setopening_Closing(e.target.value);
                                                        }}
                                                    >
                                                        {Opening_Closing.map((list) => {
                                                            return <MenuItem value={list}>{list}</MenuItem>;
                                                        })}
                                                    </Select>

                                                </FormControl>
                                            </div> */}

                                            {/* <div>
                                                <h1 className="py-2 text-center">Lowering Device</h1>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Lowering Device</InputLabel>
                                                    <Select
                                                        disabled
                                                        label="Lowering Device"
                                                        name="Lowering Device"

                                                    >

                                                    </Select>

                                                </FormControl>
                                            </div> */}
                                            <div className=" grid place-items-center mt-10">
                                                {
                                                    productListLoading ? <Button style={{ width: "30%", backgroundColor: "#083050", color: "white", padding: 12 }}><CircularProgress size={16} style={{ color: "white" }} /></Button> :
                                                        <Button onClick={Udate_ProductList} style={{ width: "30%", backgroundColor: "#083050", color: "white", padding: 12 }}>Save and Continue</Button>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                )
                            }



                            {activeStep === 2 && (
                                <>
                                    <div id="printableContent">
                                        <div className=" flex justify-between ">
                                            <h1 className="font-bold">{`Quote Date: ${formattedDate}`}<span></span></h1>
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
                                                <h1 className="py-2 px-2 text-center font-bold " style={{ border: "2px solid #000000", width: "100%" }}>Detils</h1>
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
                                                    <h1 className=" text-center font-bold pt-5">{`GH₵ ${Get_All_Fees?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                    {/* <h1 className=" text-center font-bold">{`GH₵ ${Get_Open_closing?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `}</h1>
                                                    <h1 className=" text-center font-bold">{`GH₵ ${Get_Lowering_Device?.Lowering_Device.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1> */}
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


                                    <div className=" py-4 flex justify-end">
                                        <Button variant="contained" style={{ backgroundColor: "#083050", color: "white", paddingLeft: 16, paddingRight: 16 }} onClick={() => {

                                            navigate("/all-data");
                                            window.location.reload();
                                        }}>DONE</Button>
                                    </div>
                                </>
                            )}
                        </Paper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IssueQuote;
