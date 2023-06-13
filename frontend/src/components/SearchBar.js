import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send'
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useState, useEffect  } from 'react';
import { useNavigate, createSearchParams, useSearchParams, useLocation } from 'react-router-dom';
import DesktopPromptGenerator from './Desktop/DesktopPromptGenerator.js';
import { Tooltip } from '@mui/material';

import { auth, usersRef, db} from '../fb.js';
import { doc, updateDoc, arrayUnion, collection, setDoc } from "firebase/firestore"; 
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import CommentIcon from '@mui/icons-material/Comment';
import { useContext } from 'react';
import { FileContext } from '../utils/FileContext';
import { TypeContext } from '../utils/TypeContext.js';


function SearchBar(props) {
  const { fontsize, style, placeholder, advanced } = props;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const { chatEnabled, enableChat, selectedFiles } = useContext(FileContext);
  const { handleTypeSelect } = useContext(TypeContext);

  const location = useLocation();
  const currentPathname = location.pathname;
  const user = auth.currentUser;

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams.get('q')]); 


  function changeQuery(e){
    setQuery(e.target.value);    
  }

  async function keyPress(e){
        if(e.key === 'Enter' &&  query != ""){
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
        placeholder={selectedFiles.length < 1 ? placeholder : `Search Among ${selectedFiles.length} Bookmarks`}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      
      <Box sx={{display: "flex", alignItems:'center'}}>
        
        
        
        {chatEnabled ? 
        <Tooltip title="Click to disable chat">
        <IconButton sx={{p:1}} onClick={()=>enableChat(false)}>
          <CommentIcon  sx={{fontSize: fontsize + 5}}/>
        </IconButton> 
        </Tooltip>
        
        :
        <Tooltip title="Click to enable chat">
        <IconButton sx={{ p:1}} onClick={()=>enableChat(true)}>
          <CommentsDisabledIcon sx={{fontSize: fontsize + 5}}/>  
        </IconButton>
        </Tooltip>
        
        }

        {props.children}
      </Box>

    </Paper>               
    {advanced && 
      <Box sx={{display: 'flex', flexDirection: 'column', ml: 1}}>
        <DesktopPromptGenerator setQuery={setQuery} query={query}/>
      </Box>}
   </>
  );
}



function DesktopSearchBar(props) {
  const { height, width, advanced } = props; 
  const style = {height, width, display: 'flex', alignItems: 'center', justifyContent: 'center', border:1, pl: 1, pr:1, pt: 0.8, pb: 0.8,  borderColor: "#DFE1E5", borderRadius:1}
  return (
    <SearchBar fontsize={18} style={style} placeholder={"Search Your Own Internet"} advanced={advanced}>
      {props.children}
    </SearchBar>
  )
}

function MobileSearchBar(props) {
  const { placeholder } = props;
  const style = {display: 'flex', alignItems: 'center', justifyContent: 'center', border:1, height: 40, pr: 1, width: '95%', borderColor: "#DFE1E5", borderRadius:10}
  return (
    <SearchBar fontsize={17} style={style} placeholder={"Search"} {...props}>
      {props.children}
    </SearchBar>
  )
}

export { DesktopSearchBar, MobileSearchBar }