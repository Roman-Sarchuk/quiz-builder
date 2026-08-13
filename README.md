# Quiz Builder

Quiz Builder is a full-stack JavaScript assessment project for creating and managing quizzes. It is built as a monorepo-style application with a Next.js frontend, an Express + Prisma backend, and PostgreSQL running through Docker Compose.

## ✨ Tech Stack

**Backend**

- Express.js
- TypeScript
- Prisma
- PostgreSQL
- Zod

**Frontend**

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- `@hookform/resolvers/zod`

**Infrastructure**

- Docker
- Docker Compose

## 📁 Project Structure

```text
/frontend   # Next.js UI
/backend    # Express API, Prisma, and database logic
/docker-compose.yml
```

## 🚀 Quick Start

The fastest and recommended way to run the project is with Docker Compose. No manual .env file creation is needed for this method.

1. Start all services from the repository root:

	 ```bash
	 docker-compose up --build -d
	 ```

2. Apply the database schema:

	 ```bash
	 docker exec -it quiz_backend npx prisma migrate deploy
	 ```

3. Seed the database with a sample quiz:

	 ```bash
	 docker exec -it quiz_backend npx prisma db seed
	 ```

4. Open the application:

	 - UI: http://localhost:3000
	 - API: http://localhost:5000

## 🗄️ Database Setup

The backend uses PostgreSQL and Prisma.

- The database is defined in `docker-compose.yml`.
- Prisma schema lives in `backend/prisma/schema.prisma`.
- Migrations are applied with `prisma migrate dev`.
- Sample data is loaded with `prisma db seed`.

If you want to reset the database and reload the sample data, you can rerun the migration and seed commands above.

## 🛠️ Local Development Setup

If you prefer running the Node.js and Next.js apps locally on your host machine instead of fully using Docker, you still need the PostgreSQL database running.

1. **Start the database only:**

```bash
docker-compose up -d db
```

2. **Create the environment files:**

- `backend/.env` (Copy from backend/.env.example)
- `frontend/.env.local` (Copy from frontend/.env.example)

3. **Start the Backend:**

```bash
cd backend
npm install
npx prisma migrate deploy
npm run dev
```

4. **Start the Frontend**

```bash
cd frontend
npm install
npm run dev
```

Default local URLs:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🧪 Create a Sample Quiz

You can create a quiz in two ways:

1. Use the UI at http://localhost:3000/create.
2. Seed the database with the provided sample quiz:

	 ```bash
	 docker exec -it quiz_backend npx prisma db seed
	 ```

If you want to create a quiz directly through the API, the backend exposes `POST /quizzes`.

### Example `cURL`

```bash
curl -X POST http://localhost:5000/quizzes \
	-H "Content-Type: application/json" \
	-d '{
		"title": "Frontend Fundamentals",
		"questions": [
			{
				"type": "BOOLEAN",
				"text": "React is a library for building user interfaces.",
				"answers": true
			},
			{
				"type": "INPUT",
				"text": "What does CSS stand for?",
				"answers": "Cascading Style Sheets"
			},
			{
				"type": "CHECKBOX",
				"text": "Which of the following are JavaScript frameworks?",
				"options": ["React", "Vue", "HTML", "Sass"],
				"answers": ["React", "Vue"]
			}
		]
	}'
```

## 📡 API Overview

Available quiz routes:

- `POST /quizzes` - create a quiz
- `GET /quizzes` - list quizzes
- `GET /quizzes/:id` - fetch a single quiz
- `DELETE /quizzes/:id` - delete a quiz

## 📝 Notes

- The frontend consumes the API through the NEXT_PUBLIC_API_URL environment variable.
- The project implements Zod for strict validation on both the backend and frontend forms.
- Dockerized startup is the recommended path for reviewers to avoid environment inconsistencies.

