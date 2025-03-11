import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, List, ListItem,Button, ListItemText, Paper, Divider, Typography, IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
import { Add, MoreVert, Menu as MenuIcon } from '@mui/icons-material';
import { get as getEmoji } from 'node-emoji';
import ButtonSend from './ButtonSend';

const ChatAcad = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [currentDiscussion, setCurrentDiscussion] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [newDiscussionName, setNewDiscussionName] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const chatContainerRef = useRef(null);
  let typingTimeout;

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await fetch('/api/conversations');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDiscussions(data);
        if (data.length > 0) {
          setCurrentDiscussion(data[0].id);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des discussions :', error);
      }
    };

    fetchDiscussions();
  }, []);

  useEffect(() => {
    if (currentDiscussion) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`/api/messages/${currentDiscussion}`);
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Erreur lors de la récupération des messages :', error);
        }
      };

      fetchMessages();
    }
  }, [currentDiscussion]);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user', discussionId: currentDiscussion };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
      setIsTyping(false);

      await saveMessage(newMessage);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input })
        });
        const data = await response.json();
        if (data.message) {
          const aiMessage = { text: addEmojis(data.message), sender: 'ai', discussionId: currentDiscussion };
          setMessages((prevMessages) => [...prevMessages, aiMessage]);
          await saveMessage(aiMessage);
        } else {
          console.error('Unexpected response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching OpenAI response:', error);
      }
    }
  };

  const saveMessage = async (message) => {
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: message.discussionId,
          text: message.text,
          sender: message.sender,
        }),
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const addEmojis = (text) => {
    if (text.includes('happy')) {
      return `${text} ${getEmoji('smile')}`;
    } else if (text.includes('sad')) {
      return `${text} ${getEmoji('disappointed')}`;
    } else if (text.includes('angry')) {
      return `${text} ${getEmoji('angry')}`;
    } else {
      return text;
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setIsTyping(true);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleDiscussionChange = (id) => {
    setCurrentDiscussion(id);
  };

  const handleAddDiscussion = async () => {
    const newDiscussion = { userId: 1, name: `Discussion ${discussions.length + 1}` };
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiscussion),
      });
      const data = await response.json();
      setDiscussions([...discussions, data]);
      setCurrentDiscussion(data.id);
      setMessages([]);
    } catch (error) {
      console.error('Erreur lors de la création de la discussion :', error);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRenameDiscussion = () => {
    setOpenRenameDialog(true);
    setAnchorEl(null);
  };

  const handleRenameDialogClose = () => {
    setOpenRenameDialog(false);
  };

  const handleRenameDialogSave = async () => {
    const updatedDiscussions = discussions.map(discussion => 
      discussion.id === currentDiscussion ? { ...discussion, name: newDiscussionName } : discussion
    );
    setDiscussions(updatedDiscussions);
    setOpenRenameDialog(false);

    await fetch(`/api/conversations/${currentDiscussion}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newDiscussionName,
      }),
    });
  };

  const handleDeleteDiscussion = async (id) => {
    setDiscussions(discussions.filter(discussion => discussion.id !== id));
    setMessages(messages.filter(message => message.discussionId !== id));
    setAnchorEl(null);

    await fetch(`/api/conversations/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', bgcolor: '#f0f2f5', marginTop: '64px', fontFamily: 'Poppins, sans-serif' }}>
      <Box sx={{ width: 250, bgcolor: '#ffffff', color: '#333', padding: 2, boxSizing: 'border-box', boxShadow: 3, display: { xs: drawerOpen ? 'block' : 'none', sm: 'block' } }}>
        <Typography variant="h6" sx={{ marginBottom: 2, color: '#1976d2' }}>
          Discussions
        </Typography>
        <List>
          {discussions.map((discussion) => (
            <ListItem button key={discussion.id} onClick={() => handleDiscussionChange(discussion.id)} sx={{ borderRadius: 1, '&:hover': { bgcolor: '#f0f0f0' } }}>
              <ListItemText primary={discussion.name} />
              <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleRenameDiscussion}>Rename</MenuItem>
                <MenuItem onClick={() => handleDeleteDiscussion(discussion.id)}>Delete</MenuItem>
              </Menu>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: '#e0e0e0' }} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddDiscussion}
          startIcon={<Add />}
          sx={{ marginTop: 2, borderRadius: 2, boxShadow: 2, '&:hover': { boxShadow: 4 } }}
        >
          Add Discussion
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 2, maxWidth: { xs: '100%', sm: 'calc(100% - 300px)' }, marginLeft: { sm: '100px' } }}>
        {isMobile && (
          <IconButton onClick={toggleDrawer} sx={{ alignSelf: 'flex-start', marginBottom: 2 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Paper elevation={3} sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: 2, padding: 2, borderRadius: 4 }} ref={chatContainerRef}>
          <List>
            {messages
              .filter((message) => message.discussionId === currentDiscussion)
              .map((message, index) => (
                <ListItem key={index} sx={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 1,
                      maxWidth: { xs: '80%', sm: '60%' },
                      borderRadius: 4,
                      backgroundColor: message.sender === 'user' ? '#1976d2' : '#e0e0e0',
                      color: message.sender === 'user' ? '#fff' : '#000',
                      boxShadow: 2,
                      '&:hover': { boxShadow: 4 },
                      transition: 'all 0.3s ease',
                      fontFamily: 'Poppins, sans-serif',
                      animation: 'bounce 0.5s'
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: message.sender === 'user' ? '#fff' : '#000' }}>
                      {message.sender === 'user' ? 'You' : 'AI'}
                    </Typography>
                    <ListItemText primary={message.text} />
                  </Paper>
                </ListItem>
              ))}
          </List>
          {isTyping && (
            <ListItem sx={{ justifyContent: 'flex-start', position: isMobile ? 'absolute' : 'relative', bottom: isMobile ? 0 : 'auto' }}>
              <Paper
                elevation={3}
                sx={{
                  padding: 1,
                  maxWidth: { xs: '80%', sm: '60%' },
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  color: '#000',
                  boxShadow: 2,
                  '&:hover': { boxShadow: 4 },
                  transition: 'all 0.3s ease',
                  fontFamily: 'Poppins, sans-serif',
                  animation: 'bounce 0.5s'
                }}
              >
                <ListItemText primary="Someone is typing..." />
              </Paper>
            </ListItem>
          )}
        </Paper>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 1, fontFamily: 'Poppins, sans-serif' }}
          />
          <ButtonSend onClick={handleSend} />
        </Box>
      </Box>
      <Dialog open={openRenameDialog} onClose={handleRenameDialogClose}>
        <DialogTitle>Rename Discussion</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Discussion Name"
            fullWidth
            variant="outlined"
            value={newDiscussionName}
            onChange={(e) => setNewDiscussionName(e.target.value)}
            sx={{ fontFamily: 'Poppins, sans-serif' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenameDialogClose} color="primary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            Cancel
          </Button>
          <Button onClick={handleRenameDialogSave} color="primary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatAcad;