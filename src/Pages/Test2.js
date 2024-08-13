import { Button, TextField } from '@mui/material'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Test2 = () => {

    const [number, setnumber] = useState("");
    const [newDta, setnewDta] = useState("");

    const submit = () => {
        axios.get(`http://numbersapi.com/${number}/trivia?json`).then((resposne) => {
            const data = resposne.data;
            console.log(data);
            setnewDta(data.text);
        }).catch((err) => {
            console.log(err);
        })
    }



    return (
        <div className=' grid place-items-center h-screen'>
            <div className=' shadow-sm p-10'>
                <TextField fullWidth placeholder='enter Number' value={number} onChange={(e) => {
                    setnumber(e.target.value);
                }} />
                <h1 className='my-3'>{newDta}</h1>
                <Button style={{ background: "green", color: "white", width: "100%", paddingTop: 10, marginTop: 10 }} onClick={submit}>Submit</Button>
            </div>
        </div>
    )
}

export default Test2;