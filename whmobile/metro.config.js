import { getDefaultConfig } from '@expo/metro-config';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = getDefaultConfig(__dirname);

// Ensure .cjs modules are resolved correctly
config.resolver.sourceExts.push('cjs');

// Include png assets by default
if (!config.resolver.assetExts.includes('png')) {
  config.resolver.assetExts.push('png');
}

// Allow web-specific fields when resolving modules
config.resolver.resolverMainFields = ['browser', 'main'];

export default config;
