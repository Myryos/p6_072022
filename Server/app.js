const express = require('express');

const mongoose = require('mongoose'); 

const saucesRoutes = require('./routes/sauces.js');
const userRoutes = require('./routes/user.js')

const path = require('path');

const app = express();
mongoose.connect('mongodb+srv://Myryos:VXx8uypLsGSyvnj5@cluster0.n4qvajh.mongodb.net/?retryWrites=true&w=majority',
{
    useUnifiedTopology: true
})
.then(() => console.log("Connexiion reussi"))
.catch((error) => console.log("Connexion echouer " + error))
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;