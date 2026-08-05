// requireAuth.ts — middleware that verifies the Clerk session token on
// incoming POST requests. The front-end attaches the token as a Bearer
// token in the Authorization header using Clerk's getToken() method.
//
// If the token is missing or invalid, the request is rejected with 401.
// If valid, the decoded userId is attached to req for use downstream.
//
// This satisfies Lab 5.1: "All requests to post to the back-end should
// be authenticated to have been made by the front-end with a logged-in user."

import { Request, Response, NextFunction } from 'express';
import { createClerkClient } from '@clerk/express';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: missing token.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await clerk.verifyToken(token);
    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized: invalid or expired token.' });
  }
};
