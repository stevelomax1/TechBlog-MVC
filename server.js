const path = require('path');
const express = require('express'); 
const session = require('express-session'); 
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store); /*sequelize*/

const app = express();
const PORT = process.env.PORT || 3001; /*listen to port 3001 or another port if that one is not available*/
const hbs = exphbs.create({ helpers });

const sess = { /*cookies*/
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,

    
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes); /*get to my routes folder*/

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});