import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  if (req.isAuthenticated() && user.admin) {
    return next();
  }
  res.status(403).send('Forbidden');
};

export const isApproved = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  if (req.isAuthenticated() && user.approved) {
    return next();
  }
  res.status(403).send('Forbidden');
};
