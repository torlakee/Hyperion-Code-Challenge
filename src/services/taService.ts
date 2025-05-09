import axios from 'axios';
import NodeCache from 'node-cache';
import { getConfig } from '../utils/config';

const config = getConfig();
const TAAPI_KEY = config.api.taapi_key;
const baseUrl = config.urls.taapi;
const cache = new NodeCache({ stdTTL: config.cache.ttl });

export async function getIndicators(symbol: string) {
    const cacheKey = `indicators_${symbol}`;
    const cached = cache.get<Record<string, any>>(cacheKey);
    if (cached) return cached;

    const endpoints = [
        'rsi', 'sma', 'ema', 'macd', 'bbands', 'atr', 'stoch'
    ];

    try {
        const queries = endpoints.map(ind =>
            axios.get(`${baseUrl}/${ind}`, {
                params: {
                    secret: TAAPI_KEY,
                    exchange: 'binance',
                    symbol: `${symbol}/USDT`,
                    interval: '1h'
                }
            }).then(res => ({ [ind]: res.data }))
        );

        const results = await Promise.all(queries);
        const indicators = Object.assign({}, ...results);
        cache.set(cacheKey, indicators);
        return indicators;
    } catch (error) {
        console.error('Error fetching indicators:', error);
        throw new Error('Failed to fetch indicators');
    }
}