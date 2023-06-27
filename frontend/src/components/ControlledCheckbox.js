import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import MobileBookmarkCard from "./Mobile/MobileBookmarkCard";
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import ReactGA from "react-ga4";

export default function ControlledCheckbox({id}) {
    
    const { selectedFiles, updateSelectedFiles, removeSelectedFiles } = useContext(FileContext)
    
  
    const handleChange = (event) => {
      if(event.target.checked) {
        updateSelectedFiles(id);
        ReactGA.event({
            category: 'Bookmark',
            action: 'Select Context',
            label: 'Checkbox add'
        })
      } else {
        removeSelectedFiles(id);
        ReactGA.event({
            category: 'Bookmark',
            action: 'Select Context',
            label: 'Checkbox remove'
        })
      }
    };
  
    return (
      <Checkbox
        checked={selectedFiles.includes(id)}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        iconStyle={{fill: 'white'}}
      />
    );
}
