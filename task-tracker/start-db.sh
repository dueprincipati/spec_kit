#!/bin/bash

echo "🗄️  Starting PostgreSQL Database..."

# Start PostgreSQL with Docker Compose
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 3

# Check if database is running
docker-compose ps postgres

echo ""
echo "✅ PostgreSQL is running!"
echo "📝 Connection string: postgresql://tasktracker:tasktracker_dev_password@localhost:5432/tasktracker"
echo ""
echo "Next step: Run migrations with 'cd backend && npx prisma migrate dev'"
