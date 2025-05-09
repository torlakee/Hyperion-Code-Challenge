import axios from 'axios';
import NodeCache from 'node-cache';
import { getConfig } from '../utils/config';

const config = getConfig();
const cache = new NodeCache({ stdTTL: config.cache.ttl });
const apiKey = config.api.coinmarketcap_key;
const baseUrl = config.urls.coinmarketcap;

export async function getCryptoPrice(symbol: string): Promise<number> {
    const cacheKey = `price_${symbol}`;
    const cached = cache.get<number>(cacheKey);
    if (cached !== undefined) return cached;

    try {
        const url = `${baseUrl}?symbol=${symbol}`;
        const response = await axios.get(url, {
            headers: { 'X-CMC_PRO_API_KEY': apiKey }
        });
        const price = response.data.data[symbol].quote.USD.price;
        cache.set(cacheKey, price);
        return price;
    } catch (error) {
        console.error('Error fetching price:', error);
        throw new Error('Failed to fetch price');
    }
}