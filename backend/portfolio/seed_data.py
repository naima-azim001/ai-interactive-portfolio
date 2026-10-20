from portfolio.models import (
    Project, Skill, Publication, Research,
    TimelineItem, Education
)


def seed_projects():
    projects = [
        {
            'title': 'Physics-Informed Gearbox Fault Diagnosis & Digital Twin',
            'slug': 'pinn-gearbox-digital-twin',
            'description': 'Physics-informed neural network for gearbox fault diagnosis with a real-time digital twin dashboard (MSc thesis research).',
            'long_description': 'Designed a physics-informed neural network (PINN) achieving 99.26% accuracy and 0.99 ROC-AUC on simulated gearbox vibration data, using an 18-dimensional physics-informed feature set. Built a real-time digital twin dashboard using Flask, JavaScript, and WebSockets integrated with a Unity 3D simulation for live fault visualization. Co-authoring findings for submission to IOP Measurement Science and Technology.',
            'technologies': ['Python', 'TensorFlow', 'Physics-Informed Neural Networks', 'Flask', 'JavaScript', 'WebSockets', 'Unity 3D'],
            'live_url': '',
            'featured': True,
            'approved': True,
        },
        {
            'title': 'Sign Language Detection App',
            'slug': 'sign-language-detection-app',
            'description': 'Real-time sign language detection mobile app built with a custom-trained YOLOv5 model.',
            'long_description': 'Built a real-time sign language detection app using a custom-trained YOLOv5 model in Android Studio. Created a multilingual sign dictionary as an in-app reference tool. Findings featured in academic research on computer vision.',
            'technologies': ['Android Studio', 'YOLOv5', 'Python', 'Computer Vision', 'Deep Learning', 'PyCharm'],
            'live_url': '',
            'featured': False,
            'approved': True,
        },
    ]
    for p in projects:
        Project.objects.get_or_create(slug=p['slug'], defaults=p)


def seed_skills():
    skills = [
        {'name': 'Python', 'category': 'Programming', 'proficiency': 90},
        {'name': 'Java', 'category': 'Programming', 'proficiency': 75},
        {'name': 'C', 'category': 'Programming', 'proficiency': 60},
        {'name': 'C++', 'category': 'Programming', 'proficiency': 30},
        {'name': 'JavaScript', 'category': 'Programming', 'proficiency': 30},
        {'name': 'TensorFlow', 'category': 'AI/ML', 'proficiency': 85},
        {'name': 'Physics-Informed Neural Networks', 'category': 'AI/ML', 'proficiency': 80},
        {'name': 'Computer Vision', 'category': 'AI/ML', 'proficiency': 80},
        {'name': 'Data Analysis', 'category': 'AI/ML', 'proficiency': 85},
        {'name': 'YOLOv5', 'category': 'AI/ML', 'proficiency': 75},
        {'name': 'React', 'category': 'Frontend', 'proficiency': 30},
        {'name': 'HTML', 'category': 'Frontend', 'proficiency': 85},
        {'name': 'CSS', 'category': 'Frontend', 'proficiency': 80},
        {'name': 'Tailwind CSS', 'category': 'Frontend', 'proficiency': 75},
        {'name': 'WebSockets', 'category': 'Backend', 'proficiency': 75},
        {'name': 'Odoo', 'category': 'Backend', 'proficiency': 80},
        {'name': 'MySQL', 'category': 'Databases', 'proficiency': 60},
        {'name': 'PgAdmin', 'category': 'Databases', 'proficiency': 88},
        {'name': 'PostgreSQL', 'category': 'Databases', 'proficiency': 55},
        {'name': 'Flask', 'category': 'Backend', 'proficiency': 80},
        {'name': 'Google Colab', 'category': 'Tools', 'proficiency': 85},
        {'name': 'Figma', 'category': 'Tools', 'proficiency': 70},
        {'name': 'Unity', 'category': 'Tools', 'proficiency': 65},
    ]
    for s in skills:
        Skill.objects.get_or_create(name=s['name'], defaults=s)


