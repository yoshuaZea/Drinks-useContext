import React from 'react';

const Header = ({titulo}) => {
    return ( 
        <header className="bg-alert">
            <h1>{titulo}</h1>
        </header>
     );
}
 
export default Header;