import { Grid, Box } from "@mui/material";
import MobileBookmarkCard from "./Mobile/MobileBookmarkCard";
import { DesktopBookmarkCard } from "./Desktop/DesktopBookmarkCard";
import BookmarkMenu from "./EditDialog";
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ControlledCheckbox from "./ControlledCheckbox";



function DesktopBookMarkList({ spacing, select, topk, bookmarks, fetchBookmarks, setAllBookmarks }) {
    const style = {pr: 3}
    return (
        <>
    
        <Grid
                container
                spacing={0}
                justify="center"
                sx={style}
            >

            {bookmarks.map((doc, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} >
                    <DesktopBookmarkCard select={select} {...doc} i={i} fetchBookmarks={fetchBookmarks} setAllBookmarks={setAllBookmarks}/>
                </Grid>
            ))}
        </Grid>
    
    </>
    )
}

function MobileBookMarkList({ spacing, select, bookmarks, fetchBookmarks}) {
    return (
        <Grid
            container
            spacing={spacing}
            justify="center"
        >

            {bookmarks.map((doc, i) => (
                <Grid item xs={12} md={4}>
                     <Box sx={{display: "flex", flexDirection: "column", borderBottom: 0.2, borderColor: "#d3d3d3" }}>
                    <MobileBookmarkCard select={select} {...doc}>
                        <Box sx={{ mt:3 }}>
                        {select ? <ControlledCheckbox {...doc}/> :
                        <BookmarkMenu {...doc} fetchBookmarks={fetchBookmarks}>
                            <MoreVertIcon sx={{color: "#808080"}}/>
                        </BookmarkMenu>
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