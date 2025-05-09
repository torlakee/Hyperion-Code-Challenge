import toml from 'toml';
import fs from 'fs';

let config = loadConfig();

function loadConfig() {
    try {
        const content = fs.readFileSync('./config.toml', 'utf-8');
        const parsed = toml.parse(content);

        if (
            !parsed.server?.port ||
            !parsed.api?.coinmarketcap_key ||
            !parsed.api?.taapi_key ||
            !parsed.urls?.coinmarketcap ||
            !parsed.urls?.taapi
        ) {
            throw new Error('Missing required config values in config.toml');
        }

        if (!parsed.cache?.ttl) {
            parsed.cache = { ttl: 60 }; // fallback default TTL
        }

        return parsed;
    } catch (err) {
        if (err instanceof Error) {
            console.error('Config loading failed:', err.message);
        } else {
            console.error('Unknown error loading config:', err);
        }
        process.exit(1);
    }
}

export function getConfig() {
    return config;
}

export function reloadConfig() {
    config = loadConfig();
}