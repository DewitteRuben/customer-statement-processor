import express from "express";
import validationRoute from "./routes/validation_route";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api", validationRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
