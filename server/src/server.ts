import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import { authRouter } from './routes/authRoutes';
import { userRouter } from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose
    .connect(process.env['MONGO_URI'] || '')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    });

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);

const PORT = process.env['NODE_ENV'] === 'production' ? 443 : 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
