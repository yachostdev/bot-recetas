import { create } from "zustand";

// Definir la interfaz para un mensaje
interface Mensaje {
  id: number;
  texto: string;
  remitente: 'usuario' | 'bot';
}

// Definir la interfaz del estado del chat
interface EstadoChat {
  mensajes: Mensaje[];
  agregarMensaje: (mensaje:Mensaje) => void;
  limpiarMensajes: () => void;
}

// Crear el almacen de zustand
export const useChatStore = create<EstadoChat>((set) => ({
  mensajes: [],

  // Fucncion para agregar un nuevo mensaje al estado
  agregarMensaje: (mensaje) =>
    set((estado) => ({
      mensajes: [...estado.mensajes, mensaje],
    })),

  // Funcion para limpiar todos los mensajes del chat
  limpiarMensajes: () => set(() => ({ mensajes: [] })),
}));