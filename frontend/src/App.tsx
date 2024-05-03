import { Database } from 'firebase/database';
import SignupComponent from "./component/SignupComponent";
import SigninComponent from './component/SigninComponent';
import SendMessage from './component/SendMessage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dashboard from './component/Dashboard';
interface Props {
  database: Database;
}

function App({ database }: Props) {
  const [socket, setSocket] = useState<WebSocket|null>();
  useEffect(() => {
    const newSocket = new WebSocket('ws://locahost:8080');
    newSocket.onopen = () => {
      console.log("connection established");
      newSocket.send("Hello server");
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
    }
    setSocket(newSocket);

  }, [])
  const [senderId, setSenderId] = useState<string>('');
  const [receiverId, setReceiverId] = useState<string>("");
  return (

    <BrowserRouter>
      <Routes>
        <Route path = '/signup' element = {<SignupComponent database = { database } />}></Route>
        <Route path = '/signin' element = {<SigninComponent setSenderId = { setSenderId } />}></Route>
        <Route path = '/sendmessage' element = { <SendMessage  senderId = { senderId } receiverId = { receiverId } database = { database }/>}></Route>
        <Route path = '/dashboard' element = { <Dashboard setReceiverId = { setReceiverId } database = { database } />}></Route>
      </Routes>
    </BrowserRouter>
  ) 
}
export default App;

