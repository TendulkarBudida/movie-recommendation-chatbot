import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2 } from 'lucide-react';
import { marked } from 'marked';
import { FaRobot, FaUser } from 'react-icons/fa';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (!hasIntroduced) {
      setMessages([
        { role: 'assistant', content: 'Hello! I’m here to help you find your next favorite movie. Just type in a genre, mood, or any specific preferences you have, and I’ll suggest something for you!' }
      ]);
      setHasIntroduced(true);
    }
  }, [hasIntroduced]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "You are a movie recommendation chatbot..." }],
          },
          {
            role: "model",
            parts: [{ text: "Understood. I am a movie recommendation chatbot..." }],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const responseText = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-full h-[600px] sm:h-[500px] lg:h-[600px] flex flex-col bg-gray-950 shadow-lg rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 bg-gray-900 text-gray-100">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} items-start`}
          >
            {message.role === 'assistant' ? (
              <>
                <FaRobot className="text-lg sm:text-2xl text-gray-400 mr-2 mt-1" />
                <div
                  className="rounded-lg px-3 sm:px-4 py-2 max-w-[80%] bg-gray-900 text-gray-100 shadow-md"
                  dangerouslySetInnerHTML={{
                    __html: marked(message.content),
                  }}
                />
              </>
            ) : (
              <>
                <div
                  className="rounded-lg px-3 sm:px-4 py-2 max-w-[80%] bg-gray-800 text-gray-100 shadow-md"
                  dangerouslySetInnerHTML={{
                    __html: marked(message.content),
                  }}
                />
                <FaUser className="text-lg sm:text-2xl text-gray-400 ml-2 mt-1" />
              </>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="w-5 sm:w-6 h-5 sm:h-6 animate-spin text-gray-400" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="border-t border-gray-800 p-2 sm:p-4 bg-gray-950">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for a movie recommendation..."
            className="flex-1 px-2 sm:px-3 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-3 sm:px-4 py-2 bg-gray-800 text-gray-100 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;




// import React, { useState, useRef, useEffect } from 'react';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { Loader2 } from 'lucide-react';
// import { marked } from 'marked';
// import { FaRobot, FaUser } from 'react-icons/fa';

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// const ChatBot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasIntroduced, setHasIntroduced] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//     if (!hasIntroduced) {
//       setMessages([
//         { role: 'assistant', content: 'Hello! I’m here to help you find your next favorite movie. Just type in a genre, mood, or any specific preferences you have, and I’ll suggest something for you!' }
//       ]);
//       setHasIntroduced(true);
//     }
//   }, [hasIntroduced]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//       //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//       const chat = model.startChat({
//         history: [
//           {
//             role: "user",
//             parts: [{ text: "You are a movie recommendation chatbot. Only provide responses related to movie recommendations. If asked about anything else, politely redirect the conversation to movies." }],
//           },
//           {
//             role: "model",
//             parts: [{ text: "Understood. I am a movie recommendation chatbot, and I will focus solely on providing movie-related recommendations and information. If any questions or topics outside of movies come up, I'll politely steer the conversation back to films. How can I help you with movie recommendations today?" }],
//           },
//         ],
//         generationConfig: {
//             temperature: 0.9,
//             topK: 1,
//             topP: 1,
//             maxOutputTokens: 2048,
//         },
//       });

//       const result = await chat.sendMessage(input);
//       const response = await result.response;
//       const responseText = response.text();

//       setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
//     }

//     setIsLoading(false);
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto h-[600px] flex flex-col bg-gray-950 shadow-lg rounded-lg overflow-hidden">
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 text-gray-100">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} items-start`} // Align items to start
//           >
//             {/* Display icon for chatbot on the left, and user icon on the right */}
//             {message.role === 'assistant' ? (
//               <>
//                 <FaRobot className="text-2xl text-gray-400 mr-2 mt-1" /> {/* Icon aligned with top of message */}
//                 <div
//                   className="rounded-lg px-4 py-2 max-w-[80%] bg-gray-900 text-gray-100 shadow-md"
//                   dangerouslySetInnerHTML={{
//                     __html: marked(message.content),
//                   }}
//                 />
//               </>
//             ) : (
//               <>
//                 <div
//                   className="rounded-lg px-4 py-2 max-w-[80%] bg-gray-800 text-gray-100 shadow-md"
//                   dangerouslySetInnerHTML={{
//                     __html: marked(message.content),
//                   }}
//                 />
//                 <FaUser className="text-2xl text-gray-400 ml-2 mt-1" /> {/* Icon aligned with top of user message */}
//               </>
//             )}
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-center">
//             <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4 bg-gray-950">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask for a movie recommendation..."
//             className="flex-1 px-3 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             disabled={isLoading}
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-gray-800 text-gray-100 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Thinking...' : 'Send'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChatBot;