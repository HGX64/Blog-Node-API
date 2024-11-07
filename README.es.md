# API del Blog

Una API simple y poderosa para Blog construida con Node.js, Express y MongoDB. Esta API proporciona autenticación, gestión de usuarios y creación de publicaciones, lo que te permite crear una plataforma de blog moderna.

**Idiomas disponibles:**
- [🇪🇸 Español](./README.es.md)
- 🇺🇸 English (esta versión)

---

## 🛠️ Dependencias

Para ejecutar este proyecto, necesitas tener Docker y Docker Compose instalados. Puedes instalarlos usando los siguientes comandos dependiendo de tu sistema operativo:

### Debian/Ubuntu

```bash
sudo apt install docker docker-compose
```

### Arch Linux

```bash
sudo pacman -S docker docker-compose
```

---

## 📥 Clonar el Repositorio

Clona este repositorio en tu máquina local usando Git:

```bash
git clone https://github.com/HGX64/Blog-Express-API
```

---

## 📝 Configuración de Variables de Entorno

Antes de ejecutar la API, crea un archivo `.env` en el directorio raíz del proyecto con los siguientes valores:

```env
NODE_ENV=development                 # Establece el entorno (desarrollo, producción, etc.)
PORT=3000                            # Puerto de la API (el valor por defecto es 3000)
JWT_SECRET=very_long_secret_key      # Clave secreta para la generación de tokens JWT
JWT_EXPIRE=30d                        # Tiempo de expiración de los tokens JWT
EMAIL_SERVICE=gmail                   # Servicio de correo para el envío de correos (por ejemplo, Gmail, SendGrid)
EMAIL_USERNAME=your@gmail.com        # Nombre de usuario de la cuenta de correo
EMAIL_PASSWORD=your_password         # Contraseña de la cuenta de correo o contraseña de la aplicación
FRONTEND_URL="http://localhost:3000"  # URL del frontend (si es aplicable)
MONGO_DATABASE=blog                  # Nombre de la base de datos en MongoDB
MONGO_USER=admin                     # Usuario de MongoDB
MONGO_PASSWORD=your_secure_password  # Contraseña de MongoDB
MONGO_HOST=localhost                 # Host de MongoDB (el valor por defecto es localhost)
MONGO_PORT=27017                     # Puerto de MongoDB (el valor por defecto es 27017)
```

Asegúrate de reemplazar los valores de los marcadores de posición por tus credenciales e información reales.

---

## 🚀 Ejecutando la API

Para iniciar la API, sigue estos pasos:

1. Haz que el script `start.sh` sea ejecutable:
    ```bash
    chmod +x start.sh
    ```

2. Ejecuta el script para iniciar la API:
    ```bash
    ./start.sh
    ```

Esto iniciará el servidor, y la API será accesible en el puerto definido en tu archivo `.env` (el valor por defecto es `3000`).

---

## 📡 Endpoints de la API

### Autenticación

El sistema de autenticación incluye funcionalidades para iniciar sesión, registrar usuarios y refrescar los tokens JWT. Todos los endpoints relacionados con la autenticación están asegurados utilizando JWT.

![API de Autenticación](assets/api_auth_docs.png)

---

### Publicaciones

Crea, lee, actualiza y elimina publicaciones de blog a través de los endpoints `/posts`. El sistema soporta formato Markdown y permite a los usuarios interactuar con las publicaciones mediante la API.

![API de Publicaciones](assets/api_posts_docs.png)

---

### Usuarios

Gestiona las cuentas de usuario, incluyendo el registro, la actualización de los detalles del perfil y la visualización de la información de los usuarios.

![API de Usuarios](assets/api_users_docs.png)

---

## 🍪 Extras

### Cookies

La API soporta el uso de cookies para las sesiones de usuario y la autenticación.

![GIF de Cookies](assets/api_cookies.gif)

---

### Carga de Archivos

La API permite a los usuarios subir archivos (por ejemplo, imágenes) al servidor, con soporte para diferentes tipos de archivos y límites de tamaño.

![GIF de Carga de Archivos](assets/api_upload.gif)

---

## 💡 Información Adicional

Para más detalles o si encuentras algún problema, no dudes en abrir un problema en la [página de Issues de GitHub](https://github.com/HGX64/Blog-Express-API/issues).

---

**¡Feliz codificación!** 🚀
