const express = require('express');
const app = express();
const morgan = require('morgan') 
const bodyParser = require('body-parser') 

//import product routes
const productRoutes = require('./api/routes/product')
const orderRoutes = require('./api/routes/order')

//auto logging of server data, we use dev in oder to specify that we only need this in dev version
app.use(morgan('dev'));
app.use(bodyParser. urlencoded({extended : false}));
app.use(bodyParser.json());

//handling CORS errors, access-control-allow- (origin, headers, methods)
app.use((req, res, next) =>{
    // we add headers to incomming requests
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH')
        //add a response status and message json
        res.status(200).json({});
    };
    next()
});

// we use routes to directly route our data 
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//since we pass all the above routes this means we did not reach any destination so error

app.use((req, res, next) => {
    const error = new Error();
    error.status = 404;
    next(error);
});

// a funnel for all other errors !404

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        message : error.message
    });

});

module.exports = app;