def seed_publications():
    pubs = [
        {
            'title': 'Study and Analysis of Deep Learning Models for the Recognition of Sign Language',
            'authors': 'Azim, N., Afrin Jamema, S., and Sultana, N.',
            'venue': 'Medicon Engineering Theme, 6(1), 22-32',
            'year': 2024,
            'abstract': '',
            'approved': True,
        },
    ]
    for p in pubs:
        Publication.objects.get_or_create(title=p['title'], defaults=p)


def seed_research():
    research_items = [
        {
            'title': 'Physics-Informed Gearbox Fault Diagnosis & Digital Twin',
            'description': 'MSc thesis research combining physics-informed neural networks with digital twin technology for real-time gearbox fault diagnosis.',
            'methodology': '18-dimensional physics-informed feature extraction, PINN architecture, simulated gearbox vibration data, real-time digital twin dashboard with WebSockets and Unity 3D.',
            'technologies': ['Python', 'TensorFlow', 'PINN', 'Flask', 'WebSockets', 'Unity'],
            'status': 'Ongoing',
            'approved': True,
        },
        {
            'title': 'Computer Vision for Sign Language Recognition',
            'description': 'Academic research on real-time sign language detection using YOLOv5, featured in research on computer vision applications.',
            'methodology': 'Custom-trained YOLOv5 object detection model, Android application development, multilingual sign dictionary.',
            'technologies': ['YOLOv5', 'Android Studio', 'Computer Vision'],
            'status': 'Completed',
            'approved': True,
        },
    ]
    for r in research_items:
        Research.objects.get_or_create(title=r['title'], defaults=r)


def seed_timeline():
    items = [
        {
            'title': 'Software Engineer',
            'organization': 'Unisoft Systems Limited',
            'description': 'Designed, developed and maintained software modules using the Odoo framework for international and local clients. Collaborated with cross-functional teams to deliver features from requirements through deployment.',
            'start_date': '2024-09-01',
            'end_date': '2026-08-31',
            'item_type': 'work',
            'approved': True,
        },
        {
            'title': 'Teacher, Mathematics & Computer Science',
            'organization': 'Radius International School',
            'description': 'Taught Mathematics and Computer Science (Python) to primary-level students. Provided private STEM tutoring, tailoring instruction to individual student needs.',
            'start_date': '2023-03-01',
            'end_date': '2024-06-30',
            'item_type': 'work',
            'approved': True,
        },
        {
            'title': 'MSc in Computer Science & Engineering (Data Science)',
            'organization': 'Daffodil International University',
            'description': 'Specialization in Data Science. Research on physics-informed machine learning and digital twins.',
            'start_date': '2025-01-01',
            'end_date': '2026-04-01',
            'item_type': 'education',
            'approved': True,
        },
        {
            'title': 'BSc in Computer Science & Engineering',
            'organization': 'Daffodil International University',
            'description': 'Graduated in the Top 2% of the class.',
            'start_date': '2018-01-01',
            'end_date': '2022-12-31',
            'item_type': 'education',
            'approved': True,
        },
    ]
    for item in items:
        TimelineItem.objects.get_or_create(
            title=item['title'],
            organization=item['organization'],
            defaults=item,
        )


def seed_education():
    education = [
        {
            'degree': 'MSc in Computer Science & Engineering',
            'institution': 'Daffodil International University, Bangladesh',
            'field': 'Data Science',
            'description': 'Specialized in Data Science with research in physics-informed machine learning, digital twins, and predictive analytics.',
            'start_date': '2025-01-01',
            'end_date': '2026-04-01',
            'grade': 'GPA: 3.93/4.00',
            'approved': True,
        },
        {
            'degree': 'BSc in Computer Science & Engineering',
            'institution': 'Daffodil International University, Bangladesh',
            'field': 'Computer Science & Engineering',
            'description': 'Graduated in the Top 2% of the class.',
            'start_date': '2018-01-01',
            'end_date': '2022-12-31',
            'grade': 'GPA: 3.90/4.00',
            'approved': True,
        },
    ]
    for e in education:
        Education.objects.get_or_create(
            degree=e['degree'],
            institution=e['institution'],
            defaults=e,
        )


def run():
    seed_projects()
    seed_skills()
    seed_publications()
    seed_research()
    seed_timeline()
    seed_education()
    print("Database seeded successfully.")
