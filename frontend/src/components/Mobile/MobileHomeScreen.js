// import { Box, Grid, Toolbar, Button, Stack, Typography, AppBar} from '@mui/material';
// import logo from '../../assets/bookmark_logo.png';
// import { useNavigate } from 'react-router-dom';
// import  { MobileSearchBar } from '../SearchBar';
// import HomeHeader from '../HomeHeader';
// import MobileHomeHeader from './MobileHomeHeader';
// import { MobileBookMarkList } from '../BookMarkList';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MobileFolder from './MobileFolder';
// import { folders } from '../../services-mock/fake_dataset';
// import { createTheme, ThemeProvider } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";
// import { Css } from '@mui/icons-material';
// import MobileFooter from "./MobileFooter";

// const theme = createTheme({
//     components: {
//         MuiCssBaseline: {
//             styleOverrides: (themeParam) => ({
//                 body: {
//                     overflow: 'hidden',
//                     height: '100%'
//                   },
//                   html: {
//                     margin: 0,
//                     height: '100%',
//                     overflow: 'hidden'
//                   }

//               }),
//         },
//       },
// });

// export default function MobileHomeScreen(props) {
//     const navigate = useNavigate();
//     return(
//         <>
//         {/* <ThemeProvider theme={theme}> */}
//             <CssBaseline/>
//         <MobileHomeHeader/>
//         <Toolbar/>
//         <Grid container>
            
//             <Grid item xs={12} sx={{ml: 1, mr: 1, pt: 1, display: "flex", justifyContent: "center"}}>
//                 <MobileSearchBar/> 
//             </Grid>
//             <Grid item xs={12} sx={{pl:3, pr: 3, pt: 2, pb: 2}}>
//                 <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
//                 <Typography sx={{ fontWeight: 450}}>
//                     My Folders 📁
//                 </Typography>
//                 <Button onClick={()=>navigate('/folders')} sx={{ fontWeight: 450 }}>
//                     See All
//                 </Button>
//                 </Box>

//                 {/* Folder List */}
//                 <Grid xs={12} sx={{display: "flex", flexDirection: "column" }}>
//                     <Stack spacing={1}>
//                         {folders.map((doc, i) => (              
//                             i < 3 && <MobileFolder {...doc}/>
//                         ))}

//                     </Stack>
                
//                 </Grid>
            
                
//             </Grid>

//             {/* Either this or just display recent 3 boomarks  */}
//             <Grid sx={{ overflow: "hidden"}}>
//                 <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", pl: 3, pr: 3}}>
//                 <Typography sx={{fontWeight: 450}}>
//                     Recent Bookmarks 📌
//                 </Typography>
//                 <Button onClick={()=>navigate('/browse')} sx={{ fontWeight: 450}}>
//                     See All
//                 </Button>
//                 </Box>
//                 <MobileBookMarkList topk={5}/>
//             </Grid>
//             <Toolbar/>
//         </Grid>
//         <MobileFooter/>
        
//         {/* </ThemeProvider> */}
//         </>
//     )
// }

import { Box, Grid, Button } from '@mui/material';
import logo from '../../assets/supermark_both.png';
import { useNavigate } from 'react-router-dom';
import { MobileSearchBar } from '../../components/SearchBar';
import HomeHeader from '../../components/HomeHeader';
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MobileFooter from './MobileFooter';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
                body: {
                    backgroundColor: "#0D0012",
                    overflow: 'hidden',
                    height: '100%'
                  },
                  html: {
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden'
                  }

              }),
        },
      },
});

export default function MobileHomeScreen(props) {
    const navigate = useNavigate();
    return(
        <>
    
        <HomeHeader/>
        <Grid container spacing={3} sx={{border:0, mt: 10}}>

            <Grid item xs={12} sx={{border:0, display: 'flex', justifyContent: 'center'}}>
                <img 
                    src={logo} 
                    alt="Bookmark Logo"
                    style={{
                        width: '60vw',
                    }}
                />
            </Grid>

            <Grid item xs={12} sx={{ml: 2, mr: 2}}>
                <MobileSearchBar/>
            </Grid>

            <Grid item xs={12} sx={{border:0, display: 'flex', justifyContent: 'center'}}>
                <Button onClick={() => navigate('/browse')} sx={{background: 'linear-gradient(to right, #cd5b95, #9846ca)'}} variant="contained">Or Browse It</Button>
            </Grid> 

        </Grid>

        </>
    )
}