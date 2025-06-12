🧳 Lost and Found - MERN App
A MERN stack application for reporting and managing lost and found items. The platform enables users to report items, and admins to manage them via a secure admin panel. Images of the lost or found items can be uploaded using Multer.

🔧 Tech Stack
Frontend: React.js, Axios, React Router DOM, Bootstrap / Tailwind CSS (choose your actual stack)
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT (JSON Web Tokens)
File Uploads: Multer
Admin Panel: Separate protected admin dashboard for managing reports
🔑 Features
🧍 User Features:

Register and login
Report a lost item
Report a found item
Upload images for items

🔔 Notification Panel:
Trigger notifications for new updates, approvals, or user messages

🛠️ Admin Features:
Secure login for admin
View all lost/found reports
Approve or reject reports
Delete inappropriate content
Manage users

🖼️ Image Upload:
Users can upload images when creating a report
Images are stored on the server using Multer

📁 Folder Structure
├── client/                # React Frontend
│   └── ...                
|
├── server/                # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/           # Multer uploads folder
│   └── server.js
|
├── .env
└── README.md

🛠️ Setup and Run
📦 Prerequisites
Node.js & npm
MongoDB instance or MongoDB Atlas
🔍 Environment Setup

Create a .env file in /server with the following:
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

🚀 Installation:
Backend
cd server
npm install
npm start

Frontend
cd client
npm install
npm start

User Login Page:

![login](https://github.com/user-attachments/assets/5c345059-55d8-4b9c-8962-867a0707ad15)

Home Page:

![home](https://github.com/user-attachments/assets/28f88498-b442-4ea9-b672-5ec5e6fe1a8a)


Notification Panel:

![nn](https://github.com/user-attachments/assets/825b823b-ef9d-44c1-8784-b3a5c12936c5)


Admin Login:

![admin](https://github.com/user-attachments/assets/51104259-a4e5-4602-b7b8-a60712000b16)


Admin Panel:

![adminpanel](https://github.com/user-attachments/assets/0a9d4589-9752-4911-aefb-fe5c08d46448)


