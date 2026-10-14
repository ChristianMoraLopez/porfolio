// Los campos con { es, en } se resuelven según el idioma activo (useI18n().l).
export const profile = {
  name: 'Christian Mora',
  fullName: 'Christian Rey Mora López',
  role: { es: 'Desarrollador full stack & de datos', en: 'Full stack & data developer' },
  location: 'Bogotá, Colombia',
  email: 'christianmoralopez@hotmail.com',
  whatsapp: 'https://wa.link/rc84s3',
  github: 'https://github.com/ChristianMoraLopez',
  linkedin: 'https://www.linkedin.com/in/christian-moral/',
  coffee: 'https://buymeacoffee.com/christianmora',
  languages: {
    es: 'Español nativo · Inglés intermedio-avanzado',
    en: 'Native Spanish · Upper-intermediate English',
  },
  // Frases que rotan en el hero con efecto "scramble".
  crafts: {
    es: ['productos web', 'apps de escritorio', 'pipelines de datos', 'IA que corre local'],
    en: ['web products', 'desktop apps', 'data pipelines', 'AI that runs locally'],
  },
  bio: [
    {
      es: 'Soy desarrollador de software en Bogotá, analista de datos y automatización en Capgemini para Circana, y estudiante de octavo semestre de Ingeniería de Software. Me muevo entre el frontend, el backend y los datos: de un e-commerce en producción a apps de escritorio que exploran archivos de más de un gigabyte sin salir del computador.',
      en: "I'm a software developer in Bogotá, a data & automation analyst at Capgemini for Circana, and an eighth-semester Software Engineering student. I move between frontend, backend and data: from a production e-commerce store to desktop apps that explore files over a gigabyte without leaving your computer.",
    },
    {
      es: 'Me obsesiona que las herramientas sean rápidas, privadas y fáciles de usar. Por eso últimamente construyo con Tauri, DuckDB y modelos de IA que corren en local, sin APIs pagas ni datos viajando a la nube.',
      en: "I'm obsessed with tools being fast, private and easy to use. That's why lately I build with Tauri, DuckDB and AI models that run locally, with no paid APIs and no data travelling to the cloud.",
    },
  ],
  stats: [
    { value: 60, suffix: '+', label: { es: 'repositorios en GitHub', en: 'GitHub repositories' } },
    { value: 3, suffix: '+', label: { es: 'años de experiencia profesional', en: 'years of professional experience' } },
    { value: 10, suffix: '+', label: { es: 'sitios y apps en vivo', en: 'live sites and apps' } },
    { value: 423, suffix: '', label: { es: 'pruebas pasando en Luks', en: 'passing tests in Luks' } },
  ],
}

// Experiencia y formación (según el CV más reciente).
export const timeline = [
  {
    period: { es: 'Jul 2025 — hoy', en: 'Jul 2025 — present' },
    title: { es: 'Analista de Datos / Automatización', en: 'Data / Automation Analyst' },
    place: 'Capgemini – Circana',
    detail: {
      es: 'Dashboards con Power BI y SQL Server para reportes automatizados de clientes, pipelines ETL y automatización de procesos. Además, herramientas de escritorio propias (Atlas, Telescope, Kepler, Orbit) con Tauri, Python y DuckDB para explorar y validar datos.',
      en: 'Power BI and SQL Server dashboards for automated client reporting, ETL pipelines and process automation. Plus my own desktop tools (Atlas, Telescope, Kepler, Orbit) built with Tauri, Python and DuckDB to explore and validate data.',
    },
    kind: 'work',
  },
  {
    period: 'Sep 2024 — 2026',
    title: { es: 'Desarrollador Full Stack Junior', en: 'Junior Full Stack Developer' },
    place: 'OET',
    detail: {
      es: 'Módulos backend para datos financieros y lógica de rentabilidad en sistemas contables, SQL optimizado sobre grandes volúmenes (MySQL, SQL Server) e interfaces dinámicas con JavaScript y jQuery bajo MVC en PHP.',
      en: 'Backend modules for financial data and profitability logic in accounting systems, optimized SQL over large volumes (MySQL, SQL Server) and dynamic interfaces with JavaScript and jQuery on a PHP MVC stack.',
    },
    kind: 'work',
  },
  {
    period: 'Oct 2023 — Sep 2024',
    title: { es: 'Representante de Servicio al Cliente (inglés)', en: 'Customer Service Representative (English)' },
    place: 'Amazon',
    detail: {
      es: 'Soporte técnico y de negocio en inglés por chat, teléfono y correo, con seguimiento de incidencias en CRM y propuestas de mejora de procesos.',
      en: 'Technical and business support in English over chat, phone and email, tracking incidents in a CRM and proposing process improvements.',
    },
    kind: 'work',
  },
  {
    period: '2022 — 2027',
    title: { es: 'Ingeniería de Software · 8.º semestre', en: 'Software Engineering · 8th semester' },
    place: 'Fundación Universitaria Compensar',
    detail: {
      es: 'Tecnólogo en Desarrollo de Software titulado en la misma institución. Java, Spring, Hibernate, APIs REST, arquitectura de software y cloud (AWS).',
      en: 'Graduated as a Software Development Technologist from the same institution. Java, Spring, Hibernate, REST APIs, software architecture and cloud (AWS).',
    },
    kind: 'study',
  },
  {
    period: '2022 — 2023',
    title: { es: 'Programa de Desarrollo Frontend', en: 'Frontend Development Program' },
    place: 'Oracle Next Education – Alura LATAM',
    detail: {
      es: 'HTML, CSS, JavaScript, diseño responsivo y UX/UI. Complementado con el curso de Análisis de Datos de Google.',
      en: "HTML, CSS, JavaScript, responsive design and UX/UI. Complemented by Google's Data Analytics course.",
    },
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
    items: ['Node.js', 'FastAPI', 'Spring Boot', 'Laravel', 'Django', 'Ktor', { es: 'APIs REST', en: 'REST APIs' }, 'Docker'],
  },
  {
    title: { es: 'Datos & IA', en: 'Data & AI' },
    icon: 'database',
    items: ['SQL Server', 'PostgreSQL', 'MySQL', 'Power BI', 'ETL', 'DuckDB', 'Pandas', 'Ollama'],
  },
  {
    title: { es: 'Escritorio & móvil', en: 'Desktop & mobile' },
    icon: 'monitor',
    items: ['Tauri v2', 'Rust', 'Kotlin', 'Jetpack Compose', 'Android', 'PWA'],
  },
]
