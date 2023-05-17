import { useState, Fragment } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import Cookies from "universal-cookie";
import { Chat } from './Chat';

const cookies = new Cookies();

export const Room = () => {
    
    const [room, setRoom] = useState(null);
    // const roomInputRef = useRef(null);
    const [roomName, setRoomName] = useState("")
    const [isEmptyRoom, setIsEmptyRoom] = useState(false)

    const goToRoom = () => {
        if(roomName === "") {
            setIsEmptyRoom(true);
        } else {
            setRoom(roomName);
        }
    }

    return (
        <Fragment>
            { 
            !room ? (
                <Box sx={ {
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                } }>
                    <Box>
                        <Box sx={ {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        } }>
                            <Typography variant="h4">Welcome, {cookies.get("displayName")}</Typography>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: { xs: "column", "sm": "column", "md": "row", "lg" : "row"},
                            marginTop:10
                        }}>
                            <TextField 
                                required 
                                label="Enter designated room"
                                value={room}
                                onChange={(e) => setRoomName(e.target.value)}
                                error={isEmptyRoom}
                                helperText={ isEmptyRoom ? "Please enter your designated room!" : "" }
                                sx={{width:300}}
                                >
                            </TextField>
                            <Button variant='contained' sx={{marginLeft: 2}} onClick={goToRoom}>Go To Room!</Button>
                        </Box>
                    </Box>
                </Box>
                ) : (
                    <Chat room={room} />
                )
            }
        </Fragment>
    )
}