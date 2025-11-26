# EXAMEN-FINAL
# Tienda Sony - API RESTful (Examen Parcial)

## 1. Descripción del Proyecto

Este proyecto consiste en el desarrollo de una API RESTful para la gestión de una tienda Sony, permitiendo administrar productos de la marca como televisores, consolas, audífonos y accesorios.

La API permite realizar operaciones CRUD (crear, leer, actualizar y eliminar) sobre los productos, siguiendo una arquitectura cliente–servidor.

El backend fue desarrollado utilizando Node.js y Express, con MongoDB como base de datos.

## 2. Tecnologías Utilizadas

| Componente    | Tecnologías         |
| ------------- | ------------------- |
| Backend       | Node.js             |
| Framework     | Express.js          |
| Base de Datos | MongoDB             |
| ODM           | Mongoose            |
| Configuración | dotenv              |
| Pruebas       | Postman / Navegador |

---

## 3. Instalación y Ejecución del Backend

El backend del proyecto se encuentra en el directorio /backend.

Requisitos Previos

Node.js (versión 18 o superior)

npm

MongoDB Atlas o MongoDB local

### Pasos de Configuración

1.  **Navegar al Directorio Backend:**
    ```bash
    cd backend
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno (`.env`):**
    Crea un archivo `.env` en la raíz del directorio `backend/` con la siguiente estructura, reemplazando los valores con tu configuración de MongoDB Atlas. Recuerda **escapar la contraseña** si contiene caracteres especiales.

    ```dotenv
    PORT=3000
    MONGO_URI="mongodb+srv://usuariopracticajacob:<db_password>@coronadocluster.fzhgplt.mongodb.net/"
    ```

4.  **Iniciar el Servidor (Backend):**
    ```bash
    node server.js
    ```
    El servidor iniciará en `http://localhost:3000`.

---



## 4. Rutas de la API (Endpoints)

Las rutas de la API permiten la gestión completa de los productos de la tienda Sony.

| Método | Ruta                | Descripción                 |
| ------ | ------------------- | --------------------------- |
| GET    | `/api/products`     | Obtener todos los productos |
| GET    | `/api/products/:id` | Obtener un producto por ID  |
| POST   | `/api/products`     | Crear un nuevo producto     |
| PUT    | `/api/products/:id` | Actualizar un producto      |
| DELETE | `/api/products/:id` | Eliminar un producto        |


## 5. Autor

Nombre: JACOB CORONADO

Curso: PROGRAMACION

Universidad: Universidad Tecnica "Luis Vargas Torres"
