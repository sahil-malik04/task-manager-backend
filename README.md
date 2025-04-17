# Task Management API

## Features

- User authentication using JSON Web Tokens (JWT)
- Passwords are securely hashed using bcrypt before storing in the database
- Create, read, update, and delete tasks
- Rate limiting: limit each IP address to 100 requests per minute to ensure system runs smoothly and securely
- Structured and modular codebase
- Proper error and response handling
- Unit tests with Jest
- Easy to extend and maintain

---

## Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/sahil-malik04/task-manager-backend.git
   cd task-manager-backend

   ```

2. **Add the .env file**

   ```sh
    After cloning, we need to paste the .env file (shared via email) in the root directory of the project.

   ```

3. **Install dependencies**

   ```sh
    npm install

   ```

4. **Running the Application**
   ```sh
    npm run dev
   ```

Now API can be accessible at:

http://localhost:5000/api/

4. **To run test cases using Jest, you can run:**
   ```sh
    npm run test
   ```
