import { useState } from 'react';
import { Auth } from './components/Auth';
import Cookies from "universal-cookie";
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import { Box, Button, Container} from '@mui/material';
import { Room } from './components/Room';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    cookies.remove("displayName");
    setIsAuth(false);
  }

  if (!isAuth) {
    return <Auth setIsAuth={setIsAuth} />
  }

  return (
    <Container>
      <Room />
      <Box sx={ {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    } }>
        <Box marginTop={10} justifyContent={"center"} alignItems={"center"}>
            <Button onClick={signUserOut} variant='outlined' color='warning'>Sign Out</Button>
        </Box>
      </Box>
    </Container>
  )

}

export default App;
