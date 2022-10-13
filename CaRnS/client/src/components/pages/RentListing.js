import React from 'react';

import { useEffect, useState } from 'react'


function RentListings(){

    const [rentListing, setRentListings] = useState(null)

    useEffect(() => {
        const fetchRentListings = async () => {
            const response = await fetch('http://localhost:8000/api/listing/view-rent', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json()

            if (response.ok) {
                setRentListings(data)

            }
        }

        fetchRentListings()
    }, [])

    return(
        <rentlisting>
            <h1 style={{color: 'black'}}> Rent </h1>

            <div className='listings'>
                {rentListing && rentListing.map((rentListing) => (
                    <p key={rentListing._id}>
                        {rentListing.listingName}
                    </p>
                ))}
            </div>
        </rentlisting>        
    );
}

export default RentListings;