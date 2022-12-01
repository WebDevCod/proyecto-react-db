const { createProxyMiddleware } = require('http-proxy-middleware');
    
module.exports = function(app) {

    app.use(
    '/getData', //this is your api
    createProxyMiddleware({
        target:'https://localhost:44338', //this is your whole endpoint link
        changeOrigin: true,
    })
    );


    app.use(
        '/gettoken', //this is your api
        createProxyMiddleware({
        target:'https://localhost:44338/getToken', //this is your whole endpoint link
        changeOrigin: true,
        })
    );
  
};