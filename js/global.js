import 'babel-polyfill'
const jquery = require('jquery')
//
$ = window.$ = window.jQuery = jquery;


$(document).ready(function(){
    $('.global').addClass('test');  
})

// method to display text name: displayText()
// call on initializing of page 
// and display the word "Loccitane"

const displayText = () => {
    const textToDisplay = document.getElementById('textocc')
    textToDisplay.innerHTML += text

    let text = 'Loccitane';
}