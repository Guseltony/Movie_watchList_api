import express from "express";
import "dotenv/config";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoute from "./routes/authRoutes.js";

connectDB();

// app

const app = express();


// Body parsing middlewares

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// port

const PORT = 5555;

// api endpoints

app.use("/auth", authRoute);

// app listen to port

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// ERROR HANDLING

// handle unhandled promise rejections (e.g database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  ServiceWorkerRegistration.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exception
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown (signal err)
process.on("SIGTERM", async () => {
  console.log("SIGTERMreceived, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
