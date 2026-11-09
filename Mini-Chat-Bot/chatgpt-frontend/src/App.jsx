import Chatbot from "./Chatbot";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700 p-4">
      <div className="w-full max-w-2xl rounded-lg shadow-lg border border-gray-900 overflow-hidden">
        <Chatbot />
      </div>
    </div>
  );
}

export default App;