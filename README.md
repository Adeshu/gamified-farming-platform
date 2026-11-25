# Gamified Farming Platform

A gamified sustainable-farming dashboard. Users register, complete farming missions, earn progress and compete on a leaderboard. The backend is an Express + MySQL REST API; the frontend is a lightweight HTML/CSS/JavaScript dashboard.

## Features

- User registration and session-based login.
- Mission catalogue and mission completion tracking.
- User progress and score storage.
- Leaderboard and dashboard summary cards.
- Chart.js mission-completion chart.
- REST endpoints for users, missions and progress.

## Tech stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + Express 4 |
| Database | MySQL (mysql2) |
| Sessions | express-session |
| Config | dotenv |
| Frontend | HTML5, CSS3, vanilla JavaScript, Chart.js |
| Optional | Angular dependency for legacy experiments |

## Project structure

```text
gamified-farming-platform/
├── server.js            # Express API and static server
├── db.js                # MySQL connection (env based)
├── db.sql               # Database schema
├── package.json
├── .env.example
├── public/              # Dashboard, login and register pages
├── backend/             # Alternative controller/model/route layout
└── sql/                 # Extra SQL assets
```

## Prerequisites

- Node.js 18+
- MySQL 8+ (or MariaDB 10.5+)

## Setup

1. Create the database and tables:

   ```sql
   SOURCE db.sql;
   ```

2. Create your local environment file:

   ```powershell
   Copy-Item .env.example .env
   ```

   Fill in the MySQL password and a long random `SESSION_SECRET`.

3. Install dependencies and start the server:

   ```powershell
   npm install
   npm start
   ```

4. Open <http://localhost:5000>.

## Environment variables

| Variable | Purpose | Default |
|---|---|---|
| `PORT` | HTTP port | `5000` |
| `SESSION_SECRET` | Session signing secret | dev fallback |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL user | `root` |
| `DB_PASSWORD` | MySQL password | empty |
| `DB_NAME` | Database name | `farming_db` |

## API

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/login` | Log in |
| `POST` | `/api/register` | Register a user |
| `GET` | `/api/logout` | Destroy the session |
| `GET` | `/api/users` | List users |
| `GET` | `/api/missions` | List missions |
| `GET` | `/api/progress` | List progress records |

## Notes and limitations

- This is a learning prototype: passwords are currently stored as plain text and the demo UI ships with sample accounts. Do not use it in production without hashing (bcrypt is already listed as a dependency) and server-side validation.
- `db.js` now reads credentials from `.env`; no database password is committed.
- `node_modules/` and `.env` are git-ignored.

## Licence

MIT-style educational use.
