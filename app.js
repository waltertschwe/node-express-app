const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient
const ReactEngine = require('express-react-engine');

const app = express()

// load environment variables
dotenv.load();

const MONGO_DB_USER = process.env.MONGO_DB_USER
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD

var db
var router = express.Router()

// set views directory to match components directory
app.set('views', __dirname + '/components');

// set jsx as the view engine
app.engine('jsx', ReactEngine());


MongoClient.connect( 'mongodb://' + MONGO_DB_USER + ':' + MONGO_DB_PASSWORD + '@ds149069.mlab.com:49069/mongo-test', 
(err, database) => {
 	if (err) return console.log(err)

 	// have connection to Mongo startup server	
 	db = database
 	app.listen(3000, () => {
    	console.log('Listening on 80')
	})
})

app.use(express.static('public'))

// urlencoded tells bodyparser to extract
// data from form and add to body property
// see all data in form field req.body
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send('test')
})

app.get('/test', (req, res) => {
    res.send('test page')
})

app.get('/node-js', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/create', (req, res) => {
	res.sendFile(__dirname + '/public/create.html')
})

app.post('/create', (req, res) => {
  console.log(req.body)
  db.collection('my_collection').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
  })
  
  res.sendFile(__dirname + '/public/create.html')
})

// REACT
app.engine('jsx', reactEngine({wrapper: 'html.jsx'}));







