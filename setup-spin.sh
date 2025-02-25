#!/bin/bash
# Install Fermyon Spin on macOS/Linux
# For Windows, see https://developer.fermyon.com/spin/v3/install

# Check for curl
if ! command -v curl &> /dev/null; then
    echo "curl is required but not installed. Please install curl first."
    exit 1
fi

# Install using the installer script
curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash

# Verify the installation
spin --version

# Add Spin templates for HTTP components
spin templates install --git https://github.com/fermyon/spin-js-sdk --update

echo "Fermyon Spin installed successfully!"