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



function CustomizedTabs(props) {
  const [value, setValue] = React.useState(0);
  const { fontsize } = props
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ bgcolor: 'transparent'}}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" >
          <AntTab onClick={() => navigate('/browse')} sx={{fontSize: fontsize}}  label="All" />
          <AntTab onClick={() => navigate('/browse')} sx={{fontSize: fontsize}}  label="Text"  />
          
          <AntTab onClick={() => navigate('/browse')} sx={{fontSize: fontsize}}  label="PDF"  />
          <AntTab onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{fontSize: fontsize}}  label="Image  💎"/>
          <AntTab onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{fontSize: fontsize}}  label="Video  💎"/>
        </AntTabs>
      </Box>
    </Box>
  );
}


function DesktopTab() {
  return (
    <CustomizedTabs fontsize={"18px"}/>
  )
}

function MobileTab() {
  return (
    <CustomizedTabs fontsize={"15px"}/>
  )
}

export { DesktopTab, MobileTab }