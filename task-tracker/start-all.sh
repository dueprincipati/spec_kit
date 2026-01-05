#!/bin/bash
# Task Tracker - Avvio Completo

echo "🚀 Avvio Task Tracker Application"
echo "===================================="
echo ""

# Colori per output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check se siamo nella directory corretta
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}❌ Errore: esegui questo script dalla directory task-tracker${NC}"
    exit 1
fi

# Step 1: Avvia PostgreSQL
echo -e "${BLUE}📦 Step 1/4: Avvio PostgreSQL...${NC}"
docker-compose up -d postgres
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Errore nell'avvio di PostgreSQL${NC}"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL avviato${NC}"
sleep 3

# Step 2: Installa dipendenze backend (se necessario)
echo -e "${BLUE}📦 Step 2/4: Setup Backend...${NC}"
if [ ! -d "backend/node_modules" ]; then
    echo "Installazione dipendenze backend..."
    cd backend && npm install && cd ..
fi
echo -e "${GREEN}✅ Backend pronto${NC}"

# Step 3: Esegui migrazioni
echo -e "${BLUE}📦 Step 3/4: Migrazione Database...${NC}"
cd backend
npx prisma generate
npx prisma migrate dev --name init
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Migrazioni già eseguite o errore${NC}"
fi
cd ..
echo -e "${GREEN}✅ Database configurato${NC}"

# Step 4: Installa dipendenze frontend (se necessario)
echo -e "${BLUE}📦 Step 4/4: Setup Frontend...${NC}"
if [ ! -d "frontend/node_modules" ]; then
    echo "Installazione dipendenze frontend..."
    cd frontend && npm install && cd ..
fi
echo -e "${GREEN}✅ Frontend pronto${NC}"

echo ""
echo -e "${GREEN}🎉 Setup completato!${NC}"
echo ""
echo "Per avviare l'applicazione, apri 2 terminali:"
echo ""
echo -e "${BLUE}Terminal 1 - Backend:${NC}"
echo "  cd backend && npm run dev"
echo ""
echo -e "${BLUE}Terminal 2 - Frontend:${NC}"
echo "  cd frontend && npm run dev"
echo ""
echo -e "${YELLOW}Oppure usa Docker Compose:${NC}"
echo "  docker-compose up backend frontend"
echo ""
echo "Quindi apri: ${GREEN}http://localhost:5173${NC}"
