var boids = [];
var position = [50,50]
var x = 50;
var y = 50;
var boids_amount = 100;
let osc = [];
let playing, freq, amp;


//-----------------------------------------------------------------------------


function mousePressed() {
  if (playing !== true) {
    for(let i = 0;i < boids_amount;i++){
      osc[i].start();
    }
    playing = true;
  }
}


//-----------------------------------------------------------------------------



class Boid {
  constructor(){
    this.x = width/2;
    this.y = height/2;
    this.rotation = 50;
    this.rotation_speed = 180;
    this.speed = 1;
    this.cluster = [];
    this.connections = 0;
    this.view_size = 60;
    this.view_angle = 89;
    this.color = [255,255,255];
    this.linear_velocity = [Math.cos(this.rotation * Math.PI / 180) * this.speed,
                            Math.sin(this.rotation * Math.PI / 180) * this.speed];
    this.id;
  }//end constructor
  draw() {
    this.cluster = [];
    this.connections = 0;
    for (let i = 0; i < boids.length; i++) {
      if (boids[i].x > this.x - this.view_size && boids[i].x < this.x + this.view_size &&
          boids[i].y > this.y - this.view_size && boids[i].y < this.y + this.view_size) {
          if (boids[i].id < this.id) {
            line(this.x, this.y, boids[i].x, boids[i].y);
            this.connections += 1;
            boids[i].connections += 1;
            append(this.cluster,boids[i].id);
            for (let n = 0; n < boids[i].cluster.length; n++) {
              append(this.cluster,boids[i].cluster[n]);
            }
          } else {
          boids[i].cluster = this.cluster;
        }
      }//if within range
    }
    this.color[0] = this.connections * 20;
    this.color[1] = this.cluster.length * 10;
    this.color[2] = 200;
    fill(this.color[0],this.color[1],this.color[2]);
    circle(this.x, this.y,10);
  }//end draw
  chirp(){
    if (playing && this.cluster.length > 0) {
      // smooth the transitions by 0.1 seconds
      osc[this.id].freq((200+(50*this.connections))+(50*this.cluster.length), 0.1);
      osc[this.id].amp(0.1, 0.1);
    } else {
      osc[this.id].amp(0,0.1);
    }
  }
  move(){
   this.color = [255,255,255];
   this.rotation = this.rotation%360; //numbers should wrap between 0 and 360
   this.linear_velocity = [Math.cos(this.rotation * Math.PI / 180) * this.speed,
                           Math.sin(this.rotation * Math.PI / 180) * this.speed];
   this.x += this.linear_velocity[0];
   this.y += this.linear_velocity[1];
   if (this.x > width) {
     this.x = 0;
   }
   if (this.x < 0) {
     this.x = width;
   }
   if (this.y > height) {
     this.y = 0;
   }
   if (this.y < 0) {
     this.y = height;
   }//edge of screen teleporters
  }//end move
  dodge(){
    //what direction are we going?
   if (this.rotation < 180) {//down
     if (this.rotation < 90) {//down-right
       this.rotation_direction = 0;
     } else {//down-left
       this.rotation_direction = 1;
     }
   } else {//up
     if (this.rotation < 270) {//up-left
       this.rotation_direction = 2;
     } else {//up-right
       this.rotation_direction = 3;
     }
   }
   for (let i = 0; i < boids.length; i++) {
     if (boids[i].x > this.x - this.view_size && boids[i].x < this.x + this.view_size &&
         boids[i].y > this.y - this.view_size && boids[i].y < this.y + this.view_size) {
       if (boids[i].id !== this.id) {
         switch (this.rotation_direction) {
           case 0:
              if (view_finder(this.x,this.y,boids[i].x,boids[i].y,this.rotation,this.view_angle).result == 2) {
                //below formula creates a line using the location of this boid and it's location 10 frames from now (if rotation wouldn't change)
                //and then tests if the other boid is above or below that line so we can dodge to the other side of the line to more effectively
                //dodge it.
                if (boids[i].x > this.linear_velocity[1]/this.linear_velocity[0]*boids[i].y &&
                    boids[i].y < this.linear_velocity[1]/this.linear_velocity[0]*boids[i].x) {
                  this.rotation += this.rotation_speed;//if boid coming in to left, dodge right
                  this.color = [100,255,100];
                } else {
                  this.rotation -= this.rotation_speed;//if boid coming in to right, dodge left
                  this.color = [255,100,100];
                }
              }//if it's actually in front of us (not just in out range)
              break;
           case 1:
              if (view_finder(this.x,this.y,boids[i].x,boids[i].y,this.rotation,this.view_angle).result == 2) {
                if (boids[i].x > this.linear_velocity[1]/this.linear_velocity[0]*boids[i].y &&
                    boids[i].y > this.linear_velocity[1]/this.linear_velocity[0]*boids[i].x) {
                  this.rotation += this.rotation_speed;//if boid coming in to left, dodge right
                  this.color = [100,255,100];
                } else {
                  this.rotation -= this.rotation_speed;//if boid coming in to right, dodge left
                  this.color = [255,100,100];
                }
              }//if it's actually in front of us (not just in out range)
              break;
           case 2:
              if (view_finder(this.x,this.y,boids[i].x,boids[i].y,this.rotation,this.view_angle).result == 2) {
                if (boids[i].x < this.linear_velocity[1]/this.linear_velocity[0]*boids[i].y &&
                    boids[i].y > this.linear_velocity[1]/this.linear_velocity[0]*boids[i].x) {
                  this.rotation += this.rotation_speed;//if boid coming in to left, dodge right
                  this.color = [100,255,100];
                } else {
                  this.rotation -= this.rotation_speed;//if boid coming in to right, dodge left
                  this.color = [255,100,100];
                }
              }//if it's actually in front of us (not just in out range)
              break;
           case 3:
              if (view_finder(this.x,this.y,boids[i].x,boids[i].y,this.rotation,this.view_angle).result == 2) {
                if (boids[i].x < this.linear_velocity[1]/this.linear_velocity[0]*boids[i].y &&
                    boids[i].y < this.linear_velocity[1]/this.linear_velocity[0]*boids[i].x) {
                  this.rotation += this.rotation_speed;//if boid coming in to left, dodge right
                  this.color = (200,255,200);
                } else {
                  this.rotation -= this.rotation_speed;//if boid coming in to right, dodge left
                  this.color = (255,200,200);
                }
              }//if it's actually in front of us (not just in out range)
              break;
         }//dodge based on what direction we're traveling
       }//if that boid isn't this boid
     }//if other boid is closeby
   }//end for loop
 }//end dodge
}//end Boid



