import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect  } from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import DesktopPromptGenerator from './Desktop/DesktopPromptGenerator.js';
import { Tooltip } from '@mui/material';
import { auth, db} from '../fb.js';
import { doc, collection, setDoc } from "firebase/firestore"; 
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import CommentIcon from '@mui/icons-material/Comment';
import { useContext } from 'react';
import { FileContext } from '../utils/FileContext';
import FilterDrawer from './Mobile/FilterDrawer';
import DesktopAdvancedSearch from './Desktop/DesktopAdvancedSearch';
import ReactGA from "react-ga4";


function SearchBar(props) {
  const { fontsize, style, placeholder, advanced } = props;
  const navigate = useNavigate();
  const [searchParams ] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const { chatEnabled, enableChat, selectedFiles, resetSelectedFiles } = useContext(FileContext);

  const user = auth.currentUser;

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [ searchParams ]); 


  function changeQuery(e){
    setQuery(e.target.value);    
  }

  async function keyPress(e){
        if(e.key === 'Enter' &&  query !== ""){
            e.preventDefault();
            if (user.uid !== null) {
              const queryRef = doc(collection(db, "users", user.uid, "queries"));
                await setDoc(queryRef, {
                    query: query, 
                    time: new Date()
                }); 
            }
            
            navigate({
                pathname: "/search",
                search: createSearchParams({
                    q: query
                }).toString()
              })
        }
    }

  return (
    <>
    <Paper
      component="form"
      sx={style}
    >
      <IconButton type="button"  aria-label="search" disabled>
        <SearchIcon sx={{fontSize:'30px'}}/>
      </IconButton>
      <InputBase
        value={query}
        onChange={changeQuery}
        onKeyDown={keyPress}
        sx={{ ml: 1, flex: 1, fontSize: fontsize }}
        placeholder={selectedFiles.length < 1 ? placeholder : `Chat with ${selectedFiles.length} Bookmarks`}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      
      <Box sx={{display: "flex", alignItems:'center'}}>
        
        
        
        {chatEnabled ? 
        <Tooltip title="Click to disable chat">
        <IconButton sx={{p:1}} onClick={()=>{
            enableChat(false)
            ReactGA.event({
                category: 'Chat',
                action: 'Disable Chat',
            })
        }}>
          <CommentIcon  sx={{fontSize: fontsize + 5}}/>
        </IconButton> 
        </Tooltip>
        
        :
        <Tooltip title="Click to enable chat">
        <IconButton sx={{ p:1}} onClick={()=>{
            enableChat(true)
            ReactGA.event({
                category: 'Chat',
                action: 'Enable Chat',
            })
        }}>
          <CommentsDisabledIcon sx={{fontSize: fontsize + 5}}/>  
        </IconButton>
        </Tooltip>
        
        }
       

        {props.children}
      </Box>

    </Paper>  
           
    {advanced && 
      
      <Stack sx={{display: 'flex', flexDirection: 'row', ml: 1}} spacing={1} direction="row">
        <DesktopAdvancedSearch/>
        <DesktopPromptGenerator setQuery={setQuery} query={query}/>
      </Stack>}
   </>
  );
}



function DesktopSearchBar(props) {
  const { height, width, advanced } = props; 
  const style = {height, width, display: 'flex', alignItems: 'center', justifyContent: 'center', border:1, pl: 1, pr:1, pt: 0.8, pb: 0.8,  borderColor: "#DFE1E5", borderRadius:1}
  return (
    <SearchBar fontsize={18} style={style} placeholder={"Chat with your bookmarks"} advanced={advanced}/>
  )
}

function MobileSearchBar(props) {
  const style = {display: 'flex', alignItems: 'center', justifyContent: 'center', border:1, height: 40, pr: 1, width: '95%', borderColor: "#DFE1E5", borderRadius:10}
  return (
    <SearchBar fontsize={17} style={style} placeholder={"Search"} {...props}>
      {props.children}
    </SearchBar>
  )
}

export { DesktopSearchBar, MobileSearchBar }