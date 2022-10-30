import * as React from 'react';
import { useRef, useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useNotification } from '../Utils/NotificationContext';



export default function ActiveHistorySingle(props) {
    
    const { listing } = props;
    const newPriceRef = useRef(listing.buyListingDetails.salePrice);
    const newLocationRef = useRef(listing.buyListingDetails.location);
    const newDescriptionRef = useRef(listing.buyListingDetails.listingDescription);
    const { _, setNotification } = useNotification();
    useEffect(() => {
        newDescriptionRef.current.value=listing.buyListingDetails.listingDescription;
        newPriceRef.current.value=listing.buyListingDetails.salePrice;
        newLocationRef.current.value=listing.buyListingDetails.location;
        
    }, [])
    
    const newpost = async (e) => {
        const listingDescription = newDescriptionRef.current.value;
        const salePrice = newPriceRef.current.value;
        const nlocation = newLocationRef.current.value;
        const response = await fetch('http://localhost:8000/api/listing/update-buy/'+listing._id, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "newSalePrice": salePrice,
                "newListingDescription": listingDescription, 
                "newLocation": nlocation  
            })
        });
        const status = response.status;
        console.log(status)
        const resData = await response.json();
        console.log(resData)
        if (status === 200) {
            setNotification({
                message:"Listing successfully updated",
                severity: "success",
                open: true
            });
        }
        else {
            setNotification({
                message:resData.error,
                severity: "error",
                open: true
            });
        }
        
    }
    const handleDelete = async (e) => {
        const response = await fetch('http://localhost:8000/api/listing/'+listing._id, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const status = response.status;
        console.log(status)
        const resData = await response.json();
        console.log(resData)
        if (status === 200) {
            setNotification({
                message:"Listing successfully deleted",
                severity: "success",
                open: true
            });
            window.location.reload(false);
        }
        else {
            setNotification({
                message:resData.error,
                severity: "error",
                open: true
            });
        }
        
    }

    
    return (
        <>
        <Paper elevation={4}>
            <Typography
            component="h1"
            variant="h5"
            align="center"
            color="text.primary"
            gutterBottom
            >
                {listing.listingName}
            </Typography>
        <Typography
        component="h1"
        variant="h5"
        align="center"
        color="text.primary"
        gutterBottom
        >
        Type: {listing.buyListingDetails.vehicleType}
        </Typography>
        <Container >
        <form id="buylistingform" onSubmit={newpost}>
        <Stack>
        <>Price:</>
        <input required id="input" name="input" ref={newPriceRef}/>
        <>Location:</>
        <input required id="input" name="input" ref={newLocationRef}/>
        <>Description:</>
        <textarea required id="input" name="input" ref={newDescriptionRef}/>
        </Stack>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Update</Button>
        </form>
        </Container> 
        <Button onClick={handleDelete}>Delete</Button>
        </Paper>
        </>
    );
}