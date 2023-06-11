import { signInWithGoogle } from '../fb';
import { Button } from '@mui/material';

const SignIn= () => {
  return (
    <div>
      <Button onClick={signInWithGoogle}  sx={{textTransform: 'none', background: "linear-gradient(to right, #CD5B95, #9846CA)"}} variant="contained"><i className="fab fa-google"></i>Sign in with google</Button>
    </div>
  )
}

export default SignIn;