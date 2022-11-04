import React from 'react';
import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import ContactInfo from "./ContactInfo";
import "./BuyDetail.css";
import placeholder from "../assets/image/placeholder-image.png"

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
			<div className='buydetail'>
			
		{	buyListing?
			
			<>
			<div className='buydetail-container'>

	
			<div className="buylistingimg" >
			<img src = {placeholder} 
			style={{height: 300, width: 300, opacity: 0.5}}
			></img>
			</div>
			<ContactInfo uid = {buyListing.vendorID}/>
			
			<div className='buydetailinfo'>
			<h1 style={{color: 'black'}}> {buyListing.listingName} </h1>
			<Paper elevation={4}>
			<h2 style={{color: 'black'}}> Vehicle Type: </h2>
			<h3 style={{color: 'black'}}> {buyListing.buyListingDetails.vehicleType} </h3>
			</Paper>
			<Paper elevation={4}>
			<h2 style={{color: 'black'}}> Location: </h2>
			<h3 style={{color: 'black'}}> {buyListing.buyListingDetails.location} </h3>
			</Paper>
			<Paper elevation={4}>
			<h2 style={{color: 'black'}}> Description: </h2>
			<h3 style={{color: 'black'}}> {buyListing.buyListingDetails.listingDescription} </h3>
			</Paper>
			</div>
			
			<Paper elevation={4}>
			<h2 style={{color: 'black'}}> Price: </h2>
			<h3 style={{color: 'black'}}> {buyListing.buyListingDetails.salePrice} </h3>
			</Paper>
			
			</div></>: <><h1 style={{color: 'black'}}> LOADING </h1></>
		}
		</div>
		</buydetail>
	);
}

export default BuyDetail;