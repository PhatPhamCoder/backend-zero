import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from './route/web';
import connectDB from './config/connectDB';
// import cors from 'cors';

require('dotenv').config();

let app = express();
let port = process.env.PORT || 6969;
//Port === indifined => port 6969

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initWebRouters(app);

connectDB();

app.listen(port, () => {
    //callback
    console.log("Backend node js is running on the port:" + port)
})

