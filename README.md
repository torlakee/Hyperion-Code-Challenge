# Hyperion-Code-Challenge


## Features

- Configurable via `config.toml` (TOML-based settings)
- Uses RSI, EMA, SMA, MACD, Bollinger Bands, ATR, and Stochastic
- Classifies market as Trending or Ranging
- Supports mock mode (`?mock=true`)
- Docker + GitHub Actions CI ready
- Auto reloads config on change

## Project Structure
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



**♦ entrypoint.ts**

*Acts as the main application entry point. It likely initializes the Express server and loads routes.*

* Loads configuration using config.ts
* Sets up Express
* Mounts the /api/crypto endpoint
* Starts the server on the configured port

**♦ cryptoRoute.ts**

*Express route handler for /api/crypto/status/:symbol*

* Fetches real-time or mock crypto price and technical indicators
* Uses services (priceService, taService) to retrieve data
* Runs classifyTrend() to determine trend state
* Returns JSON payload: { symbol, price, trend, indicators }

**♦ deploy.sh**

*Bash script to build and deploy the Docker image to a container registry*

* Runs docker build
* Tags and pushes the image
* Requires IMAGE_NAME and TAG to be set
* Use with: bash deploy.sh

**♦ priceService.ts**

*Service for fetching cryptocurrency prices from CoinMarketCap APIy*

* Retrieves data using axios
* Caches results with node-cache
* Uses API key and base URL from config.ts
* Returns price as a number

**♦ taService.ts**

*Service for fetching technical indicators from TAAPI.io*

* Calls multiple endpoints: RSI, SMA, EMA, MACD, Bollinger Bands, ATR, Stochastic
* Aggregates and caches the result
* Dynamically builds requests per symbol and interval
* Returns all indicators in a single object

**♦ trendAnalysis.ts**

*Classifies a crypto’s trend as Trending or Ranging*

* Analyzes indicator thresholds (e.g., RSI > 70, MACD histogram > 1, etc.)
* Returns 'Trending' or 'Ranging' based on logic
* Acts as the decision engine for your MCP trend classification

**♦ config.ts**

*Central configuration loader using TOML*

* Reads config.toml
* Validates required fields: api keys, server port, URLs, cache.ttl
* Uses toml to parse and fs to read
* Exposes getConfig() and reloadConfig() methods
