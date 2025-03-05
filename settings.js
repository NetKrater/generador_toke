// settings.js

// Detectar si estamos en un entorno de desarrollo o producción
const isDevelopment = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

// Configuración dinámica de la URL del servidor para API y WebSocket
const serverUrl = isDevelopment ? 'http://localhost:4000' : 'https://skytrend.icu';

// Exportar el serverUrl para usarlo en otras partes del proyecto
export { serverUrl };

// Configuración de Socket.IO para WebSocket
const socket = io(serverUrl, {
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
    timeout: 5000,
    autoConnect: true,
    rejectUnauthorized: false
});

socket.on('connect', () => {
    console.log('Conectado al servidor:', serverUrl);
});

socket.on('disconnect', (reason) => {
    console.log('Desconectado del servidor:', reason);
    if (reason === 'io server disconnect') {
        socket.connect(); // Reconectar manualmente si el servidor forzó la desconexión
    }
});

socket.on('reconnect_attempt', (attempt) => {
    console.log(`Intento de reconexión #${attempt}`);
});

socket.on('reconnect_failed', () => {
    console.log('Todos los intentos de reconexión han fallado.');
});

// Configuración de la URL para la API REST
const apiUrl = serverUrl + '/api/historico';

// Exportar la URL para las solicitudes API
export { apiUrl };

// Función para hacer las solicitudes REST usando la URL dinámica
const fetchHistoricalData = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Datos históricos:', data);
    } catch (error) {
        console.error('Error al cargar datos históricos:', error);
    }
};

// Exportar la función si necesitas hacer las solicitudes API en otros archivos
export { fetchHistoricalData };