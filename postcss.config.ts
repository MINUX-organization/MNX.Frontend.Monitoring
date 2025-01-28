const config = {
  plugins: {
    'postcss-modules': {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    'postcss-nested': {},
    autoprefixer: {},
    cssnano: {
      preset: 'default',
    },
  },
};

export default config;