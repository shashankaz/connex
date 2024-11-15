# Connex

### Overview

Connex is a contact management application that enables users to easily add, view, edit, and delete contact information. Designed as a mini CRM feature, it ensures efficient management of customer/client data in a user-friendly interface.

---

### Features

1. **Add New Contacts**: Users can create new contacts by filling in required fields like First Name, Last Name, Email, Phone, Company, and Job Title.
2. **View Contacts**: A table displays all contacts with sorting and pagination for better usability.
3. **Edit Contacts**: Allows users to update contact details directly from the table.
4. **Delete Contacts**: Users can remove outdated or duplicate contacts with a single click.

---

### Tech Stack

- **Frontend**: React with Vite, styled using Material-UI (MUI).
- **Backend**: Node.js with Express for APIs.
- **Database**: MongoDB, using Mongoose for schema and database interaction.

---

### Environment Variables

#### Server `.env`

```plaintext
PORT=3000
MONGO_URI=mongodb://localhost:27017/connex
FRONTEND_URL=http://localhost:5173
```

#### Client `.env`

```plaintext
VITE_BACKEND_URL=http://localhost:3000
```

---

### Installation and Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shashankaz/connex.git
   cd connex
   ```

2. **Set Up Server**:
   - Navigate to the `server` folder:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `server` directory with the contents mentioned above.
   - Start the server:
     ```bash
     npm start
     ```

3. **Set Up Client**:
   - Navigate to the `client` folder:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `client` directory with the contents mentioned above.
   - Start the client:
     ```bash
     npm run dev
     ```

---

### Database Schema

The application uses MongoDB with the following schema for storing contact details:

```javascript
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
```

---

### Application Flow

1. **Add Contacts**:  
   A "New Contact" button opens a form where users can input details to create a new contact.

2. **View Contacts**:  
   Contacts are displayed in a table with sorting and pagination options. 

3. **Edit Contacts**:  
   An edit button allows users to modify contact details directly from the table.

4. **Delete Contacts**:  
   A delete button lets users remove unwanted contact entries.

---

### Challenges and Solutions

- **Sorting Data**:  
  Implementing sorting functionality in the table was challenging, but I resolved it by researching solutions through Google and referring to relevant documentation and examples.
