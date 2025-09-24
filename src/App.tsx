import { useEffect, useState } from 'react'
import './App.css'
import AuthContainer from './components/authContainer/AuthContainer';

function App() {
  const [sessionexist, setSessionExist] = useState<boolean | null>(null);
  async function checkSession() {
    const checkresponse = await fetch("http://localhost:3000/auth/check", { credentials: "include" });
    const data = await checkresponse.json();
    console.log(data.sessionSuccess);
    setSessionExist(data.sessionSuccess);
    console.log(sessionexist);

  }
  useEffect(() => {
    checkSession();
  }, [])


  return (
    <div className='container'>
      {sessionexist === false && <AuthContainer />}
    </div>
  )
}

export default App
