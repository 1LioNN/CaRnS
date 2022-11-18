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

function VendorBookingTrans(){
    const [rentListing, setRentListings] = useState(null)
    const auth = useAuth();  
    useEffect(() => {
        const fetchBuyListings = async () => {
          const response = await fetch('http://localhost:8000/api/listing/view-active-rent/'+auth.user._id, {
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
        <div className="listing-container">
        <div className="page-header">
          <text className="listing-page-title">
            Booking History
          </text>

          <Link to={"/history"}>
            <text className="rentToggle">
            View Sale History
            </text> 
          </Link>
        </div>

            <div className='singlelistings'>
            <Stack spacing={3}>
                {rentListing && rentListing.map((rentListing) => (
                  <Paper  elevation={3}>
                  <>Listing Name: {rentListing.listingName}</>
                  
                  <>{rentListing.rentListingDetails.booking.map((singleBooking) => (
                    
                    <Container>
                    <Paper elevation={3}>
                    <ContactInfo uid={singleBooking.customerID} />
                    <>Dates Booked:</><>{singleBooking.dates.map((date)=>(
                      <Stack spacing={1}>
                      <>{date.slice(0,10)}</>
                      </Stack>
                    ))}</>
                    
                    </Paper>
                    </Container>
                  ))}
                  
                  </></Paper>

                ))}
        </Stack>
            </div>
            </div>
        </>        
    );
}

export default VendorBookingTrans;
