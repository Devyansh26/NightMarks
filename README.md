# 🌙 NightMarks — Smart Bookmark Manager

**NightMarks** is a modern, lightweight, and intuitive bookmark management app that lets you organize and access your favorite links effortlessly. Whether you’re saving developer docs, music, articles, or YouTube videos — nightMarks keeps everything organized and accessible across categories.

---

## 🚀 Features

- 🔖 Add Bookmarks with custom categories  
- 📁 Organize bookmarks by tags or folders  
- 🌐 Clickable links that open in new tabs  
- 🔍 Search & filter bookmarks easily  
- 🖥️ Simple and clean React frontend  
- ⚙️ Secure Flask backend API  
- 🧠 JWT-based authentication  
- 🐘 PostgreSQL support (NeonDB/Render)

---

## 📷 Preview

<img width="1887" height="928" alt="image" src="https://github.com/user-attachments/assets/ea0b3831-7b61-43ab-b5af-b0bd50160f9c" />


---

## 🛠️ Tech Stack

| Frontend | Backend  | Database  | Auth       | Hosting     |
|----------|----------|-----------|------------|-------------|
| React    | Flask    | PostgreSQL| JWT Tokens | Render / Vercel |

---

## 🧩 Project Structure
```
nightMarks/
├── backend/
│ ├── app.py
│ ├── models.py
│ ├── routes/
│ │ ├── auth.py
│ │ └── bookmarks.py
│ ├── utils/
│ │ └── jwt_utils.py
│ └── requirements.txt
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── AddBookmarkForm.js
│ │ │ ├── BookmarkCard.js
│ │ │ └── Navbar.js
│ │ └── pages/
│ │ └── Dashboard.js
│ └── package.json
└── README.md
```


---

## ⚙️ Installation Guide

### 📦 Clone the Repo

```bash

git clone https://github.com/your-username/nightMarks.git
cd nightMarks

🧪 Backend Setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt


Create a .env file inside the backend folder:

SECRET_KEY=your_secret_key
SQLALCHEMY_DATABASE_URI=your_postgres_connection_url

Run the backend server:
python app.py


🎨 Frontend Setup

cd frontend
npm install
npm start
📡 API Endpoints
🔐 Auth
🌍 Deployment
⚙️ Backend (Render)

✅ Roadmap
 Bookmark editing

 Tags and labels

 Dark/Light mode toggle

 Shareable folders

 Chrome Extension integration

🙌 Contributing
Contributions, suggestions, and feature requests are welcome!
Feel free to open issues or submit PRs.

📄 License
This project is licensed under the MIT License.

---
