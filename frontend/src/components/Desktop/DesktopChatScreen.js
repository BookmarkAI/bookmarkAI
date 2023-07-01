import { useSearchParams } from 'react-router-dom'
import { Typography, Box, Grid, Link, Stack } from '@mui/material';
import { MuiMarkdown } from 'mui-markdown';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DesktopChatList from './DesktopChatList'
import { SearchTab } from '../Tab';
import { DesktopBookMarkList } from '../BookMarkList';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CopySnackbar from '../Mobile/CopySnackbar';
import { getAllConversations, getConversation } from '../../services/service';
import { FileContext } from '../../utils/FileContext';
import { DesktopSearchBar } from '../SearchBar';
import DesktopFolderList from './DesktopFolderList';
import { FolderContext } from '../../utils/FolderContext';



export default function DesktopChatScreen({ responseMessages, sources, searchResult}) {
    const { chatEnabled } = useContext(FileContext)
    const { selectedFolder } = useContext(FolderContext);

    const [ searchParams ] = useSearchParams();
    const [ openSnackbar, setOpenSnackbar ] = useState(false);
    const [ chatHistory, setChatHistory ] = useState([]);

    const [ display, setDisplay ] = useState(null)
    const [ contextUrl, setContextUrl] = useState([]);

    const { id } = useParams();

    const [ question, setQuestion ] = useState("")
    const [ answer, setAnswer ] = useState(null)
   
    return(
        <>
            <CopySnackbar open={openSnackbar} setOpen={setOpenSnackbar}/>
            <Grid container >
                <Grid item xs={1.8} sx={{ borderRight: 1, height: 'calc(100vh - 40px)', borderColor: '#EFF1F4'}} >
                    <Box sx={{ maxHeight: 'calc(100vh - 110px)', overflow: "auto"}}>
                        <Box> 
                            <Box sx={{ pb:1,  display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Typography sx={{ pt: 1.5, pl: 1.5, pr: 1.5, pb: 0.5, fontSize: 13, fontWeight: 500}}>Folders</Typography>
                            </Box>
                            <DesktopFolderList/>  
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={10.2}>
                <Box sx={{width: '100%', borderBottom: 1, borderColor: '#EFF1F4', pt: 1.5, pb: 1.5, pl: 4}}>
                        <DesktopSearchBar width={650}/>
                    </Box>
                <Box sx={{ maxHeight: 'calc(100vh - 110px)', overflow: "auto", ml: 4}}>
                    
                    <SearchTab setDisplay={setDisplay} display={display}/>

                    <Box sx={{display: "flex", flexDirection: "column", pb: 2, mt: 1, mb: 3}}>
                        <DesktopBookMarkList
                        bookmarks={
                            display
                            ? searchResult.filter((bookmark) => {
                                if (selectedFolder) {
                                    return bookmark.type === display && bookmark.folder === selectedFolder;
                                } else {
                                    return bookmark.type === display;
                                }
                                })
                            : searchResult
                        }
                        />
                    </Box>

                </Box>

                </Grid>
            </Grid>
        </>
    )
}