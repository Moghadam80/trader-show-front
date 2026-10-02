# Expense Sharing Frontend

Next.js frontend for the expense sharing application.

## Run locally

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Set `BACKEND_API_URL` to the backend URL. The default in `.env.example` is for local development.

## Deploy on Hamravesh (Darkube)

Deploy this frontend and `trader-show-backend` as two separate Git applications. Push this folder to a Git repository that Hamravesh can access, then create a Git based application in Darkube with:

- Build context: `.`
- Dockerfile path: `Dockerfile`
- Service port: `3000`
- Runtime environment variable: `BACKEND_API_URL=https://<your-api-domain>` (include the scheme, no trailing slash)
- Domain: the public frontend domain you choose

The Next.js server forwards browser API requests to the backend, so the backend URL is set as a runtime environment variable. Once both apps are deployed, open the frontend domain to use the dashboard.
