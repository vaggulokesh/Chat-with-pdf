import React, { useState, createContext } from "react";

export const Conversation = createContext();

export const ChatData = ({ children }) => {
    const [conversations, setConversations] = useState([]);

    return (
        <Conversation.Provider value={{ conversations, setConversations }}>
            {children}
        </Conversation.Provider>
    );
};
