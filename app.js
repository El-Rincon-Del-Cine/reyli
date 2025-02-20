if ('Notification' in window && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            // Registrar el Service Worker
            const registration = await navigator.serviceWorker.register('/ws.js');
            console.log('Service Worker registrado con éxito', registration.scope);

            // Solicitar permiso para notificaciones
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Permiso de notificación concedido');
            } else {
                console.log('Permiso de notificación denegado');
            }
        } catch (error) {
            console.error('Error al registrar el Service Worker o solicitar notificaciones:', error);
        }
    });
}
