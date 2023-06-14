import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import MobileBookmarkCard from "./Mobile/MobileBookmarkCard";
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import ControlledCheckbox from './ControlledCheckbox';

export default function ScopingBookmarkCard(props) {
    
    return (
        <MobileBookmarkCard {...props}>
            <ControlledCheckbox {...props}/>
        </MobileBookmarkCard>
    )
}