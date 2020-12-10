import React, { useState } from 'react';
import './App.css';
import { Button } from 'semantic-ui-react'
import DatePicker from './DatePicker';

function App() {
  const [showSearch, setShowSearch ] = useState(true);
  const handleOnSeach = (startDate, endDate) =>{
    console.log("Start Date", startDate);
    console.log("End Date", endDate);

    setShowSearch(!showSearch);
  }

  return (
    <div className="banner__search">  
     <Button  className="banner__searchButton" onClick={ () => setShowSearch(!showSearch)} >{showSearch? "Hide": "Search Dates"} </Button>  
        {showSearch && <DatePicker handleOnSeach={handleOnSeach}/>}
    </div>
  );
}

export default App;
