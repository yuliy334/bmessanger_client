import { useEffect, useState } from 'react'
import './App.css'
import AuthContainer from './components/authContainer/AuthContainer';
import { checkSessionRequest } from './utils/httpRequests';
import { MessangerContainer } from './components/MessangerContainer/MessangerContainer';
import {destroySocket, initSocket } from './services/WebSocketInicialization';
import { ChatsProvider } from './hooks/ChatsStateContext';
import { CircularProgress } from '@mui/material';

function App() {
  const [isSocket, setSocket] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  async function startSession() {
    
    const data = await checkSessionRequest();
    
    if (data.sessionSuccess) {
      setIsLoad(true);
      const socket = await initSocket();
      setIsLoad(false);
      if (socket) {
        socket.on("connect", () => {
          console.log("socket connected");
          setSocket(true);
        });

        socket.on("disconnect", () => {
          destroySocket();
          console.log("socket disconnected");
          setSocket(false);
        });

      }
    }
  }


  useEffect(() => {
    startSession();

  }, [])



  return (
    <div className='container'>
      {isLoad && <CircularProgress className='Load'/>}
      {isSocket ? <ChatsProvider><MessangerContainer /></ChatsProvider> : <AuthContainer startSession={startSession} />}
    </div>
  )
}

export default App
