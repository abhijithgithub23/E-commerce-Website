#  E-Commerce Website (MERN)

Link to website -> https://e-commerce-website-ta43.onrender.com/

A full-stack e-commerce application built using the **MERN** stack, featuring secure authentication, product management, cart functionality, order handling, and a fully **responsive user interface**. The backend follows **RESTful API** standards and implements production-ready practices such as **JWT authentication** with refresh tokens, **protected routes**, and **HTTP-only cookies** for secure session handling.

---

##  Features

###  User Features
* **User Registration and Login:** Secure sign-up and sign-in.
* **JWT-based Authentication:** Utilizes Access and Refresh tokens for session management.
* **Persistent Login:** Securely maintained using **HTTP-only cookies**.
* **Product Browsing:** View the entire catalog.
* **Product Detail View:** See in-depth information for a single product.
* **Cart Functionality:** Add and remove items from the shopping cart.
* **Checkout Flow:** Process for completing a purchase.

###  Admin Features (if implemented)
* **Add New Products:** Create new listings.
* **Edit Existing Products:** Update product details.
* **Delete Products:** Remove items from the catalog.
* **Manage Product Catalog:** Comprehensive oversight of all products.

---

##  Tech Stack

### Frontend
* **React (Vite):** Fast, modern framework for the UI.
* **React Router:** For navigation and routing.
* **Zustand State Management:** Global state handling.
* **Axios:** Promise-based HTTP client for API communication.
* **CSS / Tailwind:** For styling and responsive design.

### Backend
* **Node.js:** JavaScript runtime environment.
* **Express.js:** Fast, minimalist web application framework.
* **MongoDB with Mongoose:** NoSQL database with an object data modeling (ODM) layer.
* **JWT Authentication:** JSON Web Tokens for secure access control.
* **Bcrypt:** For secure password hashing.
* **Cookie-based Authentication:** Secure session handling.
* **RazorPay:** Payment handling.

### Tools & Services
* **Git & GitHub:** Version control.
* **Postman:** API testing and documentation.
* **Render :** Deployment services.

---

## 📂 Project Structure

A clean separation between client (frontend) and server (backend) code.

root ├── client/ # Frontend (React) │ └── src │ ├── components/ # Reusable UI components │ ├── pages/ # Route-level components │ ├── context/ # Global state management │ ├── utils/ # Helper functions │ └── App.jsx # Main application component └── server/ # Backend (Node/Express) ├── controllers/ # Business logic ├── models/ # MongoDB Schemas (Mongoose) ├── routes/ # API endpoints ├── middleware/ # Authentication, error handling ├── utils/ # Utility functions └── server.js # Application entry point

---

## ⚙️ API Endpoints (RESTful)

### Authentication
| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login and return Access/Refresh tokens |
| `POST` | `/api/auth/profile` |  User profule |
| `POST` | `/api/auth/refresh-token` | Use Refresh token to get a new Access token |
| `POST` | `/api/auth/logout` | Logout and clear secure cookies |

### Products
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/products` | Fetch all products |
| `GET` | `/api/products/:id` | Fetch a single product by ID |
| `POST` | `/api/products` | Add a new product (**Admin Protected**) |
| `PUT` | `/api/products/:id` | Edit an existing product (**Admin Protected**) |
| `DELETE` | `/api/products/:id` | Delete a product (**Admin Protected**) |

### Cart
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/cart` | Get the user's cart items |
| `POST` | `/api/cart` | Add an item to the cart |
| `DELETE` | `/api/cart/:id` | Remove an item from the cart |

---

##  Deployment

* **Frontend:** Deployed via **Vite build** output using services like Render.
* **Backend:** Deployed using the Node/Express server on platforms like Render.
* **Authentication** is handled through secure cookies with `withCredentials` enabled in the client to allow cookies to be sent with requests.

---

##  How to Run Locally

### 1. Prerequisites
* Node.js (LTS version)
* MongoDB instance (local or Atlas)

### 2. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
    *Note: Ensure you have set up your `.env` file with `MONGO_URI`, `JWT_ACCESS_SECRET`, etc.*

### 3. Frontend Setup
1.  Navigate to the client directory (in a new terminal window):
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
The application should now be accessible at the address provided by Vite (e.g., `http://localhost:5173`).

---

##  Learning Outcomes

This project is an excellent demonstration of full-stack development, covering:
* Implementing **secure JWT authentication** with refresh tokens and HTTP-only cookies.
* Managing **protected routes** and global state on the frontend (React).
* Building **scalable REST APIs** in Node.js and Express.
* Designing robust **MongoDB schemas** using Mongoose.

