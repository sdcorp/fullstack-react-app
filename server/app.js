const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const errorHandlers = require('./helpers/errorHandlers');
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');

//  Init app
const app = express();

// Passport Config
require('./middleware/passport')(passport);
require('./middleware/passport-jwt')(passport);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Added logging
app.use(require('morgan')('dev'));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Init Swagger. Access: /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// After allllll that above middleware, we finally handle our own routes!
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/test', testRoutes);

// All remaining requests return the React app, so it can handle routing.
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Some of DB errors
app.use(errorHandlers.dbValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
