# Personal Website Flask Application

A modern, responsive personal portfolio website built with Flask and Bootstrap 5. This project showcases Joaquin Lopez's work, skills, and professional background as an MSIS student at IU Kelley.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Modern UI**: Clean, professional design with dark/light theme support
- **Contact Form**: Functional contact form with validation
- **Portfolio Showcase**: Project gallery with GitHub integration
- **Database-Driven Projects**: SQLite-backed project management system
- **Add Projects**: Form to add new projects with image support
- **Resume Display**: Professional resume with downloadable PDF option
- **Accessibility**: WCAG compliant with proper ARIA labels and semantic HTML
- **Performance**: Optimized assets and efficient loading

## 🛠️ Technology Stack

- **Backend**: Flask 3.0+
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Bootstrap 5.3.2
- **Database**: SQLite with Data Access Layer (DAL)
- **Deployment**: Gunicorn-ready for production

## 📁 Project Structure

```
PersonalWebsiteFlaskUpdate/
├── app.py                 # Main Flask application
├── DAL.py                 # Data Access Layer for SQLite
├── projects.db            # SQLite database (auto-created)
├── requirements.txt       # Python dependencies
├── .gitignore            # Git ignore rules
├── README.md             # This file
├── AI_DEV_NOTES.md       # Development notes
├── templates/            # Jinja2 templates
│   ├── base.html         # Base template with Bootstrap navbar
│   ├── index.html        # Homepage
│   ├── about.html        # About page
│   ├── resume.html       # Resume page
│   ├── projects.html     # Projects portfolio with database table
│   ├── project_form.html # Add new project form
│   ├── contact.html      # Contact form
│   ├── thankyou.html     # Thank you page
│   ├── 404.html          # 404 error page
│   └── 500.html          # 500 error page
├── static/               # Static assets
│   ├── css/
│   │   └── styles.css    # Custom styles with table/form styles
│   ├── js/
│   │   ├── main.js       # Main JavaScript
│   │   ├── cdn-config.js # CDN configuration
│   │   ├── UserModel.js  # User model
│   │   ├── FormView.js   # Form view
│   │   └── FormPresenter.js # Form presenter
│   ├── img/              # Images and assets
│   └── images/           # Project images directory
└── scripts/              # Setup scripts
    ├── setup_venv.sh     # Linux/macOS setup
    └── setup_venv.ps1    # Windows setup
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Git (for version control)

### Option 1: Automated Setup (Recommended)

#### For Windows (PowerShell):
```powershell
# Run the setup script
.\scripts\setup_venv.ps1

# If you get execution policy errors, run this first:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### For Linux/macOS:
```bash
# Make the script executable
chmod +x scripts/setup_venv.sh

# Run the setup script
./scripts/setup_venv.sh
```

### Option 2: Manual Setup

1. **Clone the repository** (if from GitHub):
   ```bash
   git clone <YOUR_GITHUB_URL>
   cd PersonalWebsiteFlaskUpdate
   ```

2. **Create a virtual environment**:
   ```bash
   # Windows
   python -m venv .venv
   .\.venv\Scripts\activate

   # Linux/macOS
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```bash
   flask --app app run
   ```

5. **Open your browser** to `http://localhost:5000`

## 📊 Database & Project Management

### SQLite Database
The application uses SQLite for storing project data:
- **Database file**: `projects.db` (auto-created on first run)
- **Table**: `projects` with columns: id, title, description, image_filename, created_at
- **Data Access Layer**: `DAL.py` provides safe, parameterized database operations

### Adding Projects
1. **Place images**: Add your project images to `/static/images/` directory
2. **Add project**: Visit `/projects/new` to add a new project
3. **Fill form**: Enter title, description, and image filename
4. **Submit**: Project appears immediately in the projects table at `/projects`

### Project Images
- Images are stored in `/static/images/` directory
- Form accepts just the filename (e.g., "myapp.png")
- Images are displayed as thumbnails in the projects table
- No upload handling - manually place files in the directory

