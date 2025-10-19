import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request interface globally
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: string; role: string };
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // Get the auth header (can be string or array)
  const authHeaderRaw = req.headers.authorization || req.headers.Authorization;
  const authHeader = Array.isArray(authHeaderRaw) ? authHeaderRaw[0] : authHeaderRaw;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token, authorization denied" });
      return;
    }

    try {
      // Verify token and typecast to include id and role
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload & { id: string; role: string };

      req.user = decoded;
      console.log("The decoded user is:", req.user);
      next();
    } catch (err) {
      res.status(400).json({ message: "Token is not valid" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

export default verifyToken;
