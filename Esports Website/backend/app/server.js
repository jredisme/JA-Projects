const express = require('express'); // express is for bulding Rest apis
const cors = require('cors'); // cors provides express middleware to enable CORS with various options

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // frontend port
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the AEL Sport League application.' });
});

// import routes
const teamRoutes = require('./routes/team.routes');
const playerRoutes = require('./routes/player.routes');
const coachRoutes = require('./routes/coach.routes');
const eventRoutes = require('./routes/event.routes');
const matchRoutes = require('./routes/match.routes');

// use routes
app.use('/teams', teamRoutes);
app.use('/players', playerRoutes);
app.use('/coaches', coachRoutes);
app.use('/events', eventRoutes);
app.use('/matches', matchRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080; // backend port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
