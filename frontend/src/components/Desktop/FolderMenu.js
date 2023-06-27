import * as React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAllBookmarks, deleteBookmarks } from '../../services/service';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FolderMenu({title, setAllFolders}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu= Boolean(anchorEl);

    const handleClick = (event) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    };

    async function deleteFolder(allBookmarks, title) {
      const filteredBookmarks = allBookmarks.filter((bookmark) => bookmark.folder === title);
      const folderIds = filteredBookmarks.map((bookmark) => bookmark.id);

      deleteBookmarks(folderIds, [title])
        .then(() => {
          setAllFolders((prevFolders) => prevFolders.filter((folder) => folder !== title));
        })
    }
  
    const handleCloseWithDelete = async () => {
      getAllBookmarks().then((response) => deleteFolder(response, title))
      setAnchorEl(null);
    };


    const handleClose = async () => {
      setAnchorEl(null);
    };
    
  
    return (
      <div>
        <IconButton onClick={handleClick}>  
            <DeleteIcon  sx={{ fontSize: 17 }}/>
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem sx={{color: "red"}} onClick={handleCloseWithDelete}> Delete </MenuItem>
        </Menu>
      </div>
    );
}