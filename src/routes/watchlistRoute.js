import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

const watchlistRoute = express.Router();

watchlistRoute.use(authMiddleware);

watchlistRoute.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);

// url/watchlist/:id
watchlistRoute.delete("/:id", removeFromWatchlist);

// url/watchlist/:id
watchlistRoute.put("/:id", updateWatchlistItem);

export default watchlistRoute;
