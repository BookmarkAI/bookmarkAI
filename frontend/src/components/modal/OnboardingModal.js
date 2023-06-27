import Modal from "react-modal";
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../assets/supermark_logo.png';
import Button from '@mui/material/Button';
import {Stepper, Step, StepLabel} from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';
import { useState } from "react";
import extension from '../../assets/extension.png'


export default function OnboardingModal({ isOpen, onRequestClose, onClose }) {
        const [ activeStep, setActiveStep ] = useState(0);
        Modal.setAppElement('#root');
        return (
          <Modal
            isOpen={true}
            onRequestClose={onRequestClose}
            // Add additional props and styles as needed
          >
  
            <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'}}>
             
                <Box></Box>
              {activeStep == 0 && 
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                <img 
                    src={logo} 
                    alt="Bookmark Logo"
                    style={{
                        width: 60,
                    }}
                />
                  <Typography variant="h3" sx={{fontWeight: 650, color: "#282A2F", mb: 2,mt:2}}>
                    Welcome to Supermark
                  </Typography>
                  <Typography sx={{color: "#8C9096"}}>
                    Supermark helps you organize and extract insights from your bookmarks faster
                  </Typography>
                  <Button size="large" sx={{m:5, mb: 8, background: 'linear-gradient(to right, #cd5b95, #9846ca)', textTransform: 'none', width: 300}} onClick={()=>setActiveStep(1)} variant="contained">
                    Get Started
                  </Button>
                </Box>}

                {activeStep == 1 && 
                  <Box sx={{width: '70%',  height: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{p: 5}}>

                      <Typography variant="h6" sx={{color: "#282A2F", fontWeight: 530}}>
                        Install the Chrome Extension
                      </Typography>
                      <Typography sx={{mt: 1}}>
                        Supermark integrates to your web workflow via Chrome extension. Install the extension to your browser to get started.
                      </Typography>
                      <Button onClick={()=>window.open("https://chrome.google.com/webstore/detail/smart-bookmarks-chat-with/hbgeccffpnlflcghlnajgdhidcikebmj")} sx={{textTransform: 'none', mt: 2, background: 'linear-gradient(to right, #cd5b95, #9846ca)', width: 250}} variant="contained">
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

                <MobileStepper
                variant="dots"
                steps={2}
                activeStep={activeStep}
                position="relative"
                sx={{'&.MuiMobileStepper-dot': {}}}/>
            </Box>

          </Modal>
        );
      };
