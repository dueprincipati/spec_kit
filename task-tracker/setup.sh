#!/bin/bash

echo "🚀 Task Tracker - Setup Script"
echo "================================"

# Install Backend Dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed"
    exit 1
fi
echo "✅ Backend dependencies installed"

# Generate Prisma Client
echo ""
echo "🔧 Generating Prisma client..."
npx prisma generate
echo "✅ Prisma client generated"

# Install Frontend Dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed"
    exit 1
fi
echo "✅ Frontend dependencies installed"

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Start PostgreSQL: docker-compose up -d postgres"
echo "2. Run migrations: cd backend && npx prisma migrate dev"
echo "3. Start backend: npm run dev"
echo "4. Start frontend: cd frontend && npm run dev"
