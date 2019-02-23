const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
//const uuid = require('uuid');
const cors = require('cors');
require('dotenv').config();

//Controllers
const productsController = require('./controllers/products_controller')

//destruct variables from .env
const {
    PORT,
    CONNECTION_STRING
} = process.env

//Middleware
const app = express();
app.use(bodyParser.json());
// app.use()

//Database connection
massive(CONNECTION_STRING).then(dbInstance => {
    //console.log('connected to database')
    app.set('db', dbInstance)
  }).catch( err => console.log('faced connection error:', err) );

//Products and endpoints
app.get('/api/products', productsController.getAll);
app.get('/api/products:id', productsController.getOne );
app.put('/api/products:id', productsController.update);
app.post('/api/products', productsController.create);
app.delete('/api/products:id', productsController.delete);

app.listen( PORT, () => {
    console.log(`Server is running on ${PORT}`)
})