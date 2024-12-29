# create-node-sequelize-app

A CLI tool to generate a complete Node.js project boilerplate with Sequelize. Perfect for kickstarting your application with an organized and scalable structure.

## Features

- Pre-configured **Sequelize** integration for MySQL, PostgreSQL, or other supported databases.
- Clean and modular folder structure for scalable applications.
- Includes configurations for environment variables, middlewares, and validations.
- Provides ready-to-use routes, controllers, and models.
- Designed for RESTful API development.

## Folder Structure

The generated project includes the following structure:

```
node-sequelize-app/
├── config/           # Database configuration files
├── controllers/      # Business logic for routes
├── middlewares/      # Custom middleware for request handling
├── migrations/       # Sequelize migrations
├── models/           # Sequelize models
├── routes/           # API routes
├── seeders/          # Database seeders
├── services/         # Service layer for reusable logic
├── utils/            # Utility functions
├── validations/      # Input validation schemas
├── .env.example      # Sample environment variables file
├── index.js          # Application entry point
├── package.json      # Project metadata and dependencies
├── package-lock.json # Dependency lock file
└── README.md         # Project documentation
```

## Installation

Install the package globally:

```bash
npm install -g create-node-sequelize-app
```

## Usage

Generate a new project by running:

```bash
npx create-node-sequelize-app my-app
```

This will create a new directory named `my-app` with the above folder structure.

## Getting Started

1.  Navigate to the project directory:

    ```bash
    cd my-app
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure your database settings:

    - Copy `.env.example` to `.env` and update the values according to your database configuration.
    - Example:

      ```env
      NODE_ENV=development
      JWT_SECRET=JWT_SECRET
      JWT_EXPIRE_IN=1h
      PORT=5000
      ```

4.  Adjust the `config.json` file in the `config/` folder as needed. Example configuration for the development environment:

    ```json
    {
      "development": {
        "username": "newuser",
        "password": "password",
        "database": "local_database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
    }
    ```

5.  Run migrations to set up your database schema:

    ```bash
    npx sequelize-cli db:migrate
    ```

6.  Start the development server:

    ```bash
    npm start
    ```

## Commands

- `npm run dev`: Start the application in development mode with live reload.
- `npx sequelize-cli db:migrate`: Apply database migrations.
- `npx sequelize-cli db:seed:all`: Seed the database with initial data.
- `npm run lint`: Check and fix linting issues (if ESLint is set up).

## Customization

You can easily extend the project by adding:

- **New routes** in the `routes/` folder.
- **New controllers** for business logic in `controllers/`.
- **Validation schemas** for input validation in `validations/`.
- **Utilities** for shared functions in `utils/`.

## Contributing

Contributions are welcome! Feel free to fork the repository, create a branch, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.