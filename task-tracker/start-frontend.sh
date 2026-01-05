#!/bin/bash

echo "🚀 Starting Task Tracker Frontend..."

cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies first..."
    npm install
fi

# Start the dev server
echo "🚀 Starting Vite dev server on port 5173..."
npm run dev
