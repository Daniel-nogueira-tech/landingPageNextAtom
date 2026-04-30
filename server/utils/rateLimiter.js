import { rateLimit } from 'express-rate-limit';

const attempts = new Map(); // em produção use Redis

function getBlockTime(fails) {
    if (fails < 3) return 0; // tolerância inicial
    if (fails === 3) return 15 * 60 * 1000;
    if (fails === 4) return 60 * 60 * 1000;
    if (fails >= 5) return 24 * 60 * 60 * 1000;
    return 0;
}

export function loginRateLimiter(req, res, next) {
    const key = req.body.email || req.ip;
    const userData = attempts.get(key) || { fails: 0, until: 0 };

    const now = Date.now();

    if (userData.until > now) {
        return res.status(429).json({
            success: false,
            message: `Bloqueado até ${new Date(userData.until).toLocaleString()}`,
        });
    }

    next();
}
//Função para registrar falha
export function registerFail(key) {
    const userData = attempts.get(key) || { fails: 0, until: 0 };

    userData.fails += 1;

    const blockTime = getBlockTime(userData.fails);

    if (blockTime > 0) {
        userData.until = Date.now() + blockTime;
    }

    attempts.set(key, userData);
}

//Função para registrar sucesso
export function registerSuccess(key) {
    attempts.delete(key);
}



export const inviteEmailRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // limit each IP to 3 requests per windowMs
    message: "Too many requests from this IP, please try again after 1 hour",
    standardHeaders: true,
    legacyHeaders: false,
});

