import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import MobileBookmarkCard from "./Mobile/MobileBookmarkCard";
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';

export default function ControlledCheckbox({id}) {
    
    const { selectedFiles, updateSelectedFiles, removeSelectedFiles } = useContext(FileContext)
    
  
    const handleChange = (event) => {
      if(event.target.checked) {
        updateSelectedFiles(id);
      } else {
        removeSelectedFiles(id);
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
