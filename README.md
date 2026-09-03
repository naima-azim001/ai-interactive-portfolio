# AI-Interactive Developer Portfolio

A modern, AI-Interactive developer portfolio built with React, Django REST Framework, and a local RAG (Retrieval-Augmented Generation) system using Ollama.

## Features

- Professional profile presentation (hero, about, skills, projects, timeline, research, publications, contact)
- AI assistant chatbot that answers questions ONLY using approved portfolio content
- RAG architecture with embeddings and semantic search
- Django Admin panel for managing all content with `approved` flags
- Rate limiting, CORS, CSRF, and input sanitization
- Dark, responsive, modern UI

---

## Requirements

- **Python** 3.9+
- **Node.js** 18+
- **Ollama** (for local LLM inference)

---

## Installation

### 1. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate    # macOS/Linux
pip install -r requirements.txt
cp .env.example .env          # configure your env vars
```

### 2. Frontend

```bash
cd frontend
npm install
```

### 3. Ollama Models

Pull the models required for the RAG system:

```bash
ollama pull llama3.2          # LLM for answering
ollama pull nomic-embed-text  # embedding model
```

---

## Running Locally

Open three terminals:

**Terminal 1 - Ollama:**
```bash
ollama serve
```

**Terminal 2 - Backend:**
```bash
cd backend
venv\Scripts\activate
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data
python manage.py build_embeddings
python manage.py runserver
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit:
- Frontend: http://localhost:5173
- Admin: http://localhost:8000/admin/
- API: http://localhost:8000/api/

---

## Environment Variables

Create a `.env` file in the `backend/` directory. See `.env.example` for a template:

| Variable | Description | Default |
|----------|-------------|---------|
| `DJANGO_SECRET_KEY` | Django secret key (change in production) | - |
| `DEBUG` | Enable debug mode | `True` |
| `ALLOWED_HOSTS` | Comma-separated allowed hosts | `localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated allowed frontend origins | `http://localhost:5173` |
| `OLLAMA_URL` | Ollama server URL | `http://localhost:11434` |
| `OLLAMA_MODEL` | LLM model name | `llama3.2` |
| `OLLAMA_EMBEDDING_MODEL` | Embedding model name | `nomic-embed-text` |

---

## RAG Architecture

1. User question → input validation + sanitization (max 500 chars)
2. Question embedded with `nomic-embed-text` via Ollama
3. Cosine similarity search against approved portfolio document embeddings
4. Top-k relevant documents retrieved
5. Grounded system prompt + context + question sent to `llama3.2`
6. LLM returns answer grounded ONLY in retrieved context

Retrieval operates only over documents where `approved = True`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/` | Approved projects |
| GET | `/api/projects/:slug/` | Single approved project by slug |
| GET | `/api/skills/` | Approved skills |
| GET | `/api/publications/` | Approved publications |
| GET | `/api/research/` | Approved research |
| GET | `/api/timeline/` | Approved timeline |
| GET | `/api/education/` | Approved education |
| POST | `/api/ai/chat/` | AI assistant (rate limited: 20/hour) |
| POST | `/api/contact/` | Contact form (rate limited: 5/hour) |

---

## Security

- **Rate limiting**: 20/hour on AI chat, 5/hour on contact per IP
- **CSRF**: Properly configured with trusted origins
- **CORS**: Only allowed origins (no `CORS_ALLOW_ALL_ORIGINS`)
- **Input sanitization**: `bleach` strips HTML from user input
- **Environment variables**: Secret key, DB, origins all from `.env`
- **Approved-content filtering**: Public APIs and RAG only expose `approved=True` content
- **Prompt injection protection**: System prompt treats portfolio docs as untrusted data; refuses to follow instructions inside them

---

## Build Embeddings

Content is embedded for semantic search. Run after adding/updating content:

```bash
python manage.py build_embeddings
```

This skips unchanged documents to avoid unnecessary work.

---

## Testing

```bash
cd backend
python manage.py test
```

---

## Future Improvements

- PostgreSQL + pgvector for vector storage
- User authentication
- GitHub API integration for live repositories
- Better reranking of retrieval results
- More sophisticated recommendation model
- Production deployment and CI/CD
