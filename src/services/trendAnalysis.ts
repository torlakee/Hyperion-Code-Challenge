export function classifyTrend(indicators: any): 'Trending' | 'Ranging' {
    const { rsi, macd, bbands, atr, stoch } = indicators;
    const rsiVal = rsi?.value ?? 50;
    const macdHist = macd?.histogram ?? 0;

    const bbandsWidth =
        bbands?.upperBand != null && bbands?.lowerBand != null
            ? bbands.upperBand - bbands.lowerBand
            : 0;

    const atrVal = atr?.value ?? 0;
    const stochVal = stoch?.valueK ?? 50;

    const trending =
        rsiVal > 70 ||
        rsiVal < 30 ||
        Math.abs(macdHist) > 1 ||
        bbandsWidth > 1 ||
        atrVal > 1.5 ||
        stochVal > 80 ||
        stochVal < 20;

    return trending ? 'Trending' : 'Ranging';
}