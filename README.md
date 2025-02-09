# Bitespeed Backend Task: Identity Reconciliation

This project is a **Node.js** and **MySQL** backend service that identifies and merges duplicate contacts based on `email` and `phone numbers`. It ensures a **primary-secondary contact relationship** while maintaining data integrity.

---

## 📌 Features
- ✅ **Automatic Contact Identification & Merging**
- 🔗 **Primary-Secondary Contact Management**
- 🗄 **Relational Database Integration (MySQL)**
- 🌍 **RESTful API with JSON Responses**
- ⚡ **Optimized for Performance & Scalability**

---

## 🛠 Tech Stack
- **Node.js** (Runtime Environment)
- **Express.js** (Web Framework)
- **MySQL** (Relational Database)
- **MySQL2** (Database Driver)
- **dotenv** (Environment Configuration)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/bitespeed-backend-task.git
cd bitespeed-backend-task
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and define:

```ini
DB_HOST=localhost
DB_USER=root
DB_PASS= your password
DB_NAME=bitespeed
PORT=3000
```

### 4️⃣ Set Up the MySQL Database
Execute the following SQL command to create the `Contact` table:

```sql
CREATE TABLE Contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NULL,
    phoneNumber VARCHAR(15) NULL,
    linkedId INT DEFAULT NULL,
    linkPrecedence ENUM('primary', 'secondary') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE
    deletedAt TIMESTAMP NULL

);
```

### 5️⃣ Start the Server
```sh
node server.js
```

✅ Expected Output:
```sh
✅ Connected to MySQL Database
🚀 Server running on http://localhost:3000
```

---

## 📌 API Endpoints

### 🔹 POST `/identify`
This endpoint receives an email and/or `phoneNumber`, checks for existing linked contacts, and returns a consolidated contact structure.

#### ✅ Request:
```http
POST http://localhost:3000/identify
Content-Type: application/json
```
```json
{
  "email": "Akashparmar@example.com",
  "phoneNumber": "6266057166"
}
```

#### ✅ Response:
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["Akashparmar@example.com"],
    "phoneNumbers": ["6266057166"],
    "secondaryContactIds": []
  }
}
```

---

### 🔹 Example: Merging Contacts
If another request is sent with a new email but the same phone number:

#### ✅ Request:
```json
{
  "email": "Bitespeed@example.com",
  "phoneNumber": "1234567890"
}
```

#### ✅ Response:
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["Akashparmar@example.com", "Bitespeed@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2]
  }
}
```

---

## 📌 Database Structure
To verify stored data, run:

```sql
SELECT * FROM Contact;
```
 ![image](https://github.com/user-attachments/assets/ad77be74-7750-45c4-8ec0-cf6111705101)


---

## 📂 Project Structure
```
bitespeed-backend-task/
│── routes/
│   ├── identify.js        # API Logic
│── db.js                  # MySQL Connection
│── server.js              # Main Express App
│── .env                   # Environment Variables
│── package.json           # Dependencies
│── README.md              # Project Documentation
```
---
## 📞 Contact
**Author:Akash Parmar
**Resume:**[link](https://drive.google.com/file/d/1qPFvCZte4BMEGx0ATs1NBl9Bh2TZzcGC/view?usp=drive_link )
**Email: akash24parmar@gmail.com  
---
![Screenshot (1219)](https://github.com/user-attachments/assets/bfacaea9-c2f8-4528-84a4-82cdb9092d13)
![image](https://github.com/user-attachments/assets/09ccc6db-71a0-4dd9-b78a-dbad9485a744)


