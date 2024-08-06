const path = require('path');

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
        target: 'https://43.203.28.55:8080/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false, // SSL 인증서 오류 무시
      },
    },
  },
};
