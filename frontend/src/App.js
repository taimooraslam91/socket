import { useState,useEffect  } from 'react'
import logo from './logo.svg';
import { socket} from './socket';
import './App.css';

function App() {
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }


    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('hello',(data)=>{
      console.log(data)
    })


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div
          className="App-link"
       
        >
         {isConnected?'Connected':'Disconnected'}
        </div>
      </header>
    </div>
  );
}

export default App;
