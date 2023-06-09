import { Card, Grid, Collapse, Button, Box, Typography, Toolbar, IconButton} from "@mui/material";
import MobileBookmarkCard from "./Mobile/MobileBookmarkCard";
import { bookmarks } from "../services-mock/fake_dataset";
import mckinsey from "../assets/images/mckinsey.png"
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Desktop, Mobile } from '../responsive/MediaQuery'
import DesktopBookmarkCard from "./Desktop/DesktopBookmarkCard";

const demo = {
    title: "What is generative AI?",
    description: "Generative artificial intelligence (AI) describes algorithms (such as ChatGPT) that can be used to create new content, including audio, code, images, text, simulations, and videos.",
    url: "https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-generative-ai",
    image: mckinsey
}

function BookMarkList(props) {
    const { style, spacing, select, topk } = props;
    
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
                <Desktop> <DesktopBookmarkCard select={select} i={i} {...doc}/>  </Desktop>
                <Mobile> <MobileBookmarkCard select={select} {...doc}/> </Mobile>
            </Grid>
            :
            <Grid item xs={12} sm={6} md={4}>
                <Desktop> <DesktopBookmarkCard select={select} i={i} {...doc}/>  </Desktop>
                <Mobile> <MobileBookmarkCard select={select} {...doc}/> </Mobile>
            </Grid>

        
        ))}
    </Grid>
  );
};

function DesktopBookMarkList(props) {
    const style = {pt: 5, pr: 20}
    return (
        <BookMarkList style={style} spacing={0} {...props}/>
    )
}

function MobileBookMarkList(props) {
    const style = {p: 1}
    return (
        <BookMarkList style={style} spacing={0} {...props}/>
    )
}

export { DesktopBookMarkList, MobileBookMarkList};