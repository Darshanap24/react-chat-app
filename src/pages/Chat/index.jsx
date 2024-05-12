import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useClientConnectionStore from '../../store/clientConnection';
import './index.css'
function Chat() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const paramValue = searchParams.get("recipient");
    const [recipientData, setRecipientData] = useState(null);
    const [message, setMessage] = useState('');
    const contacts = useClientConnectionStore((state) => state.contacts);
    const xmppClient = useClientConnectionStore((state) => state.xmppClient);
    const setRecipientOnline = useClientConnectionStore((state) => state.setRecipientOnline);
    const receivedMessages = useClientConnectionStore((state) => state.receivedMessages);
    const setReceivedMessages = useClientConnectionStore((state) => state.setReceivedMessages);
    const recipientOnline = useClientConnectionStore((state) => state.recipientOnline);

    // Memoize recipient data
    const recipient = useMemo(() => {
        return contacts.find((item) => item.recipientJid === paramValue);
    }, [contacts, paramValue]);

    useEffect(() => {
        // Set recipient data
        setRecipientData(recipient);
    }, [recipient]);

    useEffect(() => {
        if (!xmppClient || !paramValue) {
            navigate('/');
            return;
        }

        // Event listener for presence updates
        const handlePresence = (presence) => {
            console.log("Is receiver online?", presence.from.includes(paramValue) && (presence.status.toLowerCase() === 'available' || presence.status.toLowerCase() === 'online'))
            if (presence.from.includes(paramValue) && (presence.status.toLowerCase() === 'available' || presence.status.toLowerCase() === 'online')) {
                setRecipientOnline(true);
            } else {
                setRecipientOnline(false);
            }
        };

        // Event listener for incoming messages
        const handleMessage = (message) => {
            setReceivedMessages(message.body);
        };

        // Event listener for message delivery status
        const handleMessageStatus = (messageId) => {
            console.log('Message sent:', messageId);
            // setMessageStatus('Message sent successfully');
        };

        const handleMessageFailed = (error) => {
            console.error('Message delivery failed:', error);
            // setMessageStatus('Message delivery failed');
        };

        xmppClient.on('presence', handlePresence);
        xmppClient.on('message', handleMessage);
        xmppClient.on('message:sent', handleMessageStatus);
        xmppClient.on('message:failed', handleMessageFailed);

        // Cleanup
        return () => {
            xmppClient.off('presence', handlePresence);
            xmppClient.off('message', handleMessage);
            xmppClient.off('message:sent', handleMessageStatus);
            xmppClient.off('message:failed', handleMessageFailed);
        };
    }, [xmppClient, paramValue, navigate]);

    const sendMessage = () => {
        if (xmppClient && message.trim() !== '') {
            xmppClient.sendMessage({
                to: recipientData?.recipientJid,
                body: message,
            });
            setMessage('');
        }
    };

    return (
        <div className='chat-page'>
            <div className='header'>
                <p className='page-title'>{recipientData?.recipientName}</p>
                <p className='page-description'>{recipientOnline ? "Online" : "Offline"}</p>
            </div>
            <div className='content'>
                <ul>
                    {receivedMessages && receivedMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
                <div className='footer'>
                    <input
                        className='input-container'
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button className='send-btn' onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
