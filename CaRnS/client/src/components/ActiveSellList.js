import React from 'react';
import { Link } from "react-router-dom";
import "./Profile.css";
import ActiveHistorySingle from "./ActiveHistorySingle";
import Stack from '@mui/material/Stack';
import { useEffect, useState} from 'react'
import { useAuth } from "../Utils/AuthContext.js";

function ActiveSellList(){
    const [buyListing, setBuyListings] = useState(null)
    const auth = useAuth();  
    useEffect(() => {
        const fetchBuyListings = async () => {
            const response = await fetch('http://localhost:8000/api/listing/viewActiveBuyListings/'+auth.user._id, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json()

            if (response.ok){
                setBuyListings(data)

            }
        }

        fetchBuyListings()
    })
    if(! auth.user){
        console.log(1)
        return (<>Loading</>)
    }

    return(
        <activeselllist>
        <div className="profile-container">
        <Link to={'/vendorrenthistory'}>Rent</Link>
        <text className="page-title">Active Sell Listings</text>
            <div className='listings'>
            <Stack spacing={2}>
                {buyListing && buyListing.map((buyListing) => (
                    <ActiveHistorySingle listing = {buyListing}/>

                ))}
        </Stack>
            </div>
            </div>
        </activeselllist>        
    );
}

export default ActiveSellList;