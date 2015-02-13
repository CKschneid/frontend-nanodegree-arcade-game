//chris schneider. udacity feb. 2015
/////////////////////////////////////////////////////////////////////////
// Enemy constructor function
/////////////////////////////////////////////////////////////////////////
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png'; //provided code that holds the image that will visually represent each enemy
    this.x=0; //All new enemies will first appear on left edge of canvas space
    this.y = randomizeEnemyRow(); //will return one of three possibilities as there are three rows of stones
    this.speed = randomizeEnemySpeed();//will return a number between 1 and 5 that will serve as a multiple for rate of position change
}
/////////////////////////////////////////////////////////////////////////
// function to generate "y" position
/////////////////////////////////////////////////////////////////////////
function randomizeEnemyRow () {
    var rowIndex = Math.floor((Math.random()*3)+1);
    var yPos;
    if (rowIndex=1){
        yPos = 101;
        }
        else if(rowIndex=2) {
            yPos = 202;
        }
            else {
                yPos = 303;
            }
        return yPos;
}
/////////////////////////////////////////////////////////////////////////
// function to generate "y" position
/////////////////////////////////////////////////////////////////////////
function randomizeEnemySpeed () {
    var ranNum = Math.floor((Math.random()*5)+1);
    return ranNum;
}
/////////////////////////////////////////////////////////////////////////
// update function
/////////////////////////////////////////////////////////////////////////
Enemy.prototype.update = function(dt) {
    this.x = this.x + (2*dt*this.speed);  /*set base movement unit equal to 2 multiply this base unit by dt(time interval provided) and 
    randomly generated speed multiple between 1 and 5(i.e. 'this.speed')*/
}
/////////////////////////////////////////////////////////////////////////
// draw enemy onto canvas. code was already provided.
/////////////////////////////////////////////////////////////////////////
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//  Player constructor function
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var player = function(){
    this.sprite ='images/char-boy.png';
    this.x = 252.5;
    this.y = 404;
}
/////////////////////////////////////////////////////////////////////////
// player update method
/////////////////////////////////////////////////////////////////////////
player.prototype.update = function(){
    //check to see if a collission has occurred or if user has made it over enemy area or if input will push offscreen
    if (this.y < 101) {//if player makes it across finish line, set player back to original position
        this.x = 252.5;
        this.y = 404;
    }
    for(var i=0; i<allEnemies.length; i++){ //if a collission occurs, reset player back to original position
        if (this.x = allEnemies[i].x && this.y = allEnemies[i].y) {
            this.x = 252.5;
            this.y = 404;
        }
    }
}
/////////////////////////////////////////////////////////////////////////
// player render method
/////////////////////////////////////////////////////////////////////////
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
/////////////////////////////////////////////////////////////////////////
// playerhandle input method
/////////////////////////////////////////////////////////////////////////
player.prototype.handleInput = function(userIn){
    switch (userIn) {
    case 'left':
        this.x -= 10;
        break;
    case 'up':
        this.x -= 10;;
        break;
    case 'right':
        this.x += 10;;
        break;
    case 'down':
        this.x += 10;;
        break;
    }
}
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//  Instantiate Objects
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var allEnemies = []; // create array to store enemy objects
for (var i =0; i<5; i++) { //use a loop to create 5 enemy objects and push each newly created object into the "allEnemies" array
    var enemyNow = new Enemy();
    allEnemies.push(enemyNow);
}
var player = new player(); // create player object
/////////////////////////////////////////////////////////////////////////
// add event listener to listen for keypress events that will move the player
/////////////////////////////////////////////////////////////////////////
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
