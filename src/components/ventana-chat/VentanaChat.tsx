import { useEffect, useRef } from "react";
import { useChatStore } from "../../store/chatStore";
// import MensajeChat from './MensajeChat';

const VentanaChat: React.FC = () => {
  // Obtener los mensajes del estado global usando Zustand
  const mensajes = useChatStore((estado) => estado.mensajes);

  // Referencia para mantener el scroll automático en el contenedor del chat
  const referenciaFinalChat = useRef<HTMLDivElement | null>(null);
  
  // Función para desplazar el scroll automáticamente al final
  const desplazarHaciaAbajo = () => {
    referenciaFinalChat.current?.scrollIntoView({ behavior: 'smooth'});
  };

  // Cada vez que el array de mensajes cambie, se desplaza automáticamente al final
  useEffect(() => {
    desplazarHaciaAbajo();
  }, [mensajes]);

  return (
    <div className="relative h-[80vh] w-full max-w-3xl mx-auto overflow-y-auto border-gray-300 rounded-lg shadow-sm p-4 bg-white">
      {/* Recorrer el array de mensajes y renderizar cada uno */}
      {mensajes.map((mensaje) => (
        // <MensajeChat key={mensaje.id} mensaje={mensaje} />
      ))}
      {/* Div oculto para mantener el scroll al final del contenedor */}
      <div ref={referenciaFinalChat}></div>
    </div>
  )
};

export default VentanaChat;