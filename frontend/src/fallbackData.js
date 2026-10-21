const projects = [
  {
    id: 1,
    title: 'Physics-Informed Gearbox Fault Diagnosis & Digital Twin',
    slug: 'pinn-gearbox-digital-twin',
    description:
      'Physics-informed neural network for gearbox fault diagnosis with a real-time digital twin dashboard (MSc thesis research).',
    long_description:
      'Designed a physics-informed neural network (PINN) achieving 99.26% accuracy and 0.99 ROC-AUC on simulated gearbox vibration data, using an 18-dimensional physics-informed feature set. Built a real-time digital twin dashboard using Flask, JavaScript, and WebSockets integrated with a Unity 3D simulation for live fault visualization. Co-authoring findings for submission to IOP Measurement Science and Technology.',
    technologies: [
      'Python',
      'TensorFlow',
      'Physics-Informed Neural Networks',
      'Flask',
      'JavaScript',
      'WebSockets',
      'Unity 3D',
    ],
    github_url: '',
    live_url: '',
    image: '',
    gallery: [
      '/ai-interactive-portfolio/msc_img_02.png',
      '/ai-interactive-portfolio/msc_img_01.png',
      '/ai-interactive-portfolio/msc_vid_01.mp4',
      '/ai-interactive-portfolio/msc_vid_02.mp4',
    ],
    start_date: null,
    end_date: null,
    featured: true,
  },
  {
    id: 2,
    title: 'Sign Language Detection App',
    slug: 'sign-language-detection-app',
    description:
      'Real-time sign language detection mobile app built with a custom-trained YOLOv5 model.',
    long_description:
      'Built a real-time sign language detection app using a custom-trained YOLOv5 model in Android Studio. Created a multilingual sign dictionary as an in-app reference tool. Findings featured in academic research on computer vision.',
    technologies: [
      'Android Studio',
      'YOLOv5',
      'Python',
      'Computer Vision',
      'Deep Learning',
      'PyCharm',
    ],
    github_url: '',
    live_url: '',
    image: '',
    gallery: [
      '/ai-interactive-portfolio/bsc_img_8.jpeg',
      '/ai-interactive-portfolio/bsc_img_9.jpeg',
      '/ai-interactive-portfolio/bsc_img_7.jpeg',
      '/ai-interactive-portfolio/bsc_img_6.jpeg',
      '/ai-interactive-portfolio/bsc_img_5.jpeg',
      '/ai-interactive-portfolio/bsc_img_3.jpeg',
      '/ai-interactive-portfolio/bsc_img_2.jpeg',
      '/ai-interactive-portfolio/bsc_img_1.jpeg',
      '/ai-interactive-portfolio/bsc_img_4.jpeg',
      '/ai-interactive-portfolio/bsc_img_vid.mp4',
    ],
    start_date: null,
    end_date: null,
    featured: false,
  },
]

const skills = [
  { id: 1, name: 'Python', category: 'Programming', proficiency: 90 },
  { id: 2, name: 'Java', category: 'Programming', proficiency: 75 },
  { id: 3, name: 'C', category: 'Programming', proficiency: 60 },
  { id: 4, name: 'C++', category: 'Programming', proficiency: 30 },
  { id: 11, name: 'JavaScript', category: 'Programming', proficiency: 30 },
  { id: 6, name: 'TensorFlow', category: 'AI/ML', proficiency: 85 },
  { id: 7, name: 'Physics-Informed Neural Networks', category: 'AI/ML', proficiency: 80 },
  { id: 8, name: 'Computer Vision', category: 'AI/ML', proficiency: 80 },
  { id: 9, name: 'Data Analysis', category: 'AI/ML', proficiency: 85 },
  { id: 10, name: 'YOLOv5', category: 'AI/ML', proficiency: 75 },
  { id: 11, name: 'React', category: 'Frontend', proficiency: 30 },
  { id: 12, name: 'HTML', category: 'Frontend', proficiency: 85 },
  { id: 13, name: 'CSS', category: 'Frontend', proficiency: 80 },
  { id: 14, name: 'Tailwind CSS', category: 'Frontend', proficiency: 75 },
  { id: 15, name: 'WebSockets', category: 'Backend', proficiency: 75 },
  { id: 16, name: 'Odoo', category: 'Backend', proficiency: 80 },
  { id: 17, name: 'MySQL', category: 'Databases', proficiency: 60 },
  { id: 18, name: 'PgAdmin', category: 'Databases', proficiency: 88 },
  { id: 19, name: 'PostgreSQL', category: 'Databases', proficiency: 55 },
  { id: 20, name: 'Flask', category: 'Backend', proficiency: 80 },
  { id: 21, name: 'Google Colab', category: 'Tools', proficiency: 85 },
  { id: 22, name: 'Figma', category: 'Tools', proficiency: 70 },
  { id: 23, name: 'Unity', category: 'Tools', proficiency: 65 },
]

