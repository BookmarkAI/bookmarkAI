
import { styled, useTheme } from '@mui/material/styles';
const appbarHeight = 50;

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    minHeight: appbarHeight - 10
  
  }));