## 🌐 Running the Application

### Development Mode
```bash
# Activate virtual environment first
# Windows: .\.venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate

# Run with Flask development server
flask --app app run

# Or with Python directly
python app.py
```

### Production Mode
```bash
# Using Gunicorn (recommended for production)
gunicorn -w 4 -b 0.0.0.0:8000 app:app

# Or with Flask's built-in server (not recommended for production)
flask --app app run --host=0.0.0.0 --port=8000
```

## 📱 Responsive Design

The website is fully responsive and works on:
- **Desktop**: Full navigation and layout
- **Tablet**: Optimized grid layouts
- **Mobile**: Collapsible navigation and touch-friendly interface

### Bootstrap 5 Features Used:
- Responsive grid system
- Collapsible navbar (`navbar-expand-md`)
- Utility classes for spacing and layout
- Form validation and styling
- Alert components for flash messages

## 🎨 Customization

### Adding New Pages
1. Create a new route in `app.py`:
   ```python
   @app.route('/new-page')
   def new_page():
       return render_template('new_page.html')
   ```

2. Create the template in `templates/new_page.html`:
   ```html
   {% extends "base.html" %}
   
   {% block title %}New Page — Joaquin Lopez{% endblock %}
   
   {% block content %}
   <div class="container">
       <h1>New Page Content</h1>
       <!-- Your content here -->
   </div>
   {% endblock %}
   ```

3. Add navigation link in `templates/base.html`

### Styling
- Main styles: `static/css/styles.css`
- Bootstrap 5: CDN (can be changed to local if needed)
- Custom CSS variables for theming
- Dark/light mode support

### JavaScript
- Main functionality: `static/js/main.js`
- Form handling: MVC pattern with separate files
- CDN image management: `static/js/cdn-config.js`

## 🚀 Deployment

### GitHub Pages (Static)
This is a Flask application and cannot be deployed directly to GitHub Pages. Consider:
- Converting to a static site generator
- Using GitHub Actions to build and deploy
- Deploying to a Flask-compatible platform

### Heroku
1. Create a `Procfile`:
   ```
   web: gunicorn app:app
   ```

2. Deploy:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### DigitalOcean App Platform
1. Connect your GitHub repository
2. Select Python as the runtime
3. Set build command: `pip install -r requirements.txt`
4. Set run command: `gunicorn app:app`

### VPS/Server
1. Install Python, pip, and nginx
2. Clone repository and set up virtual environment
3. Install dependencies
4. Configure nginx as reverse proxy
5. Use systemd or supervisor to manage the Flask app

## 🔧 Configuration

### Environment Variables
Create a `.env` file for local development:
```env
SECRET_KEY=your-secret-key-here
FLASK_ENV=development
FLASK_DEBUG=True
```

### Production Settings
- Set `FLASK_ENV=production`
- Use a strong `SECRET_KEY`
- Configure proper logging
- Set up SSL/HTTPS
- Use a production WSGI server (Gunicorn)

## 📝 GitHub Setup

To push this project to GitHub:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial Flask scaffold"

# Rename default branch to main
git branch -M main

# Add your GitHub repository as origin
git remote add origin <YOUR_GITHUB_URL>

# Push to GitHub
git push -u origin main
```

Replace `<YOUR_GITHUB_URL>` with your actual GitHub repository URL.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m "Add feature"`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is open source and available 

## 📞 Contact

**Joaquin Lopez**
- Email: [lopejo@iu.edu](mailto:lopejo@iu.edu)
- LinkedIn: [linkedin.com/in/joaquinolopez](https://www.linkedin.com/in/joaquinolopez)
- GitHub: [github.com/jlopez1137](https://github.com/jlopez1137)

## 🙏 Acknowledgments

- Bootstrap 5 for the responsive framework
- Flask team for the excellent web framework
- IU Kelley School of Business for academic support

---

**Note**: This is a personal portfolio website. Feel free to use it as a template for your own projects, but please customize the content, styling, and personal information to reflect your own brand and experience.
