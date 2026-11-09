import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const API_URL = `${import.meta.env.VITE_API_URL}/api/chat/`;

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am Deepak-GPT. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // history = everything after the greeting
    const history = messages.slice(1).map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }));

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, { message: text, history });
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      const msg = err.response?.data?.error || "Could not reach server.";
      setMessages((prev) => [...prev, { sender: "bot", text: `⚠️ ${msg}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] bg-white">
      <div className="p-5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-extrabold text-2xl text-center tracking-wider shadow-md">
        Deepak-GPT 💬
      </div>

      <div className="flex-1 overflow-y-auto p-5 bg-gray-50 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg text-base leading-relaxed shadow break-words markdown ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-900 border border-gray-300 rounded-bl-none"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg bg-white border border-gray-300 text-gray-500 italic">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center p-4 border-t border-gray-300 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          disabled={loading}
          className="flex-1 p-3 text-lg border border-gray-300 rounded-lg bg-gray-100 outline-none text-black focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="ml-3 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg text-lg shadow-md hover:from-indigo-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send ➤
        </button>
      </div>
    </div>
  );
};

export default Chatbot;