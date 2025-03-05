// logout.js - Manejo de cierre de sesión

function logout() {
    localStorage.removeItem("authToken"); // Eliminar el token guardado en el almacenamiento local
    localStorage.removeItem("tokenExpiration"); // Eliminar la fecha de expiración del token
    window.location.href = "index.html"; // Redirigir a la página de inicio
}

// Exportar la función para su uso en otros archivos
export { logout };