//-----------------------------------------------------------------------------



function view_finder(thisX,thisY,testX,testY,rotation,degrees_view) {
  let result = 0; //result increases by 1 for each passed check, then function
  //returns true if result is high enough (==2).
  let right_rotation = rotation + (degrees_view/2);
  let left_rotation = rotation - (degrees_view/2);
  right_rotation = right_rotation%360;
  left_rotation = left_rotation%360;
  //generate points which will result in "boundary lines"
  let right_line_point2 = [thisX+(Math.cos(right_rotation * Math.PI / 180) * 50),
                          thisY+(Math.sin(right_rotation * Math.PI / 180) * 50)];
  let left_line_point2 = [thisX+(Math.cos(left_rotation * Math.PI / 180) * 50),
                          thisY+(Math.sin(left_rotation * Math.PI / 180) * 50)];

  //what direction is right_line pointing?
  if (right_rotation < 180) {//down
    if (right_rotation < 90) {//down-right
      right_line_direction = 0;
    } else {//down-left
      right_line_direction = 1;
    }
  } else {//up
    if (right_rotation < 270) {//up-left
      right_line_direction = 2;
    } else {//up-right
      right_line_direction = 3;
    }
  }
  //what direction is left_line pointing?
  if (left_rotation < 180) {//down
    if (left_rotation < 90) {//down-right
      left_line_direction = 0;
    } else {//down-left
      left_line_direction = 1;
    }
  } else {//up
    if (left_rotation < 270) {//up-left
      left_line_direction = 2;
    } else {//up-right
      left_line_direction = 3;
    }
  }
  switch(right_line_direction) {
    case 0:
       if (testX > right_line_point2[1]/right_line_point2[0]*testY &&
           testY < right_line_point2[1]/right_line_point2[0]*testX) {
         result += 1;
       }
       break;
    case 1:
       if (testX > right_line_point2[1]/right_line_point2[0]*testY &&
           testY > right_line_point2[1]/right_line_point2[0]*testX) {
         result += 1;
       }
       break;
    case 2:
       if (testX < right_line_point2[1]/right_line_point2[0]*testY &&
           testY > right_line_point2[1]/right_line_point2[0]*testX) {
         result += 1;
       }
       break;
    case 3:
       if (testX < right_line_point2[1]/right_line_point2[0]*testY &&
           testY < right_line_point2[1]/right_line_point2[0]*testX) {
         result += 1;
       }
       break;
  }//end switch right_line_direction
  switch(left_line_direction) {
    case 0:
       if (testX < left_line_point2[1]/left_line_point2[0]*testY &&
           testY > left_line_point2[1]/left_line_point2[0]*testX) {
         result += 1;
       }
       break;
    case 1:
       if (testX < left_line_point2[1]/left_line_point2[0]*testY &&
           testY < left_line_point2[1]/left_line_point2[0]*testX) {
         result += 1;
       }
       break;
    case 2:
       if (testX > left_line_point2[1]/left_line_point2[0]*testY &&
           testY < left_line_point2[1]/left_line_point2[0]*testX) {
         result += 1;
       }
       break;
    case 3:
       if (testX > left_line_point2[1]/left_line_point2[0]*testY &&
           testY > left_line_point2[1]/left_line_point2[0]*testX) {
         result += 1;
       }
       break;
  }//end switch left_line_direction
  return {
    result
  }
}//end viewfinder




//-----------------------------------------------------------------------------





function setup() {
  fullscreen();
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);
  stroke(255);
  for (let i = 0; i < boids_amount; i++) {
    boids[i] = new Boid;
    boids[i].x = width/sqrt(boids_amount)*(i%sqrt(boids_amount));
    boids[i].y = height/sqrt(boids_amount)*(ceil(i/sqrt(boids_amount)));
    boids[i].id = i;
    boids[i].rotation = i * 5;
    osc[i] = new p5.Oscillator('sine');
  }
}//end setup



//----------------------------------------------------------------------------



function draw() {
  alpha(0.9);
  background(50,50,100,50);
  alpha(1);
  for (let i = 0; i < boids_amount; i++){
    boids[i].draw();
    boids[i].chirp();
    boids[i].move();
  }
}//end draw
