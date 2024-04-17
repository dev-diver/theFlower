const myAudio = document.createElement("audio");
myAudio.src = "./audio/background.mp3";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

var GameStart = false
var GameOver = false

function StartGame(){
  if(!GameStart){
    GameStart=true
  }
  if(myAudio.paused){
    myAudio.play();
  }
}

const gravity = 0.7;

const background = new LoopImage({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})

const PointCounter = new Point({
  position:{
    x: 100,
    y: 0,
  },
  imageSrc :'./img/point/0.png',  
})

const FlowerMaker = new Flowers()
const SignMaker = new Signs()

const player = new Character({
  position: {
    x: 150,
    y: 70
  },
  velocity: {
    x: 0,
    y: 0
  },
  imageSrc: './img/player/stand.png',
  sprites: {
    stand : {
      imageSrc: './img/player/stand.png',
      framesMax: 1
    },
    walk : {
      imageSrc: './img/player/walk.png',
      framesMax: 6
    },
    back : {
      imageSrc: './img/player/back.png',
      framesMax: 6
    },
    meet : {
      imageSrc: './img/player/giving_flower.png',
      framesMax: 1
    },
  },
})

const girl = new Character({
  position: {
    x: 2000,
    y: 120
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  imageSrc: './img/girl/stand.png',
  sprites: {
    stand: {
      imageSrc: './img/girl/stand.png',
      framesMax: 1
    },
    meet: {
      imageSrc: './img/girl/take.png',
      framesMax: 1
    }
  }
})

var mousePos = { x:0, y:0 };

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  mouse : {
    clicked: false
  }
}

const description = new Image()
description.src = './img/description.png'

const credit = new Image()
credit.src = './img/end.png'
let creditOpacity = 0;

FlowerMaker.makeFlowers()
SignMaker.makeSigns()

//main
function animate() {
  if(!GameOver){
    window.requestAnimationFrame(animate)
  }

  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)

  var playerCenter = player.position.x + player.width/2
  if(keys.mouse.clicked){
    console.log(mousePos)
  }
  // player movement
  if ((keys.a.pressed && player.lastKey === 'a') ||(keys.mouse.clicked && mousePos.x < playerCenter)) {
    player.velocity.x = -5
    if(player.position.x<canvas.width/6){
      player.velocity.x = 0
      background.scrollSpeed = -5
      girl.velocity.x = 5
    }    
    player.switchSprite('back')
  } else if ((keys.d.pressed && player.lastKey === 'd') ||(keys.mouse.clicked && mousePos.x > playerCenter)) {    
    player.velocity.x = 5
    if(player.position.x>canvas.width/3){
      player.velocity.x = 0
      background.scrollSpeed = 5
      girl.velocity.x = -5
    }    
    player.switchSprite('walk')
  } else {
    player.switchSprite('stand')
    player.velocity.x = 0
    girl.velocity.x = 0
    background.scrollSpeed = 0
  }

  if(girl.position.x-player.position.x < 260 ){
    player.switchSprite('meet')
    girl.switchSprite('meet')
    GameOver=true
  }
  
  background.update()
  FlowerMaker.update()
  SignMaker.update()
  PointCounter.update()
  
  player.update()
  if(player.point>=5){
    girl.update()
  }  

  if(!GameStart){      
    c.drawImage(description, 270,0, description.width-50,description.height-50)
  }
  if(GameOver){
    setTimeout(() => {
      console.log("GameOver")
      gameOverAnimate()
    }, 1000);
  }
}

let Elapsed = 0;
let Hold = 100;

function gameOverAnimate(){
  window.requestAnimationFrame(gameOverAnimate)
  if(GameOver){
    c.globalAlpha = creditOpacity;
    c.drawImage(credit, canvas.width-credit.width*0.7,canvas.height-credit.height*0.7,
      credit.width*0.5,credit.height*0.5)
    Elapsed++
    if(Elapsed % Hold === 0){
      creditOpacity += 0.01
    }
    c.globalAlpha = 1;
  }
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
    case 'ArrowRight':
      keys.d.pressed = true
      player.lastKey = 'd'
      break
    case 'a':
    case 'ArrowLeft':
      keys.a.pressed = true
      player.lastKey = 'a'
      break
  }
  StartGame()
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
    case 'ArrowRight': 
      keys.d.pressed = false
      break
    case 'a':
    case 'ArrowLeft':
      keys.a.pressed = false
      break
  }
})

canvas.addEventListener("touchstart", function (e) {
  e.preventDefault();
  mousePos = getTouchPos(canvas, e);  
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
  clientX: touch.clientX,
  clientY: touch.clientY,
  });  
  canvas.dispatchEvent(mouseEvent);
  if(GameStart){
    keys.mouse.clicked = true
  }  
  StartGame()
}, false);

canvas.addEventListener("touchmove", function (e) {
  e.preventDefault();
  mousePos = getTouchPos(canvas, e);  
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
  keys.mouse.clicked = false
}, false);

function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}