# 🧑‍🏫 **Teacher Review System**  
*A secure and interactive platform where students can review teachers based on predefined performance criteria.*

## 🚀 Overview  

The **Teacher Review System** is a full-stack web application that allows students to submit feedback and rate teachers according to predefined performance metrics such as teaching quality, clarity, punctuality, and communication skills.  

The platform ensures smooth, secure, and real-time interactions using modern web technologies — built for institutions aiming to enhance transparency and improve academic performance.

---

## 🧩 Key Features  

- 🔐 **JWT Authentication** – Secure user login and session handling  
- ⚡ **Real-time Feedback Updates** – Built with React.js for instant UI updates  
- 🧠 **Predefined Criteria-based Reviews** – Students review teachers across fixed metrics  
- 🗂️ **MongoDB Integration** – Efficient and scalable data storage for reviews and users  
- 🧰 **RESTful API** – Node.js backend ensures seamless data flow between client and server  
- 🎨 **Tailwind CSS UI** – Clean, responsive, and mobile-friendly interface  
- 🔒 **Secure Communication** – HTTPS and token-based validation for all data requests  

---

## 🏗️ Tech Stack  

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Token) |
| **API Type** | REST API |

## ⚙️ Getting Started  

### 🔧 Prerequisites  
Before you begin, make sure you have the following installed:  
- **Node.js** (v16 or newer)  
- **MongoDB** (local or via [MongoDB Atlas](https://www.mongodb.com/atlas))  
- **npm** or **yarn**  

---

### 📦 Installation & Setup  

1. **Clone the repository**
```bash
git clone https://github.com/your-username/teacher-review-system.git
cd teacher-review-system
```
2. **Install dependencies for client and server**
```bash
# For backend
cd server
npm install
# or
yarn
```

```bash
# For frontend
cd client
npm install
# or
yarn
```

3. Set up environment variables
Create a .env file in the server folder and add your configuration:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
4. Run the application
```bash
# Start backend server
cd server
npm run dev
# or
yarn dev
```

```bash
# Start frontend client
cd client
npm run dev
# or
yarn start
