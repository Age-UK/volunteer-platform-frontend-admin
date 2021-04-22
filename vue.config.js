module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // Sass variables, mixins, etc will be injected globally from this file
        prependData: `@import '@/assets/scss/env.scss';`,
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true,
      });
  },
  devServer: {
    public: 'https://age-uk-volunteer-platform-admin-front-end.eu.ngrok.io',
    disableHostCheck: true,
  },
};
