# Spotbio

Welcome to the **Spotbio** project! Follow the instructions below to set up, run, and contribute to this project effectively.

---

## 🚀 Features

- **Next.js** framework for server-side rendering and static site generation.
- **NextAuth** for authentication.
- **PostgreSQL** database with **Prisma ORM** for robust data modeling and migrations.
- **Firebase Storage** for user profile image storage.
- **Docker** for managing the database locally during development.
- **TypeScript** for type safety and better development practices.
- **Nodemon** for automatic server reloading in development mode.

---

## 🛠️ Getting Started

### Prerequisites

Before running this project, ensure you have the following installed on your system:

- **Node.js** (v20 or later recommended)
- **npm** (v10 or later recommended)
- **Docker** (for running the database locally)

---

### Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/AslamThachapalli/spotbio.git
    cd spotbio
    ```

2. **Create environment variables**:
    - Create a file named `.env.development`.
    - Copy the contents of `.env.example` into `.env.development`:
      ```bash
      cp .env.example .env.development
      ```

3. **Create a firebase project**
    - Enable firebase storage and add the firebase config keys in the `.env.development` file

4. **Start the Database Locally**:
    - Create a Docker volume to store the database data:
      ```bash
      docker volume create spotbio_db
      ```
    - Run the following command to start the database locally:
      ```bash
      docker run -v spotbio_db:/var/lib/postgresql/data -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=spotbio --name spotbio_db --rm postgres:16.4-alpine
      ```

5. **Install dependencies**:
    ```bash
    npm install
    ```

6. **Set Up Prisma**:
    - Apply the schema changes to the database:
      ```bash
      npx prisma migrate dev
      ```
    - Seed the database with initial data:
      ```bash
      npx prisma db seed
      ```

7. **Start the Server in Development Mode**:
    ```bash
    npm run dev
    ```
    The server will start in development mode using Nodemon.

8. **Access the application**:
    - Open your browser and visit: [http://localhost:5173](http://localhost:5173).

