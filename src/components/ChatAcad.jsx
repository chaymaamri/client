import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Paper, Divider, Typography, IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
import { Send, Add, MoreVert, Menu as MenuIcon } from '@mui/icons-material';
import '@fontsource/poppins'; // Importing a modern font

const ChatAcad = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [discussions, setDiscussions] = useState([{ id: 1, name: 'Discussion 1' }]);
  const [currentDiscussion, setCurrentDiscussion] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [newDiscussionName, setNewDiscussionName] = useState('');
  const [chatResponses, setChatResponses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const chatContainerRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user', discussionId: currentDiscussion };
      setMessages([...messages, newMessage]);
      setInput('');
      setIsTyping(false);

      try {
        // Call OpenAI API to get a response
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer YOUR_OPENAI_API_KEY`
          },
          body: JSON.stringify({
            prompt: input,
            max_tokens: 150
          })
        });
        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].text) {
          const aiMessage = { text: data.choices[0].text.trim(), sender: 'ai', discussionId: currentDiscussion };
          setChatResponses([...chatResponses, aiMessage]);
        } else {
          console.error('Unexpected response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching OpenAI response:', error);
      }
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

  const handleAddDiscussion = () => {
    const newDiscussion = { id: discussions.length + 1, name: `Discussion ${discussions.length + 1}` };
    setDiscussions([...discussions, newDiscussion]);
    setCurrentDiscussion(newDiscussion.id);
    setMessages([]);
    setChatResponses([]);
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

  const handleRenameDialogSave = () => {
    setDiscussions(discussions.map(discussion => discussion.id === currentDiscussion ? { ...discussion, name: newDiscussionName } : discussion));
    setOpenRenameDialog(false);
  };

  const handleDeleteDiscussion = (id) => {
    setDiscussions(discussions.filter(discussion => discussion.id !== id));
    setMessages(messages.filter(message => message.discussionId !== id));
    setChatResponses(chatResponses.filter(response => response.discussionId !== id));
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  let typingTimeout;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, chatResponses, isTyping]);

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
                    <ListItemText primary={message.text} />
                  </Paper>
                </ListItem>
              ))}
            {chatResponses
              .filter((response) => response.discussionId === currentDiscussion)
              .map((response, index) => (
                <ListItem key={index} sx={{ justifyContent: 'flex-start' }}>
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
                    <ListItemText primary={response.text} />
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            endIcon={<Send />}
            sx={{ borderRadius: 4, boxShadow: 1, '&:hover': { boxShadow: 4 }, fontFamily: 'Poppins, sans-serif' }}
          >
            
          </Button>
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