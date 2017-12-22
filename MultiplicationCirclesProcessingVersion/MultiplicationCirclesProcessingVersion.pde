/*======================================================================
| Mandelbrot Multiplication Circle
+-----------------------------------------------------------------------
|      Author: Steven Eiselen, University of Arizona Computer Science
| Description: Implementation of 'Times Table Diagrams' via Mathloger's
|              YouTube video linked here: https://youtu.be/qhbuKbxJsk8
|   Libraries: Processing 3
|      To Run: 1) Install Processing 3 via https://processing.org/ if
|                 you do not already have the application.
|              2) Copy/Paste this code into a blank sketch and run it.
+-----------------------------------------------------------------------
| Version Info: 12/21/17 Preparation for p5.js migration to support an
| interactive demo via GitHub Pages. Additional changes of note:
|  > Fixed a known glitch wherein going through a series of different 
|    'numPoints' and 'factor' value configurations caused the circle of
|    of points' rotation to slightly distort over time. This was caused 
|    by the variable 'degree' (currently in the calcPoints() function) 
|    having formerly been a global variable and not resetting its value 
|    between calls of calcPoints (i.e. during configuration changes).
|  > Changed name of 'printInfo' function to printCurInfoToTextLabel()
|    to better reflect its purpose.
+-----------------------------------------------------------------------
| Redundancy Note: If you're seeing this code and you're not the author,
| it's because Steven threw it on here for archival purposes and will be
| ignoring it because the the p5js version is the main interactive demo.
| Therefore, this code is compacted and without comments/documentation.
+=====================================================================*/
class Point{
  float x,y; public Point(float xi, float yi){this.x=xi; this.y=yi;}
} // Ends Class Point
Point[] points;

float numPoints = 10;
float factor = 2;

void setup(){
  size(600,600);
  textSize(18);
  ellipseMode(CENTER);
  calcPoints();
} // Ends Function setup

void draw(){
  background(255);
  displayConfigToTextLabel(); 
  noFill();strokeWeight(2);stroke(0,int(random(60,120)),int(random(120,255)));
  ellipse(300,300,480,480); 
  for(int i=0; i<numPoints; i++){ellipse(points[i].x,points[i].y,10,10);}
  for(int i=1; i<numPoints; i++){line(points[i].x,points[i].y,points[(int)((factor*i)%numPoints)].x,points[(int)((factor*i)%numPoints)].y);}  
} // Ends Function draw

void keyPressed(){
  if      (key=='q'){numPoints++;calcPoints();}
  else if (key=='a'){if(numPoints>1){numPoints--;calcPoints();}}
  else if (key=='w'){factor++;calcPoints();}
  else if (key=='s'){if(factor>1){factor--;calcPoints();}}
} // Ends Function keyPressed

void calcPoints(){
  float degree = 0;
  float degPerInterval = 360/numPoints;
  points = new Point[(int)numPoints];
  for(int i=0; i<numPoints; i++){points[i] = new Point(getXPos(degree),getYPos(degree));degree+=degPerInterval;}
} // Ends Function calcPoints

void displayConfigToTextLabel(){
  fill(0);text(("Number of Points = " + numPoints + "\nMultiplying by = " + factor),12,36);
} // Ends Function displayConfigToTextLabel

float getXPos(float degree){
  return (float)(300 + 240 * Math.cos(radians(180+degree)));
} // Ends Function getXPos

float getYPos(float degree){
  return (float)(300 + 240 * Math.sin(radians(180+degree)));
} // Ends Function getYPos