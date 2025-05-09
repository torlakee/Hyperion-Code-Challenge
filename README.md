# Hyperion-Code-Challenge


| File | Description |
|------|-------------|
| **`entrypoint.ts`** | Main entry file to initialize the Express server and mount API routes. |
| **`src/routes/cryptoRoute.ts`** | Defines `/api/crypto/status/:symbol` route. Fetches price + indicators, classifies trend. Supports mock data via `?mock=true`. |
| **`src/services/priceService.ts`** | Retrieves cryptocurrency price from CoinMarketCap API, with in-memory caching. |
| **`src/services/taService.ts`** | Fetches technical indicators (RSI, EMA, MACD, etc.) from TAAPI.io and caches the results. |
| **`src/services/trendAnalysis.ts`** | Analyzes indicators and returns `'Trending'` or `'Ranging'` based on thresholds. |
| **`src/utils/config.ts`** | Loads and validates configuration from `config.toml`. Exposes methods to get and reload the config. |
| **`config.toml`** | TOML-based project configuration for API keys, server port, cache settings, and base URLs. |
| **`deploy.sh`** | Bash script to build and push the Docker image to a container registry like Docker Hub. |
