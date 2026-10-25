from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Automatically finds library.db right where main.py lives
DB_PATH = Path(__file__).resolve().parent / "library.db"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/api/books")
def get_books(year: int, sem: int, dept: str):
    conn = get_db_connection()
    query = '''
        SELECT b.title, b.author, b.subject, b.rack_location, 
               b.total_copies, b.available_copies, b.has_pdf
        FROM books b
        JOIN curriculum_mapping cm ON b.book_id = cm.book_id
        WHERE cm.year = ? AND cm.semester = ? AND cm.department = ?
    '''
    cursor = conn.cursor()
    cursor.execute(query, (year, sem, dept))
    rows = cursor.fetchall()
    conn.close()

    books = []
    for row in rows:
        books.append({
            "title": row["title"],
            "author": row["author"],
            "subject": row["subject"],
            "rack": row["rack_location"],
            "total": row["total_copies"],
            "avail": row["available_copies"],
            "pdf": bool(row["has_pdf"])
        })
    return books