import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Привет! Я помогу вам узнать больше о Smart 360. Задавайте вопросы!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chatbot", { message });
      return response.json();
    },
    onSuccess: (data) => {
      const botMessage: Message = {
        id: Date.now().toString() + "_bot",
        text: data.response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте снова.",
        variant: "destructive"
      });
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="demo-interface" data-testid="chatbot-interface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="chatbot-title">
          <Bot className="w-6 h-6 text-primary" />
          Демо чат-бота Smart 360
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="bg-gray-50 rounded-lg p-6 h-80 overflow-y-auto mb-4 space-y-4"
          data-testid="chatbot-messages"
        >
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isBot ? "" : "justify-end"}`}
              data-testid={`message-${message.isBot ? 'bot' : 'user'}-${message.id}`}
            >
              <div 
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isBot 
                    ? "bg-primary text-white" 
                    : "bg-gray-300 text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.isBot ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.isBot ? "Smart 360 Bot" : "Вы"}
                  </span>
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {chatMutation.isPending && (
            <div className="flex" data-testid="chatbot-typing">
              <div className="bg-primary text-white px-4 py-2 rounded-lg max-w-xs">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span className="text-xs">Печатает...</span>
                </div>
                <div className="flex space-x-1 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-4" data-testid="chatbot-input-area">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите ваш вопрос..."
            disabled={chatMutation.isPending}
            data-testid="chatbot-input"
          />
          <Button 
            onClick={sendMessage}
            disabled={!inputValue.trim() || chatMutation.isPending}
            data-testid="chatbot-send-button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
