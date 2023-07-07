const express = require('express');
const cors = require('cors');
const prisma = require('../lib/prisma');
const authenticateToken = require('../functions/authenticateToken')
const REQUEST_URL  = require('./Urls');
const app = express()
require('dotenv').config({path: __dirname + '/.env'});

app.use(express.json())
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', REQUEST_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors());
app.options('*', cors());

app.get('/reviews', authenticateToken, async (req, res) => {
  try {
    const reviewselect = await prisma.review.findMany()
    return res.json(reviewselect)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = app;