"""
Route-specific test suite for Flask application
Tests individual route functionality, parameters, and edge cases.
"""

import pytest
import json
from app import app
from DAL import insert_project, get_all_projects, delete_project


@pytest.fixture
def client():
    """Create a test client for the Flask application."""
    app.config['TESTING'] = True
    app.config['WTF_CSRF_ENABLED'] = False
    
    with app.test_client() as client:
        with app.app_context():
            # Initialize database for each test
            from DAL import init_db
            init_db()
        yield client


class TestHomeRoutes:
    """Test suite for home and main navigation routes."""
    
    def test_index_route(self, client):
        """Test the main index route."""
        response = client.get('/')
        assert response.status_code == 200
        assert response.content_type == 'text/html; charset=utf-8'
    
    def test_about_route(self, client):
        """Test the about page route."""
        response = client.get('/about')
        assert response.status_code == 200
        assert response.content_type == 'text/html; charset=utf-8'
    
    def test_resume_route(self, client):
        """Test the resume page route."""
        response = client.get('/resume')
        assert response.status_code == 200
        assert response.content_type == 'text/html; charset=utf-8'


class TestProjectRoutes:
    """Test suite for project-related routes."""
    
    def test_projects_list_route(self, client):
        """Test the projects listing route."""
        response = client.get('/projects')
        assert response.status_code == 200
        assert response.content_type == 'text/html; charset=utf-8'
    
    def test_new_project_get(self, client):
        """Test GET request to new project form."""
        response = client.get('/projects/new')
        assert response.status_code == 200
        assert b'form' in response.data.lower() or b'project' in response.data.lower()
    
    def test_new_project_post_valid(self, client):
        """Test POST request to new project with valid data."""
        project_data = {
            'title': 'Test Project Title',
            'description': 'This is a comprehensive test project description that meets the minimum length requirement.',
            'image_filename': 'test-project.jpg'
        }
        response = client.post('/projects/new', data=project_data, follow_redirects=True)
        assert response.status_code == 200
        # Should redirect to projects page after successful creation
    
    def test_new_project_post_invalid_title(self, client):
        """Test POST request with invalid title."""
        project_data = {
            'title': 'AB',  # Too short
            'description': 'This is a comprehensive test project description that meets the minimum length requirement.',
            'image_filename': 'test-project.jpg'
        }
        response = client.post('/projects/new', data=project_data)
        assert response.status_code == 200  # Should return to form with error
    
    def test_new_project_post_invalid_description(self, client):
        """Test POST request with invalid description."""
        project_data = {
            'title': 'Valid Project Title',
            'description': 'Short',  # Too short
            'image_filename': 'test-project.jpg'
        }
        response = client.post('/projects/new', data=project_data)
        assert response.status_code == 200  # Should return to form with error
    
    def test_new_project_post_missing_fields(self, client):
        """Test POST request with missing required fields."""
        project_data = {
            'title': 'Test Project',
            # Missing description and image_filename
        }
        response = client.post('/projects/new', data=project_data)
        assert response.status_code == 200  # Should return to form with error
    
    def test_delete_project_existing(self, client):
        """Test deleting an existing project."""
        # First create a project
        insert_project('Test Project', 'Test Description', 'test.jpg')
        projects = get_all_projects()
        project_id = projects[0]['id']
        
        # Now delete it
        response = client.post(f'/projects/{project_id}/delete', follow_redirects=True)
        assert response.status_code == 200
        
        # Verify project is deleted
        projects = get_all_projects()
        assert len(projects) == 0
    
    def test_delete_project_nonexistent(self, client):
        """Test deleting a non-existent project."""
        response = client.post('/projects/999/delete', follow_redirects=True)
        assert response.status_code == 200  # Should redirect to projects page


class TestContactRoutes:
    """Test suite for contact-related routes."""
    
    def test_contact_get(self, client):
        """Test GET request to contact page."""
        response = client.get('/contact')
        assert response.status_code == 200
        assert b'contact' in response.data.lower() or b'form' in response.data.lower()
    
    def test_contact_post_valid(self, client):
        """Test POST request with valid contact data."""
        contact_data = {
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'john.doe@example.com',
            'subject': 'Test Subject',
            'message': 'This is a comprehensive test message that meets the minimum length requirement.'
        }
        response = client.post('/contact', data=contact_data, follow_redirects=True)
        assert response.status_code == 200
        # Should redirect to thank you page
    
    def test_contact_post_invalid_message(self, client):
        """Test POST request with message too short."""
        contact_data = {
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'john.doe@example.com',
            'subject': 'Test Subject',
            'message': 'Short'  # Too short
        }
        response = client.post('/contact', data=contact_data)
        assert response.status_code == 200  # Should return to form with error
    
    def test_contact_post_missing_fields(self, client):
        """Test POST request with missing required fields."""
        contact_data = {
            'firstName': 'John',
            'lastName': 'Doe',
            # Missing email, subject, message
        }
        response = client.post('/contact', data=contact_data)
        assert response.status_code == 200  # Should return to form with error
    
    def test_thank_you_route(self, client):
        """Test the thank you page route."""
        response = client.get('/thank-you')
        assert response.status_code == 200


class TestErrorHandling:
    """Test suite for error handling routes."""
    
    def test_404_error(self, client):
        """Test 404 error handling."""
        response = client.get('/nonexistent-page')
        assert response.status_code == 404
    
    def test_404_error_content(self, client):
        """Test 404 error page content."""
        response = client.get('/nonexistent-page')
        assert b'404' in response.data or b'not found' in response.data.lower()
    
    def test_invalid_project_id_delete(self, client):
        """Test deleting project with invalid ID."""
        response = client.post('/projects/invalid/delete')
        assert response.status_code == 404  # Should return 404 for invalid ID


class TestRouteParameters:
    """Test suite for route parameters and edge cases."""
    
    def test_project_id_parameter_types(self, client):
        """Test different project ID parameter types."""
        # Test with string ID
        response = client.post('/projects/abc/delete')
        assert response.status_code == 404
        
        # Test with negative ID
        response = client.post('/projects/-1/delete')
        assert response.status_code == 302  # Should redirect
    
    def test_route_methods(self, client):
        """Test that routes only accept appropriate HTTP methods."""
        # Test GET on POST-only route
        response = client.get('/projects/1/delete')
        assert response.status_code == 405  # Method not allowed
        
        # Test POST on GET-only route
        response = client.post('/')
        assert response.status_code == 405  # Method not allowed


class TestContentTypes:
    """Test suite for content type handling."""
    
    def test_html_content_type(self, client):
        """Test that routes return HTML content type."""
        routes = ['/', '/about', '/resume', '/projects', '/contact', '/thank-you']
        
        for route in routes:
            response = client.get(route)
            assert response.content_type == 'text/html; charset=utf-8'
    
    def test_redirect_after_post(self, client):
        """Test that POST requests redirect appropriately."""
        # Test contact form redirect
        contact_data = {
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'john@example.com',
            'subject': 'Test',
            'message': 'This is a test message with sufficient length.'
        }
        response = client.post('/contact', data=contact_data)
        assert response.status_code == 302  # Should redirect
        
        # Test project form redirect
        project_data = {
            'title': 'Test Project',
            'description': 'This is a test project description with sufficient length.',
            'image_filename': 'test.jpg'
        }
        response = client.post('/projects/new', data=project_data)
        assert response.status_code == 302  # Should redirect


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
