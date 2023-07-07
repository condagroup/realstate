const express = require('express')
const app = express()
app.use(express.json())
// const { sequelize } = require('./models');
const userRoute = require('./routes/User');
const paymentRoute = require('./routes/Payment');
const reviewRoute = require('./routes/Review');
const leadsRoute = require('./routes/Leads');
const propertyRoute = require('./routes/Property');
const developmentRoute = require('./routes/Development');
const blogRoute=require('./routes/Blog');

app.use('/user', userRoute);
app.use('/payment', paymentRoute);
app.use('/review', reviewRoute);
app.use('/lead', leadsRoute);
app.use('/property', propertyRoute);
app.use('/development', developmentRoute);
app.use('/blog',blogRoute);

app.use(express.static('uploads')); 
app.use('/images', express.static('uploads'));

app.listen({ port: 6767 }, async () => {
    console.log('Server up on http://localhost:6767')
    // sequelize.sync() 
    // await sequelize.authenticate()
    console.log('Database Connected Properly!')
  })
module.exports = app;