import React from 'react';
import VendorListing from '../VendorListing';
import ProfileSideBar from '../ProfileSideBar';
import ActiveSellList from '../ActiveSellList';

function VendorListingsPage(){
    return(
        <vendorlistingpage>
            <ProfileSideBar />
            <VendorListing />
            <ActiveSellList/>
        </vendorlistingpage>        
    );
}

export default VendorListingsPage;