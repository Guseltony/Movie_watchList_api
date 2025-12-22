// we are goig to create a validator schema for all our routes that require us to validate the schema that we are receiving via the body
// so validator is only apply to the route that require body

import { z } from "zod";

const addToWatchlistSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      error: () => ({
        message:
          "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED ",
      }),
    })
    .optional(),
  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10")
    .optional(),
  notes: z.string().optional(),
});

export { addToWatchlistSchema };
