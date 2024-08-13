
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASEURL from '../Connection/BASEURL';
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

const AsaseYeDuru = () => {
    const [data, setData] = useState([]);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setloading(true);
        // Fetch data from the server
        axios.get(`${BASEURL}/beds/`)
            .then((response) => {
                setloading(false);
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const clearSelection = () => {
        setSelectedLetter(null);
        setSelectedNumber(null);
    };


    
    return (
        <div className="grid grid-cols-9">
            <div className='col-span-2 hidden lg:block'>
                <SideBar />
            </div>
            <div className="col-span-10 lg:col-span-7 bg-[#D2D2CF]">
                <Header />
                <div className=' mx-2 lg:mx-8'>
                    <h1 className=" text-2xl lg:text-4xl font-bold text-[#111927] py-2 my-3 pt-2">Beds Allocation</h1>
                    <>{loading ? <div className=' grid place-items-center'><CircularProgress size={50} style={{ color: "#083050" }} /> </div> :
                        data.length === 0 ? <div className=' grid place-items-center pt-32'>
                            <div>
                                <h1 className=' text-xl '>No Beds Available</h1>
                                <Button onClick={() => {
                                    navigate("/create-new-bed")
                                }} style={{ backgroundColor: "#083050", color: "white", width: "100%" }}>Create Beds</Button>
                            </div>

                        </div> :
                            <div>
                                {data.map((topLevelObject) => (
                                    <Accordion key={topLevelObject.id} className="mb-2">
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <h2>{topLevelObject?.name}</h2>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <List>
                                                {topLevelObject?.fields?.map((field) => (
                                                    <Accordion key={field.id}>
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                            <h3 className=' font-bold text-lg'>{field?.name}</h3>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <List>
                                                                {field?.letters?.map((letter) => (
                                                                    <Accordion key={letter.id}>
                                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                                            <h2 className=' font-bold text-lg'>{letter?.name}</h2>
                                                                        </AccordionSummary>
                                                                        <AccordionDetails>
                                                                            <List>
                                                                                {letter?.numbers?.map((number) => (
                                                                                    <ListItem key={number.id} button onClick={() => setSelectedNumber(number)}>
                                                                                        <ListItemText style={{ backgroundColor: number.value === "occupied" ? "red" : "green", textAlign: "center", color: "white", fontWeight: "bold" }} primary={number.number} />
                                                                                    </ListItem>
                                                                                ))}
                                                                            </List>
                                                                        </AccordionDetails>
                                                                    </Accordion>
                                                                ))}
                                                            </List>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                ))}
                                            </List>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </div>
                    }
                    </>
                </div>
            </div>

        </div>
    );
};

export default AsaseYeDuru;






















































































