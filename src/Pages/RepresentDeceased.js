import React, { useState, useRef, useEffect } from "react";
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
    Typography,
} from "@mui/material";
import PhotoCameraFrontOutlinedIcon from "@mui/icons-material/PhotoCameraFrontOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from "formik";
import * as Yup from 'yup';
import BASEURL from "../Connection/BASEURL";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import "../Pages/Print.css";
import { Add_Productlist, Clear_Productlist, selectProductlist } from "../Redux/Slice/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { Add_User } from "../Redux/Slice/UserSlice";
import { Add_Client, Clear_Client, selectClient } from "../Redux/Slice/ClientsDetails";
import { Add_Bed, selectBed } from "../Redux/Slice/BedAllocation";
import { Add_Deceased, selectDeceased } from "../Redux/Slice/DeceasedDetails";
import { useNavigate } from "react-router-dom";
import { Add_DeceasedID, selectDeceasedID } from "../Redux/Slice/Deceasedid";
import { selectClientID } from "../Redux/Slice/Clientid";
import { Add_Payment, selectPayment } from "../Redux/Slice/Payment";



const RepresentDeceased = () => {
    const navigate = useNavigate();
    const productData = useSelector(selectProductlist);
    const ClientData = useSelector(selectClient);
    const BedData = useSelector(selectBed);
    const DeceasedData = useSelector(selectDeceased);
    const DeceasedID = useSelector(selectDeceasedID);
    const [Get_Open_closing, setGet_Open_closing] = useState("");
    const [refreshData, setrefreshData] = useState(false);
    const ClientID = useSelector(selectClientID);
    const [amountvalue, setamountvalue] = useState("");
    const [amountloading, setamountloading] = useState(false);
    const paymentamount = useSelector(selectPayment);

    const [bed, setbed] = useState("");
    const [field, setfield] = useState("");
    const [letter, setletter] = useState("");
    const [number, setnumber] = useState("");



    const [fieldOptions, setFieldOptions] = useState([]);
    const [letterOptions, setLetterOptions] = useState([]);
    const [numberOptions, setNumberOptions] = useState([]);


    useEffect(() => {
        if (bed) {
            axios.get(`${BASEURL}/fields/null/${bed}`).then((response) => {
                const data = response.data;
                setFieldOptions(data);
            })
        } else {
            setFieldOptions([]);
        }

    }, [bed])

    useEffect(() => {
        if (field) {
            axios.get(`${BASEURL}/letters/null/${bed}/${field}`).then((response) => {
                const data = response.data;
                setLetterOptions(data);
            })
        } else {
            setLetterOptions([]);
        }

    }, [field]);


    useEffect(() => {
        if (letter) {
            axios.get(`${BASEURL}/numbers/null/${bed}/${field}/${letter}`).then((response) => {
                const data = response.data;
                setNumberOptions(data);
            })
        } else {
            setNumberOptions([])
        }

    }, [letter])


    const [selectbed, setselectbed] = useState("");
    const [selectfield, setselectfield] = useState("");
    const [selectletter, setselectletter] = useState("");
    const [selectnumber, setselectnumber] = useState("");

    // const Update_Repreid = () => {
    //     const payload = {
    //         repreid: DeceasedID?.id
    //     }
    //     axios.put(`${BASEURL}/clients/${ClientID?.id}`, payload).then((response) => {
    //         const data = response.data;
    //         if (data) {
    //             console.log("Data Added Successfuly");
    //         }

    //     }).catch((err) => {
    //         console.log(err);

    //     })
    // }



    const submitAmount = () => {
        dispatch(Add_Payment({
            payment: amountvalue
        }));
        setamountloading(true);
        const payload = {
            payment_amount: amountvalue,

        }
        axios.put(`${BASEURL}/deceased/${DeceasedID?.id}`, payload).then((response) => {
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


    const UpdatedBed = () => {
        const payload = {
            bed: `${selectbed}-${selectfield}-${selectletter}-${selectnumber}`
        }
        axios.put(`${BASEURL}/deceased/${DeceasedID?.id}`, payload).then((response) => {
            const data = response.data;
            if (data) {
                const payload = {
                    repreid: DeceasedID?.id
                }
                axios.put(`${BASEURL}/clients/${ClientID?.id}`, payload).then((response) => {
                    const data = response.data;
                    if (data) {
                        console.log("Data Added Successfuly");
                    }

                }).catch((err) => {
                    console.log(err);

                })

            }
        }).catch((err) => {
            console.log(err);
        })
    }


    const [all_allocatedbeds, setall_allocatedbeds] = useState([]);

    useEffect(() => {
        axios.get(`${BASEURL}/beds/`).then((response) => {
            const data = response.data;
            setall_allocatedbeds(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);



    const [postloading, setpostloading] = useState(false);

    const Post_SettingBeds = () => {
        UpdatedBed();
        setpostloading(true);
        dispatch(Add_Bed({
            bedname: `${selectbed}-${selectfield}-${selectletter}-${selectnumber}`
        }));

        const payload = {
            newValue: "occupied"
        }

        axios.post(`${BASEURL}/beds/update/${bed}/${field}/${letter}/${number}`, payload).then((response) => {
            const data = response.data.message;
            setpostloading(false);
            if (data) {
                toast.success(data, {
                    position: toast.POSITION.TOP_CENTER,
                    // className:" bg"
                })
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                // className:" bg"
            })
            setpostloading(false);

        })
    }

    const [AvailableNumberArray, setAvaiilableNumberArray] = useState([]);
    const [AvailableNumberLoading, setAvailableNumberLoading] = useState(false);
    const [refreshNumberData, setrefreshNumberData] = useState(false);


    const numberLoad = () => {
        setAvailableNumberLoading(true);
        axios.get(`${BASEURL}/numbers/null/${bed}/${field}/${letter}`).then((response) => {
            const data = response.data;
            setAvaiilableNumberArray(data);
            setAvailableNumberLoading(false);
        }).catch((err) => {
            console.log(err)
        })
    }




    const numbersArray = ["01", "02", "03", "04", "05", "06"];
    const FieldsArray = [
        {
            name: "I",
            id: 1
        },
        {
            name: "II",
            id: 2
        },
        {
            name: "III",
            id: 3
        },
        {
            name: "IV",
            id: 4
        },
        {
            name: "V",
            id: 5
        },
        {
            name: "VI",
            id: 6
        },
        {
            name: "VII",
            id: 7
        },
        {
            name: "VIII",
            id: 8
        },
        {
            name: "IX",
            id: 9
        },
        {
            name: "X",
            id: 10
        },
        {
            name: "XI",
            id: 11
        },
        {
            name: "XII",
            id: 12
        },
        {
            name: "XIII",
            id: 13
        }
    ]
    const lettersArray = [
        {
            name: "A",
            id: 1
        },
        {
            name: "B",
            id: 2
        },
        {
            name: "C",
            id: 3
        },
        {
            name: "D",
            id: 4
        },
        {
            name: "E",
            id: 5
        },
        {
            name: "F",
            id: 6
        }
    ]

    useEffect(() => {
        axios.get(`${BASEURL}/onc/1/${productData.open_and_closing}`).then((response) => {
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
    }, []);



    const [activeStep, setActiveStep] = useState(0);
    const GenderArray = ["Male", "Female"];
    const Religion = ["Muslim", "Christian", "Other"];
    const RelationshipArray = ["Mother", "Friend", "Father", "Aunty", "Uncle", "Nice", "Nephew", "Sister", "Brother", "Grand Mother", "Grand Father", "Other"];
    const sale_of_grave_list = ["Adult_Single", "Adult_Double", "Child_Single", "Infant"];
    const Opening_Closing = ["OC_Single", "OC_Double"];
    const [sale_of_grave, setsale_of_grave] = useState("");
    const [opening_Closing, setopening_Closing] = useState("");
    const dispatch = useDispatch();

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
        axios.put(`${BASEURL}/deceased/${DeceasedID?.id}`, payload).then((response) => {
            const data = response.data;
            setproductListLaoding(false);
            if (data) {
                setrefreshData(true);
                toast.success("Product Added Successfully", {
                    position: toast.POSITION.TOP_CENTER
                });

                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setrefreshData(true);
            }
        }).catch((err) => {
            console.log(err);
            setproductListLaoding(false);
            toast.success("Adding Products Failed!", {
                position: toast.POSITION.TOP_CENTER
            });
        })
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


    const steps = ["Deceased Data", "Select Particular Bed", "Product Selection", "Payment Amount", "Invoice Receipt", "Interment Cert"];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const [loading1, setloading1] = useState(false);
    const [loading2, setloading2] = useState(false);


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
            daddress: Yup.string().required(" Address is required"),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
                .required('Phone number is required'),
            email: Yup.string().email().optional(),
            relationship: Yup.string().required("relationship is required")
        }),
        onSubmit: (values) => {
            console.log("Invoice", values);
            dispatch(Add_Client({
                fname: values.fname,
                lname: values.lname,
                daddress: values.daddress
            }))
            setloading1(true);
            axios.post(`${BASEURL}/clients/add_client`, values).then((response) => {
                setloading1(false);
                const data = response.data;
                formik.resetForm();
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

    const formik2 = useFormik({
        initialValues: {
            fname: '',
            mname: "",
            lname: "",
            gender: "",
            dob: "",
            dod: "",
            placeofdeath: "",
            occupation: "",
            religion: "",
            nameofwitness: "",
            daddressofwitness: "",
            phoneofwitness: "",
            dobrial: "",
            Aged: ""
        },
        validationSchema: Yup.object({
            fname: Yup.string().required(' First Name is required'),
            lname: Yup.string().required('Last Name is required'),
            mname: Yup.string().optional(),
            gender: Yup.string().required('Gender is required'),
            dob: Yup.date().required('Date is required'),
            dod: Yup.date().required('Date is required'),
            occupation: Yup.string().optional(),
            religion: Yup.string().optional(),
            nameofwitness: Yup.string().optional(),
            daddressofwitness: Yup.string().optional(),
            phoneofwitness: Yup.string()
                .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').optional(),
            // .required('Phone number is required'),
            dobrial: Yup.date().optional(),
            Aged: Yup.string().optional()
            // fname: Yup.string().required(' First Name is required'),
            // lname: Yup.string().required('Last Name is required'),
            // mname: Yup.string().optional(),
            // gender: Yup.string().required('Gender is required'),
            // dob: Yup.date().required('Date is required'),
            // dod: Yup.date().required('Date is required'),
            // occupation: Yup.string().required('Occupation is required'),
            // religion: Yup.string().required('Religion is required'),
            // nameofwitness: Yup.string().optional(),
            // daddressofwitness: Yup.string().required('Name of Digital Address is required'),
            // phoneofwitness: Yup.string()
            //     .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
            //     .required('Phone number is required'),
            // dobrial: Yup.date().required('Date is required'),
            // Aged: Yup.string().required(' Age is required')
        }),
        onSubmit: (values) => {
            console.log(values);
            dispatch(Add_Deceased({
                fname: values.fname,
                lname: values.lname,
                dod: values.dod,
                aged: values.Aged,
                dobrial: values.dobrial
            }))
            setloading2(true);
            axios.post(`${BASEURL}/deceased/add_deaceased`, values).then((response) => {
                setloading2(false);
                const data = response.data;
                formik.resetForm();
                if (data) {
                    dispatch(Add_DeceasedID({
                        id: data.tblid
                    }))
                    toast.success("Deceased Created Successfully", {
                        position: toast.POSITION.TOP_CENTER
                    });

                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
            }).catch((err) => {
                console.log(err);
                setloading2(false);
            })



        },
    })




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
        <>
            <ToastContainer />

            <div className=" grid grid-cols-9">
                <div className=" col-span-2">
                    <SideBar />
                </div>
                <div className=" col-span-7 bg-[#D2D2CF]">
                    <Header />
                    <div
                        className=" px-6 py-6"
                    >
                        <div className=" flex items-center justify-between">
                            <h1 className=" text-4xl font-bold  text-[#111927] py-2">
                                Request For Invoice
                            </h1>
                            {
                                activeStep === 5 && (
                                    <Button onClick={printDiv} variant="contained" style={{ backgroundColor: "#083050", color: "white" }}>Print Reciept</Button>
                                )
                            }
                            {
                                activeStep === 4 && (
                                    <Button onClick={printDiv} variant="contained" style={{ backgroundColor: "#083050", color: "white" }}>Print Reciept</Button>
                                )
                            }


                        </div>

                        <Paper
                            elevation={3}
                            // style={{ border: "1px solid #F5F6F8" }}
                            className=" bg-white  mt-8 p-5"
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
                                <div >
                                    <form
                                        onSubmit={formik2.handleSubmit}
                                    >
                                        <div className=" grid grid-cols-2  gap-6 px-3">
                                            <TextField
                                                fullWidth
                                                placeholder="First Name"
                                                label="First Name"
                                                id="fname"
                                                name="fname"
                                                variant="outlined"
                                                {...formik2.getFieldProps('fname')}
                                                error={formik2.touched.fname && Boolean(formik2.errors.fname)}
                                                helperText={formik2.touched.fname && formik2.errors.fname}
                                            />
                                            <TextField
                                                fullWidth
                                                placeholder="Maiden Name"
                                                label="Maiden Name"
                                                id="mname"
                                                name="mname"
                                                variant="outlined"
                                                {...formik2.getFieldProps('mname')}
                                                error={formik2.touched.mname && Boolean(formik2.errors.mname)}
                                                helperText={formik.touched.mname && formik2.errors.mname}
                                            />
                                            <TextField
                                                fullWidth
                                                placeholder="Last Name"
                                                label="Last Name"
                                                id="lname"
                                                name="lname"
                                                variant="outlined"
                                                {...formik2.getFieldProps('lname')}
                                                error={formik2.touched.lname && Boolean(formik2.errors.lname)}
                                                helperText={formik2.touched.lname && formik2.errors.lname}
                                            />
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
                                                <Select
                                                    name="gender"
                                                    value={formik2.values.gender}
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    error={formik2.touched.gender && Boolean(formik2.errors.gender)}
                                                >
                                                    {GenderArray.map((list) => {
                                                        return <MenuItem value={list}>{list}</MenuItem>;
                                                    })}
                                                </Select>
                                                {formik2.touched.gender && formik2.errors.gender ? (
                                                    <div className="error pt-1"><p className=" text-xs text-[red]">{formik2.errors.gender}</p></div>
                                                ) : null}
                                            </FormControl>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    format="YYYY-MM-DD"
                                                    label="Date of Birth"
                                                    name="dob"
                                                    onBlur={formik.handleBlur} value={formik2.values.dob}
                                                    onChange={(date) => {
                                                        const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                        formik2.setFieldValue('dob', formattedDate);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    error={formik2.touched.dob && Boolean(formik2.errors.dob)}
                                                    helperText={formik2.touched.dob && formik2.errors.dob}
                                                />

                                            </LocalizationProvider>
                                            {formik2.touched.dob && formik2.errors.dob ? (
                                                <div className="error pt-1"><p className=" text-xs text-[red]">{formik2.errors.dob}</p></div>
                                            ) : null}
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    format="YYYY-MM-DD"
                                                    label="Date of Death"
                                                    name="dod"
                                                    onBlur={formik.handleBlur} value={formik2.values.dod}
                                                    onChange={(date) => {
                                                        const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                        formik2.setFieldValue('dod', formattedDate);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    error={formik2.touched.dod && Boolean(formik2.errors.dod)}
                                                    helperText={formik2.touched.dod && formik2.errors.dod}
                                                />
                                            </LocalizationProvider>
                                            <TextField
                                                fullWidth
                                                label="Place of Death"
                                                placeholder="Place of Death"

                                                id="placeofdeath"
                                                name="placeofdeath"
                                                variant="outlined"
                                                {...formik2.getFieldProps('placeofdeath')}
                                                error={formik2.touched.placeofdeath && Boolean(formik2.errors.placeofdeath)}
                                                helperText={formik2.touched.placeofdeath && formik2.errors.placeofdeath}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Occupation"
                                                placeholder="Occupation"
                                                id="occupation"
                                                name="occupation"
                                                variant="outlined"
                                                {...formik2.getFieldProps('occupation')}
                                                error={formik2.touched.occupation && Boolean(formik2.errors.occupation)}
                                                helperText={formik2.touched.occupation && formik2.errors.occupation}
                                            />
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select Religion</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    name="religion"
                                                    value={formik2.values.religion}
                                                    onChange={formik2.handleChange}
                                                    onBlur={formik2.handleBlur}
                                                    error={formik2.touched.religion && Boolean(formik2.errors.religion)}

                                                >
                                                    {Religion.map((list) => {
                                                        return <MenuItem value={list}>{list}</MenuItem>;
                                                    })}
                                                </Select>
                                                {formik2.touched.religion && formik2.errors.religion ? (
                                                    <div className="error pt-1"><p className=" text-xs text-[red]">{formik2.errors.religion}</p></div>
                                                ) : null}
                                            </FormControl>
                                            <TextField
                                                fullWidth
                                                label="Name of Witness"
                                                placeholder="Name of Witness"
                                                id="nameofwitness"
                                                name="nameofwitness"
                                                variant="outlined"
                                                {...formik2.getFieldProps('nameofwitness')}
                                                error={formik2.touched.nameofwitness && Boolean(formik2.errors.nameofwitness)}
                                                helperText={formik2.touched.nameofwitness && formik2.errors.nameofwitness}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Address of Witness"
                                                placeholder="Address of Witness"
                                                id="daddressofwitness"
                                                name="daddressofwitness"
                                                variant="outlined"
                                                {...formik2.getFieldProps('daddressofwitness')}
                                                error={formik2.touched.daddressofwitness && Boolean(formik2.errors.daddressofwitness)}
                                                helperText={formik2.touched.daddressofwitness && formik2.errors.daddressofwitness}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Phone number of witness"
                                                placeholder="Phone number of witness"
                                                id="phoneofwitness"
                                                name="phoneofwitness"
                                                variant="outlined"
                                                {...formik2.getFieldProps('phoneofwitness')}
                                                error={formik2.touched.phoneofwitness && Boolean(formik2.errors.phoneofwitness)}
                                                helperText={formik2.touched.phoneofwitness && formik2.errors.phoneofwitness}
                                            />
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Date of burial"
                                                    format="YYYY-MM-DD"
                                                    name="dobrial"
                                                    value={formik2.values.dobrial}
                                                    onChange={(date) => {
                                                        const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                        formik2.setFieldValue('dobrial', formattedDate);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    error={formik2.touched.dobrial && Boolean(formik2.errors.dobrial)}
                                                    helperText={formik2.touched.dobrial && formik2.errors.dobrial}
                                                />
                                            </LocalizationProvider>
                                            <TextField
                                                type="number"
                                                fullWidth
                                                label="Age of deceased"
                                                placeholder="Age of deceased"
                                                id="Aged"
                                                name="Aged"
                                                variant="outlined"
                                                {...formik2.getFieldProps('Aged')}
                                                error={formik2.touched.Aged && Boolean(formik2.errors.Aged)}
                                                helperText={formik2.touched.Aged && formik2.errors.Aged}
                                            />
                                        </div>
                                        <div className=" flex justify-end items-center mt-7">

                                            {loading2 ? <Button

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
                            )}

                            {activeStep === 1 && (
                                <div className="  px-60  py-16 space-y-6">
                                    <h1>{console.log("greeen", selectletter)}</h1>
                                    <h1>{console.log("greeen", letter)}</h1>
                                    <FormControl fullWidth>
                                        <InputLabel>Select Bed Type</InputLabel>
                                        <Select
                                            onChange={(e) => {
                                                setbed(e.target.value)
                                                const selectedbed = all_allocatedbeds.find((option) => option.id === e.target.value);
                                                setselectbed(selectedbed ? selectedbed.name : "");
                                            }}
                                            label="Select Bed Type"
                                            value={bed}
                                        >
                                            {all_allocatedbeds.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel>Select Section</InputLabel>
                                        <Select
                                            value={field}
                                            onChange={(e) => {
                                                setfield(e.target.value);
                                                const selectedfield = fieldOptions.find((option) => option.id === e.target.value);
                                                setselectfield(selectedfield ? selectedfield.name : "");

                                            }}
                                            label="Select Roman Numerals">
                                            {fieldOptions.map((option) => (
                                                <MenuItem key={option} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel>Select Sub Section</InputLabel>
                                        <Select
                                            value={letter}
                                            onChange={(e) => {
                                                setletter(e.target.value);
                                                const selectedletter = letterOptions.find((option) => option.id === e.target.value);
                                                setselectletter(selectedletter ? selectedletter.name : "");


                                            }}
                                            label="Select Sub Section"
                                        >
                                            {letterOptions.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>


                                    <FormControl fullWidth>
                                        <InputLabel>Select Division</InputLabel>
                                        <Select
                                            value={number}
                                            onChange={(e) => {
                                                setnumber(e.target.value);
                                                const selectednumber = numberOptions.find((option) => option.id === e.target.value);
                                                setselectnumber(selectednumber ? selectednumber.number : "")

                                            }}

                                        >
                                            {numberOptions.map((option) => (
                                                <MenuItem key={option} value={option.id}>
                                                    {option.number}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <div className=" grid place-items-center mt-10">
                                        {postloading ? <Button

                                            style={{ width: "30%", backgroundColor: "#083050", color: "white", padding: 12 }}><CircularProgress size={17} style={{ color: "white" }} /></Button> :
                                            <Button
                                                onClick={Post_SettingBeds}
                                                //  onClick={() => {
                                                //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
                                                // }}
                                                style={{ width: "30%", backgroundColor: "#083050", color: "white", padding: 12 }}>Save and Continue</Button>}
                                    </div>

                                </div>

                            )
                            }

                            {
                                activeStep === 2 && (
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
                                                        label="relastionship"
                                                        name="relationship"
                                                        value="Lowering Device"
                                                    >

                                                    </Select>

                                                </FormControl>
                                            </div> */}


                                            <div className=" grid place-items-center mt-10">
                                                {
                                                    productListLoading ? <Button> <CircularProgress style={{ color: "white", backgroundColor: "#083050", color: "white", padding: 12 }} /></Button> :

                                                        <Button onClick={Udate_ProductList} style={{ width: "30%", backgroundColor: "#083050", color: "white", padding: 12 }}>Save and Continue</Button>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                activeStep === 3 && (

                                    <div className=" mx-28 py-12">
                                        <div className=" grid place-items-center">
                                            <div style={{ border: "2px solid #000000", padding: 8 }} className=" space-y-2 pb-3 ">

                                                <h1 className=" font-semibold">{`VALUE ADDED TAX : ₵ ${TOTAL_TAX.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                <h1 className=" font-semibold">{`NHIL & GET FUND LEVY : ₵ ${TOTAL_NHILGETFUND.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                                <h1 className=" font-semibold">{`TOTAL :₵ ${GRAND_TOTAL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
                                            </div>
                                        </div>
                                        <h1 className=" text-center py-7">Payment Amount</h1>
                                        <TextField value={amountvalue} onChange={(e) => {
                                            setamountvalue(e.target.value);
                                        }} type="number" fullWidth label="Enter Amount" placeholder="Enter Amount" />
                                        <div className=" grid place-items-center mt-10">
                                            {
                                                amountloading ? <Button style={{ width: "30%", backgroundColor: "#083050", color: "white", padding: 12 }}><CircularProgress size={16} style={{ color: "white" }} /></Button> :
                                                    <Button onClick={submitAmount} style={{ width: "30%", backgroundColor: "#083050", color: "white", padding: 12 }}>Save and Continue</Button>
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {activeStep === 4 && (
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
                                                        <h1 className=" font-bold">{`GH₵ ${Total_Combination_of_Tax1.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h1>
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
                                activeStep === 5 && (
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
            </div>
        </>
    );
};

export default RepresentDeceased;
