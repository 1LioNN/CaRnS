import React from 'react';
import ProfileSideBar from '../ProfileSideBar';
import VendorRentHistoryListings from '../VendorRentHistoryListings';

function VendorRentHistoryPage(){
    return(
        <vendorhistorypage>
            <VendorRentHistoryListings/>
            <ProfileSideBar />
        </vendorhistorypage>        
    );
}

export default VendorRentHistoryPage;