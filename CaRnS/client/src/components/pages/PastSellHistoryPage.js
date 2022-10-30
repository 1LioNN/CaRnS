import React from 'react';
import PastSellList from '../PastSellList';
import ProfileSideBar from '../ProfileSideBar';

function PastSellHistoryPage(){
    return(
        <vendorhistorypage>
            <ProfileSideBar />
            <PastSellList/>
        </vendorhistorypage>        
    );
}

export default PastSellHistoryPage;