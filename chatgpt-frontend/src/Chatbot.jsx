import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! I am Deepak-GPT. How can I help you?" }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/`, { message: input });


            setMessages([
                ...newMessages,
                { sender: "bot", text: res.data.reply }
            ]);
        } catch (error) {
            setMessages([
                ...newMessages,
                { sender: "bot", text: "⚠️ Error: Could not reach server." }
            ]);
        }

        setInput("");
    };

    return (
    <div className="flex flex-col h-screen border rounded-lg shadow-xl overflow-hidden bg-white max-w-4xl mx-auto">
  {/* Header */}
  <div className="p-6 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-extrabold text-2xl text-center tracking-wider shadow-md">
    Deepak-GPT 💬
  </div>

  {/* Chat Messages */}
  <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
      >
        <span
          className={`max-w-3/4 p-4 rounded-lg text-base leading-relaxed shadow-lg ${
            msg.sender === "user"
              ? "rounded-br-xl bg-blue-600 text-white"
              : "rounded-bl-xl bg-white text-gray-900 border border-gray-300"
          }`}
        >
          {msg.text}
        </span>
      </div>
    ))}
  </div>

  {/* Input Section */}
  <div className="flex items-center p-6 border-t border-gray-300 bg-white shadow-lg">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      placeholder="Type a message..."
      className="flex-1 p-4 text-lg border border-gray-300 rounded-lg bg-gray-100 outline-none text-black focus:ring-2 focus:ring-blue-600"
    />
    <button
      onClick={sendMessage}
      className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg text-lg transition duration-300 hover:from-indigo-600 hover:to-blue-600 shadow-md"
    >
      Send ➤
    </button>
  </div>
</div>




    );
};

export default Chatbot;
