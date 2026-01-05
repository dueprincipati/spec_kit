# 🚀 Task Tracker - Comandi per Avvio

## Avvio Rapido (3 opzioni)

### Opzione A: Terminali Multipli (Raccomandato per sviluppo)

Apri **3 terminali** ed esegui:

#### Terminal 1 - Database
```bash
cd /workspaces/spec_kit/task-tracker
docker-compose up postgres
```

#### Terminal 2 - Backend  
```bash
cd /workspaces/spec_kit/task-tracker/backend

# Prima volta: installa dipendenze
npm install
npx prisma generate
npx prisma migrate dev --name init

# Avvia server
npm run dev
```

Backend disponibile su: **http://localhost:3000**  
Health check: **http://localhost:3000/api/health**

#### Terminal 3 - Frontend
```bash
cd /workspaces/spec_kit/task-tracker/frontend

# Prima volta: installa dipendenze
npm install

# Avvia dev server
npm run dev
```

Frontend disponibile su: **http://localhost:5173**

---

### Opzione B: Docker Compose (tutto insieme)

```bash
cd /workspaces/spec_kit/task-tracker

# Prima volta: build delle immagini
docker-compose build

# Avvia tutti i servizi
docker-compose up

# Oppure in background
docker-compose up -d
```

Verifica che siano attivi:
```bash
docker-compose ps
```

---

### Opzione C: Script Automatico

```bash
cd /workspaces/spec_kit/task-tracker
chmod +x start-all.sh
./start-all.sh
```

Poi segui le istruzioni per avviare backend e frontend.

---

## 🧪 Test dell'Applicazione

1. **Apri il browser** su http://localhost:5173
2. **Registra un nuovo utente**
3. **Crea il primo task**
4. **Prova a completarlo** cliccando sul cerchio
5. **Elimina un task**

## 📋 Comandi Utili

### Backend
```bash
cd backend

# Sviluppo
npm run dev              # Avvia con hot-reload
npm run build            # Build TypeScript
npm start                # Avvia versione compilata

# Database
npx prisma studio        # GUI per database
npx prisma migrate dev   # Crea migrazione
npx prisma generate      # Genera client
npx prisma migrate reset # Reset database

# Test & Qualità
npm test                 # Esegui test
npm run lint             # Lint codice
```

### Frontend
```bash
cd frontend

# Sviluppo
npm run dev              # Avvia dev server
npm run build            # Build per produzione
npm run preview          # Preview build

# Qualità
npm run lint             # Lint codice
```

### Docker
```bash
# Vedi log
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Ferma servizi
docker-compose stop

# Ferma e rimuovi
docker-compose down

# Ricostruisci
docker-compose build --no-cache

# Reset completo
docker-compose down -v  # rimuove anche volumi
```

## 🔍 Verifica Funzionamento

### Health Checks

```bash
# Backend API
curl http://localhost:3000/api/health

# Risposta attesa:
# {"status":"ok","timestamp":"2026-01-05T..."}

# Database
docker-compose exec postgres psql -U tasktracker -d tasktracker -c "SELECT NOW();"
```

### Test API con curl

```bash
# Registrazione
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login (salva il token)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Crea Task (sostituisci TOKEN con quello ricevuto)
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Mio primo task","priority":"high"}'

# Lista Tasks
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

## 🐛 Troubleshooting

### Porta già in uso
```bash
# Trova processo sulla porta 3000
lsof -ti:3000 | xargs kill -9

# Trova processo sulla porta 5173
lsof -ti:5173 | xargs kill -9
```

### Database non si connette
```bash
# Verifica che PostgreSQL sia attivo
docker-compose ps postgres

# Vedi log PostgreSQL
docker-compose logs postgres

# Riavvia database
docker-compose restart postgres
```

### Errore migrazione Prisma
```bash
cd backend
npx prisma migrate reset  # Reset completo
npx prisma migrate dev --name init  # Ricrea
```

### Dipendenze mancanti
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Cache Docker
```bash
docker-compose down -v
docker system prune -a
docker-compose build --no-cache
docker-compose up
```

## 📊 Porte Utilizzate

| Servizio | Porta | URL |
|----------|-------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 3000 | http://localhost:3000 |
| PostgreSQL | 5432 | localhost:5432 |

## 🎯 Prossimi Passi

Una volta che l'app funziona, puoi:

1. **Esplorare il codice** in `backend/src` e `frontend/src`
2. **Aggiungere funzionalità** seguendo il [Piano di Implementazione](../my_project/IMPLEMENTATION_PLAN.md)
3. **Personalizzare l'UI** modificando i componenti React
4. **Implementare progetti e tag** (Fase 2 del piano)
5. **Aggiungere vista Kanban** con drag & drop

## 📚 Risorse

- [Specifica Completa](../my_project/SPEC.md)
- [Piano Implementazione](../my_project/IMPLEMENTATION_PLAN.md)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
