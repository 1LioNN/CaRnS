import React from 'react';

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
                    <p key={buyListing._id}>
                        {buyListing.listingName}
                    </p>
                ))}
            </div>
        </buylisting>        
    );
}

export default BuyListings;