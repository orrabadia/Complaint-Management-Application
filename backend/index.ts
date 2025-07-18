import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import supabase from './utils/supabase';
import complaintRateLimiter from './middleware/rateLimit';



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));

/* Router imports */
import complaintsRouter from './routers/complaints.router'

app.use('/complaints', (req, res, next) => {
    if (req.method === 'POST') {
        return complaintRateLimiter(req, res, next);
    }
    next();
});

app.use('/complaints', complaintsRouter)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));