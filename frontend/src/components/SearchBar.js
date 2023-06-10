import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useState, useEffect  } from 'react';
import { useNavigate, createSearchParams, useSearchParams, useLocation } from 'react-router-dom';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import CommentIcon from '@mui/icons-material/Comment';
import { useContext } from 'react';
import { FileContext } from '../utils/FileContext';


function SearchBar(props) {
  const { fontsize, style, placeholder } = props;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q'));
  const { chatEnabled, enableChat } = useContext(FileContext);

  const location = useLocation();
  const currentPathname = location.pathname;


  function changeQuery(e){
    setQuery(e.target.value);    
  }

  function keyPress(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            navigate({
                pathname: "/search",
                search: createSearchParams({
                    q: query
                }).toString()
              })
        }
    }

  return (
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
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      
      <Box sx={{display: "flex", alignItems:'center'}}>
        
        {chatEnabled ? 
        <IconButton sx={{p:0.5 }} onClick={()=>enableChat(false)}>
          <CommentIcon  sx={{fontSize: fontsize + 5}}/>
        </IconButton> 
        :
        <IconButton sx={{ p:0.5  }} onClick={()=>enableChat(true)}>
          <CommentsDisabledIcon sx={{fontSize: fontsize + 5}}/>  
        </IconButton>
        
        }

        {props.children}
      </Box>

    </Paper>
  );
}



function DesktopSearchBar({height, width}) {
  const style = {height, width, display: 'flex', alignItems: 'center', justifyContent: 'center', border:1, pl: 1, pr:2, pt: 0.8, pb: 0.8, borderColor: "#DFE1E5", borderRadius:20}
  return (
    <SearchBar fontsize={18} style={style} placeholder={"Search Your Own Internet"}/> 
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