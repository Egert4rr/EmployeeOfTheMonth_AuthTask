const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js')
const cookieParses = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParses())

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect('mongodb://localhost:27017/mySuperSecretDB', {useNewUrlParser: true ,useUnifiedTopology: true});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.get('*', checkUser)
app.get('/', requireAuth, (req, res) => res.render('index'));
app.use(authRoutes)