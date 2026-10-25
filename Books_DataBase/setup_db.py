import sqlite3

# Connect to SQLite database (creates library.db automatically)
conn = sqlite3.connect('library.db')
cursor = conn.cursor()

# 1. Create Tables
cursor.execute('''
CREATE TABLE IF NOT EXISTS books (
    book_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    subject TEXT NOT NULL,
    rack_location TEXT NOT NULL,
    total_copies INTEGER NOT NULL,
    available_copies INTEGER NOT NULL,
    has_pdf INTEGER DEFAULT 0
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS curriculum_mapping (
    mapping_id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    department TEXT NOT NULL,
    book_id INTEGER,
    FOREIGN KEY (book_id) REFERENCES books(book_id)
)
''')

# Clear existing data if re-run
cursor.execute('DELETE FROM curriculum_mapping')
cursor.execute('DELETE FROM books')

# 2. Add Realistic College Textbooks
books_data = [
    # 1st Year CSE
    ('Engineering Mathematics-I', 'B.S. Grewal', 'Mathematics', 'Rack A, Shelf 1', 25, 14, 1),
    ('Programming in C', 'E. Balagurusamy', 'Programming', 'Rack A, Shelf 3', 30, 8, 1),
    ('Engineering Physics', 'D.K. Bhattacharya', 'Physics', 'Rack B, Shelf 2', 20, 5, 0),
    
    # 2nd Year CSE (Sem 3 & 4)
    ('Data Structures and Algorithms', 'Mark Allen Weiss', 'DSA', 'Rack C, Shelf 2', 15, 4, 1),
    ('Operating System Concepts', 'Silberschatz, Galvin', 'OS', 'Rack C, Shelf 4', 12, 1, 1),
    ('Discrete Mathematics and Its Applications', 'Kenneth Rosen', 'Maths', 'Rack D, Shelf 1', 10, 0, 0),
    ('Database System Concepts', 'Abraham Silberschatz', 'DBMS', 'Rack D, Shelf 3', 14, 6, 1),
    ('Computer Organization and Architecture', 'William Stallings', 'COA', 'Rack E, Shelf 1', 12, 3, 1),
    ('Object-Oriented Programming in C++', 'Robert Lafore', 'OOP', 'Rack E, Shelf 3', 20, 9, 1),

    # 3rd Year CSE (Sem 5 & 6)
    ('Computer Networks', 'Andrew S. Tanenbaum', 'Networks', 'Rack F, Shelf 2', 15, 5, 1),
    ('Design and Analysis of Algorithms', 'Cormen, Leiserson', 'DAA', 'Rack F, Shelf 4', 12, 2, 1),
    ('Artificial Intelligence: A Modern Approach', 'Stuart Russell, Peter Norvig', 'AI', 'Rack G, Shelf 1', 10, 0, 1),
    ('Software Engineering', 'Ian Sommerville', 'SE', 'Rack G, Shelf 3', 14, 7, 1),

    # 4th Year CSE (Sem 7 & 8)
    ('Machine Learning', 'Tom Mitchell', 'ML', 'Rack H, Shelf 1', 8, 1, 1),
    ('Cloud Computing Infrastructure', 'Rajkumar Buyya', 'Cloud', 'Rack H, Shelf 3', 10, 4, 0)
]

cursor.executemany('''
INSERT INTO books (title, author, subject, rack_location, total_copies, available_copies, has_pdf)
VALUES (?, ?, ?, ?, ?, ?, ?)
''', books_data)

# 3. Map Books to Curriculum (Year, Semester, Dept)
mapping_data = [
    # Sem 1 & 2
    (1, 1, 'CSE', 1), (1, 1, 'CSE', 2), (1, 2, 'CSE', 3),
    # Sem 3 & 4 (2nd Year)
    (2, 3, 'CSE', 4), (2, 3, 'CSE', 5), (2, 3, 'CSE', 6),
    (2, 4, 'CSE', 7), (2, 4, 'CSE', 8), (2, 4, 'CSE', 9),
    # Sem 5 & 6 (3rd Year)
    (3, 5, 'CSE', 10), (3, 5, 'CSE', 11),
    (3, 6, 'CSE', 12), (3, 6, 'CSE', 13),
    # Sem 7 & 8 (4th Year)
    (4, 7, 'CSE', 14), (4, 7, 'CSE', 15)
]

cursor.executemany('''
INSERT INTO curriculum_mapping (year, semester, department, book_id)
VALUES (?, ?, ?, ?)
''', mapping_data)

conn.commit()
conn.close()
print("✅ library.db successfully created and seeded with textbooks!")