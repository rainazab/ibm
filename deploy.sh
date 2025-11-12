#!/bin/bash

# BEACON Deployment Script for Fly.io

echo "🚀 BEACON Deployment to Fly.io"
echo "================================"
echo ""

# Check if flyctl is installed
if ! command -v flyctl &> /dev/null; then
    echo "❌ Fly CLI not installed. Install with:"
    echo "   brew install flyctl"
    exit 1
fi

echo "✅ Fly CLI found"
echo ""

# Check if logged in
if ! flyctl auth whoami &> /dev/null; then
    echo "❌ Not logged into Fly.io"
    echo "Run: flyctl auth login"
    exit 1
fi

echo "✅ Logged into Fly.io"
echo ""

# Deploy backend
echo "📦 Deploying Backend..."
flyctl deploy --app beacon-backend --dockerfile Dockerfile
BACKEND_URL=$(flyctl status -a beacon-backend | grep URL | awk '{print $NF}')

if [ -z "$BACKEND_URL" ]; then
    BACKEND_URL="https://beacon-backend.fly.dev"
fi

echo "✅ Backend deployed: $BACKEND_URL"
echo ""

# Deploy frontend
echo "📦 Deploying Frontend..."
cd frontend
flyctl deploy --app beacon-frontend
FRONTEND_URL=$(flyctl status -a beacon-frontend | grep URL | awk '{print $NF}')

if [ -z "$FRONTEND_URL" ]; then
    FRONTEND_URL="https://beacon-frontend.fly.dev"
fi

echo "✅ Frontend deployed: $FRONTEND_URL"
echo ""

echo "🎉 Deployment Complete!"
echo ""
echo "URLs:"
echo "  Backend:  $BACKEND_URL"
echo "  Frontend: $FRONTEND_URL"
echo ""
echo "Next: Update frontend to use: $BACKEND_URL/api/negotiate"

