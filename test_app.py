"""
Test suite for Flask application
Tests basic app functionality, configuration, and error handling.
"""

import pytest
import os
import tempfile
import sqlite3
from app import app, init_db
from DAL import get_all_projects, insert_project, delete_project


@pytest.fixture
def client():
    """Create a test client for the Flask application."""
    # Create a temporary database for testing
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    app.config['WTF_CSRF_ENABLED'] = False
    
    with app.test_client() as client:
        with app.app_context():
            init_db()
        yield client
    
    os.close(db_fd)
    os.unlink(app.config['DATABASE'])


@pytest.fixture
def app_context():
    """Create an application context for testing."""
    # Set testing configuration
    app.config['TESTING'] = True
    with app.app_context():
        yield app


def test_app_creation(app_context):
    """Test that the Flask app is created correctly."""
    assert app is not None
    assert app.config['TESTING'] is True


def test_app_configuration(app_context):
    """Test app configuration settings."""
    assert app.secret_key is not None
    assert app.config['DEBUG'] is True


def test_database_initialization(app_context):
    """Test that the database is initialized correctly."""
    # Check if projects table exists
    with sqlite3.connect(app.config.get('DATABASE', 'projects.db')) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='projects'")
        result = cursor.fetchone()
        assert result is not None


def test_index_route(client):
    """Test the home page route."""
    response = client.get('/')
    assert response.status_code == 200
    assert b'Joaquin Lopez' in response.data or b'Personal' in response.data


def test_about_route(client):
    """Test the about page route."""
    response = client.get('/about')
    assert response.status_code == 200


def test_resume_route(client):
    """Test the resume page route."""
    response = client.get('/resume')
    assert response.status_code == 200


def test_projects_route(client):
    """Test the projects page route."""
    response = client.get('/projects')
    assert response.status_code == 200


def test_contact_route_get(client):
    """Test the contact page GET request."""
    response = client.get('/contact')
    assert response.status_code == 200


def test_contact_route_post_valid(client):
    """Test the contact page POST request with valid data."""
    response = client.post('/contact', data={
        'firstName': 'John',
        'lastName': 'Doe',
        'email': 'john@example.com',
        'subject': 'Test Subject',
        'message': 'This is a test message with enough characters.'
    })
    assert response.status_code == 302  # Redirect after successful submission


def test_contact_route_post_invalid(client):
    """Test the contact page POST request with invalid data."""
    response = client.post('/contact', data={
        'firstName': 'John',
        'lastName': 'Doe',
        'email': 'john@example.com',
        'subject': 'Test Subject',
        'message': 'Short'  # Too short
    })
    assert response.status_code == 200  # Should return to form with error


def test_new_project_route_get(client):
    """Test the new project page GET request."""
    response = client.get('/projects/new')
    assert response.status_code == 200


def test_new_project_route_post_valid(client):
    """Test the new project page POST request with valid data."""
    response = client.post('/projects/new', data={
        'title': 'Test Project',
        'description': 'This is a test project description that is long enough.',
        'image_filename': 'test-image.jpg'
    })
    assert response.status_code == 302  # Redirect after successful submission


def test_new_project_route_post_invalid(client):
    """Test the new project page POST request with invalid data."""
    response = client.post('/projects/new', data={
        'title': 'AB',  # Too short
        'description': 'Short desc',  # Too short
        'image_filename': 'test.jpg'
    })
    assert response.status_code == 200  # Should return to form with error


def test_thank_you_route(client):
    """Test the thank you page route."""
    response = client.get('/thank-you')
    assert response.status_code == 200


def test_404_error_handler(client):
    """Test the 404 error handler."""
    response = client.get('/nonexistent-page')
    assert response.status_code == 404


def test_database_operations(app_context):
    """Test database operations."""
    # Get current projects count
    initial_count = len(get_all_projects())
    
    # Test inserting a project
    insert_project('Test Project', 'Test Description', 'test.jpg')
    projects = get_all_projects()
    assert len(projects) == initial_count + 1
    
    # Find our test project (should be the first one since it's newest)
    test_project = None
    for project in projects:
        if project['title'] == 'Test Project':
            test_project = project
            break
    
    assert test_project is not None
    assert test_project['title'] == 'Test Project'
    
    # Test deleting the test project
    project_id = test_project['id']
    success = delete_project(project_id)
    assert success is True
    
    # Verify project is deleted (should be back to initial count)
    projects = get_all_projects()
    assert len(projects) == initial_count


def test_app_error_handling(client):
    """Test that the app handles errors gracefully."""
    # Test with invalid project ID for deletion
    response = client.post('/projects/999/delete')
    assert response.status_code == 302  # Should redirect to projects page


if __name__ == '__main__':
    pytest.main([__file__])
