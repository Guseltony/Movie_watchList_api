import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

// Read the token fromt he request
export const authMiddleware = async (req, res, next) => {
  console.log("Auth middleware reached");

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  // get the user id from the token
  try {
    // verify token and extract the userId

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ error: "err" });
  }
};
