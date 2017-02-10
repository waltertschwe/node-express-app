const express = require('express')
const bodyParser = require('body-parser')
const app = express()

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

app.listen(3000, () => {
    console.log('Listening on 80')
})

app.get('/node-js', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/create', (req, res) => {
	res.sendFile(__dirname + '/public/create.html')
})

app.post('/create', (req, res) => {
  console.log(req.body)
  res.sendFile(__dirname + '/public/create.html')
})

