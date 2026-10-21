# Developer Portfolio

A modern, responsive developer portfolio built with **React** and **Django REST Framework**, featuring a professional profile, project showcase, technical skills, research work, publications, and contact form. The portfolio uses Django Admin for content management and a Django REST API to deliver approved content to the frontend.

## Features

- Professional profile presentation (hero, about, skills, projects, timeline, research, publications, and contact)
- Dynamic portfolio content powered by Django REST Framework
- Django Admin panel for managing portfolio content
- Approval-based content management to control what appears publicly
- RESTful API endpoints for portfolio sections
- Contact form with input validation and rate limiting
- CORS and CSRF configuration
- Environment-based configuration for sensitive settings
- Dark, responsive, modern UI

---

## Technology Stack

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Python, Django, Django REST Framework
- **Database:** Django-supported database (SQLite by default, depending on configuration)
- **Content Management:** Django Admin
- **Security:** Input validation, rate limiting, CORS, CSRF, and environment variables

---

## Requirements

- Python 3.9+
- Node.js 18+
- npm

---

## Installation

### 1. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux

pip install -r requirements.txt
```

Create a `.env` file using the provided template:

```bash
copy .env.example .env         # Windows
# cp .env.example .env         # macOS/Linux
```

Configure the required environment variables before running the application.

### 2. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

---

## Running Locally

### Terminal 1 — Backend

```bash
cd backend
venv\Scripts\activate
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data
python manage.py runserver
```

Run `seed_data` only if the project includes this management command and you want to load the initial portfolio content.

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Visit the application at:

- **Portfolio:** http://localhost:5173
- **Django Admin:** http://localhost:8000/admin/
- **API:** http://localhost:8000/api/

---

## Environment Variables

Configure the `.env` file inside the `backend/` directory.

| Variable | Description | Default |
|---|---|---|
| `DJANGO_SECRET_KEY` | Django secret key | Must be configured |
| `DEBUG` | Enables development debug mode | `True` |
| `ALLOWED_HOSTS` | Comma-separated allowed hostnames | `localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | Permitted frontend origins | `http://localhost:5173` |

Use a secure secret key, disable debug mode, and configure the appropriate hosts and origins before production deployment.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects/` | Retrieve approved projects |
| GET | `/api/projects/:slug/` | Retrieve an approved project by slug |
| GET | `/api/skills/` | Retrieve approved skills |
| GET | `/api/publications/` | Retrieve approved publications |
| GET | `/api/research/` | Retrieve approved research |
| GET | `/api/timeline/` | Retrieve approved timeline entries |
| GET | `/api/education/` | Retrieve approved education records |
| POST | `/api/contact/` | Submit a contact form |

*These endpoints assume they remain implemented in the current codebase.*

---

## Content Management

Portfolio content is managed through Django Admin.

Administrators can manage profile information, projects, skills, education, research, publications, timeline entries, and other supported content without editing the frontend code.

Content marked as approved is exposed through the public API, allowing unpublished or unapproved information to remain hidden.

---

## Security

- **Rate limiting:** Restricts repeated contact form submissions.
- **Input validation:** Validates submitted data and rejects invalid input.
- **CORS:** Allows requests only from configured frontend origins.
- **CSRF protection:** Uses Django's CSRF protections where applicable.
- **Environment variables:** Keeps sensitive configuration outside source code.
- **Approved-content filtering:** Prevents unapproved portfolio entries from appearing in public API responses.
- **Production configuration:** Supports environment-specific security settings.

---

## Testing

Run the backend test suite:

```bash
cd backend
python manage.py test
```

Run the frontend checks or tests using the scripts configured in `frontend/package.json`.

---

## Future Improvements

- PostgreSQL database integration
- Improved portfolio content management
- GitHub API integration for displaying repositories
- Automated testing and code quality checks
- CI/CD pipeline and production deployment
- SEO and accessibility improvements
- Performance optimization and caching

---

## Project Goal

To build a professional, maintainable developer portfolio that showcases software development experience, technical skills, projects, and research through a responsive React interface backed by a structured Django REST API.
