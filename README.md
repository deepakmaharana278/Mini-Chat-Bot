# Deepak-GPT Chatbot

## Overview

Deepak-GPT is a full-stack chatbot application built with **Django** as the backend and **React (Vite)** as the frontend. The chatbot uses **OpenAI's GPT-4o-mini** model to generate intelligent responses.

The project allows users to interact with an AI assistant similar to ChatGPT, directly from the web interface.

## Live Demo
[https://mini-chat-bot-5.onrender.com/](Deepak-Gpt)

## Features

* Real-time chat interface
* AI-powered responses using OpenAI API
* Responsive frontend with Tailwind CSS
* Concurrent development setup for React and Django
* Environment variable support for API keys

## Project Structure

```
ChatBot/
├── backend/         # Django project
│   ├── manage.py
│   ├── ...
├── frontend/        # React project (Vite)
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
├── .env             # Environment variables (OpenAI API key)
├── package.json     # Root package.json for concurrently
```

## Installation

### Prerequisites

* Python 3.10+
* Node.js 20+
* npm

### Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Linux/Mac
.venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

### Frontend Setup

```bash
cd frontend
npm install
```

### Root Setup (Concurrent Dev Server)

```bash
npm install concurrently --save-dev
```

## Environment Variables

Create a `.env` file in the backend folder:

```
OPENAI_API_KEY=your_openai_api_key_here
```

Create a `.env` file in the frontend folder:

```
VITE_API_URL=/api/chat/
```

## Running the Application

From the **root folder**, run:

```bash
npm run dev
```

This will start:

* React frontend: [http://localhost:5173](http://localhost:5173)
* Django backend: [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Production Deployment

### Option 1: Single Server (Django serves React)

1. Build React:

```bash
cd frontend
npm run build
```

2. Copy `dist/` to Django static files
3. Configure Django `urls.py` and `views.py` to serve `index.html`
4. Run `collectstatic` and deploy backend

### Option 2: Separate Deployment

* Deploy Django API on a server (Render, Railway, Heroku)
* Deploy React frontend on Netlify/Vercel
* Update frontend `VITE_API_URL` with deployed backend URL
* Add CORS headers in Django

## Usage

* Open the frontend in a browser
* Type a message in the chat input
* Press Enter or click Send
* The bot will respond using GPT-4o-mini

## Dependencies

### Backend

* Django
* Django REST Framework
* OpenAI Python SDK
* python-dotenv

### Frontend

* React 19
* Vite
* Axios
* Tailwind CSS

## License

MIT
