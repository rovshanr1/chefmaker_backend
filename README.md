# ChefMaker Backend

This project serves as the backend for the [ChefMaker](https://github.com/rovshanr1/Chef-Maker) application. It is built with Express.js and integrates Firebase Authentication for user verification and ImageKit for image upload and management.

---

## 🔧 Technologies Used

- **Express.js** – RESTful API framework
- **Firebase Admin SDK** – Authentication
- **ImageKit SDK** – Image storage and management
- **dotenv** – Environment variable management
- **CORS** – Cross-Origin Resource Sharing
- **Nodemon** – Development server with auto-reload

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rovshanr1/chefmaker-backend.git
cd chefmaker-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
PORT=3000
```

Also, make sure to include a `serviceAccountKey.json` file in the root directory. This file can be generated from your Firebase Console under Project Settings > Service Accounts.

### 🖥️ Running the Server Locally

Start the development server with:

```bash
npm run dev
```

The server will start on `http://localhost:3000` by default.

---

### 🔐 API Endpoints

#### `POST /upload`

Allows authenticated users to upload images.

**Headers**

```
Authorization: Bearer <Firebase_ID_Token>
Content-Type: application/json
```

**Body**

```json
{
  "file": "<Base64-encoded string or image URL>",
  "fileName": "example.jpg"
}
```

**Successful Response**

```json
{
  "url": "https://ik.imagekit.io/...",
  "fileId": "...",
  ...
}
```

---

### 🌍 Deployment

This backend can be deployed on platforms like:

- Render.com
- Railway.app
- Fly.io
- Vercel (not ideal for persistent backend, but usable with serverless adjustments)

---

### 👨‍💻 Developer

- Rovshan Rasulov
  - [GitHub](https://github.com/rovshanr1)