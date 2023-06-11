import { signInWithGoogle, signOut } from '../fb';
import { Button } from '@mui/material'

const SignOut = () => {
  return (

    <Button className="button" sx={{ width: '80%', maxHeight: '45px', textTransform: 'none', background: "linear-gradient(to right, #CD5B95, #9846CA)"}} onClick={signOut} variant={"contained"}><i className="fab fa-google"></i>Sign Out</Button>

  )
}

export default SignOut;