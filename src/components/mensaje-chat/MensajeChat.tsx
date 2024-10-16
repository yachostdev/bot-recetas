import React from "react";

// Definir la interfaz de las props que el componente recibirá
interface PropsMensajeChat {
  mensaje: {
    id: number;
    texto: string;
    remitente: 'usuario' | 'bot';
  };
}

const MensajeChat: React.FC<PropsMensajeChat> = ({ mensaje }) => {
  // Determinar el estilo según el remitente del mensaje
  const esUsuario = mensaje.remitente === 'usuario';

  return (
    <div className={`flex items-start my-2 ${esUsuario ? 'justify-start' : 'justify-end'}`}>
      {/* Mostrar el ícono del usuario o del bot */}
      {esUsuario && (
        <p className="mx-5 text-2xl">🙎‍♂️</p>
      )}
      {/* Mensaje de chat */}
      <div
        className={`max-w-xs p-3 rounded-lg ${esUsuario ? 'bg-white border border-gray-200 rounded-lg p-4 space-y-3 text-gray-800' : 'bg-blue-600 text-white'}`}
        style={{ whiteSpace: 'pre-wrap' }} // Aquí aplicamos el estilo que respeta los saltos de línea
      >
        {mensaje.texto}
      </div>
      {!esUsuario && (
        <p className="mx-5 text-2xl">🤖</p>
      )}
    </div>
  );
};

export default MensajeChat;