const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
    // config.module.rules.push({
    //   test: /\.stories\.tsx?$/,
    //   loaders: [
    //     {
    //       loader: require.resolve('@storybook/source-loader'),
    //       options: { parser: 'typescript', injectDecorator: false },
    //     },
    //   ],
    //   enforce: 'pre',
    // });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          // options: {
          //   presets: [['react-app', { flow: false, typescript: true }]],
          // },
        },
        // require.resolve('react-docgen-typescript-loader'),
      ],
    });

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      // use: ['style-loader', 'css-loader', 'sass-loader'],
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            sourceMap: true,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              ident: 'postcss',
              plugins: [
                'postcss-flexbugs-fixes',
                [
                  'postcss-preset-env',
                  {
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  },
                ],
                'postcss-normalize',
              ],
            },
            sourceMap: true,
          },
        },
        {
          loader: require.resolve('sass-loader'),
          options: {
            sourceMap: true,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve.extensions.push('.ts', '.tsx');
    

    return config;
  },
}