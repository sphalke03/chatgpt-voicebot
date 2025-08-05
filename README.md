# ChatGPT Voicebot 🔊💬

A full-stack AI voice assistant powered by OpenAI's GPT, deployed with:
- 🎧 Voice recognition + synthesis
- ⚙️ TypeScript + Express backend
- 🌐 React + Vite frontend
- ☁️ Deployed on Render (backend) and Vercel (frontend)

---

## 🌐 Live Demo

- **Frontend:** [chatgpt-voicebot.vercel.app](https://chatgpt-voicebot.vercel.app)
- **Backend API:** [chatgpt-voicebot.onrender.com/api/chat](https://chatgpt-voicebot.onrender.com/api/chat)

---

## 🧠 Features

- 🎙️ Convert speech to text using Web Speech API
- 🤖 Send query to OpenAI API
- 🔊 Voice reply using Speech Synthesis
- 🌍 Hosted with Render (backend) and Vercel (frontend)
- 🛡️ Secrets managed via `.env`

---

## 🛠️ Tech Stack

| Frontend  | Backend        | Deployment |
|-----------|----------------|------------|
| React + Vite | Express + TypeScript | Vercel & Render |
| Web Speech API | OpenAI GPT API | GitHub CI/CD |
| Tailwind CSS | dotenv |         |

---

## 🧪 API Endpoint

### `POST /api/chat`

**Request Body**
```json
{
  "message": "Hello"
}
