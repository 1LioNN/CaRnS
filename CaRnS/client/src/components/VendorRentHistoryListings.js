import React from 'react';
import { Link } from "react-router-dom";
import "./Profile.css";
import Stack from '@mui/material/Stack';
import { useEffect, useState} from 'react'
import { useAuth } from "../Utils/AuthContext.js";

function VendorRentHistoryListings(){
    const [rentListing, setRentListings] = useState(null)
    const auth = useAuth();  
    useEffect(() => {
        const fetchBuyListings = async () => {
            const response = await fetch('http://localhost:8000/api/listing/view-rent', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json()

            if (response.ok){
                setRentListings(data)

            }
        }

        fetchBuyListings()
    })
    if(! auth.user){
        console.log(1)
        return (<>Loading</>)
    }

    return(
        <>
        <div className="profile-container">
        <Link to={'/history'}>Active Sell</Link>
        <Link to={'/pastsellhistory'}>Past Sell</Link>
        <Link to={'/vendorrenthistory'}>Rent History</Link>
        <text className="page-title">Rent History</text>
            <div className='listings'>
            <Stack spacing={2}>
                {rentListing && rentListing.map((rentListing) => (
                    <>map details here</>

                ))}
        </Stack>
            </div>
            </div>
        </>        
    );
}

export default VendorRentHistoryListings;