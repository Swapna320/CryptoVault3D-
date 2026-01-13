# CryptoVault 3D - Backend

This backend is an Express + MongoDB service providing:

- JWT authentication (register/login)
- Portfolio CRUD (create/update/delete holdings)
- Coin price lookup (via CoinGecko)
- CSV/Excel export endpoints
- Basic rate-limiting, security headers, input validation

## Quick start

1. Copy `.env.example` to `.env` and set values.
2. `npm install`
3. `npm run dev` (requires nodemon) or `npm start`

API will run on `http://localhost:4000` by default.
