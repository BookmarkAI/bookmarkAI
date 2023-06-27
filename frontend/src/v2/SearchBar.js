import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect  } from 'react';

import { auth, db} from '../fb.js';


export default function SearchBar(props) {
  const { query, setQuery, fetchData, getSearchResult } = props;
  const [searchResult, setSearchResult] = useState([]);
  const user = auth.currentUser;



  function changeQuery(e){
    setQuery(e.target.value);    
  }

  async function keyPress(e){
        if(e.key === 'Enter' &&  query !== ""){
            e.preventDefault();
            console.log('test')
            getSearchResult();
        }
    }

  return (
    <>
    <Paper
      component="form"
      sx={{height: 30, display: 'flex', borderBottom: 1, borderRadius: 0, borderColor: "#dddddd", mt: 0.5}}
      elevation={0}
    >
      <IconButton type="button"  aria-label="search" disabled>
        <SearchIcon sx={{fontSize:'15px', color: '#2a2a2a'}}/>
      </IconButton>
      <InputBase
        value={query}
        onChange={changeQuery}
        onKeyDown={keyPress}
        sx={{flex: 1, fontSize: 11}}
        placeholder={'Find...'}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      
    </Paper>  
   </>
  );
}

