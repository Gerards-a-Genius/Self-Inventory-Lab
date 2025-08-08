#!/bin/bash

# Self-Inventory Lab Website Deployment Script

echo "🚀 Self-Inventory Lab - Vercel Deployment"
echo "=========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Display options
echo "Choose deployment type:"
echo "1) Preview deployment (testing)"
echo "2) Production deployment (live site)"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo "📦 Creating preview deployment..."
        vercel
        ;;
    2)
        echo ""
        echo "🌟 Deploying to production..."
        vercel --prod
        ;;
    *)
        echo "❌ Invalid choice. Please run script again."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "- Check your deployment at the provided URL"
echo "- Visit vercel.com/dashboard to manage your site"
echo "- Add custom domain in Vercel settings if needed"