import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import { BiMessageRoundedDots } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fengShuiAppApi } from "../../assets/api";
import dayjs, { Dayjs } from "dayjs";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

interface FormState {
    name: string;
    phone: string;
    email: string;
    dateOfBirth: Dayjs | null;
    timeOfBirth: Dayjs | null;
    placeOfBirth: { name: string; code: string } | null;
    sex: string;
    travelingFrom: { name: string; code: string } | null;
    timeRange: [Dayjs | null, Dayjs | null];
    desiredDestination: { name: string; code: string } | null;
}

const getInitialState = (): FormState => {
    try {
        const storedState = localStorage.getItem('formState');
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            return {
                name: parsedState.name || '',
                phone: parsedState.phone || '',
                email: parsedState.email || '',
                dateOfBirth: parsedState.dateOfBirth ? dayjs(parsedState.dateOfBirth) : null,
                timeOfBirth: parsedState.timeOfBirth
                    ? dayjs().startOf('day').hour(parseInt(parsedState.timeOfBirth.split(':')[0], 10))
                        .minute(parseInt(parsedState.timeOfBirth.split(':')[1], 10))
                    : null,
                placeOfBirth: parsedState.placeOfBirth && parsedState.placeOfBirth.name && parsedState.placeOfBirth.code
                    ? { name: parsedState.placeOfBirth.name, code: parsedState.placeOfBirth.code }
                    : null,
                sex: parsedState.sex || '',
                travelingFrom: parsedState.travelingFrom && parsedState.travelingFrom.name && parsedState.travelingFrom.code
                    ? { name: parsedState.travelingFrom.name, code: parsedState.travelingFrom.code }
                    : null,
                timeRange: [
                    parsedState.timeRange?.[0] ? dayjs(parsedState.timeRange[0]) : null,
                    parsedState.timeRange?.[1] ? dayjs(parsedState.timeRange[1]) : null,
                ],
                desiredDestination: parsedState.desiredDestination && parsedState.desiredDestination.name && parsedState.desiredDestination.code
                    ? { name: parsedState.desiredDestination.name, code: parsedState.desiredDestination.code }
                    : null,
            };
        }
    } catch {
        return {
            name: '',
            phone: '',
            email: '',
            dateOfBirth: null,
            timeOfBirth: null,
            placeOfBirth: null,
            sex: '',
            travelingFrom: null,
            timeRange: [null, null],
            desiredDestination: null,
        };
    }
    return {
        name: '',
        phone: '',
        email: '',
        dateOfBirth: null,
        timeOfBirth: null,
        placeOfBirth: null,
        sex: '',
        travelingFrom: null,
        timeRange: [null, null],
        desiredDestination: null,
    };
};

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = sessionStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [isVerified, setIsVerified] = useState<boolean>(() => {
    const saved = sessionStorage.getItem("isVerified");
    return saved ? JSON.parse(saved) : false;
  });

  const [isShowCancle, setIsShowCancle] = useState<boolean>(() => {
    const saved = sessionStorage.getItem("isShowCancle");
    return saved ? JSON.parse(saved) : false;
  });

  const [chatId, setChatId] = useState<string>(() => {
    const saved = sessionStorage.getItem("chatId");
    return saved ? saved : "";
  });

  const [showGreetingButton, setShowGreetingButton] = useState<boolean>(() => {
    const saved = sessionStorage.getItem("showGreetingButton");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    sessionStorage.setItem("isVerified", JSON.stringify(isVerified));
  }, [isVerified]);

  useEffect(() => {
    sessionStorage.setItem("chatId", chatId);
  }, [chatId]);

  useEffect(() => {
    sessionStorage.setItem("showGreetingButton", JSON.stringify(showGreetingButton));
  }, [showGreetingButton]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    const formState = getInitialState();
    if (message.trim()) {
      setIsShowCancle(false);
      setShowGreetingButton(false);
      const userMessage = {
        id: messages.length + 1,
        text: message,
        isUser: true,
      };
      const updatedMessages = [...messages, userMessage];
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");
      sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

      if (!(!isVerified || chatId === undefined || chatId === null || chatId === "")) {
        setIsTyping(true);

        try {
          const response = await axios.post(fengShuiAppApi.chatAsk, { "id": chatId, "text": userMessage.text });

          const botMessage = {
            id: messages.length + 2,
            text: response.data.data,
            isUser: false,
          };

          setMessages((prev) => [...prev, botMessage]);
          sessionStorage.setItem(
            "chatMessages",
            JSON.stringify([...updatedMessages, botMessage])
          );
        } catch (error) {
          const errorMessage = {
            id: messages.length + 2,
            text: "Chat bot is busy, please try again later!",
            isUser: false,
          };
          setMessages((prev) => [...prev, errorMessage]);
          setIsShowCancle(true);
        } finally {
          setIsTyping(false);
        }
      } else {
        try {
          const response = await axios.post(fengShuiAppApi.chatVerify, { phoneNumber: formState.phone });

          if (response.status === 200) {
            if (response.data.code === "00003" || response.data.code === "00001") {
              const botMessage = {
                id: messages.length + 2,
                text: "No information found!",
                isUser: false,
              };

              setMessages((prev) => [...prev, botMessage]);
              sessionStorage.setItem(
                "chatMessages",
                JSON.stringify([...updatedMessages, botMessage])
              );

              setIsVerified(false);
              setIsShowCancle(true);
            } else if (response.data.code === "00002") {
              const resInit = await axios.post(fengShuiAppApi.chatInit, { phoneNumber: formState.phone });

              if (resInit.status === 200) {
                if (resInit.data.code === "00003" || resInit.data.code === "00001") {
                  const botMessage = {
                    id: messages.length + 2,
                    text: "No information found!",
                    isUser: false,
                  };

                  setMessages((prev) => [...prev, botMessage]);
                  sessionStorage.setItem(
                    "chatMessages",
                    JSON.stringify([...updatedMessages, botMessage])
                  );

                  setIsVerified(false);
                  setIsShowCancle(true);
                } else if (resInit.data.code === "00002") {
                  setShowGreetingButton(true);
                  setIsVerified(true);
                  setIsShowCancle(false);
                  setChatId(resInit.data.data._id);
                  sessionStorage.setItem("chatId", resInit.data.data._id);
                }
              } else {
                botSendMess("Chat bot is busy, please try again later!");
                setIsShowCancle(true);
              }
            }
          } else {
            botSendMess("Chat bot is busy, please try again later!");
            setIsShowCancle(true);
          }
        } catch (error) {
          botSendMess("Chat bot is busy, please try again later!");
          setIsShowCancle(true);
        }
      }
    }
  };

  function botSendMess(text: string) {
    try {
      const botMessage: Message = {
        id: messages.length + 1,
        text: text,
        isUser: false,
      };
      const updatedMessages = [...messages, botMessage];
      setMessages(updatedMessages);
      sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    } catch (error) {
      console.error("Error during chat flow:", error);
    }
  }

  const handleGreetingClick = () => {
    botSendMess(`## Welcome! 🚀 \nWe are happy to assist you, please ask.\n`);
    setShowGreetingButton(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const fetchVerifyStatus = async () => {
    if (!isVerified || chatId === undefined || chatId === null || chatId === "") {
      const userMessage = {
        id: messages.length + 1,
        text: message,
        isUser: true,
      };
      const updatedMessages = [...messages, userMessage];
  
      if (!isVerified || chatId === undefined || chatId === null || chatId === "") {
        const formState = getInitialState();
        try {
          alert(formState.phone);
          const response = await axios.post(fengShuiAppApi.chatVerify, { phoneNumber: formState.phone });
  
          if (response.status === 200) {
            if (response.data.code === "00003" || response.data.code === "00001") {
              const botMessage = {
                id: messages.length + 2,
                text: "No information found!",
                isUser: false,
              };
  
              setMessages((prev) => [...prev, botMessage]);
              sessionStorage.setItem(
                "chatMessages",
                JSON.stringify([...updatedMessages, botMessage])
              );
  
              setIsVerified(false);
              setIsShowCancle(true);
            } else if (response.data.code === "00002") {
              const resInit = await axios.post(fengShuiAppApi.chatInit, { phoneNumber: formState.phone });
  
              if (resInit.status === 200) {
                if (resInit.data.code === "00003" || resInit.data.code === "00001") {
                  const botMessage = {
                    id: messages.length + 2,
                    text: "No information found!",
                    isUser: false,
                  };
  
                  setMessages((prev) => [...prev, botMessage]);
                  sessionStorage.setItem(
                    "chatMessages",
                    JSON.stringify([...updatedMessages, botMessage])
                  );
  
                  setIsVerified(false);
                  setIsShowCancle(true);
                } else if (resInit.data.code === "00002") {
                  setShowGreetingButton(true);
                  setIsVerified(true);
                  setIsShowCancle(false);
                  setChatId(resInit.data.data._id);
                  sessionStorage.setItem("chatId", resInit.data.data._id);
                }
              } else {
                botSendMess("Chat bot is busy, please try again later!");
                setIsShowCancle(true);
              }
            }
          } else {
            botSendMess("Chat bot is busy, please try again later!");
            setIsShowCancle(true);
          }
        } catch (error) {
          botSendMess("Chat bot is busy, please try again later!");
          setIsShowCancle(true);
        }
      }
    }
  };

  const handleRedirect = () => {
    if (window.location.href.includes("/trip") || window.location.href.includes("/page3")) {
      navigate("/");
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchVerifyStatus();
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      {/* Chat icon */}
      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            backgroundColor: "#e97e00",
            color: "white",
            "&:hover": { backgroundColor: "#d89c38" },
            width: 56,
            height: 56,
            animation: "blink 1.5s infinite",
            "@keyframes blink": {
              "0%, 100%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.2)" },
            },
          }}
        >
          <BiMessageRoundedDots size={24} />
        </IconButton>
      )}

      {/* Chat box */}
      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            bottom: 80,
            right: 0,
            width: {
              xs: 300,
              md: 400,
            },
            height: {
              xs: 400,
              md: 500,
            },
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1.6,
              backgroundColor: "#e97e00",
              color: "white",
            }}
          >
            <Typography variant="h6">Chat Support</Typography>
            <IconButton
              size="medium"
              sx={{
                color: "white",
                fontSize: "1.5rem",
              }}
              onClick={() => setIsOpen(false)}
            >
              <IoClose />
            </IconButton>
          </Box>

          <Divider />

          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              padding: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            {messages.map((msg) => (
              <Box
                key={Date.now() + Math.random()}
                sx={{
                  display: "flex",
                  justifyContent: msg.isUser ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                {!msg.isUser && (
                  <Avatar
                    src="/page1/icAI.png"
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                )}
                <Paper
                  sx={{
                    p: 1,
                    backgroundColor: msg.isUser ? "#e97e00" : "background.paper",
                    color: msg.isUser ? "white" : "inherit",
                    maxWidth: "75%",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    minHeight: "auto",
                    paddingX: 2,
                    paddingY: 0.1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      paddingTop: 2,
                      lineHeight: 1.5,
                      hyphens: "auto",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                      textAlign: "justify",
                      "& ul, & ol": {
                        paddingLeft: 2,
                        marginTop: 0,
                        marginBottom: 1,
                      },
                      "& li": {
                        marginBottom: 0.5,
                      },
                    }}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </Typography>
                </Paper>
              </Box>
            ))}

            {isTyping && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Avatar
                  src="/page1/icAI.png"
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#ccc",
                        borderRadius: "50%",
                        animation: "bounce 1.2s infinite",
                        animationDelay: `${i * 0.2}s`,
                        "@keyframes bounce": {
                          "0%, 100%": {
                            transform: "translateY(0)",
                          },
                          "50%": {
                            transform: "translateY(-8px)",
                          },
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {showGreetingButton && (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  onClick={handleGreetingClick}
                  startIcon={
                    <img src="/page1/icSp.svg" alt="icon" width={"90%"} />
                  }
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(92.4deg, #FFCC80 -8.37%, #e97e00 50%, #E65100 102.96%)",
                    borderRadius: "20px",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      background:
                        "linear-gradient(92.4deg, #E65100 102.96%, #e97e00 50%, #FFCC80 -8.37%)",
                    },
                    fontSize: {
                      xs: "12px",
                    },
                  }}
                >
                  START THE CONVERSATION!
                </Button>
              </Box>
            )}

            {isShowCancle && (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  onClick={handleRedirect}
                  startIcon={
                    <img src="/page1/icSp.svg" alt="icon" width={"90%"} />
                  }
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(92.4deg, #FFCC80 -8.37%, #e97e00 50%, #E65100 102.96%)",
                    borderRadius: "20px",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      background:
                        "linear-gradient(92.4deg, #E65100 102.96%, #e97e00 50%, #FFCC80 -8.37%)",
                    },
                    fontSize: {
                      xs: "12px",
                    },
                  }}
                >
                  EXPLORE NOW!
                </Button>
              </Box>
            )}

            <div ref={chatEndRef} />
          </Box>

          <Divider />

          <Box
            sx={{
              p: 2,
              display: "flex",
              gap: 1,
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Ask questions here ..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                backgroundColor: "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#e97e00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e97e00",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "black",
                },
              }}
            />

            <IconButton
              sx={{
                backgroundColor: "#e97e00",
                color: "white",
                "&:hover": { backgroundColor: "#B00428" },
              }}
              onClick={handleSend}
              disabled={!message.trim()}
            >
              <IoMdSend />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Chat;
