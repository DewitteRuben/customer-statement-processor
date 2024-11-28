# Customer Statement Processor

This tool validates customer statement records for errors. Supported file formats include `.csv` and `.xml`.

During the validation process, any incorrect records will be displayed with their reference number, the type of error, and the corresponding description.

In addition, a complete list of all records will be shown.

## Running the Project

1. **Install Dependencies**  
   Run `npm install` in the `frontend/`, `backend/`, and project root directories to install the necessary dependencies.

2. **Start the Services**

#### Backend

Navigate to the `backend/` directory and start the backend service by running:

```bash
npm start
```

If you prefer to use Bun, you can run:

```bash
npm run start:bun
```

#### Frontend

Navigate to the `frontend/` directory and start the frontend service by running:

```bash
npm run dev
```

3. **Access the Application**  
   Once the services are running, visit [http://localhost:5173](http://localhost:5173) to use the application (default Vite endpoint).

## Running the Tests

To run all tests for both the frontend and backend, use the command: `npm test`

If you want to run tests for either the frontend or backend specifically, navigate to the respective folder and run `npm test`.
