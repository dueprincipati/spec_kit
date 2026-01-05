#!/bin/bash

echo "🚀 Task Tracker - Quick Start"
echo "=============================="

# Make scripts executable
chmod +x setup.sh start-backend.sh start-frontend.sh start-db.sh

# Run setup
./setup.sh

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "To start the application:"
    echo "  1. ./start-db.sh         - Start PostgreSQL"
    echo "  2. ./start-backend.sh    - Start backend API"
    echo "  3. ./start-frontend.sh   - Start frontend"
    echo ""
    echo "Or use Docker Compose:"
    echo "  docker-compose up"
fi
