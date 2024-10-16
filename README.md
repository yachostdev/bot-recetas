# Bot de Recetas de Cocina Colombiana

## Descripción del Proyecto

Este proyecto es un bot de recetas de cocina. Su propósito es sugerir recetas basadas en los ingredientes proporcionados por el usuario, y ajustarlas de acuerdo a la hora del día (desayuno, almuerzo o cena). Utiliza ingredientes típicos de una alacena colombiana y está diseñado para ofrecer una experiencia amigable para aquellos que desean preparar platos típicos de manera sencilla.

### Características del Bot
- **Interacción con el Usuario**: El bot pide al usuario que ingrese 3 ingredientes, luego sugiere una receta apropiada.
- **Recetas basadas en la Hora del Día**: El bot decide si sugerir recetas de desayuno, almuerzo o cena en función de la hora actual.
- **Gestión del Estado con Zustand**: Se utiliza Zustand para manejar el estado del chat y los intentos fallidos.
- **Asistencia Adicional**: Si el bot no encuentra una receta adecuada en más de dos intentos, ofrece la opción de ser transferido a un asesor.

## Tecnologías Utilizadas
- **React** (con **TypeScript**) para el desarrollo del frontend.
- **Zustand** para la gestión del estado del chat.
- **JSON** como base de datos para almacenar recetas.
- **Tailwind CSS** para el diseño de la interfaz del usuario.

## Clonación e Instalación del Proyecto

Para clonar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

### 1. Clonar el Repositorio
```bash
$ git clone https://github.com/yachostdev/bot-recetas
$ cd bot-recetas
```

### 2. Instalar Dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
```bash
$ npm install
```

### 3. Ejecutar el Proyecto
Para ejecutar el proyecto localmente:
```bash
$ npm run dev
```
Esto ejecutará una instancia de desarrollo del bot, que podrás ver accediendo a `http://localhost:3000` en tu navegador.

## Estructura del Proyecto
- **/src**: Contiene todos los archivos de código fuente del bot, incluyendo componentes de React y gestión del estado.
- **/data/recetas.json**: Archivo JSON con la base de datos de recetas, que se consulta para ofrecer sugerencias de comidas.
- **/store/chatStore.ts**: Implementación de Zustand para gestionar el estado del chat y manejar los intentos fallidos.

## Cómo Funciona el Bot
1. El usuario ingresa 3 ingredientes típicos colombianos.
2. El bot verifica la hora del día y sugiere una receta correspondiente (desayuno, almuerzo o cena).
3. Si el bot no encuentra una receta adecuada tras 3 intentos, se sugiere la transferencia a un asesor.


