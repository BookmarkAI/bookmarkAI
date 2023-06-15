import { signInWithGoogle } from '../fb';
import { Button } from '@mui/material';

function SignIn (props) {
  return (
  
      <Button onClick={signInWithGoogle}  sx={{ width: '80%', maxHeight: '45px', textTransform: 'none', background: "linear-gradient(to right, #CD5B95, #9846CA)"}} variant="contained"><i className="fab fa-google"></i>Start with Google</Button>
  )
}

export default SignIn;