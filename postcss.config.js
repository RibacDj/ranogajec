module.exports = {
  plugins: {
    'postcss-import': {
      path: 'src/css/',
    },
    'postcss-preset-env': {
      browsers: [
        'last 2 versions',
        '> 1%',
      ],
    },
  },
};
