import React, { useState } from 'react';
import "./DatePicker.css";
import {DateRangePicker} from "react-date-range";
// main style file
import "react-date-range/dist/styles.css";
// Theme css file
import "react-date-range/dist/theme/default.css";
import {Button} from "semantic-ui-react";

function DatePicker(props){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    };
    function handleSelect(ranges){
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    return(
        <div className="datePicker">
            <DateRangePicker ranges={
            [selectionRange]} onChange={handleSelect}/>
            <Button onClick={()=> props.handleOnSeach(startDate, endDate)}> Search </Button>
        </div>
    )
}

export default DatePicker;