#!/bin/bash

# S3 Deployment Script for Knowlio
# Make sure to replace YOUR_BUCKET_NAME with your actual S3 bucket name

BUCKET_NAME="YOUR_BUCKET_NAME"
DISTRIBUTION_ID="YOUR_CLOUDFRONT_DISTRIBUTION_ID" # Optional, for CloudFront invalidation

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🚀 Starting deployment to S3..."

# Build the project
echo "📦 Building the React application..."
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if bucket name is set
if [ "$BUCKET_NAME" = "YOUR_BUCKET_NAME" ]; then
    echo -e "${RED}❌ Please update the BUCKET_NAME variable in this script${NC}"
    exit 1
fi

# Sync build folder to S3
echo "📤 Uploading to S3 bucket: $BUCKET_NAME"
aws s3 sync build/ s3://$BUCKET_NAME/ \
    --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "index.html" \
    --exclude "service-worker.js" \
    --exclude "manifest.json"

# Upload files that shouldn't be cached
aws s3 cp build/index.html s3://$BUCKET_NAME/index.html \
    --cache-control "no-cache, no-store, must-revalidate" \
    --content-type "text/html"

aws s3 cp build/service-worker.js s3://$BUCKET_NAME/service-worker.js \
    --cache-control "no-cache, no-store, must-revalidate" \
    --content-type "application/javascript"

aws s3 cp build/manifest.json s3://$BUCKET_NAME/manifest.json \
    --cache-control "no-cache, no-store, must-revalidate" \
    --content-type "application/json"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ S3 sync failed. Please check your AWS credentials and bucket permissions.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Files uploaded successfully${NC}"

# Invalidate CloudFront cache (optional)
if [ "$DISTRIBUTION_ID" != "YOUR_CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
        --distribution-id $DISTRIBUTION_ID \
        --paths "/*"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ CloudFront invalidation created${NC}"
    else
        echo -e "${RED}⚠️  CloudFront invalidation failed${NC}"
    fi
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo "Your website should be available at: https://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
echo "(Replace us-east-1 with your actual region)"
