


var origin=0;
var canvas;
var imgSource=0, imgSlice="";
var pokemonImage;
var tempx; 
var tempy;
// var song;

// function preload(){
//   song = loadSound ("town.mp3");
// }

//This is creating a canvas and loading the pokemon image 
function setup()
{

  canvas = createCanvas(window.innerWidth, window.innerHeight);
          imageMode(CENTER);
          getPokemon(manageImage);
      

  pokemonImage = loadImage(getPokemon(manageImage),draw);

  tempx = window.innerWidth/2; tempy = window.innerHeight/2;

}


 // This is drawing the pokemon image
function draw()
{
    colorMode(RGB);

    if (mouseIsPressed) {
      image(pokemonImage, mouseX, mouseY);
    } else {
      image(pokemonImage, tempx, tempy);
    }

}

//This is returning the Pokemon API individual image from the API
function manageImage(returnedSlice) {
    pokemonImage = loadImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + returnedSlice);
    return (pokemonImage);
}

//This generates a random wholeinterger for when the API
// is being called
function randomInt(start, end) {
  return Math.floor(Math.random() * end) + start
}


//This is retriving the pokemon API, generationg 
// a random pokemon image from the parsed API data
function getPokemon(callback)
{

  var url = "https://pokeapi.co/api/v2/pokemon/"+ randomInt(1,100) +"/";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function()
  {
          if (xhr.readyState === 4 ) {
            if (xhr.status === 200) {

                var pokemonresp = xhr.responseText
                var resp = JSON.parse(pokemonresp);
                console.log(resp)

               
                imgSource = resp.sprites.front_default;
                console.log(imgSource);

                imgSlice = imgSource.slice(73);
                console.log(imgSlice);
                callback(imgSlice);
                

            } else {
                //document.getElementById("Output").innerHTML = "There was an error";
                console.log("error");
            }
          }
  }

  xhr.send(null);

  return imgSlice;

}




/* p5 mousepress functions */


//This is what happens when you release the mouse,
//the pokemon stays in the released mouse location
function mouseReleased(event)
{
   tempx = mouseX;
   tempy = mouseY;
   
   console.log(mouseX, mouseY, tempx, tempy);

}


//This is what happens when the mouse is pressed, an image or 
//another pokemon is drawn upon mouse click

function mousePressed(event)
{  


   tempx = mouseX;
   tempy = mouseY;

   console.log(mouseX, mouseY, tempx, tempy);
   
   manageImage(getPokemon());
   draw();


}











