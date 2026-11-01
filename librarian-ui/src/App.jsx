
import { useState } from 'react'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [searchTerm, setSearchTerm] = useState('')
    const [studentId, setStudentId] = useState('')
  const [studentName, setStudentName] = useState('')
  const [selectedBook, setSelectedBook] = useState('')
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  const calculateDueDate = (date) => {
    if (!date) return ''

    const due = new Date(date + 'T00:00:00')
    due.setDate(due.getDate() + 14)

    return due.toISOString().split('T')[0]
  }

  const dueDate = calculateDueDate(issueDate)
  const [issuedBooks, setIssuedBooks] = useState([])
  const [message, setMessage] = useState('')
  const handleIssueBook = () => {
  // Check whether all fields are filled
  if (!studentId || !studentName || !selectedBook || !issueDate) {
    setMessage('Please fill in all the required fields.')
    return
  }

  // Find the selected book from our books array
  const book = books.find(
    (book) => book.id === Number(selectedBook)
  )

  // Check book availability
  if (!book || book.available <= 0) {
    setMessage('This book is not available.')
    return
  }

  // Create a new issue record
  const newIssue = {
    studentId: studentId,
    studentName: studentName,
    bookTitle: book.title,
    issueDate: issueDate,
    dueDate: dueDate,
    status: 'Issued'
  }

  // Store the new issue record
  setIssuedBooks([...issuedBooks, newIssue])
  setBooks(
  books.map((b) =>
    b.id === book.id
      ? { ...b, available: b.available - 1 }
      : b
  )
)

  // Show success message
  setMessage('Book issued successfully!')

  
}
const handleReturnBook = (index) => {
  const returnedBook = issuedBooks[index]

  if (returnedBook.status === 'Returned') {
    return
  }

  const updatedBooks = issuedBooks.map((book, i) => {
    if (i === index) {
      return {
        ...book,
        status: 'Returned'
      }
    }

    return book
  })

  setIssuedBooks(updatedBooks)

  const originalBook = books.find(
    (b) => b.title === returnedBook.bookTitle
  )

  if (originalBook) {
    setBooks(
      books.map((b) =>
        b.id === originalBook.id
          ? { ...b, available: b.available + 1 }
          : b
      )
    )
  }
}

const [books, setBooks] = useState([
  {
    id: 1,
    title: 'Data Structures and Algorithms',
    author: 'Mark Allen Weiss',
    subject: 'Data Structures',
    rack: 'A-01',
    total: 5,
    available: 4
  },
  {
    id: 2,
    title: 'Operating System Concepts',
    author: 'Abraham Silberschatz',
    subject: 'Operating Systems',
    rack: 'A-02',
    total: 5,
    available: 3
  },
  {
    id: 3,
    title: 'Database System Concepts',
    author: 'Henry F. Korth',
    subject: 'DBMS',
    rack: 'B-01',
    total: 4,
    available: 0
  },
  {
    id: 4,
    title: 'Computer Networks',
    author: 'Andrew Tanenbaum',
    subject: 'Computer Networks',
    rack: 'B-02',
    total: 6,
    available: 5
  },
  {
    id: 5,
    title: 'The C++ Programming Language',
    author: 'Bjarne Stroustrup',
    subject: 'C++ Programming',
    rack: 'C-01',
    total: 4,
    available: 2
  },
  {
    id: 6,
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    subject: 'Algorithms',
    rack: 'C-02',
    total: 5,
    available: 5
  },
  {
    id: 7,
    title: 'Computer Organization',
    author: 'Carl Hamacher',
    subject: 'COA',
    rack: 'D-01',
    total: 3,
    available: 2
  },
  {
    id: 8,
    title: 'Artificial Intelligence',
    author: 'Stuart Russell',
    subject: 'Artificial Intelligence',
    rack: 'D-02',
    total: 4,
    available: 1
  }
])

