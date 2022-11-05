import * as React from 'react';
import { useRef, useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useNotification } from '../Utils/NotificationContext';



export default function PastHistorySingle(props) {
    
    const { listing } = props;

    
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
        <Typography
        component="h1"
        variant="h5"
        align="center"
        color="text.primary"
        gutterBottom
        >
        Location: {listing.buyListingDetails.location}
        </Typography>
        <Typography
        component="h1"
        variant="h5"
        align="center"
        color="text.primary"
        gutterBottom
        >
        Description: {listing.buyListingDetails.listingDescription}
        </Typography>
        <Typography
        component="h1"
        variant="h5"
        align="center"
        color="text.primary"
        gutterBottom
        >
        Price: {listing.buyListingDetails.salePrice}
        </Typography>
        
        </Paper>
        </>
    );
}