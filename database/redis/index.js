import { createClient } from "redis";

const host = process.env.REDIS_HOST || '127.0.0.1';
const userName = process.env.REDIS_USERNAME || '';
const password = process.env.REDIS_PASSWORD || '';
const port = process.env.REDIS_PORT || '6379';
const connectStr = `redis://${userName}:${password}@${host}:${port}`;

const configClient = {
    url: connectStr
};

const redis =  createClient(configClient);

redis.on(
    'error',
    (err) => console.log("Redis error", err)
);

redis.connect().then(
    () => {
        console.log(`Redis connected`);
    }
);

export default redis