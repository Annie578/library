# 📚 Smart Library & ERP Integration Portal

> An AI-driven, data-informed library resource portal integrated with student ERP systems to streamline academic textbook access, inventory forecasting, and physical shelf management.

---

## 📌 Problem Statement
Traditional college library portals often feature outdated interfaces, complex searching mechanisms, and isolated databases that are disconnected from academic enrollment. Students struggle to identify required semester textbooks, track return deadlines, and locate physical books, while librarians lack automated tools to forecast borrow demand or identify dormant inventory.

---

## 💡 Solution Overview
This project modernizes the academic library experience by embedding intelligent resource management directly into the student ERP portal. It offers a zero-search curriculum view for students alongside automated inventory intelligence for library administrators.

---

## ✨ Key Features

### 🎓 1. Student Portal (Screen 1)
* **Semester & Branch Curriculum Bundling:** Automatically displays required textbooks for a student's exact branch and semester upon logging into the ERP—no manual catalog searching needed.
* **Real-Time Physical Availability:** Live shelf counters show exact stock levels (`Available`, `On Hold`, or `Waitlist`).
* **Loan Lifecycle & Reissue Alerts:** Interactive 2-week loan countdown notice with one-click online reissuance.
* **Integrated Digital PDF Access:** View ERP-hosted verified digital PDFs directly in the portal.

### 🧠 2. AI & Data Science Capabilities (Upcoming Modules)
* **Semantic Topic Search (NLP):** Allows searching by syllabus concepts (e.g., *"memory management in OS"*) rather than exact book titles using vector embeddings.
* **Predictive Demand Forecasting:** Time-series tracking on historical loan spikes to predict textbook surges before midterm and final exams.
* **Automated Book Weeding / Dormant Analysis:** Flags physical books with zero checkouts across multiple semesters to assist librarians in archiving or decommissioning obsolete editions.

---

## 🛠️ Project Structure

```text
library-erp-portal/
│
├── index.html          # Interactive prototype (Screen 1: Student Portal)
├── README.md           # Project documentation and setup guide
└── docs/               # Architecture diagrams and presentation slides