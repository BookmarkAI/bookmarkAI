import { Grid, Stack, Card, Box } from "@mui/material";
import MobileBookmarkCard from "./Mobile/MobileBookmarkCard";
import { bookmarks } from "../services-mock/fake_dataset";
import Checkbox from "@mui/material/Checkbox";
import { DesktopBookmarkCard } from "./Desktop/DesktopBookmarkCard";
import EditDialog from "./Mobile/EditDialog";
import { useContext, useEffect } from 'react';
import { FileContext } from '../utils/FileContext';
import { FolderContext } from '../utils/FolderContext'; 
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import { getAllBookmarks } from '../services/service'

function DesktopBookMarkList({ spacing, select, topk, bookmarks }) {
    const style = {pr: 3}
    const { selectedFiles, updateSelectedFiles } = useContext(FileContext);
    const { selectedFolder } = useContext(FolderContext);
    const { user } = useContext(AuthContext);
    

    console.log(selectedFolder)
  
    return (
        <>
    
        <Grid
                container
                spacing={spacing}
                justify="center"
                sx={style}
            >

            {bookmarks.map((doc, i) => (
                topk ? 

            (i < topk) && <Grid item xs={12} sm={6} md={4}>
                    <DesktopBookmarkCard select={select} {...doc} i={i}/>
                </Grid>
                :
                <Grid item xs={12} sm={6} md={4} >
                    <DesktopBookmarkCard select={select} {...doc} i={i}/>
                </Grid>
            ))}
        </Grid>
    
    </>
    )
}

function MobileBookMarkList({ spacing, select, topk, selectedFolder, bookmarks}) {
    const { selectedFiles, updateSelectedFiles } = useContext(FileContext);
    const { user } = useContext(AuthContext);

    
    console.log("selected folder :" + selectedFolder)

    const style = {p: 1}
    return (
        <Grid
            container
            spacing={spacing}
            justify="center"
            sx={style}
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
                        { select ? 
                        <Checkbox></Checkbox> 
                        :
                        <EditDialog {...doc}/>
                        }
                        </Box>
                    </MobileBookmarkCard>
                    </Box>
                    
                </Grid>

            
            ))}
        </Grid>
        
    )
}

export { DesktopBookMarkList, MobileBookMarkList};