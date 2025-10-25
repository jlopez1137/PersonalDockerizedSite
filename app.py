"""
Personal Website Flask Application
A modern, responsive personal portfolio website built with Flask and Bootstrap 5.
"""

from flask import Flask, render_template, request, redirect, url_for, flash
import os
from DAL import init_db, get_all_projects, insert_project, delete_project

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

# Enable debug mode by default for development
app.config['DEBUG'] = True

# Initialize database on startup
init_db()

@app.route('/')
def index():
    """Home page - main landing page with hero section and quick links."""
    return render_template('index.html')

@app.route('/about')
def about():
    """About page - personal information, skills, and background."""
    return render_template('about.html')

@app.route('/resume')
def resume():
    """Resume page - professional experience, education, and skills."""
    return render_template('resume.html')

@app.route('/projects')
def projects():
    """Projects page - portfolio of work and GitHub repositories."""
    projects_list = get_all_projects()
    return render_template('projects.html', projects=projects_list)

@app.route('/projects/new', methods=['GET', 'POST'])
def new_project():
    """Add new project page - form to create new projects."""
    if request.method == 'POST':
        # Handle form submission
        title = request.form.get('title', '').strip()
        description = request.form.get('description', '').strip()
        image_filename = request.form.get('image_filename', '').strip()
        
        # Basic validation
        if not all([title, description, image_filename]):
            flash('All fields are required.', 'error')
            return render_template('project_form.html', 
                                 title=title, 
                                 description=description, 
                                 image_filename=image_filename)
        
        if len(title) < 3:
            flash('Title must be at least 3 characters long.', 'error')
            return render_template('project_form.html', 
                                 title=title, 
                                 description=description, 
                                 image_filename=image_filename)
        
        if len(description) < 10:
            flash('Description must be at least 10 characters long.', 'error')
            return render_template('project_form.html', 
                                 title=title, 
                                 description=description, 
                                 image_filename=image_filename)
        
        try:
            # Insert the new project
            insert_project(title, description, image_filename)
            flash('Project added successfully!', 'success')
            return redirect(url_for('projects'))
        except Exception as e:
            flash(f'Error adding project: {str(e)}', 'error')
            return render_template('project_form.html', 
                                 title=title, 
                                 description=description, 
                                 image_filename=image_filename)
    
    return render_template('project_form.html')

@app.route('/projects/<int:project_id>/delete', methods=['POST'])
def delete_project_route(project_id):
    """Delete a project by ID."""
    try:
        success = delete_project(project_id)
        if success:
            flash('Project deleted successfully!', 'success')
        else:
            flash('Project not found.', 'error')
    except Exception as e:
        flash(f'Error deleting project: {str(e)}', 'error')
    
    return redirect(url_for('projects'))

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact page - contact form and information."""
    if request.method == 'POST':
        # Handle form submission
        first_name = request.form.get('firstName', '').strip()
        last_name = request.form.get('lastName', '').strip()
        email = request.form.get('email', '').strip()
        subject = request.form.get('subject', '').strip()
        message = request.form.get('message', '').strip()
        
        # Basic validation
        if not all([first_name, last_name, email, subject, message]):
            flash('All fields are required.', 'error')
            return render_template('contact.html')
        
        if len(message) < 10:
            flash('Message must be at least 10 characters long.', 'error')
            return render_template('contact.html')
        
        # In a real application, you would send an email or save to database here
        # For now, we'll just redirect to thank you page
        flash('Thank you for your message! I\'ll get back to you soon.', 'success')
        return redirect(url_for('thank_you'))
    
    return render_template('contact.html')

@app.route('/thank-you')
def thank_you():
    """Thank you page - confirmation after form submission."""
    return render_template('thankyou.html')

# Error handlers
@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    return render_template('500.html'), 500

if __name__ == '__main__':
    # Run the Flask development server
    app.run(debug=True, host='0.0.0.0', port=5000)
