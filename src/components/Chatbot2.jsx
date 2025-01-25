import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../components/chatbot.css'; // Assurez-vous que le CSS est bien lié

const Chatbot2 = ({ userName }) => {
  const initialMessage = `عسلامة ${userName}، كيفاش تحس(ي) في روحك اليوم؟`;
  const [chatHistory, setChatHistory] = useState([initialMessage]);
  const [options, setOptions] = useState(['فرحان(ة)', 'تاعب(ة)', 'حزين(ة)']);
  const chatEndRef = useRef(null);

  // Utilisation du Hook useEffect pour faire défiler la conversation au bas de la page
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Fonction pour obtenir la réponse du chatbot
  const getBotResponse = async (userInput) => {
    const maxRetries = 5; // Nombre maximum de tentatives
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo', // Utilisez gpt-3.5-turbo ici
            messages: [
              { role: 'system', content: 'You are a chatbot specialized in positive vibes and motivational support.' },
              { role: 'user', content: userInput },
            ],
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const botMessage = response.data.choices[0].message.content;
        return botMessage ? `روبوت: ${botMessage}` : 'روبوت: عذرًا، ما نجمتش نلقى رد.';
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error('Trop de requêtes envoyées. Réessayez plus tard.');
          // Attendre avant de réessayer avec un délai exponentiel
          const waitTime = Math.pow(2, attempt) * 1000; // Délai exponentiel (2^attempt secondes)
          await new Promise(resolve => setTimeout(resolve, waitTime));
          attempt++;
        } else {
          console.error('Erreur lors de la récupération de la réponse AI:', error);
          return 'روبوت: عذرًا، صار مشكل في الرد. جرب مرة أخرى!';
        }
      }
    }

    return 'روبوت: عذرًا، صار مشكل في الرد. J\'ai essayé plusieurs fois.';
  };

  // Gère la réponse utilisateur et obtient une réponse du chatbot
  const handleResponse = async (choice) => {
    setChatHistory((prevHistory) => [...prevHistory, `Utilisateur: ${choice}`]);
    
    // Ajoutez un délai avant d'appeler l'API pour éviter les erreurs 429
    await new Promise(resolve => setTimeout(resolve, 2000)); // Délai de 2 secondes

    const botResponse = await getBotResponse(choice);
    setChatHistory((prevHistory) => [...prevHistory, botResponse]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-history">
        {chatHistory.map((msg, index) => (
          <p key={index} className={index % 2 === 0 ? 'user-message' : 'bot-message'}>
            {msg}
          </p>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chatbot-options">
        {options.map((option) => (
          <button key={option} onClick={() => handleResponse(option)} className="chatbot-button">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chatbot2;