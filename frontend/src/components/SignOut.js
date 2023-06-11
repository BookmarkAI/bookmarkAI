import { signInWithGoogle, signOut } from '../fb';
import { Button } from '@mui/material'

const SignOut = () => {
  return (
    <div>
      <Button className="button" sx={{textTransform: 'none', background: "linear-gradient(to right, #CD5B95, #9846CA)"}} onClick={signOut} variant={"contained"}><i className="fab fa-google"></i>Sign Out</Button>
    </div>
  )
}

export default SignOut;