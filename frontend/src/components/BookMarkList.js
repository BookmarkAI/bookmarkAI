import { Grid, Stack, Card, Box } from "@mui/material";
import MobileBookmarkCard from "./Mobile/MobileBookmarkCard";
import Checkbox from "@mui/material/Checkbox";
import { DesktopBookmarkCard } from "./Desktop/DesktopBookmarkCard";
import BookmarkMenu from "./EditDialog";
import { useContext, useEffect } from 'react';
import { FileContext } from '../utils/FileContext';
import { FolderContext } from '../utils/FolderContext'; 
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import { getAllBookmarks } from '../services/service'
import MoreVertIcon from '@mui/icons-material/MoreVert'



function DesktopBookMarkList({ spacing, select, topk, bookmarks, fetchBookmarks }) {
    const style = {pr: 3}
    const { selectedFiles, updateSelectedFiles } = useContext(FileContext);
    const { selectedFolder } = useContext(FolderContext);
    const { user } = useContext(AuthContext);
    const [sortedBookmarks, setSortedBookmarks] = useState([]);


    useEffect(() => {
        const sorted = [...bookmarks].sort((a, b) => a.timestamp - b.timestamp);
        console.log(sorted);
        setSortedBookmarks(sorted);
    }, [bookmarks]);

    return (
        <>
    
        <Grid
                container
                spacing={spacing}
                justify="center"
                sx={style}
            >

            {sortedBookmarks.map((doc, i) => (
                <Grid item xs={12} sm={6} md={4} >
                    <DesktopBookmarkCard select={select} {...doc} i={i} fetchBookmarks={fetchBookmarks}/>
                </Grid>
            ))}
        </Grid>
    
    </>
    )
}

function MobileBookMarkList({ spacing, select, topk, selectedFolder, bookmarks, fetchBookmarks}) {
    const { selectedFiles, updateSelectedFiles } = useContext(FileContext);
    const { user } = useContext(AuthContext);

    const style = {p: 1}
    return (
        <Grid
            container
            spacing={spacing}
            justify="center"
        >

            {bookmarks.map((doc, i) => (
                topk ? 

            (i < topk) && <Grid item xs={12} sm={6} md={4}>
                <Box sx={{display: "flex", flexDirection: "column", borderBottom: 0.2, borderColor: "#d3d3d3" }}>
                    <MobileBookmarkCard select={select} {...doc}/> 
                    </Box>
                </Grid>
                :
                <Grid item xs={12} sm={6} md={4}>
                     <Box sx={{display: "flex", flexDirection: "column", borderBottom: 0.2, borderColor: "#d3d3d3" }}>
                    <MobileBookmarkCard select={select} {...doc}>
                        <Box sx={{ mt:3 }}>
                        <BookmarkMenu {...doc} fetchBookmarks={fetchBookmarks}>
                            <MoreVertIcon sx={{color: "#808080"}}/>
                        </BookmarkMenu>
                        </Box>
                    </MobileBookmarkCard>
                    </Box>
                    
                </Grid>

            
            ))}
        </Grid>
        
    )
}

export { DesktopBookMarkList, MobileBookMarkList};