import { create } from "zustand";
import recetasData from '../data/recetas.json'; // Importar las recetas desde el archivo JSON

// Definir la interfaz para un mensaje
interface Mensaje {
  id: number;
  texto: string;
  remitente: 'usuario' | 'bot';
}

// Definir la interfaz del estado del chat
interface EstadoChat {
  mensajes: Mensaje[];
  intentosFallidos: number;
  agregarMensaje: (mensaje: Mensaje) => void;
  limpiarMensajes: () => void;
  buscarReceta: (ingredientes: string[]) => void;
}

// Crear el almacén de Zustand
export const useChatStore = create<EstadoChat>((set) => ({
  mensajes: [
    {
      id: Date.now(),
      texto: "👋 ¡Bienvenido al bot de recetas de cocina! 🍳🥗\n\nEste bot te ayudará a encontrar recetas deliciosas utilizando ingredientes típicos de una alacena colombiana. Puedes ingresar ingredientes como pollo, arroz, aguacate, etc.\n\nPor favor, ingresa tres ingredientes separados por comas para comenzar. 😊",
      remitente: 'bot',
    },
  ],
  intentosFallidos: 0,

  agregarMensaje: (mensaje) =>
    set((estado) => ({
      mensajes: [...estado.mensajes, mensaje],
    })),

  limpiarMensajes: () => set(() => ({ mensajes: [], intentosFallidos: 0 })),

  // Función para buscar recetas
  buscarReceta: (ingredientes) => {
    const horaActual = new Date();
    const hora = horaActual.getHours();
    const minutos = horaActual.getMinutes();
    let tipoComida: 'desayuno' | 'almuerzo' | 'cena';

    // Determinar el tipo de comida según la hora actual
    if (hora < 10) {
      tipoComida = 'desayuno';
    } else if (hora < 16) {
      tipoComida = 'almuerzo';
    } else {
      tipoComida = 'cena';
    }

    console.log(`Buscando recetas para: ${tipoComida} con ingredientes: ${ingredientes.join(', ')}`);

    // Agregar un pequeño retraso antes de mostrar el mensaje "procesando"
    const frasesProcesando = [
      "🤖 Estoy revisando nuestras recetas...",
      "🤖 Dame un momento mientras busco la mejor receta para ti...",
      "🤖 Buscando algo delicioso para ti...",
    ];
    const mensajeProcesando = frasesProcesando[Math.floor(Math.random() * frasesProcesando.length)];

    setTimeout(() => {
      set((estado) => ({
        mensajes: [
          ...estado.mensajes,
          {
            id: Date.now(),
            texto: mensajeProcesando,
            remitente: 'bot',
          },
        ],
      }));
    }, 2000); // Retrasar el mensaje "procesando" por 2s

    // Retrasar la respuesta del bot para simular el procesamiento
    setTimeout(() => {
      // Normalizar los ingredientes ingresados por el usuario (separar por comas, espacios, etc.)
      let ingredientesNormalizados = ingredientes.join(' ').split(/[, ]+/);
      ingredientesNormalizados = ingredientesNormalizados.map((ingrediente) =>
        ingrediente.trim().toLowerCase()
      );

      // Ofrecer opciones de proteínas, carbohidratos y vegetales
      set((estado) => ({
        mensajes: [
          ...estado.mensajes,
          {
            id: Date.now(),
            texto: "🔍 Ofreciendo opciones de proteínas, carbohidratos y vegetales para buscar la mejor receta...",
            remitente: 'bot',
          },
        ],
      }));

      // Buscar receta que coincida con el tipo de comida y los ingredientes
      const recetaEncontrada = recetasData.recetas.find((receta) => {
        // Normalizar los ingredientes de la receta
        const ingredientesRecetaNormalizados = receta.ingredientes.map((ingrediente) =>
          ingrediente.toLowerCase()
        );

        // Comparar el tipo de comida y verificar si todos los ingredientes proporcionados están en la receta
        return (
          receta.tipo === tipoComida &&
          ingredientesNormalizados.every((ingrediente) =>
            ingredientesRecetaNormalizados.some((ingredienteReceta) =>
              ingredienteReceta.includes(ingrediente)
            )
          )
        );
      });

      if (recetaEncontrada) {
        set((estado) => ({
          mensajes: [
            ...estado.mensajes.slice(0, -1), // Eliminar el mensaje de "procesando"
            {
              id: Date.now(),
              texto: `🕒 Hora actual: ${hora}:${minutos < 10 ? '0' + minutos : minutos}.

La comida recomendada para esta hora es (${tipoComida}), como recomendación aquí te dejo una receta:

🍽️ *${recetaEncontrada.nombre}* 

📋 *Pasos para prepararla*:

${recetaEncontrada.pasos.map((paso, index) => `${index + 1}. ${paso}`).join('\n')}`,
              remitente: 'bot',
            },
          ],
          intentosFallidos: 0, // Reiniciar los intentos fallidos al encontrar una receta
        }));
      } else {
        set((estado) => {
          const nuevosIntentosFallidos = estado.intentosFallidos + 1;
          let nuevosMensajes: Mensaje[] = [
            ...estado.mensajes.slice(0, -1), // Eliminar el mensaje de "procesando"
            {
              id: Date.now(),
              texto: `🕒 Hora actual: ${hora}:${minutos < 10 ? '0' + minutos : minutos}.

No he encontrado una receta con esos ingredientes para ${tipoComida}. Intenta con otros ingredientes.`,
              remitente: 'bot',
            },
          ];

          // Si ha fallado 2 veces, pasar a un agente
          if (nuevosIntentosFallidos >= 2) {
            nuevosMensajes = [
              ...nuevosMensajes,
              {
                id: Date.now(),
                texto: "🤖 No he podido encontrar una receta con los ingredientes proporcionados en más de 2 ocasiones. ¿Te gustaría intentar nuevamente con otros ingredientes o prefieres que te pase con un asesor para más ayuda?",
                remitente: 'bot',
              },
            ];
          }

          return {
            mensajes: nuevosMensajes,
            intentosFallidos: nuevosIntentosFallidos,
          };
        });
      }
    }, 5000); // Retrasar la respuesta del bot por 5 segundos
  },
}));