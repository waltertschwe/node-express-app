var express = require('express')
var app = express()

app.use(express.static('public'))

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

