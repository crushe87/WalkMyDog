
//require('express-async-errors');
const winston = require('winston');
const error = require('./middleware/error');
const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
const walkers = require('./routes/walkers');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const cors = require('cors');
const app = express();


const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logfile.log' })
    ]
  });

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}


mongoose.connect('mongodb://mongo:27017')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB'));

    //mongoose.connect('mongodb://127.0.0.1:27017')

var corsOptions = {
    origin: 'http://localhost:8081'
}; 
    
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));
//app.use(helmet());
app.use('/api/walkers', walkers);
app.use('/api/users', users);
app.use('/api/auth', auth);
//app.use('/', home);
app.use(error);

/*if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan Enabled');
}*/

//app.use(logger);

/*app.use(function(req, res, next) {
    console.log('Authenticating'); 
    next();
});*/


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));