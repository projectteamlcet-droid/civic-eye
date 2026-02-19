# CivicAI Backend API

## Setup

```bash
cd backend
cp .env.example .env   # Edit with your MongoDB URI and JWT secret
npm install
node utils/seeder.js    # Seed database with test data
npm run dev             # Start with nodemon
```

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| SuperAdmin | admin@civicai.com | admin123 |
| ZoneOfficer | zonea@civicai.com | officer123 |
| FieldInspector | inspector@civicai.com | inspector123 |

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get current user (auth required) |

### Assets (auth required)
| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/api/assets` | Get all assets (role-filtered) | All |
| GET | `/api/assets/:id` | Get asset by ID | All |
| POST | `/api/assets` | Create asset | SuperAdmin, ZoneOfficer |
| PUT | `/api/assets/:id` | Update asset | SuperAdmin, ZoneOfficer |
| DELETE | `/api/assets/:id` | Delete asset | SuperAdmin |

Query params: `type`, `riskLevel`, `zone`, `page`, `limit`

### AI Analysis (auth required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/analyze` | Run AI analysis on asset |
| GET | `/api/ai/history/:assetId` | Get analysis history |

Body: `{ "assetId": "mongoId" }`

### Alerts (auth required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/alerts` | Get all alerts |
| GET | `/api/alerts/critical` | Get critical pending alerts |
| PUT | `/api/alerts/:id/status` | Update alert status |

### Dashboard (auth required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/overview` | Dashboard summary stats |
| GET | `/api/dashboard/heatmap` | Heatmap data with coordinates |

### Reports (auth required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/summary` | Full report summary |

## Architecture

```
backend/
├── config/          # DB connection, env vars
├── controllers/     # Request handlers
├── middleware/       # Auth, validation, error handling
├── models/          # Mongoose schemas
├── routes/          # Express route definitions
├── services/        # Business logic (AI, risk engine, alerts)
├── utils/           # Seeder, helpers
└── server.js        # Entry point
```

## Sample Requests (cURL)

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@civicai.com","password":"admin123"}'
```

### Get Assets (with token)
```bash
curl http://localhost:5000/api/assets \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Run AI Analysis
```bash
curl -X POST http://localhost:5000/api/ai/analyze \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"assetId":"ASSET_MONGO_ID"}'
```

### Get Dashboard Overview
```bash
curl http://localhost:5000/api/dashboard/overview \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
