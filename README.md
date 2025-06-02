# EduTrack360 - Sistema de Gestión Educativa

Sistema de gestión educativa completo con manejo de roles y permisos, desarrollado con Node.js, Express, MongoDB y EJS.

## Características Principales

- Sistema de autenticación y autorización basado en roles
- Gestión de usuarios (Administradores, Directores, Profesores, Estudiantes, Padres)
- Gestión de cursos y materias
- Sistema de calificaciones
- Gestión de asistencia
- Reportes y estadísticas
- Interfaz responsive con Bootstrap
- Diseño modular y escalable

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd edutrack360
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo .env en la raíz del proyecto:
```env
MONGODB_URI=mongodb+srv://admin:admin.123@cluster0.xsi2hdp.mongodb.net/ProEduDB?retryWrites=true&w=majority
PORT=3000
SESSION_SECRET=tu_secreto_aqui
```

4. Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
edutrack360/
├── src/
│   ├── app.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── views/
│   │   ├── layouts/
│   │   ├── partials/
│   │   └── pages/
│   └── public/
│       ├── css/
│       ├── js/
│       └── images/
├── tests/
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Roles y Permisos

### Administrador
- Gestión completa del sistema
- Creación y gestión de usuarios
- Configuración general

### Director/Coordinador
- Gestión académica
- Supervisión de profesores
- Reportes académicos

### Profesor
- Gestión de calificaciones
- Registro de asistencia
- Comunicación con estudiantes y padres

### Estudiante
- Visualización de calificaciones
- Acceso a material educativo
- Entrega de tareas

### Padre/Representante
- Seguimiento del progreso
- Comunicación con profesores
- Visualización de calificaciones

## Desarrollo

Para contribuir al proyecto:

1. Crear una rama para la nueva característica:
```bash
git checkout -b feature/nueva-caracteristica
```

2. Realizar cambios y commit:
```bash
git add .
git commit -m "Descripción de los cambios"
```

3. Subir cambios y crear pull request:
```bash
git push origin feature/nueva-caracteristica
```

## Scripts Disponibles

- `npm start`: Inicia el servidor en modo producción
- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon
- `npm test`: Ejecuta las pruebas

## Licencia

ISC

## Soporte

Para soporte o preguntas, por favor crear un issue en el repositorio. 