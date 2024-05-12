import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Client } from 'stanza';
import Login from './pages/Login';
import Home from './pages/Home/index';
import Chat from './pages/Chat/index';
import useClientConnectionStore from './store/clientConnection';

function App() {

  const [client, setClient] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [messageStatus, setMessageStatus] = useState('');
  const [recipientOnline, setRecipientOnline] = useState(false);
  const [senderOnlineStatus, setSenderOnlineStatus] = useState(false);
  const xmppClient = useClientConnectionStore((state) => state.xmppClient)

  // useEffect(() => {
  //   const xmppClient = new Client({
  //     jid: 'Digital1@testchat.cogencis.com',
  //     password: 'aP8w36a$',

  //     server: "https://testchat.cogencis.com:7443/http-bind",

  //     // If you have a .well-known/host-meta.json file for your
  //     // domain, the connection transport config can be skipped.
  //     transports: {
  //       bosh: 'https://testchat.cogencis.com:7443/http-bind',
  //     },
  //   });

  //   // Connect to the XMPP server
  //   xmppClient.connect();

  //   // Set the client state
  //   setClient(xmppClient);


  //   // Event listener for when the client is connected
  //   xmppClient.on('session:started', () => {
  //     console.log('Connected to XMPP server');
  //     // Subscribe to recipient's presence updates
  //     xmppClient.sendPresence({ show: 'chat', status: 'Online' });
  //     setSenderOnlineStatus(true)
  //   });

  //   // Event listener for incoming messages
  //   xmppClient.on('message', message => {
  //     console.log('Received message:', message);

  //     // Update the received messages state
  //     setReceivedMessages(prevMessages => [...prevMessages, message]);
  //   });

  //   // Event listener for message delivery status
  //   xmppClient.on('message:sent', (messageId) => {
  //     console.log('Message sent:', messageId);
  //     setMessageStatus('Message sent successfully');
  //   });

  //   xmppClient.on('message:failed', (error) => {
  //     console.error('Message delivery failed:', error);
  //     setMessageStatus('Message delivery failed');
  //   });


  //   // Event listener for presence updates
  //   xmppClient.on('presence', presence => {
  //     console.log('Presence of receiver:>>>>', presence.from, presence.status);

  //     // Check if the recipient is online
  //     if (presence.from.includes('digital2@cogencis.com') && (presence.status.toLowerCase() == 'available' || presence.status.toLowerCase() == 'online')) {
  //       setRecipientOnline(true);
  //     } else {
  //       setRecipientOnline(false);
  //     }
  //   });

  //   // Cleanup function to disconnect when component unmounts
  //   return () => {
  //     xmppClient.disconnect();
  //   };
  // }, []);

  // useEffect(() => {

  // }, [])

  // if (xmppClient) {
  //   // Event listener for incoming messages
  //   xmppClient.on('message', message => {
  //     console.log('Received message:', message);

  //     // Update the received messages state
  //     setReceivedMessages(prevMessages => [...prevMessages, message]);
  //   });

  //   // Event listener for message delivery status
  //   xmppClient.on('message:sent', (messageId) => {
  //     console.log('Message sent:', messageId);
  //     setMessageStatus('Message sent successfully');
  //   });

  //   xmppClient.on('message:failed', (error) => {
  //     console.error('Message delivery failed:', error);
  //     setMessageStatus('Message delivery failed');
  //   });


  // }
  // Function to handle sending messages
  const sendMessage = () => {
    if (client && message.trim() !== '') {
      client.sendMessage({
        to: 'digital2@cogencis.com', // Replace with the recipient's JID
        body: message,
      });

      // Clear the message input
      setMessage('');
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
    // <div>
    //   <h1>Digital1 Chats : I am {senderOnlineStatus ? "Online" : "Offline"}</h1>
    //   <div>
    //     {/* Display received messages */}
    //     {receivedMessages.map((msg, index) => (
    //       <div key={index}>{msg.body}</div>
    //     ))}
    //   </div>
    //   <div>
    //     {/* Input field for typing messages */}
    //     <input
    //       type="text"
    //       value={message}
    //       onChange={e => setMessage(e.target.value)}
    //     />
    //     {/* Button to send messages */}
    //     <button onClick={sendMessage}>Send</button>
    //   </div>

    //   <div>
    //     {/* Display message delivery status */}
    //     {messageStatus && <div>{messageStatus}</div>}
    //   </div>

    //   <div>
    //     {/* Display recipient's online status */}
    //     {recipientOnline ? <div>Recipient is online</div> : <div>Recipient is offline</div>}
    //   </div>
    // </div>
  );
}

export default App;
