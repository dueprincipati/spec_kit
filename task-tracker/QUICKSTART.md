# Task Tracker - Quick Start Guide

## 🚀 Avvio Rapido

### Opzione 1: Script Automatico

```bash
cd /workspaces/spec_kit/task-tracker
chmod +x quickstart.sh
./quickstart.sh
```

Poi avvia i servizi:
```bash
# Terminal 1 - Database
./start-db.sh

# Terminal 2 - Backend
./start-backend.sh

# Terminal 3 - Frontend
./start-frontend.sh
```

### Opzione 2: Docker Compose (Consigliato)

```bash
cd /workspaces/spec_kit/task-tracker
docker-compose up
```

Questo avvierà automaticamente:
- PostgreSQL (porta 5432)
- Backend API (porta 3000)
- Frontend (porta 5173)

### Opzione 3: Setup Manuale

#### 1. Installa Dipendenze

```bash
# Backend
cd backend
npm install
npx prisma generate

# Frontend
cd ../frontend
npm install
```

#### 2. Avvia Database

```bash
# Dalla root del progetto
docker-compose up -d postgres
```

#### 3. Esegui Migrazioni

```bash
cd backend
npx prisma migrate dev --name init
```

#### 4. Avvia Backend

```bash
cd backend
npm run dev
```

Backend disponibile su: http://localhost:3000

#### 5. Avvia Frontend

```bash
cd frontend
npm run dev
```

Frontend disponibile su: http://localhost:5173

## 📝 Test dell'Applicazione

1. Apri http://localhost:5173
2. Clicca su "Registrati"
3. Crea un nuovo account
4. Inizia a creare i tuoi task!

## 🔧 Comandi Utili

```bash
# Backend
npm run dev          # Avvia in modalità sviluppo
npm run build        # Build per produzione
npm test             # Esegui test
npm run lint         # Lint del codice

# Prisma
npx prisma studio    # Apri Prisma Studio (GUI database)
npx prisma migrate dev  # Crea nuova migrazione
npx prisma generate  # Genera Prisma Client

# Frontend
npm run dev          # Avvia dev server
npm run build        # Build per produzione
npm run preview      # Preview build di produzione
```

## 🐛 Troubleshooting

### Il backend non si avvia
- Verifica che PostgreSQL sia in esecuzione: `docker-compose ps`
- Controlla il file `.env` nel backend
- Verifica le migrazioni: `npx prisma migrate status`

### Il frontend non si connette al backend
- Verifica che il backend sia in esecuzione su porta 3000
- Controlla il file `.env` nel frontend
- Verifica VITE_API_URL=http://localhost:3000/api

### Errori di database
```bash
# Reset database
cd backend
npx prisma migrate reset
npx prisma migrate dev
```

## 📚 API Endpoints

### Autenticazione
- POST `/api/auth/register` - Registrazione
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Info utente corrente

### Tasks
- GET `/api/tasks` - Lista tasks
- GET `/api/tasks/:id` - Dettaglio task
- POST `/api/tasks` - Crea task
- PUT `/api/tasks/:id` - Aggiorna task
- DELETE `/api/tasks/:id` - Elimina task
- PATCH `/api/tasks/:id/status` - Aggiorna stato

## 🎯 Prossimi Passi

Dopo aver testato l'MVP, puoi implementare:
- Sistema progetti
- Sistema tag
- Vista Kanban
- Vista calendario
- Dashboard con statistiche
- Dark mode
- E molto altro... (vedi IMPLEMENTATION_PLAN.md)

## 📖 Documentazione Completa

- [Specifica Completa](../my_project/SPEC.md)
- [Piano di Implementazione](../my_project/IMPLEMENTATION_PLAN.md)
