import { Box, Grid, Paper, Typography,Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import logo from '../assets/bookmark_logo.png';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HomeHeader from '../components/HomeHeader';
import SubjectList from '../components/SubjectList';
import BookMarkList from '../components/BookMarkList';
import { useState } from 'react';
import { Desktop, Mobile } from '../responsive/MediaQuery';
import DesktopBrowseScreen from '../components/Desktop/DesktopBrowseScreen';
import MobileBrowseScreen from '../components/Mobile/MobileBrowseScreen';

export default function BrowseScreen(props) {
    return(
        <>
        <Desktop>
            <DesktopBrowseScreen/>
        </Desktop>
        <Mobile>
            <MobileBrowseScreen/>
        </Mobile>
        </>
    )
}

