import ChatInput from "./components/chat-input/ChatInput";
import VentanaChat from "./components/ventana-chat/VentanaChat";

export default function App() {
  return (
    <div className="flex flex-col h-screen w-[80vh] mx-auto bg-gray-50 px-10 pt-5">
      {/* Contenedor del chat */}
      <div className="flex-grow overflow-hidden">
        <VentanaChat />
      </div>
      {/* Entrada del usuario para escribir el mensaje */}
      <div>
        <ChatInput />
      </div>
    </div>
  )
}
