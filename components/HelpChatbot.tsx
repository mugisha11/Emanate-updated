import React, { useState, useRef, useEffect } from 'react';
// Chatbot now calls a secure serverless endpoint which holds the API key server-side.
// Do NOT store the API key in client-side code. Set GEMINI_API_KEY in your server environment.
import { QuestionMarkIcon, XIcon, SendIcon, FaqIcon } from './Icons';

const FaqItem: React.FC<{ question: string; answer: string; imageUrl?: string }> = ({ question, answer, imageUrl }) => {
  const [isContentOpen, setIsContentOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsContentOpen(!isContentOpen)}
        className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-expanded={isContentOpen ? 'true' : 'false'}
      >
        <span className="font-semibold text-gray-800">{question}</span>
        <span className="text-xl text-gray-500 font-light">{isContentOpen ? '−' : '+'}</span>
      </button>
      {isContentOpen && (
        <div className="p-4 bg-white text-gray-700">
          {imageUrl ? (
            <div>
              <img src={imageUrl} alt={`Visual representation for ${question}`} className="rounded-lg mb-3 shadow-sm w-full object-cover h-40" />
              <p>{answer}</p>
            </div>
          ) : (
            <p>{answer}</p>
          )}
        </div>
      )}
    </div>
  );
};

const HelpChatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqItems = [
    {
      question: "What is EMANATE?",
      answer: "EMANATE is a women's research and advocacy-driven institute that builds on population, positive culture, and new insights into policy, programmes, and attitude change.",
    },
    {
      question: "What is EMANATE's mission?",
      answer: "EMANATE harnesses the use of evidence for sustainable solutions to population and family problems.",
    },
    {
      question: "What are EMANATE's main programmes?",
      answer: "Our main programmes include Women and Girls’ Involvement, the Men Engage approach, promoting Equality, and Capacity Building in various skills like financial literacy, and entrepreneurial skills.",
      imageUrl: "https://images.unsplash.com/photo-1521790797524-3f202a3b5a02?auto=format&fit=crop&w=400&q=80",
    },
    {
      question: "How can I contact EMANATE?",
      answer: "You can contact us via email at info@evidencesmatter.org or by phone at +250 788 426 428.",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);
  
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([{ text: "Hello! How can I help you learn about EMANATE today?", sender: 'bot' }]);
    }
  }, [isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
    if (!isChatOpen) setIsFaqOpen(false); // If we are opening chat, close faq
  }

  const toggleFaq = () => {
    setIsFaqOpen(prev => !prev);
    if (!isFaqOpen) setIsChatOpen(false); // If we are opening faq, close chat
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = { text: userInput, sender: 'user' as const };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Call the server endpoint which proxies to the Gemini / GenAI API using a server-side key.
      // This endpoint is hosted under your domain (e.g. https://emanatee.org/api/genai) and keeps the key server-side.
      const res = await fetch('/api/genai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const data = await res.json();
      const botResponse = data?.text || "Sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching response from server GenAI endpoint:', error);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-4">
        <button
          onClick={toggleFaq}
          className="bg-cyan-500 hover:bg-cyan-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
          aria-label="Open Frequently Asked Questions"
        >
          <FaqIcon className="w-8 h-8" />
        </button>
        <button
          onClick={toggleChat}
          className="bg-cyan-500 hover:bg-cyan-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
          aria-label="Open help chatbot"
        >
          <QuestionMarkIcon className="w-8 h-8" />
        </button>
      </div>

      {/* FAQ Modal */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
          isFaqOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <header className="bg-cyan-500 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h3 className="font-bold text-lg">Frequently Asked Questions</h3>
          <button onClick={() => setIsFaqOpen(false)} aria-label="Close FAQ">
            <XIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {faqItems.map((item, index) => (
            <FaqItem key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Chatbot Modal */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
          isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <header className="bg-cyan-500 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h3 className="font-bold text-lg">EMANATE Help Assistant</h3>
          <button onClick={() => setIsChatOpen(false)} aria-label="Close chat">
            <XIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-gray-200 text-gray-800 rounded-lg p-3 rounded-bl-none">
                 <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-lg">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-cyan-500 text-white p-3 rounded-full hover:bg-cyan-600 disabled:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
              disabled={isLoading || !userInput.trim()}
              aria-label="Send message"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HelpChatbot;