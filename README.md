# Forum Web 

A web-based forum application with user authentication, profile management and topic-based comment threads. 
Built using **HTML, CSS, JavaScript (ES Modules)** and powered by a mock REST API via **JSON Server**.

## Features

- User login and registration  
- User profile page with posted comments grouped by topic  
- View and post comments on topics  
- Topic list page  
- Comment deletion with confirmation (only by the author)  
- Smooth scroll to a comment from a direct link  
- Protected routes (redirects if not logged in)  

## Getting Started
### 1. Clone the repository:

```bash
git clone https://github.com/dianabuzescu/forum-web
```

### 2. Open the project in VSCode

### 3. Install JSON Server (if not already)
```bash
npm install -g json-server
```
### 4. Start the mock backend
```bash
json-server --watch db.json --port 3000
```

### 5. Start a local server for frontend
If you're using VS Code, you can install the Live Server extension and right-click *public/index.html* → **"Open with Live Server"**.

## Tech Stack
- HTML5, CSS3

- Vanilla JavaScript (ES Modules)

- JSON Server (mock API)

- LocalStorage for session state

## Learning Goals
- DOM manipulation and modular JavaScript

- REST API integration using fetch

- Client-side route protection

- Minimal UI/UX design

- Git & GitHub workflow

## Future Improvements
- **Rich Text Editor for Comments**:
Replace the basic <textarea> with a WYSIWYG editor (e.g., QuillJS, TinyMCE) to allow text formatting (bold, italics, links).

- **User Avatars and Profile Pictures**:
Enable users to upload profile pictures and display them next to comments and in the profile page.

- **Email Verification & Password Reset**:
Integrate real email-based registration confirmation and password recovery for production-ready authentication.

- **Topic Popularity & Comment Metrics**:
Display stats like comment count per topic, most active users, and trending discussions.

- **Full-Text Search & Filters**:
Add search functionality to quickly find topics or comments by keyword, author, or date.

- **JWT-Based Authentication**:
Replace LocalStorage session with JSON Web Tokens (JWT) and implement role-based access control (e.g., admin rights).

- **Backend Migration to Express + MongoDB**:
Move from mock JSON Server to a real backend stack (Node.js + Express + MongoDB) for scalability and persistence.

- **Mobile-Responsive Design**:
Enhance responsiveness and accessibility for mobile and tablet users.

- **Pagination or Infinite Scroll**:
Load topics and comments in pages or chunks to improve performance for larger datasets.

- **Unit & Integration Testing**:
Add tests for critical functionality using Jest (frontend) and Supertest (backend).

