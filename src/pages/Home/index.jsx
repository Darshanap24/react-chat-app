import React, { useEffect } from 'react'
import useClientConnectionStore from '../../store/clientConnection'
import { Link, useNavigate } from 'react-router-dom';
import './index.css'
function Home() {
    const userCredentials = useClientConnectionStore((state) => state.userCredentials)
    const contacts = useClientConnectionStore((state) => state.contacts)
    const recipientOnline = useClientConnectionStore((state) => state.recipientOnline)

    // console.log("userCredentials", userCredentials)
    const navigate = useNavigate();

    useEffect(() => {
        if (!userCredentials || !userCredentials.isLoggedIn) {
            navigate('/')
        }
    }, [userCredentials])


    return (
        <>
            {
                userCredentials &&
                <div className='home-page' style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                    <div className='header'>
                        <p className='page-title'>Welcome {userCredentials.username},</p>
                        <p className='page-description'>{userCredentials.isLoggedIn && "Online"}</p>
                    </div>

                    <div className='home-content'>
                        {
                            contacts.map((contact, index) => (
                                <Link className='contact-item' to={`/chat?recipient=${contact.recipientJid}`} key={index}
                                >
                                    <p className='contact-name'>
                                        {contact.recipientName}
                                    </p>
                                    <p className='contact-status'>{recipientOnline ? "Online" : "Offline"}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Home