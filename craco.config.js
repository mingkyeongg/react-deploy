const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://54.180.245.166:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
