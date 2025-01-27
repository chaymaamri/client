import React, { useState } from 'react';
import './ChatStyle.css';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const ChatAcad = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [conversations, setConversations] = useState([]);
    const [conversationNames, setConversationNames] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentConversationIndex, setCurrentConversationIndex] = useState(null);
    const [newConversationName, setNewConversationName] = useState('');

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

    const handleSaveConversation = () => {
        setCurrentConversationIndex(null);
        setNewConversationName('');
        setIsDialogOpen(true);
    };

    const handleLoadConversation = (index) => {
        setMessages(conversations[index]);
        if (window.innerWidth <= 600) {
            setIsSidebarVisible(false);
        }
    };

    const handleRenameConversation = (index) => {
        setCurrentConversationIndex(index);
        setNewConversationName(conversationNames[index]);
        setIsDialogOpen(true);
    };

    const handleDeleteConversation = (index) => {
        const newConversations = conversations.filter((_, i) => i !== index);
        const newNames = conversationNames.filter((_, i) => i !== index);
        setConversations(newConversations);
        setConversationNames(newNames);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleDialogSave = () => {
        if (newConversationName.trim()) {
            if (currentConversationIndex === null) {
                setConversations([...conversations, []]);
                setConversationNames([...conversationNames, newConversationName]);
                setMessages([]);
            } else {
                const newNames = [...conversationNames];
                newNames[currentConversationIndex] = newConversationName;
                setConversationNames(newNames);
            }
            setIsDialogOpen(false);
        }
    };

    return (
        <div className="chat-container">
            <div className={`chat-sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
                <div className="chat-sidebar-header">
                    Historique des conversations
                    <IconButton onClick={toggleSidebar} className="close-button">
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="chat-sidebar-content">
                    {conversations.map((conversation, index) => (
                        <div key={index} className="conversation">
                            <span onClick={() => handleLoadConversation(index)}>
                                {conversationNames[index]}
                            </span>
                            <IconButton onClick={() => handleRenameConversation(index)} size="small">
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteConversation(index)} size="small">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`chat-main ${!isSidebarVisible ? 'centered' : ''}`}>
                <div className="chat-header">
                    <IconButton onClick={toggleSidebar} className="menu-button">
                        <MenuIcon />
                    </IconButton>
                    Chat Académique
                    <IconButton onClick={handleSaveConversation} className="new-conversation-button">
                        <AddIcon />
                    </IconButton>
                </div>
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
                    <IconButton onClick={handleSaveConversation} color="secondary">
                        <SaveIcon />
                    </IconButton>
                </div>
            </div>
            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{currentConversationIndex === null ? 'Nommer la nouvelle conversation' : 'Renommer la conversation'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Entrez le nom pour la conversation.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nom de la conversation"
                        type="text"
                        fullWidth
                        value={newConversationName}
                        onChange={(e) => setNewConversationName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleDialogSave} color="primary">
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ChatAcad;