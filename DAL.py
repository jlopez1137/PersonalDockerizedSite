"""
Data Access Layer for Personal Website
Handles SQLite database operations for projects.
"""

import sqlite3
import os
from typing import List, Dict

# Database configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "projects.db")

def init_db() -> None:
    """
    Initialize the database and create the projects table if it doesn't exist.
    """
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Create projects table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                image_filename TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        conn.commit()

def get_all_projects() -> List[Dict]:
    """
    Retrieve all projects from the database.
    
    Returns:
        List of dictionaries containing project data
    """
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT id, title, description, image_filename, created_at
            FROM projects
            ORDER BY created_at DESC
        """)
        
        rows = cursor.fetchall()
        return [dict(row) for row in rows]

def insert_project(title: str, description: str, image_filename: str) -> None:
    """
    Insert a new project into the database.
    
    Args:
        title: Project title
        description: Project description
        image_filename: Name of the image file (without path)
    """
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO projects (title, description, image_filename)
            VALUES (?, ?, ?)
        """, (title.strip(), description.strip(), image_filename.strip()))
        
        conn.commit()

def get_project_by_id(project_id: int) -> Dict:
    """
    Retrieve a specific project by ID.
    
    Args:
        project_id: The ID of the project to retrieve
        
    Returns:
        Dictionary containing project data or None if not found
    """
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT id, title, description, image_filename, created_at
            FROM projects
            WHERE id = ?
        """, (project_id,))
        
        row = cursor.fetchone()
        return dict(row) if row else None

def delete_project(project_id: int) -> bool:
    """
    Delete a project by ID.
    
    Args:
        project_id: The ID of the project to delete
        
    Returns:
        True if project was deleted, False if not found
    """
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM projects WHERE id = ?", (project_id,))
        conn.commit()
        
        return cursor.rowcount > 0
