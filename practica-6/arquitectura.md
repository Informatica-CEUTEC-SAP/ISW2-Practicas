# Arquitectura del Sistema — Patitas (Modelo C4)

## Nivel 1: Diagrama de Contexto (System Context)

```mermaid
C4Context
  title Diagrama de Contexto - Plataforma Web Patitas
  Person(dueno, "Dueño de Mascota / Admin", "Registra mascotas, consulta historiales de vacunas y gestiona citas desde el navegador.")
  System(patitas, "Patitas Web App", "Sistema web de gestión veterinaria y recordatorios desplegado en patitas.website.")
  System_Ext(supabase, "Supabase (Auth + PostgreSQL)", "Servicio externo en la nube para autenticación de usuarios y persistencia relacional.")
  System_Ext(vercel, "Vercel Edge Network", "Plataforma externa de alojamiento web continuo y distribución HTTPS.")

  Rel(dueno, patitas, "Gestiona mascotas y citas vía HTTPS")
  Rel(patitas, supabase, "Autentica sesiones y ejecuta consultas SQL")
  Rel(patitas, vercel, "Se aloja y distribuye en")

Justificación del Nivel 1
El diagrama de contexto delimita la frontera de Patitas como una caja negra frente a sus actores y dependencias externas. El usuario final interactúa únicamente con la aplicación web mediante HTTPS, mientras que la autenticación, la base de datos (Supabase) y la infraestructura de publicación (Vercel) se modelan como sistemas externos gestionados, reduciendo la complejidad operativa del producto.

flowchart TB
  usuario["Usuario / Administrador<br/>(Navegador Web)"]
  subgraph Patitas ["Sistema Patitas (patitas.website)"]
    web["Aplicación Web Frontend<br/>[HTML5, CSS3, JavaScript]"]
    sw["Service Worker / PWA<br/>[sw.js]"]
  end
  auth[("Supabase Auth<br/>[Servicio JWT]")]
  db[("Supabase PostgreSQL<br/>[Base de datos + RLS]")]

  usuario -->|HTTPS| web
  web -->|Caché offline| sw
  web -->|Valida sesión| auth
  web -->|CRUD mascotas via REST| db

Justificación del Nivel 2
Al abrir el sistema en contenedores desplegables, se separa la capa de presentación estática (servida desde Vercel con soporte PWA mediante sw.js) de los servicios de identidad y datos en Supabase. Esta separación desacopla el frontend de la infraestructura de base de datos, facilita el despliegue independiente y permite aplicar seguridad a nivel de fila (RLS) directamente en PostgreSQL.
