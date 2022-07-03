const express = require('express');

const mongoose = require('mongoose'); 

const saucesRoutes = require('./routes/sauces.js');
const userRoutes = require('./routes/user.js')

const path = require('path');

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://Myryos:<Gprspvqc1>@cluster0.eaxlpr8.mongodb.net/?retryWrites=true&w=majority',
{
    userNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => console.log("Connexiion reussi"))
.catch(() => console.log("Connexion echouer"))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.user('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;