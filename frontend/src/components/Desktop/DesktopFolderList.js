import { Stack, Box, Typography } from '@mui/material';
import { folders } from '../../services-mock/fake_dataset';
import FolderIcon from '@mui/icons-material/Folder';
import Button from '@mui/material/Button'
import { styled } from '@mui/system';
import { useState, useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SimpleDialogDemo from './DesktopDialog';
import { FolderContext } from '../../utils/FolderContext';
import { getAllFolders } from '../../services/service';


function StyledButton(props){
    const { title, clicked, handleClick } = props;
    
    const getButtonStyles = () => {
    if (!clicked) {
      return {
        borderColor: '#dddddd', 
        textTransform: "none",
        display: 'flex',
        justifyContent: 'space-between', 
        p: 1.2, width: '100%', display: 'flex', justifyContent: 'space-between', textTransform: "none", color: "#959CA6",
        '&:hover': {
            backgroundColor: '#E5F1FE',
            borderColor: 'transparent',
            boxShadow: 'none',
        },
      };
    } else {
      return {
        backgroundColor: '#E5F1FE',
        borderColor: 'transparent',
        boxShadow: 'none',
        color: "#959CA6",
        color: "#3D9DFF",
        p: 1.2, width: '100%', display: 'flex', justifyContent: 'space-between', textTransform: "none", 
        '&:hover': {
          backgroundColor: "#dddddd",
         
        },
      };
    }
  };

    return(
        <>
       
        <Box sx={{borderRadius: 3, display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Button variant={clicked ? "contained" : "text"} onClick={handleClick} sx={getButtonStyles()}>   
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    {props.children}
                    <Typography variant="h7" sx={{ml: 1, fontWeight: clicked? 500: 350, color: clicked? "#3D9DFF": "#333333"}}>
                        {title}
                    </Typography>
                </Box>
            
            <Box>
                <Typography sx={{fontSize: 14}}>
                    5
                </Typography>
            </Box>
           
            </Button>   
        </Box>
        

        </>
    )
}

function DesktopFolder({title}) {
    const { selectedFolder, handleFolderSelect } = useContext(FolderContext);
    function handleClick() {
        handleFolderSelect(title)
    }
    return(
        <StyledButton title={title} clicked={selectedFolder == title} handleClick={handleClick}>
            <FolderIcon  sx={{ fontSize: 17 }}/>
        </StyledButton>
    )
}

function AllBookmarks(){
    const { selectedFolder, handleFolderSelect } = useContext(FolderContext);
    function handleClick() {
        handleFolderSelect(null)
    }
    return(
        <StyledButton title={"All Bookmarks"} clicked={selectedFolder == null} handleClick={handleClick}>
            <BookmarkIcon sx={{fontSize: 17}}/>
        </StyledButton>
    )

}


export default function DesktopFolderList() {
    const { selectedFolder, handleFolderSelect } = useContext(FolderContext);
    const [allFolders, setAllFolders] = useState([]);
    

    useEffect(() => {
        getAllFolders().then((response) => setAllFolders(response))
    }, []);

    return (
        <>
        {/* Folder List */}
      
                <Stack spacing={0}>
                    <AllBookmarks/>
                   
                    {allFolders.map((doc, i) => (              
                         <DesktopFolder title={doc}/>
                    ))}

                    <SimpleDialogDemo/>
                </Stack>
        </>
    )
}