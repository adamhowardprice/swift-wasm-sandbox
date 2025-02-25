#!/bin/bash
# Build and deploy Swift Cloud Compute functions

set -e

# Check if Swift Cloud CLI is installed
if ! command -v swift-cloud &> /dev/null; then
    echo "Swift Cloud CLI not found. Installing..."
    brew install swift-cloud/tap/swift-cloud
fi

# Validate arguments
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <example-name> [environment]"
    echo "Available examples:"
    ls -1 examples
    exit 1
fi

EXAMPLE=$1
ENVIRONMENT=${2:-dev}

# Check if the example exists
if [ ! -d "examples/$EXAMPLE" ]; then
    echo "Example '$EXAMPLE' not found."
    echo "Available examples:"
    ls -1 examples
    exit 1
fi

echo "Building Swift Cloud Compute function: $EXAMPLE for environment: $ENVIRONMENT"

# Navigate to the example directory
cd "examples/$EXAMPLE"

# Build the function
echo "Building..."
swift build -c release

# Package the function for deployment
echo "Packaging for deployment..."
swift-cloud package

# Deploy the function to Swift Cloud
echo "Deploying to Swift Cloud ($ENVIRONMENT)..."
swift-cloud deploy --env $ENVIRONMENT

echo "Deployment complete! Your function is now available."

# Navigate back to the original directory
cd ../..
