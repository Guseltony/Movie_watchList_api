import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

const creatorId = "0307db21-d034-418d-af52-d5f2231b748a";

const movies = [
  {
    title: "Echoes of Tomorrow",
    overview:
      "A scientist discovers a way to send messages to the past, risking a catastrophic time paradox.",
    releaseYear: 2022,
    genres: ["Sci-Fi", "Thriller"],
    runtime: 128,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    createdBy: creatorId,
  },
  {
    title: "Last City Standing",
    overview:
      "In a post-apocalyptic world, a small city fights to survive against invading factions.",
    releaseYear: 2021,
    genres: ["Action", "Drama"],
    runtime: 115,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
    createdBy: creatorId,
  },
  {
    title: "Midnight Cafe",
    overview:
      "A late-night café becomes the meeting point for strangers whose lives unexpectedly intertwine.",
    releaseYear: 2020,
    genres: ["Romance", "Drama"],
    runtime: 102,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/9O1Iy9od7RZ4PjYxjU0E8DkFhRX.jpg",
    createdBy: creatorId,
  },
  {
    title: "Code Red Protocol",
    overview:
      "An elite hacker must stop a global cyber-attack before the internet collapses.",
    releaseYear: 2023,
    genres: ["Action", "Thriller"],
    runtime: 110,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    createdBy: creatorId,
  },
  {
    title: "The Silent Forest",
    overview:
      "A group of hikers uncover a dark secret hidden deep within an ancient forest.",
    releaseYear: 2019,
    genres: ["Horror", "Mystery"],
    runtime: 98,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/4nDOOZzN6k7J0mLZQ1YbE6Z9h8R.jpg",
    createdBy: creatorId,
  },
  {
    title: "Beyond the Stars",
    overview:
      "Astronauts embark on a one-way mission to explore a newly discovered habitable planet.",
    releaseYear: 2024,
    genres: ["Sci-Fi", "Adventure"],
    runtime: 136,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg",
    createdBy: creatorId,
  },
  {
    title: "Broken Crown",
    overview:
      "A fallen king must reclaim his throne while battling betrayal from within his own family.",
    releaseYear: 2018,
    genres: ["Drama", "Fantasy"],
    runtime: 124,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1R6cvRtZgsYCkh8UFuWFN33xBP4.jpg",
    createdBy: creatorId,
  },
  {
    title: "Street Rhythm",
    overview:
      "A talented dancer from the streets fights for recognition in the underground dance scene.",
    releaseYear: 2021,
    genres: ["Music", "Drama"],
    runtime: 105,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    createdBy: creatorId,
  },
  {
    title: "Hidden Truth",
    overview:
      "A journalist uncovers a conspiracy that could change the fate of an entire nation.",
    releaseYear: 2020,
    genres: ["Thriller", "Crime"],
    runtime: 118,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
    createdBy: creatorId,
  },
  {
    title: "Finding Home",
    overview:
      "After years abroad, a young man returns to his hometown to rediscover his roots.",
    releaseYear: 2017,
    genres: ["Drama", "Family"],
    runtime: 95,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg",
    createdBy: creatorId,
  },
];

const main = async () => {
  console.log("seeding movies...");

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`created movies: ${movie.title}`);
  }
  console.log("Seeding completed");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
