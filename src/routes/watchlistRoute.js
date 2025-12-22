import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const watchlistRoute = express.Router();

watchlistRoute.use(authMiddleware);

watchlistRoute.post("/", addToWatchlist);

// url/watchlist/:id
watchlistRoute.delete("/:id", removeFromWatchlist);

// url/watchlist/:id
watchlistRoute.put("/:id", updateWatchlistItem);

export default watchlistRoute;
