import React, {useState} from 'react';
import './ProfileSideBar.css';

function SideBarBtn(text){
    const [click, setClick] = useState(false);
    const toggleClick = () => setClick(!click);
    return (
        <sidebarbtn className='sidebar'>
                    <li onClick={toggleClick}>
                        {text.text}
                    </li>
        </sidebarbtn>
    )
}

export default SideBarBtn;