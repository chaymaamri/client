import React, { useState, useRef, useEffect } from 'react';
import '../components/chatbot.css';

const Chatbot = ({ userName }) => {
  // Initialisation de l'état
  const initialMessage = `عسلامة ${userName}، كيفاش تحس في روحك اليوم؟`;
  const [chatHistory, setChatHistory] = useState([initialMessage]); // Historique des messages
  const [options, setOptions] = useState(['فرحانة', 'تاعبة', 'حزينة', 'فرحان', 'تاعب', 'حزين']);
  const [step, setStep] = useState(0);

  // Référence pour le défilement automatique
  const chatEndRef = useRef(null);

  // Fonction pour faire défiler automatiquement jusqu'en bas
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Fonction pour gérer les réponses de l'utilisateur
  const handleResponse = (choice) => {
    let newMessage;
    if (step === 0) {
      // Première étape
      if (choice === 'فرحانة' || choice === 'فرحان') {
        newMessage = 'الحمد لله! شنوة الحاجة اللي مفرحتك اليوم؟';
        setOptions(['العائلة', 'الأصحاب', 'الحياة بصفة عامة', 'شيء آخر']);
      } else if (choice === 'تاعبة' || choice === 'تاعب') {
        newMessage = 'خذ راحتك شوية. شنو السبب تعبك؟';
        setOptions(['الخدمة', 'الدراسة', 'ظروف الحياة', 'شيء آخر']);
      } else if (choice === 'حزينة' || choice === 'حزين') {
        newMessage = 'ما عليك كان تصبر، الحياة ديما عندها جانب حلو.';
        setOptions(['العائلة', 'الأصحاب', 'الوحدة', 'شيء آخر']);
      }
      setStep(1);
    } else if (step === 1) {
      // Deuxième étape selon la réponse donnée
      switch (choice) {
        case 'العائلة':
          newMessage = 'العايلة ديما عندها مشاكل، أما ديما عندهم جانب إيجابي. شنو تحب تحكي؟';
          setOptions(['صحيح', 'أحياناً صعيب', 'فيهم حب', 'فيهم أمل']);
          break;
        case 'الأصحاب':
          newMessage = 'الأصحاب هم فراج الحياة! تحب تحكي مع أصحابك اليوم؟';
          setOptions(['إيه', 'لا, نشوفهم قريب', 'أصحابي مشغولين', 'نشكرهم على دعمهم']);
          break;
        case 'الحياة بصفة عامة':
          newMessage = 'الحياة فيها الحلو والمر، لازم نفرحوا بالأشياء الصغيرة. شنو رأيك؟';
          setOptions(['صحيح', 'مش ديما ساهل', 'كل يوم تجربة جديدة', 'الحياة تجارب']);
          break;
        case 'الخدمة':
          newMessage = 'العمل صعيب، أما لازم تحاول تجد توازن. كيف تشوف الخدمة؟';
          setOptions(['محتاج نصائح', 'إن شاء الله', 'تعبت شوية', 'مرتاح في شغلي']);
          break;
        case 'الدراسة':
          newMessage = 'الدراسة تتطلب مجهود، لكن بتوكل على الله. شنو المواد اللي صعيبة عليك؟';
          setOptions(['نصائح للمراجعة', 'ما نجمش نكمل', 'متعب من المواد', 'نحتاج راحة']);
          break;
        case 'ظروف الحياة':
          newMessage = 'الظروف الحياة ديما فيها تحديات، لكن الحمد لله على كل شيء. كيف تتعامل مع الضغوط؟';
          setOptions(['الحمد لله', 'صحيح, نحتاج نصائح', 'نحتاج تغيير']);
          break;
        case 'الوحدة':
          newMessage = 'الوحدة صعيبة، أما لازم دايمًا نتذكر إننا مش وحدنا في الدنيا. تحب تحكي أكثر؟';
          setOptions(['كيف نلقى أصحاب', 'نحب نكون وحدي', 'الوحدة وقتياً']);
          break;
        default:
          newMessage = 'خذ راحة، وديما ابقى إيجابي!';
          setOptions(['تعاود من الأول']);
      }
      setStep(2);
    } else if (step === 2 && choice === 'تعاود من الأول') {
      // Réinitialisation de la conversation
      newMessage = initialMessage;
      setOptions(['فرحانة', 'تاعبة', 'حزينة', 'فرحان', 'تاعب', 'حزين']);
      setStep(0);
    }

    setChatHistory((prevHistory) => [...prevHistory, choice, newMessage]);
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

export default Chatbot;
