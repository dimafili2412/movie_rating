import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

export const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, name, password: hashedPassword });
  await newUser.save();
  res.status(201).send('User registered');
};

export const login = (req: Request, res: Response, next: any) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send(info.message);
    }
    req.logIn(user, (err: any) => {
      if (err) {
        return next(err);
      }
      res.send('Logged in');
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logout((err: any) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send('Logged out');
  });
};
