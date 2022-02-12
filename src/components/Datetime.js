


//styles
import './Datetime.css'

import React from 'react';

export default function Datetime() {
  
    const showdate = new Date();
    const displaytodaysdate = showdate.getDate()+"/"+ (showdate.getMonth()+1)+"/"+showdate.getUTCFullYear()
    const dt = showdate.toDateString()
    return (

<div>
  {/*<input type ="text" value={displaytodaysdate} readOnly="true"/>*/}
  <p>{dt}</p>
   
</div>

    )

    
    
    
    
}
