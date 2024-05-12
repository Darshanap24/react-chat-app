import { create } from 'zustand'

const useClientConnectionStore = create((set) => ({
    xmppClient: null,
    receiverId: "",
    sentMessages: [],
    receivedMessages: [],
    messageStatus: '',
    recipientOnline: false,
    userCredentials: {},
    contacts: [
        {
            id: 0,
            recipientName: "Digi2",
            recipientJid: "digital2@cogencis.com",
        }
    ],
    setUserCredentials: (payload) => {
        return set({ userCredentials: payload });
    },
    setReceiverId: (payload) => {
        return set({ receiverId: payload });
    },
    setSentMessages: (payload) => {
        return set({ sentMessages: payload });
    },
    setReceivedMessages: (newMessage) =>
        set((prevState) => ({
            receivedMessages: [...prevState.receivedMessages, newMessage],
        })),
    setMessageStatus: (payload) => {
        return set({ messageStatus: payload });
    },
    setRecipientOnline: (payload) => {
        return set({ recipientOnline: payload });
    },
    setContacts: (payload) => {
        return set({ contacts: payload });
    },
    setXmppClient: (payload) => {
        return set({ xmppClient: payload });
    },
}))

export default useClientConnectionStore