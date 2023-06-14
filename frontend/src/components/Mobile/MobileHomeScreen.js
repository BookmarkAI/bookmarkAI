import { Grid, Button } from '@mui/material';
import logo from '../../assets/supermark_both.png';
import { useNavigate } from 'react-router-dom';
import { MobileSearchBar } from '../../components/SearchBar';
import MobileHomeHeader from './MobileHomeHeader';
import FilterDrawer from './FilterDrawer';



export default function MobileHomeScreen(props) {
    const navigate = useNavigate();
    return(
        <>
    
        <MobileHomeHeader/>
        <Grid container spacing={3} sx={{border:0, mt: 15}}>

            <Grid item xs={12} sx={{border:0, display: 'flex', justifyContent: 'center'}}>
                <img 
                    src={logo} 
                    alt="Bookmark Logo"
                    style={{
                        width: '60vw'
                    }}
                />
            </Grid>

            <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', ml:1 , mr: 1}}>
                <MobileSearchBar>
                    <FilterDrawer/>
                </MobileSearchBar>
            </Grid>

            <Grid item xs={12} sx={{border:0, display: 'flex', justifyContent: 'center'}}>
                <Button onClick={() => navigate('/browse')} sx={{background: 'linear-gradient(to right, #cd5b95, #9846ca)'}} variant="contained">Browse</Button>
            </Grid> 

        </Grid>

        </>
    )
}