const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(
        "/generate",
        createProxyMiddleware({
        target: "http://localhost:5000"
        })
    );
};