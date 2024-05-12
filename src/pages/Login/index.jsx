import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Client } from 'stanza';
import useClientConnectionStore from '../../store/clientConnection';
import './index.css'

function Login() {
    const [username, setUsername] = useState("Digital1@testchat.cogencis.com");
    const [password, setPassword] = useState("aP8w36a$");
    const navigate = useNavigate();

    const xmppClient = useClientConnectionStore((state) => state.xmppClient)
    const setXmppClient = useClientConnectionStore((state) => state.setXmppClient)
    const setUserCredentials = useClientConnectionStore((state) => state.setUserCredentials)

    const handleLogin = () => {
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)

        if (username && password) {
            const newClient = new Client({
                jid: username,
                password: password,

                server: "https://testchat.cogencis.com:7443/http-bind",

                // If you have a .well-known/host-meta.json file for your
                // domain, the connection transport config can be skipped.
                transports: {
                    bosh: 'https://testchat.cogencis.com:7443/http-bind',
                },
            });

            // Connect to the XMPP server
            newClient.connect();

            // Set the client state
            setXmppClient(newClient);
        }
    }

    useEffect(() => {
        if (xmppClient) {
            // Event listener for when the client is connected
            xmppClient.on('session:started', () => {
                console.log('Connected to XMPP server');
                // Subscribe to recipient's presence updates
                xmppClient.sendPresence({ show: 'chat', status: 'Online' });
                setUserCredentials({
                    username,
                    password,
                    isLoggedIn: true
                })
                navigate('/home')
            });
        }
    }, [xmppClient])


    return (
        <div className='login-page'>
            <div className='header'>
                <h1 className='page-title'>Login</h1>
            </div>
            <div className='login-content'>
                <div className='form-item'>
                    <label className='label'>Username</label>
                    <br />
                    <input
                        className='input'
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <br />
                <div className='form-item'>
                    <label className='label'>Password</label>
                    <br />
                    <input
                        className='input'
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button className='send-btn' onClick={handleLogin}>Continue</button>
            </div>
        </div>
    )
}

export default Login