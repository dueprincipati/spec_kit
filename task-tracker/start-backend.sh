#!/bin/bash

echo "🚀 Starting Task Tracker Backend..."

cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies first..."
    npm install
fi

# Check if Prisma client is generated
if [ ! -d "node_modules/.prisma" ]; then
    echo "🔧 Generating Prisma client..."
    npx prisma generate
fi

# Start the server
echo "🚀 Starting server on port 3000..."
npm run dev
