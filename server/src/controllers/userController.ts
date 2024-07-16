import { Request, Response } from 'express';

export const getHelloWorld = (_req: Request, res: Response) => {
  res.send('Hello, World!');
};

export const getAdmin = (req: Request, res: Response) => {
  res.send(req.user);
};

export const getApproved = (req: Request, res: Response) => {
  res.send(req.user);
};

export const getAllLoggedIn = (req: Request, res: Response) => {
  res.send(req.user);
};
