
const mongoose = require('mongoose');
const config = require('config');
/*const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');*/
const walkers = require('./routes/walkers');
const locations = require('./routes/locations');
const users = require('./routes/users');
const auth = require('./routes/auth');
//const home = require('./routes/home');
const express = require('express');
const app = express();

//app.set('view engine', 'pug');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://127.0.0.1/walkmydog')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB'));

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));
//app.use(helmet());
app.use('/api/walkers', walkers);
app.use('/api/locations', locations);
app.use('/api/users', users);
app.use('/api/auth', auth);
//app.use('/', home);

/*if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan Enabled');
}*/

//app.use(logger);

/*app.use(function(req, res, next) {
    console.log('Authenticating'); 
    next();
});*/


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));