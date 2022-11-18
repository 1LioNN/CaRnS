import React from 'react';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { useEffect, useState} from 'react'
import { useAuth } from "../Utils/AuthContext.js";
import AddIcon from "@mui/icons-material/Add";
import "./ActiveSellList.css"
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";
import ContactInfo from "./ContactInfo";

function BuyerHistory(){
    const [listing, setListings] = useState(null)
    const auth = useAuth();  
    useEffect(() => {
        const fetchListings = async () => {
          const response = await fetch('http://localhost:8000/api/transaction/past-purchases', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json()

            if (response.ok){
                setListings(data)

            }
        }

        fetchListings()
    },[true])
    if(! auth.user){
        console.log(1)
        return (<>Loading</>)
    }

    return(
        <>
        <div className="listing-container">
        <div className="page-header">
          <text className="listing-page-title">
            History
          </text>
        </div>

            <div className='singlelistings'>
            <Stack spacing={3}>
                {listing && listing.map((listing) => (
                  <Container>
                  <Paper elevation={3}>
                  <>Listing Name: {listing.listingName}</>
                  <ContactInfo uid={listing.vendorID} />
                  <>{listing.isBuy ?
                    <>Type: Buy</>:<>Type: Rent</>}</>
                  </Paper>
                  </Container>

                ))}
        </Stack>
            </div>
            </div>
        </>        
    );
}

export default BuyerHistory;
