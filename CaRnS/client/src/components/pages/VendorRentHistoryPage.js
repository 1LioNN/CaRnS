import React from 'react';
import ProfileSideBar from '../ProfileSideBar';
import VendorRentHistoryListings from '../VendorRentHistoryListings';
import VendorListing from '../VendorListing';

function VendorRentHistoryPage(){
    return(
        <vendorhistorypage>
            <ProfileSideBar />
            <VendorListing />
            <VendorRentHistoryListings/>
        </vendorhistorypage>        
    );
}

export default VendorRentHistoryPage;