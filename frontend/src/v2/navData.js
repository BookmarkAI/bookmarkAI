import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import FolderIcon from '@mui/icons-material/Folder';
import Tooltip from '@mui/material/Tooltip';
 
export const navData = [
    {
        id: 1,
        icon: <Tooltip title="All Bookmarks" placement="right-start"><FolderIcon fontSize="small"/></Tooltip>,
        text: "Explore",
        link: "folder"
    },
    {
        id: 2,
        icon: <Tooltip title="Search Bookmarks" placement="right-start"><SearchIcon fontSize="small"/></Tooltip>,
        text: "Statistics",
        link: "search"
    },
    {
        id: 3,
        icon: <Tooltip title="Chat History" placement="right-start"><HistoryIcon fontSize="small"/></Tooltip>,
        text: "Settings",
        link: "history"
    }
]