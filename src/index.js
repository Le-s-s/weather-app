import handler from "./handler.js"


addEventListener("DOMContentLoaded", (event) => {
  handler.start()

});

// create dom with input and search button
// listen for button press
// when button pressed check text input
// if input not empty, and is zip code
// put zip code in weather api returning json information
// read information and return legible
// make visual changes based on information.

//additional note
// use async function