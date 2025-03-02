# 📚 Bookshelf

This project is  built with **Node.js**, **Express**, and **MongoDB**, featuring **Cloudinary** for image uploads and **JWT-based authentication**. Frontend built using **React** along with **shadcn** , **tailwindcss**.

## 🚀 Features

- 📖 **Book Management**: Create, read, update, and delete books.
- 🛠️ **Protected Routes**: Certain actions require authentication and admin privileges.
- 🌐 **Pagination & Filtering**: Paginate and filter books by genre.
- ✍️ **Book Reviews**: Users can add reviews with ratings.
- 🖼️ **Cloudinary Integration**: Upload book covers and profile pictures.
- 🔐 **Authentication & Authorization**: Secure endpoints using JWT.
- 👤 **User Profile Management**: Users can update their profile info.

---

## 🛠️ Tech Stack

- **Node.js** + **Express** – Server-side application
- **MongoDB** – Database for storing books and user data
- **Mongoose** – ODM for MongoDB
- **Cloudinary** – Image upload service
- **bcryptjs** – Password hashing
- **jsonwebtoken** – Authentication with JWT
- **Multer** – File uploads
---

## ⚙️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mokshanirugutti/bookshelf.git
   cd bookshelf
   ```

---

### 🛠️ 2. Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**  

   Create a `.env` file and add the following:

   ```bash
   MONGO_URI=<your-mongodb-uri>
   CLOUDINARY_CLOUD_NAME=<your-cloud-name>
   CLOUDINARY_API_KEY=<your-api-key>
   CLOUDINARY_API_SECRET=<your-api-secret>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Run the backend server:**

   ```bash
   npm run dev
   ```

The server will start on: **`http://localhost:3000`**

---

### 🖥️ 3. Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Set up environment variables:**

   Create a `.env` file and add the following:

   ```bash
   VITE_BACKEND_URL =http://localhost:3000 
   ```


4. **Run the frontend server:**

   ```bash
   npm run dev
   ```

The React server will start on: **`http://localhost:5173`**

---


## 🔍 API Endpoints

### 📖 Books

| Method | Endpoint           | Description                          | Authentication |
|--------|--------------------|--------------------------------------|----------------|
| GET    | `/api/books`       | Get all books (with pagination)       | ❌ No          |
| GET    | `/api/books/genres`| Get all genres                        | ❌ No          |
| GET    | `/api/books/:id`   | Get a book by ID                      | ❌ No          |
| POST   | `/api/books`       | Create a new book                     | ✅ Yes (Admin) |
| POST   | `/api/books/review/:id` | Add a review to a book          | ✅ Yes        |
| PUT    | `/api/books/:id`   | Update a book                        | ✅ Yes (Creator) |
| DELETE | `/api/books/delete/:id`| Delete a book                   | ✅ Yes (Creator) |

**Book object structure:**

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Genre",
  "description": "Book description",
  "bookCover": "URL of the cover image",
  "rating": 4.5,
  "price": 499,
  "reviews": [
    {
      "userId": "User ID",
      "content": "Great book!",
      "rating": 5
    }
  ],
  "creator": "User ID"
}
```

---

### 👤 Users

| Method | Endpoint            | Description              | Authentication |
|--------|---------------------|--------------------------|----------------|
| POST   | `/api/users/register`| Register a new user       | ❌ No          |
| POST   | `/api/users/login`   | Login user                | ❌ No          |
| GET    | `/api/users/profile` | Get user profile          | ✅ Yes        |
| PUT    | `/api/users/profile` | Update user profile       | ✅ Yes        |

**User object structure:**

```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "hashed_password",
  "role": "user",
  "profilePicture": "URL of profile picture"
}
```

---

## 🔑 Authentication Flow

- **Register**: Users can sign up with a username, email, password, and optional profile picture.  
- **Login**: Users authenticate with their username and password.  
- **JWT Token**: On successful login, a token is returned, which must be sent in the `Authorization` header for protected routes.

---

## 🖼️ Cloudinary Integration

Cloudinary is used to handle book cover and profile picture uploads. The `uploadToCloudinary` function is responsible for uploading images and returning a secure URL.

---

## 🧪 Sample API Calls (using `curl`)

### 1️⃣ **Register User**

```bash
curl -X POST http://localhost:5000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}'
```

### 2️⃣ **Login User**

```bash
curl -X POST http://localhost:5000/api/users/login \
-H "Content-Type: application/json" \
-d '{
  "username": "john_doe",
  "password": "password123"
}'
```

### 3️⃣ **Create a Book (Admin)**

```bash
curl -X POST http://localhost:5000/api/books \
-H "Authorization: Bearer <your-token>" \
-F "title=New Book" \
-F "author=John Doe" \
-F "genre=Fiction" \
-F "description=An exciting adventure" \
-F "bookCover=@/path/to/image.jpg"
```

---

## ⚠️ Error Handling

The API returns descriptive error messages for common scenarios like invalid inputs, unauthorized access, and database-related issues.

---
