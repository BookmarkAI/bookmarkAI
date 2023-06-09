import ChatIcon from '@mui/icons-material/Chat';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FilterDrawer from './Mobile/FilterDrawer';

const AntTabs = styled(Tabs)({
  borderBottom: '1.5px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }),
);



export default function DesktopTab({width}) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: width ? width : '97%' }}>
      <Box sx={{ bgcolor: 'transparent'}}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" >
          <AntTab sx={{fontSize: '17px'}}  label="All" />
          <AntTab sx={{fontSize: '17px'}}  label="Text"  />
          <AntTab sx={{fontSize:'17px'}}  label="PDF"  />
          <AntTab onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{fontSize: '17px'}}  label="Image  💎"/>
          <AntTab onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{fontSize: '17px'}}  label="Video  💎"/>
          
        </AntTabs> 
      </Box>
    </Box>
  );
}



