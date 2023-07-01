import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { FileContext } from '../utils/FileContext';
import { TypeContext } from '../utils/TypeContext';

const AntTabs = styled(Tabs)({
  borderBottom: '1.5px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    paddingBottom:0.5,
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



function DesktopTab(props) {
  const { width } = props;
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: width ? width : '97%' }}>
      <Box sx={{ bgcolor: 'transparent'}}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" >
          {props.children}
          
          {/* <AntTab onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{fontSize: '17px'}}  label="Image  💎"/>
          <AntTab onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{fontSize: '17px'}}  label="Video  💎"/> */}
          
        </AntTabs> 
      </Box>
    </Box>
  );
}

function BrowseTab() {
  const { handleTypeSelect } = useContext(TypeContext);
  return (
    <DesktopTab>
      <AntTab onClick={()=>handleTypeSelect(null)} sx={{fontSize: 15}}  label="All" />
      <AntTab onClick={()=>handleTypeSelect('url')} sx={{fontSize: 15}}  label="Link"  />
      <AntTab onClick={()=>handleTypeSelect('pdf')} sx={{fontSize:15}}  label="PDF"  />
    </DesktopTab>
  )
}

function SearchTab(props) {
  const { setDisplay } = props;
  const { chatEnabled } = useContext(FileContext);
  return (
    <DesktopTab>
      <AntTab onClick={()=>setDisplay(null)} sx={{fontSize: 15}}  label="All" />
      <AntTab onClick={()=>setDisplay('url')} sx={{fontSize: 15}}  label="Link"  />
      <AntTab onClick={()=>setDisplay('pdf')} sx={{fontSize:15}}  label="PDF"  />
    </DesktopTab>
  )
}

export { BrowseTab, SearchTab }




