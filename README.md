# 🔥 Bitespeed Backend Task: Identity Reconciliation

This project is a **Node.js** and **MySQL** backend service that identifies and merges duplicate contacts based on email and phone numbers. It ensures a **primary-secondary contact relationship** while maintaining data integrity.

---

## 📌 Features
- 📍 **Create and manage contacts** based on `email` and `phoneNumber`
- 🔗 **Automatically merge contacts** when duplicate information exists
- 🔄 **Maintain primary-secondary relationships** in the database
- 🛠 **Uses MySQL** as the database
- 🚀 **Built with Express.js and MySQL2**

---

## 🛠 Tech Stack
- **Node.js** (Backend)
- **Express.js** (Web framework)
- **MySQL** (Database)
- **MySQL2** (Database driver)
- **dotenv** (Environment variables)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/bitespeed-backend-task.git
cd bitespeed-backend-task

 2️⃣ Install Dependencies
sh
Copy
Edit
npm install
🔹 3️⃣ Set Up Environment Variables
Create a .env file in the project root and add:

ini
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=bitespeed
PORT=3000
🔹 4️⃣ Set Up MySQL Database
Run the following SQL query to create the Contact table:

sql
Copy
Edit
CREATE TABLE Contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    phoneNumber VARCHAR(15),
    linkedId INT DEFAULT NULL,
    linkPrecedence ENUM('primary', 'secondary') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
🔹 5️⃣ Start the Server
sh
Copy
Edit
node server.js
You should see:

pgsql
Copy
Edit
✅ Connected to MySQL Database
🚀 Server running on http://localhost:3000
🎯 API Endpoints
🔹 POST /identify
This API takes an email and/or phoneNumber and returns the merged contact details.

✅ Request:
h
Copy
Edit
POST http://localhost:3000/identify
Content-Type: application/json
json
Copy
Edit
{
  "email": "john@example.com",
  "phoneNumber": "1234567890"
}
✅ Response:
json
Copy
Edit
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["john@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": []
  }
}
🔹 Example: Merging Contacts
If we now send:

json
Copy
Edit
{
  "email": "jane@example.com",
  "phoneNumber": "1234567890"
}
✅ Response:
json
Copy
Edit
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["john@example.com", "jane@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2]
  }
}
📌 Database Structure
Run this query in MySQL to check stored data:

sql
Copy
Edit
SELECT * FROM Contact;
id	email	phoneNumber	linkedId	linkPrecedence
1	john@example.com	1234567890	NULL	primary
2	jane@example.com	1234567890	1	secondary
🛠 Project Structure
bash
Copy
Edit
bitespeed-backend-task/
│── routes/
│   ├── identify.js        # API Logic
│── db.js                  # MySQL Connection
│── server.js              # Main Express App
│── .env                   # Environment Variables
│── package.json           # Dependencies
│── README.md              # Project Documentation
