const express = require('express')
const app = express();
var path = require('path');

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5555;

app.use('/css', express.static('css'));
app.use('/Images', express.static('images'));
app.use('/js', express.static('js'))
app.use('/fonts', express.static('fonts'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname + '/home.html'));
})

app.listen(port, function () {
    console.log(`Listening`);
});