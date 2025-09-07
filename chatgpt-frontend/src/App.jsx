import React from "react";
import Chatbot from "./Chatbot";

function App() {
  return (
    <>
 <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-6">
  <div className="w-full max-w-2xl bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-lg border border-gray-900 overflow-hidden">
    <Chatbot />
  </div>
</div>

</>


  );
}

export default App;
