const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

let config = getDefaultConfig(__dirname);

try {
  const {
    wrapWithReanimatedMetroConfig,
  } = require('react-native-reanimated/metro-config');
  config = wrapWithReanimatedMetroConfig(config);
} catch {
  // Reanimated metro wrapper optional fallback
}

const herouiNativePath = path.resolve(__dirname, 'lib/heroui-native');
const uniwindPath = path.resolve(__dirname, 'lib/uniwind');

config.resolver = config.resolver || {};
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  // Prefer local shims so the app runs before/without native package install
  'heroui-native': herouiNativePath,
  uniwind: uniwindPath,
};

try {
  const { withUniwindConfig } = require('uniwind/metro');
  // Keep CSS pipeline when uniwind is installed; module resolve still uses shim above
  config = withUniwindConfig(config, {
    cssEntryFile: './global.css',
    dtsFile: './uniwind-env.d.ts',
  });
  config.resolver = config.resolver || {};
  config.resolver.extraNodeModules = {
    ...(config.resolver.extraNodeModules || {}),
    'heroui-native': herouiNativePath,
    uniwind: uniwindPath,
  };
} catch {
  // CSS pipeline optional until uniwind install completes
}

module.exports = config;