const filteredBooks = books.filter((book) =>
  `${book.title} ${book.author} ${book.subject}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
)

  const menuItems = [
    { name: 'Dashboard', icon: '▦' },
    { name: 'Book Catalogue', icon: '▤' },
    { name: 'Issue Book', icon: '＋' },
    { name: 'Issued Books', icon: '▣' }
  ]

  const stats = [
    { title: 'Total Books', number: '150', icon: '▤' },
    { title: 'Available Books', number: '115', icon: '✓' },
    { title: 'Issued Books', number: '35', icon: '↗' },
    { title: 'Overdue Books', number: '04', icon: '◷' }
  ]

  return (
    <div className="app-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">▤</span>
          <div>
            <h2>Libra<span>ry</span></h2>
            <p>MANAGEMENT SYSTEM</p>
          </div>
        </div>

        <p className="menu-heading">MAIN MENU</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`menu-item ${activePage === item.name ? 'active' : ''}`}
              onClick={() => setActivePage(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <p>LIBRARY ADMIN PANEL</p>
          <span>Version 1.0</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="topbar">
          <div>
            <h1>{activePage}</h1>
            <p>
  {activePage === 'Dashboard' &&
    "Welcome back! Here's your library overview."}

  {activePage === 'Book Catalogue' &&
    "Manage and view all books in your library."}

  {activePage === 'Issue Book' &&
    "Issue books to students and record borrowing details."}

  {activePage === 'Issued Books' &&
    "Track all issued books and student borrowing records."}
</p>
            
          </div>

          <div className="profile">
            <div className="profile-icon">L</div>
            <div>
              <h4>Librarian</h4>
              <p>Administrator</p>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        {activePage === 'Dashboard' && (
          <section className="page-content">

            <div className="welcome-section">
              <div>
                <h2>Library Overview</h2>
                <p>Here's what's happening in your library today.</p>
              </div>
              <span className="date-label">Library Administration</span>
            </div>

            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.title}>
                  <div className="stat-top">
                    <p>{stat.title}</p>
                    <span className="stat-icon">{stat.icon}</span>
                  </div>
                  <h2>{stat.number}</h2>
                  <p className="stat-description">Current library records</p>
                </div>
              ))}
            </div>

            <div className="recent-section">
              <div className="section-heading">
                <div>
                  <h2>Recent Book Issues</h2>
                  <p>Latest books issued to students</p>
                </div>
                <button
                  className="view-button"
                  onClick={() => setActivePage('Issued Books')}
                >
                  View All
                </button>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Book Name</th>
                      <th>Student Name</th>
                      <th>Student ID</th>
                      <th>Issue Date & Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Data Structures</td>
                      <td>Rahul Sharma</td>
                      <td>1025</td>
                      <td>01 Nov 2026, 10:30 AM</td>
                      <td><span className="status issued">Issued</span></td>
                    </tr>
                    <tr>
                      <td>Database Management</td>
                      <td>Priya Singh</td>
                      <td>1042</td>
                      <td>01 Nov 2026, 11:00 AM</td>
                      <td><span className="status issued">Issued</span></td>
                    </tr>
                    <tr>
                      <td>Operating Systems</td>
                      <td>Aman Verma</td>
                      <td>1088</td>
                      <td>31 Oct 2026, 02:15 PM</td>
                      <td><span className="status issued">Issued</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        )}

        
        {/* Book Catalogue */}
        {activePage === 'Book Catalogue' && (
          <section className="page-content">

          

            {/* Catalogue statistics */}
            <div className="catalogue-stats">
              <div className="catalogue-stat-card">
                <p>Total Book Titles</p>
                <h2>{books.length}</h2>
              </div>

              <div className="catalogue-stat-card">
                <p>Available Titles</p>
                <h2>{books.filter(book => book.available > 0).length}</h2>
              </div>

              <div className="catalogue-stat-card">
                <p>Total Copies</p>
                <h2>{books.reduce((sum, book) => sum + book.total, 0)}</h2>
              </div>

              <div className="catalogue-stat-card">
                <p>Available Copies</p>
                <h2>{books.reduce((sum, book) => sum + book.available, 0)}</h2>
              </div>
            </div>

            {/* Search bar */}
            <div className="catalogue-section">
              <div className="catalogue-heading">
                <div>
                  <h2>All Books</h2>
                  <p>Search and view library inventory</p>
                </div>

                <div className="search-box">
                  <span>⌕</span>
                  <input
                    type="text"
                    placeholder="Search by title, author or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Books table */}
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Book Details</th>
                      <th>Subject</th>
                      <th>Rack No.</th>
                      <th>Total Copies</th>
                      <th>Available</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredBooks.map((book) => (
                      <tr key={book.id}>
                        <td>
                          <strong>{book.title}</strong>
                          <div className="author-name">
                            {book.author}
                          </div>
                        </td>

                        <td>{book.subject}</td>
                        <td>{book.rack}</td>
                        <td>{book.total}</td>
                        <td>{book.available}</td>

                        <td>
                          <span className={`status ${
                            book.available > 0 ? 'issued' : 'unavailable'
                          }`}>
                            {book.available > 0 ? 'Available' : 'Out of Stock'}
                          </span>
                        </td>

                        <td>
                          <button
                            className="issue-button"
                            disabled={book.available === 0}
                            onClick={() => setActivePage('Issue Book')}
                          >
                            Issue
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredBooks.length === 0 && (
                      <tr>
                        <td colSpan="7" className="no-books">
                          No books found. Try another search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        )}

        

        {/* Issue Book Section */}
{activePage === 'Issue Book' && (
  <section className="page-content">
    <div className="form-section">
      <div className="form-heading">
  <h2>Issue a Book</h2>
  <p>Follow these guidelines before issuing a book.</p>
</div>

<div className="guidelines">
  <div className="guideline-card">
    <span className="guideline-icon">📅</span>
    <div>
      <h4>Borrowing Period</h4>
      <p>Standard issue period is 14 days.</p>
    </div>
  </div>

  <div className="guideline-card">
    <span className="guideline-icon">📚</span>
    <div>
      <h4>Book Limit</h4>
      <p>Maximum 3 books per student.</p>
    </div>
  </div>

  <div className="guideline-card">
    <span className="guideline-icon">✓</span>
    <div>
      <h4>Verify Details</h4>
      <p>Check student details before issuing.</p>
    </div>
  </div>
</div>

      <div className="issue-form">
        <div className="form-group">
  <label>Student ID</label>
  <input
    type="text"
    placeholder="Enter student ID"
    value={studentId}
    onChange={(e) => setStudentId(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Student Name</label>
  <input
    type="text"
    placeholder="Enter student name"
    value={studentName}
    onChange={(e) => setStudentName(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Select Book</label>
  <select
    value={selectedBook}
    onChange={(e) => setSelectedBook(e.target.value)}
  >
    <option value="">Select a book</option>

    {books.map((book) => (
      <option
        key={book.id}
        value={book.id}
        disabled={book.available === 0}
      >
        {book.title}
      </option>
    ))}
  </select>
</div>

<div className="form-group">
  <label>Issue Date</label>
  <input
    type="date"
    value={issueDate}
    onChange={(e) => setIssueDate(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Due Date</label>
  <input
    type="date"
    value={dueDate}
    readOnly
  />
</div>

        <button className="submit-button"
          onClick={handleIssueBook}>
          Issue Book
        </button>
        {message && (
  <p className="form-message">{message}</p>
)}
      </div>
    </div>
  </section>
)}

{/* Issued Books Section */}
{activePage === 'Issued Books' && (
  <section className="page-content">
    <div className="table-section">
      <div className="table-heading">
        <h2>Issued Books</h2>
        <p>View all books issued to students.</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Book Title</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {issuedBooks.length > 0 ? (
            issuedBooks.map((book, index) => (
              <tr key={index}>
                <td>{book.studentId}</td>
                <td>{book.studentName}</td>
                <td>{book.bookTitle}</td>
                <td>{book.issueDate}</td>
                <td>{book.dueDate}</td>
                <td>
  {book.status === 'Issued' ? (
    <button
      className="submit-button"
      onClick={() => handleReturnBook(index)}
    >
      Return Book
    </button>
  ) : (
    <span>Returned</span>
  )}
</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No books have been issued yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </section>
)}

      </main>
    </div>
  )
}

export default App
