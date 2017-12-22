/*======================================================================
| Multiplication Circle / 'Times Table Diagrams'
+-----------------------------------------------------------------------
|      Author: Steven Eiselen, University of Arizona Computer Science
| Description: Implementation of 'Times Table Diagrams' via Mathologer
|              YouTube video linked here: https://youtu.be/qhbuKbxJsk8
|   Libraries: p5js / p5js.dom
+-----------------------------------------------------------------------
| Version Info: 12/21/17 Original p5js version
+=====================================================================*/

/*----------------------------------------------------------------------
|>>> Declarations and Initializations
----------------------------------------------------------------------*/
var points    = [];
var numPoints = 10;
var curFactor = 2;
var degPerInterval;

var windowSize = 600;
var windowHalf = parseInt(windowSize/2);
var yOffset    = 30;
var circleSize = 480;
var circleHalf = parseInt(circleSize/2);

var factorSlider,pointsSlider;

/*----------------------------------------------------------------------
|>>> Function setup
----------------------------------------------------------------------*/
function setup(){
  createCanvas(windowSize,windowSize);
  textSize(18);
  textFont("monospace");
  ellipseMode(CENTER);
  //> These lines demonstrate how to 'chain' state init calls for objects!
  factorSlider = createSlider(2,250,2).size(360,30).position(20,20);
  pointsSlider = createSlider(2,100,10).size(360,30).position(20,50);
  //> Using touchMoved because I want live config changes when sliders are adjusted
  factorSlider.touchMoved(function(){curFactor=factorSlider.value();calcPoints();});
  pointsSlider.touchMoved(function(){numPoints=pointsSlider.value();calcPoints();});
  //> Init run of calcPoints
  calcPoints();
} // Ends Function setup

/*----------------------------------------------------------------------
|>>> Function draw
+-----------------------------------------------------------------------
| Implementation Note: Notice use of the Facade Design Pattern here. I
| didn't really need to partition these render operations to their own 
| functions, but doing this is advised for more advanced builds where
| related operations either go past ~10 lines of code; and/or execute
| in a particular frame based upon the value of a trigger.
----------------------------------------------------------------------*/
function draw(){
  background(24);
  displayConfigText();
  displayCirclesAndLines();
} // Ends Function draw


/*----------------------------------------------------------------------
|>>> Function calcPoints
----------------------------------------------------------------------*/
function calcPoints(){
  //> Init helper variables for computation of point positions
  var deg = 0;  
  var degPerInterval = 360/numPoints;
  //> Clear former points, instantiate new ones
  points = [];
  for(var i=0; i<numPoints; i++){
    points.push(createVector(getXPos(deg),getYPos(deg)));
    deg+=degPerInterval;
  }
} // Ends Function calcPoints

/*----------------------------------------------------------------------
|>>> Functions getXPos/getYPos: Computes location of points on circle
----------------------------------------------------------------------*/
function getXPos(deg){return windowHalf+(circleHalf*cos(radians(180+deg)));}
function getYPos(deg){return windowHalf+yOffset+(circleHalf*sin(radians(180+deg)));}

/*----------------------------------------------------------------------
|>>> Function displayCirclesAndLines: Displays the visualization
----------------------------------------------------------------------*/
function displayCirclesAndLines(){
  //> VFX settings calls
  noFill();strokeWeight(2);stroke(0,int(random(60,120)),int(random(120,255)));
  //> Ellipse and line draw calls
  ellipse(windowHalf,windowHalf+yOffset,circleSize,circleSize);
  for(var i=0; i<numPoints; i++){
    ellipse(points[i].x,points[i].y,15,15);
    if(i!=0){line(
      points[i].x,
      points[i].y,
      points[parseInt((curFactor*i)%numPoints)].x,
      points[parseInt((curFactor*i)%numPoints)].y);}
  }
} // Ends Function displayCirclesAndLines

/*----------------------------------------------------------------------
|>>> Function displayConfigText: Displays UI setting information
----------------------------------------------------------------------*/
function displayConfigText(){
  noStroke();fill(240,240,240);
  text("Mult Factor: "+curFactor, factorSlider.x * 2 + factorSlider.width, 35);
  text("# of Points: "+numPoints, pointsSlider.x * 2 + pointsSlider.width, 65);
} // Ends Function displayConfigText