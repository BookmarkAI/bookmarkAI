import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../assets/supermark_logo.png';
import Button from '@mui/material/Button';
import {Stepper, Step, StepLabel} from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';
import { useState } from "react";
import extension from '../../assets/extension.png'
import Modal from '@mui/material/Modal';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import pin from '../../assets/pin.png';
import demo from '../../assets/demo_supermark.gif'


export default function OnboardingModal({ open, onClose }) {
        const [ activeStep, setActiveStep ] = useState(0);

        const handleExtensionOpen = () => {
            window.open("https://chrome.google.com/webstore/detail/smart-bookmarks-chat-with/hbgeccffpnlflcghlnajgdhidcikebmj");
            setActiveStep(2)
        }

        return (
          <Modal
            open={open}
            onClose={onClose}
            // Add additional props and styles as needed
            sx={{zIndex: 500000}}
          >
            <Box sx={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', backgroundColor: 'white'}}>
             
                <Box></Box>
              {activeStep === 0 &&
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 7}} >
                <img 
                    src={logo} 
                    alt="Bookmark Logo"
                    style={{
                        width: 60,
                    }}
                />
                  <Typography variant="h3" sx={{fontWeight: 650, color: "#282A2F", mb: 2, mt: 3}}>
                    Welcome to Supermark
                  </Typography>
                  <Typography sx={{color: "#8C9096"}}>
                    Save documents, and ask questions! 
                  </Typography>
                  <Button size="large" sx={{m:5, mb: 8, background: 'linear-gradient(to right, #cd5b95, #9846ca)', textTransform: 'none', width: 300}} onClick={()=>setActiveStep(1)} variant="contained">
                    Get Started
                  </Button>
                </Box>}

                {activeStep === 1 &&
                  <Box sx={{width: '70%',  height: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{p: 5}}>

                      <Typography variant="h6" sx={{color: "#282A2F", fontWeight: 530}}>
                        Install the Chrome Extension
                      </Typography>
                      <Typography sx={{mt: 1}}>
                        Supermark integrates to your web workflow via Chrome extension. Install the extension to your browser to get started.
                      </Typography>
                      <Button
                          onClick={handleExtensionOpen}
                          sx={{textTransform: 'none', mt: 2, background: 'linear-gradient(to right, #cd5b95, #9846ca)', width: 250}}
                          variant="contained"
                      >
                        Install the extension
                      </Button>
                    </Box>
                      <img 
                        src={extension} 
                        alt="Bookmark Logo"
                        style={{width: 450, height: 317.76}}
                    />
                  </Box>
                }

                {activeStep === 2 &&
                  <Box sx={{width: '70%',  height: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{p: 5}}>

                      <Typography variant="h6" sx={{color: "#282A2F", fontWeight: 530}}>
                        Pin the extension
                      </Typography>
                      <Typography sx={{mt: 1}}>
                      Please pin the 📌 extension to use it conveniently
                      </Typography>
                      <Button
                          onClick={()=>setActiveStep(3)}
                          sx={{textTransform: 'none', mt: 2, background: 'linear-gradient(to right, #cd5b95, #9846ca)', width: 250}}
                          variant="contained"
                      >
                        One last step
                      </Button>
                    </Box>
                      <img 
                        src={pin} 
                        alt="Bookmark Logo"
                        style={{width: 450, height: 370}}
                    />
                  </Box>
                }

                {activeStep === 3 &&
                  <Box sx={{width: '70%',  height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                  
                     <img 
                        src={demo} 
                        alt="Bookmark Logo"
                        style={{width: 960, height: 540}}
                    />
                      <Typography sx={{mt: 1}}>
                      Click on <b>NEW CHAT</b> to start chatting with bookmarks.
                      </Typography>
                      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 410}}>

                      <Button
                          onClick={()=>onClose()}
                          sx={{textTransform: 'none', background: 'linear-gradient(to right, #cd5b95, #9846ca)', width: 200}}
                          variant="contained"
                      >
                        I'm ready to start
                      </Button>
            
                      <Button  onClick={()=>window.open("https://www.loom.com/share/61541afb9d234a0f8d81078930d853fb?sid=39a40ed6-1ddb-43e5-9c41-efa2a5b8cc35")} sx={{ textTransform: 'none', fontWeight: 440, borderRadius: 1, borderWeight: 300, width: 200,
                        color: '#3E434B', borderColor: "#DFE1E4",
                        '&:hover': {
                            backgroundColor: '#F8F9FC',
                            borderColor: '#DFE1E4'
                        }}} variant="outlined">
                        Watch 3 min tutorial
                      </Button>
                      </Box>
                    </Box>
                } 

                <Box sx={{mb: 6, display: 'flex', flexDirection: 'row'}}>
                  <Box sx={{m: 0.3}}>
                    <FiberManualRecordIcon sx={{fontSize: 15, color: activeStep == 0 ? '#90959D' : '#EFF1F4'}}/>
                  </Box>
                  <Box sx={{m: 0.3}}>
                    <FiberManualRecordIcon sx={{fontSize: 15, color: activeStep == 1 ? '#90959D' : '#EFF1F4'}}/>
                  </Box>
                  <Box sx={{m: 0.3}}>
                    <FiberManualRecordIcon sx={{fontSize: 15, color: activeStep == 2 ? '#90959D' : '#EFF1F4'}}/>
                  </Box>
                  <Box sx={{m: 0.3}}>
                    <FiberManualRecordIcon sx={{fontSize: 15, color: activeStep == 3 ? '#90959D' : '#EFF1F4'}}/>
                  </Box>
                </Box>
                
            </Box>

          </Modal>
        );
      };
