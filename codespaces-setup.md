# GitHub Codespaces Setup for Personal Website

## 🚀 Quick Start in GitHub Codespaces

### Method 1: Using Docker (Recommended)
Since your app is already dockerized, this is the easiest approach:

1. **Open in Codespaces:**
   - Go to your GitHub repository
   - Click the green "Code" button
   - Select "Codespaces" tab
   - Click "Create codespace on main"

2. **Run the Docker container:**
   ```bash
   # Build the image
   docker build -t personal-website .
   
   # Run the container
   docker run -d -p 5000:5000 --name personal-website-container personal-website
   ```

3. **Access your app:**
   - Codespaces will automatically forward port 5000
   - Click the "Ports" tab in VS Code
   - Click the "Open in Browser" button for port 5000

### Method 2: Direct Python Execution
For development with hot reload:

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Initialize database:**
   ```bash
   python -c "from DAL import init_db; init_db()"
   ```

3. **Run Flask development server:**
   ```bash
   flask --app app run --host=0.0.0.0 --port=5000 --debug
   ```

4. **Access your app:**
   - The port will be automatically forwarded
   - Open the forwarded URL in your browser

## 🔧 Codespaces Features

### Automatic Setup
- **Python 3.11** environment
- **Flask extensions** for VS Code
- **Port forwarding** for port 5000
- **Database initialization** on startup

### Development Tools
- **Python linting** with Pylint
- **Code formatting** with Black
- **Flask debugging** support
- **Git integration**

### Port Management
- **Port 5000** automatically forwarded
- **Public URL** available for sharing
- **Private URL** for development

## 📱 Accessing Your App

### In Codespaces:
1. **Ports Tab** - Shows forwarded ports
2. **Open in Browser** - Click to open your app
3. **Public URL** - Share with others
4. **Local URL** - For development

### Available Pages:
- **Home:** `http://localhost:5000/`
- **About:** `http://localhost:5000/about`
- **Projects:** `http://localhost:5000/projects`
- **Add Project:** `http://localhost:5000/projects/new`
- **Contact:** `http://localhost:5000/contact`
- **Resume:** `http://localhost:5000/resume`

## 🐳 Docker Commands in Codespaces

```bash
# Build the image
docker build -t personal-website .

# Run the container
docker run -d -p 5000:5000 --name personal-website-container personal-website

# View logs
docker logs personal-website-container

# Stop the container
docker stop personal-website-container

# Remove the container
docker rm personal-website-container
```

## 🔄 Development Workflow

### With Docker:
1. Make code changes
2. Rebuild: `docker build -t personal-website .`
3. Restart: `docker stop personal-website-container && docker rm personal-website-container && docker run -d -p 5000:5000 --name personal-website-container personal-website`

### With Flask Dev Server:
1. Make code changes
2. Flask auto-reloads (no restart needed)
3. View changes immediately in browser

## 🌐 Sharing Your App

### Public Access:
- Codespaces provides a **public URL**
- Share with others for testing
- No need to expose your local machine

### Collaboration:
- **Live Share** with team members
- **Real-time collaboration** on code
- **Shared development environment**

## 💡 Tips for Codespaces

1. **Use the Docker approach** for production-like environment
2. **Use Flask dev server** for rapid development
3. **Check the Ports tab** for forwarded ports
4. **Use the integrated terminal** for commands
5. **Leverage VS Code extensions** for Python/Flask development
