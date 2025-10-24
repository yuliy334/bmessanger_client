import { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import type { openChatInfo } from '../../types/openChatInfoTypes';

interface COSDProps {
    setNewPersonalChat: React.Dispatch<React.SetStateAction<boolean>>;
    setNewGroupChat: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenChatInfo: React.Dispatch<React.SetStateAction<openChatInfo>>;
}

export default function ControlledOpenSpeedDial({ setNewPersonalChat, setOpenChatInfo,setNewGroupChat }: COSDProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const actions = [
        {
            icon: <GroupAddIcon />, name: 'add group chat', onClick: () => {
                console.log("add group");
                setNewGroupChat(true);
                setNewPersonalChat(false);
                setOpenChatInfo({
                    id: -1, isOpen: false
                });
                console.log("this is");
            }
        },
        {
            icon: <PersonAddAlt1Icon />,
            name: 'add private chat',
            onClick: () => {
                console.log("add private chat");
                setNewPersonalChat(true);
                setNewGroupChat(false);
                setOpenChatInfo({
                    id: -1, isOpen: false
                });
                console.log("this is");
            }
        },]

    return (
        <>
            <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial controlled open example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            slotProps={{
                                tooltip: {
                                    title: action.name,
                                },
                            }}

                            onClick={() => {
                                action.onClick();
                                handleClose();
                            }}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </>
    );
}