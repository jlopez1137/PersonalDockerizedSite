#!/bin/bash

# Personal Website Flask Setup Script for Linux/macOS
# This script creates a virtual environment, installs dependencies, and provides run instructions

echo "🚀 Setting up Personal Website Flask Environment..."
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip3."
    exit 1
fi

echo "✅ Python 3 and pip3 are available"
echo ""

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv .venv

if [ $? -ne 0 ]; then
    echo "❌ Failed to create virtual environment"
    exit 1
fi

echo "✅ Virtual environment created"
echo ""

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source .venv/bin/activate

if [ $? -ne 0 ]; then
    echo "❌ Failed to activate virtual environment"
    exit 1
fi

echo "✅ Virtual environment activated"
echo ""

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📥 Installing requirements..."
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install requirements"
    exit 1
fi

echo "✅ Requirements installed successfully"
echo ""

# Success message
echo "🎉 Setup complete!"
echo ""
echo "To run the Flask application:"
echo "1. Activate the virtual environment: source .venv/bin/activate"
echo "2. Run the app: flask --app app run"
echo "3. Open your browser to: http://localhost:5000"
echo ""
echo "To deactivate the virtual environment when done: deactivate"
echo ""
echo "Happy coding! 🚀"
