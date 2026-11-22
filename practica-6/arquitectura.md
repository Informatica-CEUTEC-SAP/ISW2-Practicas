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
El diagrama de contexto delimita la frontera de Patitas como una caja negra frente a sus actores y dependencias externas.
El usuario final interactúa únicamente con la aplicación web mediante HTTPS, mientras que la autenticación, la base de datos (Supabase) y la infraestructura de publicación (Vercel)
se modelan como sistemas externos gestionados, reduciendo la complejidad operativa del producto.

Nivel 2: Diagrama de Contenedores (Containers)
C4Container
  title Diagrama de Contenedores - Patitas
  Person(usuario, "Usuario / Administrador", "Accede desde navegador web o dispositivo móvil.")

  Container_Boundary(c1, "Sistema Patitas") {
    Container(web, "Aplicación Web Frontend", "HTML5, CSS3, JavaScript (ES6)", "Interfaz de usuario (index, login, admin) que aplica SRP y consume el SDK cliente.")
    Container(sw, "Service Worker / PWA", "JavaScript (sw.js)", "Gestiona caché estática y soporte offline básico en el navegador.")
  }

  System_Ext(auth, "Supabase Auth", "Servicio JWT / GoTrue", "Valida credenciales y emite tokens de sesión.")
  System_Ext(db, "Supabase PostgreSQL", "Base de datos relacional + PostgREST", "Almacena tablas de mascotas y políticas de seguridad RLS.")

  Rel(usuario, web, "Navega e interactúa", "HTTPS")
  Rel(web, sw, "Registra y consulta caché")
  Rel(web, auth, "Inicia y verifica sesión", "HTTPS / JSON")
  Rel(web, db, "Lee y escribe registros de mascotas", "HTTPS / REST")

Justificación del Nivel 2
Al abrir el sistema en contenedores desplegables, se separa la capa de presentación estática (servida desde Vercel con soporte PWA mediante sw.js)
de los servicios de identidad y datos en Supabase. Esta separación desacopla el frontend de la infraestructura de base de datos,
facilita el despliegue independiente y permite aplicar seguridad a nivel de fila (RLS) directamente en PostgreSQL.

