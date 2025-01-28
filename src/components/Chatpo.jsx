import React, { useState, useEffect, useRef } from "react";
import '../components/chatbot.css';
import { Box, IconButton, Typography, TextField, Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import botImage from '../components/bot.png'; // Adjust the path to your bot.png image
import userImage from '../components/user.png'; // Adjust the path to your user.png image

function ChatWidget() {
  const userName = "User  "; // Replace with actual user name if available
  const initialMessage = `عسلامة ${userName}، كيفاش تحس في روحك اليوم؟`;
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([initialMessage]);
  const [options, setOptions] = useState(['فرحان(ة)', 'تاعب(ة)', 'حزين(ة)']);
  const [step, setStep] = useState(0);
  const [inputMessage, setInputMessage] = useState(""); // Declare inputMessage state
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleResponse = (choice) => {
    // Add the user's choice to the chat history
    setChatHistory((prevHistory) => [...prevHistory, choice]);

    let newMessage;
    if (step === 0) {
      if (choice === 'فرحان(ة)') {
        newMessage = 'الحمد لله! شنوة الحاجة اللي مفرحتك اليوم؟';
        setOptions(['العائلة', 'النجاح', 'الأصحاب', 'الحياة بصفة عامة']);
      } else if (choice === 'تاعب(ة)') {
        newMessage = 'خذ راحتك شوية، ديما راك قادر تتعدى التعب! شنو سبب التعب؟';
        setOptions(['الخدمة', 'الدراسة', 'المسؤوليات', 'ظروف أخرى']);
      } else if (choice === 'حزين(ة)') {
        newMessage = 'الحياة صعيبة أما ديما نلقاو الأمل! شنوة السبب اللي حزنك؟';
        setOptions(['الوحدة', 'الصعوبات اليومية', 'فقدان شيء مهم', 'ظروف أخرى']);
      }
      setStep(1);
    } else if (step === 1) {
      // Responses for "فرحان(ة)"
      if (choice === 'العائلة') {
        newMessage = 'العايلة ديما مصدر الفرح والقوة! تفرح كيف تشوف عايلتك مبسوطين؟';
        setOptions(['أكيد', 'إيه، عاود من الأول', 'عيشك شكرا']);
      } else if (choice === 'النجاح') {
        newMessage = 'النجاح فرحة كبيرة، ديما تذكر التعب اللي عملته باش توصل! عندك نصائح للنجاح؟';
        setOptions(['نحب نصائح للنجاح', 'إيه، عاود من الأول', 'عيشك شكرا']);
      } else if (choice === 'الأصحاب') {
        newMessage = 'الأصحاب برشا سعادة! ديما خلي أصحابك المقرّبين ديما جنبك.';
        setOptions(['نعرف، الحمد لله', 'إيه، عاود من الأول', 'عيشك شكرا']);
      } else if (choice === 'الحياة بصفة عامة') {
        newMessage = 'الحياة جميلة، وديما مليانة حاجات حلوة. خلي أملك ديما عالي!';
        setOptions(['أمل جديد كل يوم', 'إيه، عاود من الأول', 'عيشك شكرا']);
      } 
      // Responses for "تاعب(ة)"
      else if (choice === 'الخدمة') {
        newMessage = 'الخدمة صعيبة، أما تتعلم منها برشا حاجات. ديما حاول توازن حياتك.';
        setOptions(['كيف نلقى التوازن', 'إيه، عاود من الأول', 'عيشك شكرا']);
      } else if (choice === 'الدراسة') {
        newMessage = 'الدراسة تعب، أما المستقبل يستاهل المجهود. عندك نصائح للمراجعة؟';
        setOptions(['نصائح للمراجعة', 'إيه، عاود من الأول', 'عيشك شكرا']);
      } else if (choice === 'المسؤوليات') {
        newMessage = 'المسؤوليات برشا، أما تنظيم الوقت يعاونك برشا!';
        setOptions(['كيف ننظم وقتي', 'إيه، عاود من الأول', 'عيشك شكرا']);
      } else if (choice === 'ظروف أخرى') {
        newMessage = 'ديما ظروف الحياة فيها تحديات، لكن الإيمان والرضا يعاونوا برشا.';
        setOptions(['إن شاء الله', 'إيه، عاود من الأول', 'عيشك شكرا']);
      } 
      // Responses for "حزين(ة)"
      else if (choice === 'الوحدة') {
        newMessage = 'الوحدة صعيبة، أما فكر في الناس اللي تحبك وتهتم بيك!';
        setOptions(['عندك الحق', 'إيه، عاود من الأول', 'عيشك شكرا']);
      } else if (choice === 'الصعوبات اليومية') {
        newMessage = 'الصعوبات اليومية تحدي، أما ديما نحاولوا نشوفوا الجانب الإيجابي.';
        setOptions(['كيف نتعامل معهم', 'إيه، عاود من الأول', 'عيشك شكرا']);
      } else if (choice === 'فقدان شيء مهم') {
        newMessage = 'الفقدان يوجع، أما ديما نلقاو حاجات جديدة تعوضنا.';
        setOptions(['صح، لازم نصبر', 'إيه، عاود من الأول', 'عيشك شكرا']);
      } else {
        newMessage = 'إن شاء الله الظروف تتحسن وتلقى راحة البال.';
        setOptions(['أمل خير', 'إيه، عاود من الأول', 'عيشك شكرا']);
      }
      setStep(2);
    } else if (step === 2) {
      // Add specific responses
      if (choice === 'نحب نصائح للنجاح') {
        newMessage = 'باش تنجح، نظم وقتك، حدد أهداف واضحة، وديما تعلم من تجاربك. تتمنى حاجة أخرى؟';
        setOptions(['عيشك شكرا']);
      } else if (choice === 'أمل جديد كل يوم') {
        newMessage = 'كل يوم يجي بأمل جديد، خليك ديما متفائل وتحدى الصعاب.';
        setOptions(['عيشك شكرا']);
      } else if (choice === 'كيف نلقى التوازن') {
        newMessage = 'التوازن يتطلب تنظيم الوقت وتخصيص وقت للراحة. المهم تلتزم بخطة واضحة.';
        setOptions(['عيشك شكرا']);
      } else if (choice === 'نصائح للمراجعة') {
        newMessage = 'خذ وقت للراحة بين المراجعات، خطط مسبقاً، وذاكر في بيئة هادئة. تواصل نعاونك؟';
        setOptions(['عيشك شكرا']);
      } else if (choice === 'كيف ننظم وقتي') {
        newMessage = 'التنظيم يبدأ بتحديد أولوياتك واستعمال أدوات للتنظيم كيف To-Do List وGoogle Calendar.';
        setOptions(['عيشك شكرا']);
      } else if (choice === 'عندك الحق') {
        newMessage = 'مهم تلقى الناس اللي تفهمك وتعاونك. العزلة تزيد الحزن، تقرب من الناس اللي تحبك.';
        setOptions(['عيشك شكرا']);
      } else if (choice === 'كيف نتعامل معهم') {
        newMessage = 'نتعامل معهم بالصبر والثقة في روحك. الأمل هو اللي يعطيك القوة للتحدي.';
        setOptions(['عيشك شكرا']);
      } else if (choice === 'صح، لازم نصبر') {
        newMessage = 'الصبر مفتاح الراحة. ديما تلقى نور بعد كل لحظة صعيبة.';
        setOptions(['عيشك شكرا']);
      } else if (choice === 'أمل خير') {
        newMessage = 'إن شاء الله كل حاجة خير قدامك، ديما تفاءل بالخير تلقاه.';
        setOptions(['عيشك شكرا']);
      } else if (choice === 'إيه، عاود من الأول') {
        newMessage = initialMessage;
        setOptions(['فرحان(ة)', 'تاعب(ة)', 'حزين(ة)']);
        setStep(0);
      } else if (choice === 'عيشك شكرا') {
        newMessage = 'مرحبًا بك في أي وقت، نتمنى لك يوم مليء بالسعادة والراحة!';
        setOptions(['إيه، عاود من الأول']);
      }
    }

    // Update chat history with the new message
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);
  };

  return (
    <>
      {/* Floating Button */}
      <IconButton onClick={toggleChat} sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
        color: "#fff",
        "&:hover": { background: "linear-gradient(45deg, #1565c0 30%, #2196f3 90%)" },
        borderRadius: "50%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}>
        <ChatIcon />
      </IconButton>

      {/* Chat Box */}
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            right: 16,
            width: { xs: '80%', sm: 300 }, // Reduced width
            height: { xs: '60%', sm: 400 }, // Reduced height
            background: "linear-gradient(135deg, #f9f9f9 30%, #e3f2fd 90%)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "fadeIn 0.5s", // Apply fadeIn animation
          }}
        >
          {/* Header */}
          <Box
            sx={{
              padding: "10px 15px",
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              color: "#fff",
              borderRadius: "10px 10px 0 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={botImage} alt="Bot" style={{ marginRight: 8, width: 40, height: 40, animation: "bounce 1s infinite" }} />
            <Typography variant="h6">كيفاش تحس في روحك اليوم ؟</Typography>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              borderBottom: "1px solid #ddd",
              backgroundColor: "#f9f9f9",
            }}
          >
            {chatHistory.map((message, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: 1,
                  textAlign: index % 2 === 0 ? "left" : "right", // Adjust alignment based on sender
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {index % 2 === 0 ? <img src={botImage} alt="Bot" style={{ marginRight: 8, width: 40, height: 40 }} /> : <img src={userImage} alt="User" style={{ marginRight: 8, width: 40, height: 40 }} />}
                <Typography
                  variant="body2"
                  className={index % 2 === 0 ? "agent-message" : "user-message"} // Use class names for styling
                  sx={{
                    display: "inline-block",
                    padding: "8px",
                    borderRadius: "10px",
                    backgroundColor: index % 2 === 0 ? "#f8d7da" : "#d1e7dd",
                    color: index % 2 === 0 ? "#842029" : "#0f5132",
                  }}
                >
                  {message}
                </Typography>
              </Box>
            ))}
            <div ref={chatEndRef} /> {/* Scroll to the end of chat */}
          </Box>

          {/* Options */}
          {options.length > 0 && (
            <Box sx={{ padding: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {options.map((option, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  onClick={() => handleResponse(option)}
                  sx={{
                    flex: "1 1 calc(50% - 10px)",
                    background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #1565c0 30%, #2196f3 90%)",
                    },
                  }}
                >
                  {option}
                </Button>
              ))}
            </Box>
          )}

          {/* Input Field */}
          {options.length === 0 && (
            <Box sx={{ padding: "10px" }}>
              <TextField
                variant="outlined"
                placeholder="اكتب رسالتك هنا..."
                fullWidth
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                sx={{ marginBottom: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                // onClick={handleSendMessage}
                sx={{
                  background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #1565c0 30%, #2196f3 90%)",
                  },
                }}
              >
                إرسال
              </Button>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default ChatWidget;