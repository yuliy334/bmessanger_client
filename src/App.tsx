import { useEffect, useState } from 'react'
import './App.css'
import AuthContainer from './components/authContainer/AuthContainer';
import { checkSessionRequest } from './utils/httpRequests';
import { MessangerContainer } from './components/MessangerContainer/MessangerContainer';
import {destroySocket, initSocket } from './services/WebSocketInicialization';
import { ChatsProvider } from './hooks/ChatsStateContext';

function App() {
  const [isSocket, setSocket] = useState<boolean>(false);

  async function startSession() {
    const data = await checkSessionRequest();
    if (data.sessionSuccess) {
      const socket = await initSocket();
      if (socket) {
        socket.on("connect", () => {
          console.log("socket connected /from App/");
          setSocket(true);
        });

        socket.on("disconnect", () => {
          destroySocket();
          console.log("socket disconnected /from App/");
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
      {isSocket ? <ChatsProvider><MessangerContainer /></ChatsProvider> : <AuthContainer startSession={startSession} />}
    </div>
  )
}

export default App
