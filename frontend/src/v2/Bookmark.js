import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BpCheckbox from './CheckBox';
import icon from '../assets/favicon.ico';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { FileContext } from '../utils/FileContext';

function displayUrl(url) {
    return url.replace('https://','').split("/")[0]
}
  
function getIcon(url) {
    return `https://${displayUrl(url)}/favicon.ico`
}

function addDefaultSrc(ev) {
    ev.target.src = icon
}
  

export default function Bookmark(props){
    const { title, url, id, i, setViewer, oneline } = props;
    const { selectedFiles, updateSelectedFiles, removeSelectedFiles } = useContext(FileContext)

    if (oneline) {
        return (
        
            <Box sx={{mb: 0.5, display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <img
                    src={url ? getIcon(url) : ''}
                    alt={"icon"}
                    onError={addDefaultSrc}
                    style={{
                        height: 12,
                    }}
                    />
                    <Typography noWrap sx={{ml: 0.8, width: '100%', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis'}}>{title}</Typography>
                    <CloseIcon onClick={()=>removeSelectedFiles(id)} sx={{ fontSize: 10 }}/>
             </Box>

     
        )
    } else {
    return(

        <Box sx={{ mb: 0.5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',border:1, borderRadius: 1, borderColor: '#dddddd', p: 0.5}}>
            <Box onClick={()=>setViewer(url)} sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{ minWidth: 10, display: "flex", alignItems: "center", justifyContent: "center", ml: 1, mr: 1}}>
                    <img
                    src={url ? getIcon(url) : ''}
                    alt={"icon"}
                    onError={addDefaultSrc}
                    style={{
                        height: 12
                    }}
                    />
                </Box>
                <Box>
                    <Typography sx={{width: '100%', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis',}}>{title}</Typography>
                    <Typography sx={{fontSize: 11}}>{displayUrl(url)}</Typography>
                </Box>
            </Box>
            <BpCheckbox id={id}/>
          </Box>
        
    )
    }
}