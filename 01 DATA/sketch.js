
const mappa = new Mappa('Leaflet');
let trainMap;
let canvas;

var data;
var data0;
var data1;

var allZipCodes;
var maskCodes;
var covidCases;


var sz;
var sz0;
var sz1;


var txt;

function preload() {
  data = loadJSON("zipcodes.json"); 
  data0 = loadJSON("dataMask.json");
  data1 = loadJSON("data0covidUSA.json");
}


const options = {
  lat: 36.778259,
  lng: -95.6650,
  zoom: 5,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
};



function setup() {
  canvas =  createCanvas(windowWidth, windowHeight);
  trainMap = mappa.tileMap(options);
  trainMap.overlay(canvas);

  allZipCodes = data.zipCodes;
  maskCodes = data0.Sheet1;
  covidCases = data1.hoja0;



}


function draw() {
  clear();
  //background(0);

  blendMode(ADD);

  var x = 100;
  var y = 100;

  var x0 = 100;
  var y0 = 200;

  var x1 = 100;
  var y1 = 300;


  ellipse(x,y,50,50);
  ellipse(x0,y0,50,50);
  ellipse(x1,y1,50,50);


  var d = dist(mouseX,mouseY,x,y);
  var d0 = dist(mouseX,mouseY,x0,y0);
  var d1 = dist(mouseX,mouseY,x1,y1);


  if(d <= 50){
    sz = 3;
  fill(255);
textAlign(CENTER,CENTER);
textSize(50);
text("ZIP CODES",200,500);

  }else{
    sz = 1.5;
  }

  if(d0 <= 50){
    sz0 = 20;
fill(255);
textAlign(CENTER,CENTER);
textSize(50);
text("KN95 MASKS",200,500);

  }else{
    sz0 = 3;
  }

  if(d1 <= 50){
fill(255);
textAlign(CENTER,CENTER);
textSize(50);
text("COVID CASES",200,500);

    sz1 = 10;
  }else{
    sz1 = 3;
  }




  for(var i = 0; i<allZipCodes.length-100; i++){
  var pix = trainMap.latLngToPixel(allZipCodes[i].lat, allZipCodes[i].lon);
  fill(255,255,0);
  noStroke();
  ellipse(pix.x, pix.y,  sz);
  }




  for(var i = 0; i<maskCodes.length; i++){
  var pix = trainMap.latLngToPixel(maskCodes[i].Lat, maskCodes[i].Long);
  fill(0,255,0);
  noStroke();
  ellipse(pix.x, pix.y,  sz0 );
  }


  for(var i = 0; i<covidCases.length; i++){
  var pix = trainMap.latLngToPixel(covidCases[i].Lat, covidCases[i].Long_);
  fill(255,0,0);
  noStroke();
  ellipse(pix.x, pix.y,  sz1 );
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}