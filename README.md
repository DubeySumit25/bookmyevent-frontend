# 🎟️ BookMyEvent — Frontend

React + Vite frontend for BookMyEvent, a full-stack event management platform where users can browse, create, and book events with role-based access control.

🔗 **Live Demo:** [bookmyevent25.vercel.app](https://bookmyevent25.vercel.app)  
🔗 **Backend Repo:** [bookmyevent-backend](https://github.com/DubeySumit25/bookmyevent-backend)

---

## 🚀 Features

- JWT-based login & registration
- Browse and search events
- Book events and manage bookings
- Role-based UI (USER / ADMIN)
- Admin panel for event creation and management
- Fully responsive design with Bootstrap
- Client-side routing with React Router

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React + Vite | Frontend framework |
| Bootstrap | Styling & responsive UI |
| Axios | API calls to backend |
| React Router | Client-side routing |
| Vercel | Deployment |

---

## ⚙️ Setup Locally

```bash
# Clone the repo
git clone https://github.com/DubeySumit25/bookmyevent-frontend.git
cd bookmyevent-frontend

# Create .env file
VITE_API_URL=http://localhost:8080

# Install dependencies
npm install

# Run dev server
npm run dev
```

---

## 📁 Project Structure

src/
├── api/
│   └── axios.js          # Axios instance with JWT interceptor
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Events.jsx
│   ├── BookEvent.jsx
│   ├── MyBookings.jsx
│   └── AdminDashboard.jsx
├── components/
│   └── Navbar.jsx
└── App.jsx

---

## 🔐 Environment Variables

```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## 👨‍💻 Author

**Sumit Dubey**  
[LinkedIn](https://www.linkedin.com/in/sumit-dubey-9a0226322/) • [GitHub](https://github.com/DubeySumit25) • [LeetCode](https://leetcode.com/u/anonymousvenom/)
