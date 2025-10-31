# 📝 NoteNest – Frontend

This is the **frontend** of the NoteNest application, a simple and secure online note storing web app.  
It allows users to **sign up, log in, create, edit, and delete notes** through a clean and responsive interface.

## 🚀 Features
- User Authentication (Signup & Login)
- Create, Edit, and Delete Notes
- Responsive UI using modern design
- Integration with backend API
- Real-time alerts for user actions

## 🧩 Tech Stack
- **React.js** – Frontend framework  
- **React Router DOM** – For navigation  
- **Bootstrap / CSS** – Styling and layout  
- **Fetch API** – Communication with backend

## ⚙️ Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/NoteNest-Frontend.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a config file**
   Inside `src/config.js`:
   ```javascript
   export const API_BASE_URL = "http://localhost:5000";
   ```
   > Replace the URL if your backend runs on a different port.
4. **Run the app**
   ```bash
   npm start
   ```

## 🔗 Backend Repository
The backend for this project can be found here:  
👉 [NoteNest Backend Repository](https://github.com/bhavyanatani/NoteNest-Backend)

## 📂 Folder Structure
```
NoteNest-Frontend/
├── src/
│   ├── components/
│   ├── Context/
│   ├── App.js
│   ├── config.js
│   └── index.js
├── package.json
└── README.md
```

## 🤝 Contributing
Feel free to fork this repo and submit a pull request if you’d like to improve the UI or add new features.

## 🧑‍💻 Author
**Bhavya Natani**  
B.Tech, IIEST Shibpur
