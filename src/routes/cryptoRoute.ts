import express from 'express';
import { getCryptoPrice } from '../services/priceService';
import { getIndicators } from '../services/taService';
import { classifyTrend } from '../services/trendAnalysis';

const router = express.Router();

router.get('/status/:symbol', async (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    const mock = req.query.mock === 'true';

    try {
        const price = mock ? 64321.45 : await getCryptoPrice(symbol);
        const indicators = mock ? getMockIndicators() : await getIndicators(symbol);
        const trend = classifyTrend(indicators);
        res.json({ symbol, price, trend, indicators });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

function getMockIndicators() {
    return {
        rsi: { value: 74.2 },
        sma: { value: 63800.0 },
        ema: { value: 64050.3 },
        macd: { valueMACD: 1.8, valueMACDSignal: 0.5, histogram: 1.3 },
        bbands: { lowerBand: 62000.0, upperBand: 66000.0 },
        atr: { value: 1.9 },
        stoch: { valueK: 82.5, valueD: 78.3 }
    };
}

export default router;