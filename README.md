# Sistema Web Bancario

Este proyecto consiste en el desarrollo de un sistema web bancario orientado a la gestión de cuentas, transferencias, préstamos y pagos. La solución fue desarrollada como parte del curso de Ingeniería de Software, aplicando buenas prácticas de desarrollo, control de versiones, integración continua, despliegue continuo y pruebas automatizadas.

El sistema permite administrar usuarios, consultar cuentas bancarias, realizar transferencias entre cuentas, registrar solicitudes de préstamos, aprobar o rechazar dichas solicitudes desde un perfil administrativo, gestionar pagos de préstamos y consultar reportes generales del sistema. La aplicación se divide en dos componentes principales: un frontend desarrollado con React y Vite, y un backend desarrollado en .NET, conectado a una base de datos PostgreSQL.

## Tecnologías utilizadas

### Frontend
- React
- Vite
- JavaScript
- CSS
- React Router DOM
- Vitest
- React Testing Library
- ESLint
- Vercel

### Backend
- .NET
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- Swagger
- Azure App Service

### DevOps
- Git
- GitHub
- GitHub Actions
- CI/CD
- Vercel
- Azure App Service

## Arquitectura general

El frontend consume los servicios expuestos por el backend mediante peticiones HTTP hacia una API REST publicada en Azure App Service. La URL base del backend se administra mediante variables de entorno, lo que permite separar la configuración del código fuente y facilitar el despliegue en diferentes ambientes.

La base de datos PostgreSQL también se encuentra publicada en Azure, permitiendo que el backend desplegado pueda almacenar y consultar información de usuarios, cuentas, transferencias, préstamos, cuotas y pagos.

## Funcionalidades principales

- Panel principal del sistema
- Consulta de cuentas bancarias
- Registro y consulta de transferencias
- Solicitud de préstamos
- Administración de solicitudes de préstamo
- Aprobación y rechazo de préstamos
- Consulta de préstamos activos
- Registro de pagos de préstamo
- Gestión de usuarios
- Reportes administrativos
- Consumo de API REST desde el frontend

## CI/CD

El proyecto cuenta con pipelines de integración y despliegue continuo configurados mediante GitHub Actions. Estos pipelines permiten validar automáticamente el código antes de integrar cambios a las ramas principales del repositorio.

El flujo automatizado incluye etapas de:

- Instalación de dependencias
- Análisis estático del código
- Ejecución de pruebas unitarias
- Generación de cobertura
- Construcción del proyecto
- Despliegue del frontend en Vercel
- Despliegue del backend en Azure App Service

El frontend se despliega automáticamente en Vercel, mientras que el backend desarrollado en .NET se encuentra publicado en Azure App Service. Esta configuración permite que el sistema esté disponible en internet y pueda ser consumido desde cualquier navegador.

## Pruebas

El frontend utiliza Vitest y React Testing Library para la ejecución de pruebas unitarias. Estas pruebas permiten validar el correcto funcionamiento de los componentes principales de la aplicación. Además, se genera un reporte de cobertura como evidencia del alcance de las pruebas implementadas.

El backend también sigue la misma lógica de validación mediante pruebas unitarias, compilación automática y ejecución dentro del pipeline de CI/CD.

## Despliegue

- Frontend: Vercel
- Backend: Azure App Service
- Base de datos: PostgreSQL en Azure

## Objetivo del proyecto

El objetivo principal del sistema es demostrar la implementación de una solución web bancaria funcional, aplicando principios de ingeniería de software, arquitectura cliente-servidor, consumo de APIs, persistencia de datos, pruebas automatizadas y prácticas DevOps mediante integración y despliegue continuo.

## Equipo de desarrollo

Proyecto desarrollado con fines académicos para el curso de Ingeniería de Software.