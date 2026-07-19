# 🍔 MERN Stack Food Delivery App

A full-stack Food Delivery web application built using the **MERN Stack**. The application allows users to browse food items, add products to the cart, place orders, and securely make payments. It also includes an admin dashboard for managing products and orders.

## 🚀 Features

### 👤 User Features

* User Authentication (JWT)
* Register & Login
* Browse Food Menu
* Search & Filter Food Items
* Add to Cart
* Update Cart Quantity
* Place Orders
* Stripe Payment Integration
* Order History
* Responsive Design

### 🔧 Admin Features

* Admin Authentication
* Add New Food Items
* Update Food Items
* Delete Food Items
* Manage Orders
* Change Order Status
* Dashboard Overview

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* Context API
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* Stripe API
* bcrypt.js
* dotenv

---

## 📂 Project Structure

```text
food-delivery-app/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/amalik4432/food-delivery-app.git
cd food-delivery-app
```

### Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

> **Note:** Never commit your `.env` file or secret keys to GitHub.

---

## ▶️ Run the Application

### Backend

```bash
cd backend
npm run server
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## 📸 Screenshots

<img width="1919" height="946" alt="Screenshot 2026-07-19 163556" src="https://github.com/user-attachments/assets/473d2c06-a502-48c9-a19e-7615e9126fbf" />

<img width="1918" height="414" alt="Screenshot 2026-07-19 163621" src="https://github.com/user-attachments/assets/4342fb89-4f15-4600-978d-d2d722c0816c" />

<img width="1919" height="887" alt="Screenshot 2026-07-19 163706" src="https://github.com/user-attachments/assets/045081a7-f096-48c8-94cb-e372c7943a95" />

<img width="959" height="443" alt="3" src="https://github.com/user-attachments/assets/05b705d3-aaf4-47b2-ae80-38b1a1bab87c" />


---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Ahmed Malik**

GitHub: https://github.com/amalik4432
