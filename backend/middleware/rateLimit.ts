import rateLimit from 'express-rate-limit';

const complaintRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, 
    message: {
        error: 'Too many complaints submitted from this IP. Please try again later.',
    },
});


export default complaintRateLimiter;