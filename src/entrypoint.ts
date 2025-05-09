import express from 'express';
import chokidar from 'chokidar';
import cryptoRoute from './routes/cryptoRoute';
import { getConfig, reloadConfig } from './utils/config';

let config = getConfig();
const app = express();
const PORT = config.server.port;

chokidar.watch('./config.toml').on('change', () => {
    console.log('Reloading config.toml...');
    try {
        reloadConfig();
        config = getConfig();
        console.log('Config reloaded');
    } catch (e) {
        console.error('Failed to reload config:', e);
    }
});

app.use('/api/crypto', cryptoRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));