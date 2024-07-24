# InterviewAI

### [Live Site](https://interview-ai-chi.vercel.app)

![InterviewAI](https://res.cloudinary.com/dpwczamws/image/upload/v1721802664/uploads/Screenshot_2024-07-23_185324_p29vyg.png)

## <a name="introduction">🤖 Introduction</a>
Interview Preparation Platform

## <a name="tech-stack">⚙️ Tech Stack</a>
- ReactJs
- Clerk
- Tailwind CSS
- NodeJs
- MongoDB

## <a name="quick-start">Quick Start</a>

Follow these steps to set up the project locally on your machine

**Cloning the Repository**

```bash
git clone https://github.com/AnuragSingh012/InterviewAI.git
cd InterviewAI
```

**Install dependencies and start the backend**

```bash
cd server
npm install && node index.js
```

**Install dependencies and start the frontend**

```bash
cd client
npm install && npm run dev
```

In the client directory, create a `.env.local` file and add the following content:


```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_GEMINI_API_KEY=
```

In the server directory, create a `.env` file and add the following content:


```env
MONGODB_URL=
```

Replace the placeholder values with your actual respective account credentials
