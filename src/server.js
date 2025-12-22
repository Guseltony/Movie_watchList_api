import express from "express";
import "dotenv/config";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import watchlistRoute from "./routes/watchlistRoute.js";

connectDB();

// app

const app = express();

// Body parsing middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// port


// api endpoints

app.use("/auth", authRoute);
app.use("/watchlist", watchlistRoute);

// app listen to port
const server = app.listen(process.env.PORT || 5555, "0.0.0.0", () => {
  console.log(`server running on port ${PORT}`);
});

// ERROR HANDLING

// handle unhandled promise rejections (e.g database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
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
