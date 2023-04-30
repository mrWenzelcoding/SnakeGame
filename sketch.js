let snake = [];
let food;
let gameOver = false;
let highScore = 0;

function setup() {
  createCanvas(600, 600);
  frameRate(10)
  noStroke()
  textAlign(CENTER)
  textSize(40)
  //Creating objects
  snake[0] = new Snake(20,20,0,0)
  food = new Food()
  loop()
}

function draw() {
  background(220);
  
  //Creates black border around the canvas
  push();
  noFill()
  stroke(0)
  strokeWeight(40)
  rect(0,0,width,height)
  pop();
  
  //Draws the food
  fill("red")
  food.show()
  //Draws the body of the snake
  fill(0)
  motion();
  for(let i = 0; i < snake.length; i++){
    snake[i].show()
  }
  

  
  //Functions
  endGame();
  eatFood(food.x,food.y)
}

//Controls Motion of the Snake
function keyPressed(){
  if(keyCode == LEFT_ARROW){
    snake[0].setDir(-1,0)
  } else if(keyCode == RIGHT_ARROW){
    snake[0].setDir(1,0)
  } else if(keyCode == UP_ARROW){
    snake[0].setDir(0,-1)
  } else if(keyCode == DOWN_ARROW){
    snake[0].setDir(0,1)
  }
}

  //Checks if the food intersects with the snake. If so, this lengthens the tail
function eatFood(xF,yF){
    if(xF == snake[0].x && yF == snake[0].y){
      snake[snake.length] = new Snake(xF+snake[0].xSpeed,yF+snake[0].ySpeed);
      moveFood()
    }
}

  //Moves the snake
function motion(){
  
  //Saves the information about the head of the snake
  let x = snake[0].x
  let y = snake[0].y
  let xSpeed = snake[0].xSpeed
  let ySpeed = snake[0].ySpeed
  
  //Creates a new object that is the same as the head and then moves it forward one, which is why it adds the xSpeed and ySpeed
  let tempSnake = new Snake(x+xSpeed*20,y+ySpeed*20,xSpeed,ySpeed);
  //Takes the newly created snake object block and places it at the front of the array
  snake.unshift(tempSnake)
  //Delete's the last object of the snake array
  snake.pop()

}

function moveFood(){
  for(let i = 0; i<snake.length; i++){
    if(food.x == snake[i].x && food.y == snake[i].y){
      food.move()
    }
    else {
      food.move()
      break;
    }
  }
}

function endGame(){
  //Checks if the snake intersects the border
  if(snake[0].x < 20 || snake[0].x > width-40){
    endScreen()
  }
  if(snake[0].y < 20 || snake[0].y > height-40){
    endScreen()
  }
  
  //Checks if the snake intersects itself.The for loop checks if the head is the same coordinates as any of the other coodinates. Note "i" starts at 1 so the head doesn't check if it intersects with itself
  for(let i = 1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
      endScreen()
    }
  }
}

function endScreen(){
  gameOver = true
  if(snake.length > highScore){
  highScore = snake.length;      
  }
  if(gameOver == true){
    noLoop()
    background(0)
    stroke(255)
    fill(255)
    text("Snake Length: " + snake.length, width/2, height/2) 
    textSize(20)
    text("click to restart",width/2,height/2+40)
    textAlign(LEFT)
    text("High Score: " + highScore,0,30)
  }
}

function mousePressed(){
  if(gameOver == true){
    while(snake.length>0){
      snake.pop()
    }
    gameOver = false
    setup()
  }
}

class Snake{
  constructor(_x,_y,_xSpeed,_ySpeed){
    this.x = _x;
    this.y = _y;
    this.size = 20;
    this.xSpeed = _xSpeed;
    this.ySpeed = _ySpeed;
  }
  
  //Note that the speed is just the direction the snake is moving. Takes parameters to simplify code for movement. See keyPressed for more information
  setDir(_x,_y){
    this.xSpeed = _x
    this.ySpeed = _y
  }
  
  show(){
    rect(this.x,this.y,this.size);
  }
  
}

class Food{
  constructor(){
    this.x = int(random(1,29))*20
    this.y = int(random(1,29))*20
  }
  
  show(){
    rect(this.x,this.y,20)
  }
  
  move(){
    this.x = int(random(1,29))*20
    this.y = int(random(1,29))*20
  }
}