const publications = [
  {
    id: 1,
    title: 'Study and Analysis of Deep Learning Models for the Recognition of Sign Language',
    authors: 'Azim, N., Afrin Jamema, S., and Sultana, N.',
    venue: 'Medicon Engineering Theme, 6(1), 22-32',
    year: 2024,
    abstract: '',
    publication_url: '',
    doi: '',
  },
]

const research = [
  {
    id: 1,
    title: 'Physics-Informed Gearbox Fault Diagnosis & Digital Twin',
    description:
      'MSc thesis research combining physics-informed neural networks with digital twin technology for real-time gearbox fault diagnosis.',
    methodology:
      '18-dimensional physics-informed feature extraction, PINN architecture, simulated gearbox vibration data, real-time digital twin dashboard with WebSockets and Unity 3D.',
    technologies: ['Python', 'TensorFlow', 'PINN', 'Flask', 'WebSockets', 'Unity'],
    status: 'Completed',
    publication_url: '',
  },
  {
    id: 2,
    title: 'Computer Vision for Sign Language Recognition',
    description:
      'Academic research on real-time sign language detection using YOLOv5, featured in research on computer vision applications.',
    methodology:
      'Custom-trained YOLOv5 object detection model, Android application development, multilingual sign dictionary.',
    technologies: ['YOLOv5', 'Android Studio', 'Computer Vision'],
    status: 'Completed',
    publication_url: '',
  },
]

const timeline = [
  {
    id: 1,
    title: 'Software Engineer',
    organization: 'Unisoft Systems Limited',
    description:
      'Designed, developed and maintained software modules using the Odoo framework for international and local clients. Collaborated with cross-functional teams to deliver features from requirements through deployment.',
    start_date: '2024-09-01',
    end_date: '2026-08-31',
    item_type: 'work',
  },
  {
    id: 2,
    title: 'Teacher, Mathematics & Computer Science',
    organization: 'Radius International School',
    description:
      'Taught Mathematics and Computer Science (Python) to primary-level students. Provided private STEM tutoring, tailoring instruction to individual student needs.',
    start_date: '2023-03-01',
    end_date: '2024-06-30',
    item_type: 'work',
  },
  {
    id: 3,
    title: 'MSc in Computer Science & Engineering (Data Science)',
    organization: 'Daffodil International University',
    description:
      'Specialization in Data Science. Research on physics-informed machine learning and digital twins.',
    start_date: '2025-01-01',
    end_date: '2026-04-01',
    item_type: 'education',
  },
  {
    id: 4,
    title: 'BSc in Computer Science & Engineering',
    organization: 'Daffodil International University',
    description: 'Graduated in the Top 2% of the class.',
    start_date: '2018-01-01',
    end_date: '2022-12-31',
    item_type: 'education',
  },
]

const clone = (value) => JSON.parse(JSON.stringify(value))

export const fallbackProjects = () => clone(projects)
export const fallbackProjectBySlug = (slug) =>
  clone(projects.find((p) => p.slug === slug) || null)
export const fallbackSkills = () => clone(skills)
export const fallbackPublications = () => clone(publications)
export const fallbackResearch = () => clone(research)
export const fallbackTimeline = () => clone(timeline)
