import {auth,provider} from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { Box, Button, Container, Typography } from "@mui/material";

const cookies = new Cookies();

export const Auth = (props) => {
    const { setIsAuth } = props;
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            cookies.set("auth-token",result.user.refreshToken);
            cookies.set("displayName",result.user.displayName)
            setIsAuth(true);
        } catch(err) {
            console.error(err);
        }

    }

    return (
        <Container sx={ {
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
         } }>
            <Box>
                <Box sx={{marginBottom:10}}>
                    <Typography variant="h4">Welcome to my ChatApp</Typography>
                </Box>
                <Box sx={{
                    width: 500,
                    display: "flex",
                    flexDirection: { xs: "column", "sm": "column", "md": "row", "lg" : "row"},
                }}>
                    <Typography variant="h6">Hello, please use your google account to sign in!</Typography>
                    <Button onClick={signInWithGoogle} variant="contained" size="medium">Sign in with Google</Button>
                </Box>
            </Box>
        </Container>
    )
};