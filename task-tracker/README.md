# Task Tracker App

Un'applicazione web moderna per la gestione e il tracciamento delle attività.

## 🚀 Features

- ✅ Gestione completa dei task (CRUD)
- 📁 Organizzazione in progetti
- 🏷️ Sistema di tag per categorizzazione
- 📊 Vista Kanban con drag & drop
- 📅 Vista calendario
- 🔍 Ricerca e filtri avanzati
- 📈 Dashboard con statistiche
- 🌓 Tema chiaro/scuro
- 📱 Design responsive

## 🛠️ Tech Stack

### Frontend
- React 18+ con TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- React Router v6
- Axios

### Backend
- Node.js 20+
- Express.js con TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication

## 📦 Setup Development Environment

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- pnpm (consigliato) o npm

### Installation

1. Clone il repository:
```bash
git clone <repository-url>
cd task-tracker
```

2. Setup Backend:
```bash
cd backend
pnpm install
cp .env.example .env
# Configurare DATABASE_URL e JWT_SECRET in .env
npx prisma migrate dev
npx prisma generate
pnpm dev
```

3. Setup Frontend:
```bash
cd frontend
pnpm install
cp .env.example .env
# Configurare VITE_API_URL in .env
pnpm dev
```

### Docker Setup (Alternativa)

```bash
docker-compose up -d
```

## 🗂️ Project Structure

```
task-tracker/
├── backend/              # API Node.js/Express
│   ├── prisma/          # Database schema e migrations
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── middleware/  # Auth, error handling
│   │   └── utils/       # Helper functions
│   └── tests/           # Test files
├── frontend/            # React app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Zustand stores
│   │   ├── services/    # API calls
│   │   └── types/       # TypeScript types
│   └── public/          # Static assets
└── docker-compose.yml   # Docker configuration
```

## 🧪 Testing

### Backend
```bash
cd backend
pnpm test
pnpm test:coverage
```

### Frontend
```bash
cd frontend
pnpm test
```

## 🚀 Deployment

### Backend (Railway/Render)
1. Creare progetto su Railway/Render
2. Collegare repository GitHub
3. Configurare variabili d'ambiente
4. Deploy automatico su push

### Frontend (Vercel)
1. Creare progetto su Vercel
2. Collegare repository GitHub
3. Configurare VITE_API_URL
4. Deploy automatico su push

## 📝 API Documentation

API documentation disponibile su `/api-docs` quando il backend è in esecuzione.

## 🤝 Contributing

1. Fork il progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 License

MIT License - vedi file LICENSE per dettagli

## 👥 Authors

- Your Name - [@yourhandle](https://github.com/yourhandle)

## 🙏 Acknowledgments

- Design ispirato a Todoist e Trello
- Icons da Lucide React
