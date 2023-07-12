const express = require('express')
const app = express();
var path = require('path');
const { exec } = require('child_process');
const { cpSync } = require('fs');
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5555;

app.use('/css', express.static('css'));
app.use('/Images', express.static('Images'));
app.use('/js', express.static('js'))
app.use('/fonts', express.static('fonts'))
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/test.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname + '/home.html'));
})

app.listen(port, function () {
    console.log(`Listening`);
    // Your code here
    launchToBrowser();
    
});


const launchToBrowser = () => {
    // Open the browser with a local URL
    const localUrl = path.resolve(__dirname + '/dist/test.html');

    switch (process.platform) {
    case 'darwin': // macOS
        exec(`open ${localUrl}`);
        break;
    case 'win32': // Windows
        exec(`start ${localUrl}`);
        break;
    case 'linux': // Linux
        exec(`xdg-open ${localUrl}`);
        break;
    default:
        console.log(`Unable to open the browser on your platform: ${process.platform}`);
    }
}