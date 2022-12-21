const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://user1:user1pass@ccluster.uixtn8f.mongodb.net/userdb?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(dbURI)
    .then((result) => {
        console.log('Connected to Database')
        app.listen(8080);
        })
    .catch((err) => console.log(err));

//set view engine
app.set('view engine', 'ejs');

//middleware to handle json parsed requests
app.use(express.json());

//Get Index
app.get('/', (req, res) =>{
    res.render('index');
});

//User Routes
app.use('/users', userRoutes);