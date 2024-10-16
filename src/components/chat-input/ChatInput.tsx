import React, { useState } from "react";
import { useChatStore } from "../../store/chatStore";


const ChatInput: React.FC = () => {
  const [mensaje, setMensaje] = useState('');
  const agregarMensaje = useChatStore((estado) => estado.agregarMensaje);
  const buscarReceta = useChatStore((estado) => estado.buscarReceta);


  // Función para manejar el envio del mensaje
  const enviarMensaje = () => {
    if (mensaje.trim() !== '') {
      // Agregar el mensaje del usuario al estado
      agregarMensaje({
        id: Date.now(),
        texto: mensaje,
        remitente: 'usuario',
      });

      // Llamar a la funcion para buscar la buscarReceta
      const ingredientes = mensaje.split(',').map((ingrediente) => ingrediente.trim().toLowerCase());
      buscarReceta(ingredientes);

      setMensaje(''); // Limpiar el campo de entrada despues de enviar
    }
  };

  // Manejar el evento de la tecla "Enter" para enviar el mensaje
  const manejarEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter'){
      enviarMensaje();
    }
  };

  return (
    <div className="flex items-center p-4 border-t border-gray-300">
      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        onKeyDown={manejarEnter}
        placeholder="Escribe un mensaje..."
        className="flex-grow p-2 border border-gray-300 rounded-lg mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />      
      <button
        onClick={enviarMensaje}
        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Enviar
      </button>
    </div>
  )
}

export default ChatInput