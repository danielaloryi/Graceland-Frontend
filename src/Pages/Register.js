import React, { useState } from "react";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import {
    Button,
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



const Register = () => {
    const [activeStep, setActiveStep] = useState(0);
    const GenderArray = ["Male", "Female"];
    const Religion = ["Muslim", "Chritian", "Other"]
    const RelationshipArray = ["Mother", "Father", "Aunty", "Uncle", "Nice", "Nephew", "Sister", "Brother", "Grand Mother", "Grand Father", "Other"];


    const steps = ["Applicant Data", "Deceased Data"];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


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
            daddress: Yup.string().required("Digital Address is required"),
            phone: Yup.number().required("phone is required"),
            email: Yup.string().optional(),
            relationship: Yup.number().required("relationship is required")
        }),
        onSubmit: (values) => {
            // Handle form submission here
            console.log('Form data submitted:', values);
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
            dobrial: ""
        },
        validationSchema: Yup.object({
            fname: Yup.string().required(' First Name is required'),
            lname: Yup.string().required('Last Name is required'),
            mname: Yup.string().optional(),
            gender: Yup.string().required('Gender is required'),
            dob: Yup.date().nullable().required('Date is required'),
            dod: Yup.date().nullable().required('Date is required'),
            occupation: Yup.string().required('Occupation is required'),
            religion: Yup.string().required('Religion is required'),
            nameofwitness: Yup.string().required('Name of Witness is required'),
            daddressofwitness: Yup.string().required('Name of Digital Address is required'),
            phoneofwitness: Yup.number().required("phone is required"),
            dobrial: Yup.date().nullable().required('Date is required')
        })
    })

    return (
        <div className=" grid grid-cols-9">
            <div className=" col-span-2">
                <SideBar />
            </div>
            <div className=" col-span-7 bg-[#D2D2CF]">
                <Header />
                <div
                    style={{ border: "2px solid #F5F6F8" }}
                    className=" px-6 py-6"
                >
                    <h1 className=" text-4xl font-bold  text-[#111927] py-2">
                        Register New Client
                    </h1>

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
                            <div>
                                <div >
                                    <form className=" grid grid-cols-2  gap-6 px-3" onSubmit={formik.handleSubmit}>
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
                                            placeholder="Maiden Name"
                                            label="Maiden Name"
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
                                            label="Name"
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
                                            placeholder="Digital Address"
                                            label="Digital Address"
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
                                            placeholder="Eamil"
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
                                    </form>

                                </div>


                            </div>
                        )}

                        {activeStep === 1 && (
                            <div >
                                <form className=" grid grid-cols-2  gap-6 px-3">
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
                                            <div className="error">{formik2.errors.gender}</div>
                                        ) : null}
                                    </FormControl>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date of Birth"
                                            name="dob"
                                            value={formik.values.selectedDate}
                                            onChange={(date) => formik2.setFieldValue('dod', date)}
                                            renderInput={(params) => <TextField {...params} />}
                                            error={formik2.touched.dod && Boolean(formik2.errors.dod)}
                                            helperText={formik2.touched.dod && formik2.errors.dod}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date of Death"
                                            name="dob"
                                            value={formik.values.selectedDate}
                                            onChange={(date) => formik2.setFieldValue('dob', date)}
                                            renderInput={(params) => <TextField {...params} />}
                                            error={formik2.touched.dob && Boolean(formik2.errors.dob)}
                                            helperText={formik2.touched.dob && formik2.errors.dob}
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
                                            <div className="error">{formik2.errors.religion}</div>
                                        ) : null}
                                    </FormControl>
                                    <TextField
                                        fullWidth
                                        label="Name of Witness"
                                        placeholder="Name of Witness"
                                        id="nameofwitness"
                                        name="nameofwitness"
                                        variant="outlined"
                                        {...formik2.getFieldProps(' nameofwitness')}
                                        error={formik2.touched.nameofwitness && Boolean(formik2.errors.nameofwitness)}
                                        helperText={formik2.touched.nameofwitness && formik2.errors.nameofwitness}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Digital Address of Witness"
                                        placeholder="Digital Address of Witness"
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

                                            name="dobrial"
                                            value={formik.values.dobrial}
                                            onChange={(date) => formik2.setFieldValue(' dobrial', date)}
                                            renderInput={(params) => <TextField {...params} />}
                                            error={formik2.touched.dobrial && Boolean(formik2.errors.dobrial)}
                                            helperText={formik2.touched.dobrial && formik2.errors.dobrial}
                                        />
                                    </LocalizationProvider>
                                </form>

                            </div>
                        )}


                        <div className=" flex justify-between items-center mt-7">
                            <Button onClick={handleBack}>Back</Button>
                            <Button
                                onClick={handleNext}
                                variant="contained"
                                style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    borderRadius: 8,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    backgroundColor: "#2D3389",
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                            >
                                Save and Continue
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default Register;
