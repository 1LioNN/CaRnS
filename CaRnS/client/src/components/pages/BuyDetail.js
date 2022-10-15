import React from 'react';
import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

function BuyDetail(){
	const [buyListing, setBuyListing] = useState(null);
	let params = useParams();
	
	useEffect(() => {
		const url = 'http://localhost:8000/api/listing/view-detail-buy/'+ params.listId;
		const fetchBuyDetail = async () => {
			const response = await fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			const data = await response.json()
			console.log(response)
			
			if (response.ok){
				console.log(data)
				setBuyListing(data)
			}
			
		}
		
		fetchBuyDetail()
	}, [])
	
	return(
		<buydetail>
		{	buyListing?
			
			<>
			<h1 style={{color: 'black'}}> NAME: </h1>
			
			<h1 style={{color: 'black'}}> {buyListing.listingName} </h1>
			<h1 style={{color: 'black'}}> Detail: </h1>
			<h1 style={{color: 'black'}}> Description: </h1>
			<h1 style={{color: 'black'}}> {buyListing.buyListingDetails.listingDescription} </h1>
			<h1 style={{color: 'black'}}> Vehicle Type: </h1>
			<h1 style={{color: 'black'}}> {buyListing.buyListingDetails.vehicleType} </h1>
			<h1 style={{color: 'black'}}> Price: </h1>
			<h1 style={{color: 'black'}}> {buyListing.buyListingDetails.salePrice} </h1>
			</>: <><h1 style={{color: 'black'}}> LOADING </h1></>
		}
		</buydetail>
	);
}

export default BuyDetail;