import React, { useState } from 'react';
import './ChatStyle.css'; // Assurez-vous d'ajouter un fichier CSS pour le style
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const ChatAcad = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            setInputValue('');
    
            try {
                const response = await fetch('http://localhost:5000/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: inputValue }),
                });
    
                const data = await response.json();
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: data.message, sender: 'bot' }
                ]);
            } catch (error) {
                console.error('Erreur lors de la communication avec le backend:', error);
            }
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">ChatGPT</div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.sender === 'bot' && <ChatBubbleOutlineIcon className="response-icon" />}
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input 
                    type="text" 
                    placeholder="Entrez votre message" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <IconButton onClick={handleSendMessage} color="primary">
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default ChatAcad;