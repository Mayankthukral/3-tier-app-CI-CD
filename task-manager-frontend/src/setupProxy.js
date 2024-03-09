const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy API requests to the backend service
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://backend-service:80',
      changeOrigin: true,
    })
  );
};
