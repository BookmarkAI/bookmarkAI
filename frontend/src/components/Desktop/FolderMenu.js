import * as React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAllBookmarks, deleteBookmarks } from '../../services/service';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '@mui/material/Tooltip'

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
        <Tooltip title="Delete Folder" placement="right-start">
        <IconButton onClick={handleClick} sx={{borderRadius: 0, m: 0.8, p: 0.1}}>  
            <DeleteIcon  sx={{ fontSize: 17, color: '#B6B6C5' }}/>
        </IconButton>
        </Tooltip>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem sx={{color: "red", fontSize: 13}} onClick={handleCloseWithDelete}> Delete </MenuItem>
        </Menu>
      </div>
    );
}