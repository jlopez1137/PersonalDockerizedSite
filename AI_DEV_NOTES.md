# AI Development Notes

This file contains development notes and implementation details for features added to the personal website.

## 2025-01-17 – Added SQLite DAL and Projects pages

### Overview
Added a SQLite-backed Data Access Layer (DAL) and two new pages for project management:
- `/projects` - displays projects from database in an HTML table
- `/projects/new` - form to add new projects

### Files Created/Changed

#### New Files:
- `DAL.py` - Data Access Layer with SQLite operations
- `templates/project_form.html` - Form template for adding projects
- `static/images/` - Directory for project images
- `.gitignore` - Git ignore rules for Python/Flask projects
- `AI_DEV_NOTES.md` - This development notes file

#### Modified Files:
- `app.py` - Added DAL import, database initialization, and new routes
- `templates/base.html` - Added "Add Project" navigation link
- `templates/projects.html` - Added database-driven projects table
- `static/css/styles.css` - Added table and form styles
- `README.md` - Updated with database and project management documentation

### Database Schema
```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_filename TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Key Features Implemented

#### Data Access Layer (DAL.py)
- `init_db()` - Creates database and table if not exists
- `get_all_projects()` - Retrieves all projects ordered by creation date
- `insert_project()` - Adds new project with parameterized queries
- `get_project_by_id()` - Retrieves specific project (for future use)
- `delete_project()` - Deletes project by ID (for future use)
- Uses context managers for safe database connections
- Implements `sqlite3.Row` factory for dictionary-like access

#### Routes Added
- `GET /projects` - Displays projects table with database data
- `GET /projects/new` - Shows add project form
- `POST /projects/new` - Processes form submission with validation

#### Form Validation
- Required field validation (title, description, image_filename)
- Minimum length validation (title: 3 chars, description: 10 chars)
- Flash messages for success/error feedback
- Form re-rendering with previous values on validation errors

#### Image Handling
- Images served from `/static/images/` directory
- Form accepts just filename (e.g., "myapp.png")
- Images displayed as 80px height thumbnails in table
- No upload handling - manual file placement required

### CSS Enhancements
- Responsive table with hover effects
- Form styling with proper spacing and validation states
- Dark mode support for all new components
- Mobile-responsive design for tables and forms
- Print-friendly styles

### Security Features
- Parameterized SQL queries to prevent injection
- Input validation and sanitization
- CSRF protection via Flask's built-in features
- Proper error handling with user-friendly messages

### Manual Test Checklist
1. ✅ Place an image file into `/static/images/` directory
2. ✅ Visit `/projects/new` and submit a project referencing that filename
3. ✅ Confirm project appears on `/projects` page with image rendering
4. ✅ Add a second project and confirm table updates immediately
5. ✅ Test form validation with empty fields and short inputs
6. ✅ Verify flash messages display correctly
7. ✅ Test responsive design on mobile devices
8. ✅ Confirm dark mode styling works for new components

### Future Enhancements
- Image upload functionality
- Project editing functionality
- Image resizing/optimization
- Project categories/tags
- Search and filtering
- Pagination for large project lists
- Admin authentication for project management

### Technical Notes
- Database file (`projects.db`) is auto-created on first app startup
- All database operations use context managers for proper connection handling
- Form uses Bootstrap 5 styling with custom CSS enhancements
- Table is responsive with horizontal scroll on mobile
- Images are served via Flask's static file serving
- Flash messages integrate with existing Bootstrap alert system

## 2025-01-17 – Added Project Delete Feature

### Overview
Added the ability to delete projects from the database with a confirmation dialog.

### Files Modified:
- `app.py` - Added delete route and import
- `templates/projects.html` - Added delete buttons and confirmation JavaScript
- `static/css/styles.css` - Added delete button styling
- `AI_DEV_NOTES.md` - Updated documentation

### New Route:
- `POST /projects/<int:project_id>/delete` - Deletes a project by ID

### Features Implemented:
- Delete button in each project row
- JavaScript confirmation dialog with project title
- Flash messages for success/error feedback
- Responsive delete button styling
- Dark mode support for delete buttons
- Proper error handling and validation

### Security Features:
- POST method only (prevents accidental GET deletions)
- Project ID validation
- Confirmation dialog prevents accidental deletions
- Proper error handling with user feedback

### Manual Test Checklist:
1. ✅ Add a project via `/projects/new`
2. ✅ View project in table at `/projects`
3. ✅ Click delete button and confirm deletion
4. ✅ Verify project is removed from database
5. ✅ Test confirmation dialog cancellation
6. ✅ Verify flash messages display correctly
7. ✅ Test responsive design on mobile
8. ✅ Confirm dark mode styling works
