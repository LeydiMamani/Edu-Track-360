# EduTrack 360 🎓

Sistema de Gestión Educativa moderno y eficiente para instituciones educativas.

## Características ✨

- **Panel de Administración**
  - Gestión de usuarios (administradores, docentes, estudiantes)
  - Estadísticas en tiempo real
  - Registro de actividades
  - Gestión de cursos

- **Interfaz Moderna**
  - Diseño responsivo
  - Temas modernos con gradientes
  - Animaciones suaves
  - Experiencia de usuario optimizada

- **Seguridad**
  - Autenticación segura
  - Roles y permisos
  - Protección de rutas
  - Manejo de sesiones

## Tecnologías Utilizadas 🛠️

- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript)
- Bootstrap 5
- Font Awesome
- SweetAlert2
- DataTables

## Requisitos Previos 📋

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación 🚀

1. Clonar el repositorio:
```bash
git clone https://github.com/LeydiMamani/Edu-Track-360.git
```

2. Instalar dependencias:
```bash
cd EduTrack-360
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto:
```env
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
SESSION_SECRET=tu_secreto
```

4. Iniciar la aplicación:
```bash
npm start
```

## Estructura del Proyecto 📁

```
src/
├── api/
│   ├── controllers/
│   └── routes/
├── config/
├── middleware/
├── models/
├── public/
├── views/
└── app.js
```

## Roles de Usuario 👥

- **Administrador**: Gestión completa del sistema
- **Docente**: Gestión de cursos y calificaciones
- **Estudiante**: Acceso a cursos y calificaciones

## Contribuir 🤝

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia 📄

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Autor ✒️

* **Leydi Mamani** - *Desarrollo Inicial* - [LeydiMamani](https://github.com/LeydiMamani)

## Agradecimientos 🎁

* A todos los que contribuyen al proyecto
* A la comunidad de desarrolladores
* A los usuarios que confían en EduTrack 360 