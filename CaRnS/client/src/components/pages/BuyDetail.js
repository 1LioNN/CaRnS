import React from 'react';
import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import ContactInfo from "./ContactInfo";
import { Link } from "react-router-dom";

function BuyDetail(){
	const [buyListing, setBuyListing] = useState(null);
	const [contactInfo, setContactInfo] = useState(null);
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
			
			if (response.ok){
				setBuyListing(data)
			}
			
		}
		
		fetchBuyDetail()
	}, [])
	
	return(
		<buydetail>
		{	buyListing?
			
			<>
			
			<h1 style={{color: 'black'}}> {buyListing.listingName} </h1>
			<Paper elevation={4}>
			<h2 style={{color: 'black'}}> Description: </h2>
			<h3 style={{color: 'black'}}> {buyListing.buyListingDetails.listingDescription} </h3>
			</Paper>
			<Paper elevation={4}>
			<h2 style={{color: 'black'}}> Vehicle Type: </h2>
			<h3 style={{color: 'black'}}> {buyListing.buyListingDetails.vehicleType} </h3>
			</Paper>
			<Paper elevation={4}>
			<h2 style={{color: 'black'}}> Price: </h2>
			<h3 style={{color: 'black'}}> {buyListing.buyListingDetails.salePrice} </h3>
			</Paper>
			<ContactInfo uid = {buyListing.vendorID} />
			<Paper elevation={4}>
			<h2 style={{color: 'black'}}> Location: </h2>
			<h3 style={{color: 'black'}}> {buyListing.buyListingDetails.location} </h3>
			</Paper>
			
			<Link to={'/buycheckout/'+buyListing._id}>
			         Buy It Now!
			     </Link>
			</>: <><h1 style={{color: 'black'}}> LOADING </h1></>
		}
		</buydetail>
	);
}

export default BuyDetail;