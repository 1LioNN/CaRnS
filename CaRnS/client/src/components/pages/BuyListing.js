import React from 'react';
import { Link } from "react-router-dom";

// import for card component
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useEffect, useState} from 'react'

function BuyListings(){
    const [buyListing, setBuyListings] = useState(null)

    useEffect(() => {
        const fetchBuyListings = async () => {
            const response = await fetch('http://localhost:8000/api/listing/view-buy', {
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
    }, [])


    return(
        <buylisting>
            <h1 style={{color: 'black'}}> Buy </h1>
            <div className='listings'>
                {buyListing && buyListing.map((buyListing) => (

                    // Naive implementation of listing
                    // <p key={buyListing._id}>
                    //     <Link to={'/buydetail/'+buyListing._id}>
                    //         {buyListing.listingName}
                    //     </Link>
                    // </p>

                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {buyListing.listingName}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a href={'/buydetail/'+buyListing._id} target="_blank">
                                <Button> More Detail </Button>
                            </a>
                        </CardActions>
                    </Card>

                ))}
            </div>
        </buylisting>        
    );
}

export default BuyListings;