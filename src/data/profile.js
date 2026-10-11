export const profile = {
  name: 'Christian Mora',
  fullName: 'Christian Rey Mora López',
  role: 'Desarrollador full stack & de datos',
  location: 'Bogotá, Colombia',
  email: 'christianmoralopez@hotmail.com',
  whatsapp: 'https://wa.link/rc84s3',
  github: 'https://github.com/ChristianMoraLopez',
  linkedin: 'https://www.linkedin.com/in/christian-mora-lopez/',
  coffee: 'https://buymeacoffee.com/christianmora',
  languages: 'Español nativo · Inglés intermedio-avanzado',
  // Frases que rotan en el hero con efecto "scramble".
  crafts: ['productos web', 'apps de escritorio', 'pipelines de datos', 'IA que corre local'],
  bio: [
    'Soy desarrollador de software en Bogotá, analista de datos y automatización en Capgemini para Circana, y estudiante de octavo semestre de Ingeniería de Software. Me muevo entre el frontend, el backend y los datos: de un e-commerce en producción a apps de escritorio que exploran archivos de más de un gigabyte sin salir del computador.',
    'Me obsesiona que las herramientas sean rápidas, privadas y fáciles de usar. Por eso últimamente construyo con Tauri, DuckDB y modelos de IA que corren en local, sin APIs pagas ni datos viajando a la nube.',
  ],
  stats: [
    { value: 60, suffix: '+', label: 'repositorios en GitHub' },
    { value: 3, suffix: '+', label: 'años de experiencia profesional' },
    { value: 10, suffix: '+', label: 'sitios y apps en vivo' },
    { value: 423, suffix: '', label: 'pruebas pasando en Luks' },
  ],
}

// Experiencia y formación (según el CV más reciente).
export const timeline = [
  {
    period: 'Jul 2025 — hoy',
    title: 'Analista de Datos / Automatización',
    place: 'Capgemini – Circana',
    detail:
      'Dashboards con Power BI y SQL Server para reportes automatizados de clientes, pipelines ETL y automatización de procesos. Además, herramientas de escritorio propias (Atlas, Telescope, Kepler, Orbit) con Tauri, Python y DuckDB para explorar y validar datos.',
    kind: 'work',
  },
  {
    period: 'Sep 2024 — 2026',
    title: 'Desarrollador Full Stack Junior',
    place: 'OET',
    detail:
      'Módulos backend para datos financieros y lógica de rentabilidad en sistemas contables, SQL optimizado sobre grandes volúmenes (MySQL, SQL Server) e interfaces dinámicas con JavaScript y jQuery bajo MVC en PHP.',
    kind: 'work',
  },
  {
    period: 'Oct 2023 — Sep 2024',
    title: 'Representante de Servicio al Cliente (inglés)',
    place: 'Amazon',
    detail:
      'Soporte técnico y de negocio en inglés por chat, teléfono y correo, con seguimiento de incidencias en CRM y propuestas de mejora de procesos.',
    kind: 'work',
  },
  {
    period: '2022 — 2027',
    title: 'Ingeniería de Software · 8.º semestre',
    place: 'Fundación Universitaria Compensar',
    detail:
      'Tecnólogo en Desarrollo de Software titulado en la misma institución. Java, Spring, Hibernate, APIs REST, arquitectura de software y cloud (AWS).',
    kind: 'study',
  },
  {
    period: '2022 — 2023',
    title: 'Programa de Desarrollo Frontend',
    place: 'Oracle Next Education – Alura LATAM',
    detail: 'HTML, CSS, JavaScript, diseño responsivo y UX/UI. Complementado con el curso de Análisis de Datos de Google.',
    kind: 'study',
  },
]

export const skillGroups = [
  {
    title: 'Frontend',
    icon: 'layers',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Motion', 'GSAP', 'jQuery'],
  },
  {
    title: 'Backend',
    icon: 'server',
    items: ['Node.js', 'FastAPI', 'Spring Boot', 'Laravel', 'Django', 'Ktor', 'APIs REST', 'Docker'],
  },
  {
    title: 'Datos & IA',
    icon: 'database',
    items: ['SQL Server', 'PostgreSQL', 'MySQL', 'Power BI', 'ETL', 'DuckDB', 'Pandas', 'Ollama'],
  },
  {
    title: 'Escritorio & móvil',
    icon: 'monitor',
    items: ['Tauri v2', 'Rust', 'Kotlin', 'Jetpack Compose', 'Android', 'PWA'],
  },
]
