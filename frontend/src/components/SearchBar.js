import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useState, useEffect  } from 'react';
import { useNavigate, createSearchParams, useSearchParams, useLocation } from 'react-router-dom';


function SearchBar(props) {
  const { fontsize, style, placeholder } = props;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q'));

  const location = useLocation();
  const currentPathname = location.pathname;

  // useEffect(()=>{
  //   console.log(query)
  //   setQuery('')
  // },[refresh])

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
    </Paper>
  );
}



function DesktopSearchBar() {
  const style = {display: 'flex', alignItems: 'center', justifyContent: 'center', border:1, pl: 1, pt: 0.8, pb: 0.8, borderColor: "#DFE1E5", borderRadius:20, width: 768}
  return (
    <SearchBar fontsize={20} style={style} placeholder={"Search Your Own Internet"}/> 
  )
}

function MobileSearchBar() {
  const style = {display: 'flex', alignItems: 'center', justifyContent: 'center', border:1, height: 40, pr: 2, width: '95%', borderColor: "#DFE1E5", borderRadius:10}
  return (
    <SearchBar fontsize={17} style={style} placeholder={"Search"}/> 
  )
}

export { DesktopSearchBar, MobileSearchBar }