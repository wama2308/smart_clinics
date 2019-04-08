import React, { Component } from 'react';

const marginBottom = "margin-bottom"
const mBPx = "10px"
const logoStyle = {  
	width: '15em',
   			 height: '6em',
  			 textAlign: 'center'
		
	}

class HeaderLogo extends Component 
{

	render ()
	{
	  const top = {
   
   		     width: '15em',
   			 height: '5em',
  			 textAlign: 'left'

    }
		return(
				<img src="assets/SC_Logo2.png" style={logoStyle}  />
			)
	}
}

export default HeaderLogo;