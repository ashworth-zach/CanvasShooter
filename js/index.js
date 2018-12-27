var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

canvas.width = canvas.height = 500;

var x = 150,
  y = 150,
  velY = 0,
  velX = 0,
  speed = 2,
  friction = 0.98,
  keys = [],
    bulletsFired=0,
    kills=0,
  bullets = [{ x: x, y: y }],
  enemies=[],
    wave=1,
    lives=50;

function respawn(){
  for(var i = 0;i<wave;i++){
  enemies.push({x:Math.random()*495,y:Math.random()*25})    
  }
  wave+=1;

}
function update() {
  requestAnimationFrame(update);
   document.getElementById("lives").innerHTML=lives;
   document.getElementById("kills").innerHTML=kills;
     document.getElementById("wave").innerHTML=wave;

   document.getElementById("bulletsFired").innerHTML=bulletsFired;

  if (keys[38]) {
    if (velY > -speed) {
      velY--;
    }
  }

  if (keys[40]) {
    if (velY < speed) {
      velY++;
    }
  }
  if (keys[39]) {
    if (velX < speed) {
      velX++;
    }
  }
  if (keys[37]) {
    if (velX > -speed) {
      velX--;
    }
  }

  velY *= friction;
  y += velY;
  velX *= friction;
  x += velX;

  if (x >= 495) {
    x = 495;
  } else if (x <= 5) {
    x = 5;
  }

  if (y > 495) {
    y = 495;
  } else if (y <= 5) {
    y = 5;
  }
        ctx.clearRect(0, 0, 500, 500);
  if (bullets != []) {
    for (var i = 0; i < bullets.length; i++) {
      bullets[i].y -= 1;

      ctx.fillStyle='#00A'
      ctx.fillRect(bullets[i].x, bullets[i].y, 5, 10);
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
      }
    }
  }
  if(enemies[0]==undefined){
    respawn();
  }
  if(enemies!=[]){
    for(var i =0; i<enemies.length;i++){
      for(var j=0;j<bullets.length;j++){
        if(bullets[j].y > enemies[i].y-5&&bullets[j].y < enemies[i].y && bullets[j].x < enemies[i].x+10&& bullets[j].x+10 > enemies[i].x){
          enemies.splice(i,1);
          kills+=1;
          i++
        }
      }
      enemies[i].y+=1;
      if(enemies[i].y>495){
        enemies.splice(i,1);
        lives-=1;
        i++
      }
       ctx.fillStyle="green"
       ctx.beginPath();
       ctx.arc(enemies[i].x, enemies[i].y, 10, 0, Math.PI * 2);
      ctx.fill();

    }

  }
  ctx.fillStyle="red"
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
}
function gameloop() {
  update();
  respawn();

}
gameloop();

document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});
document.body.addEventListener("keypress", function(e) {
  if(e.keyCode==32){ 
      bullets.push({ x: x, y: y });
    bulletsFired+=1;
  }
});