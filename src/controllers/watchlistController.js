import { prisma } from "../lib/prisma.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes, userId } = req.body;

  // verify movie exists
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // check if already added
  const alreadyInWatchlist = await prisma.watchListItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId: movieId,
      },
    },
  });

  if (alreadyInWatchlist) {
    return res.status(404).json({ error: "Movie already in the watchlist" });
  }

  const watchlistItem = await prisma.watchListItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
};

// ** Update watchlist item
// ** updates status, rating, or notes
// ** Ensures only owner can update
// ** Requires protect middleware

const updateWatchlistItem = async (req, res) => {
  const { status, rating, notes } = req.body;

  // find watchlist item and verify ownership
  const watchlistItem = await prisma.watchListItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // ensure only owner can update
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  // build update data

  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;

  await prisma.watchListItem.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(200).json({
    message: "Watchlist item updated successfully",
    data: updatedItem,
  });
};

const removeFromWatchlist = async (req, res) => {
  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchListItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // ensure the user is the owner of the watchlist
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  await prisma.watchListItem.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};

export { addToWatchlist, removeFromWatchlist, updateWatchlistItem };
