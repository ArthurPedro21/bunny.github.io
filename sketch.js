const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit, rope, rope2, rope3;
var fruit_con, fruit_con2, fruit_con3; //ligaçao da fruta com a corda

var bg_img;
var food;
var rabbit;
var bunny, bunnysad, bunnyeating, bunnyblink
var cut_button, button2, _button3;

var airSound, sound, cuttingSound, sadSound, eatingSound

var ballon, mutebtn
function preload() {
  bg_img = loadImage('background.png');

  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bunnyblink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  bunnyeating = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
  bunnysad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")

  bunnyblink.looping = true
  bunnyeating.looping = false
  bunnysad.looping = false

  airSound = loadSound("air.wav")
  sound = loadSound("sound1.mp3")
  cuttingSound = loadSound("rope_cut.mp3")
  sadSound = loadSound("sad.wav")
  eatingSound = loadSound("eating_sound.mp3")
}

function setup() {
  /*
  se caso quiser transformar a tela compativel com disppisitivos moveis:
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW= displayWidth;
    canH= displayHeight;
    createCanvas(displayWidth+80, displayHeight)
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
  }

  */ 
  createCanvas(500, 700);
  frameRate(80);

  bunny = createSprite(250, 610, 50, 70)

  bunnyblink.frameDelay = 20
  bunnyeating.frameDelay = 20
  bunnysad.frameDelay = 20

  bunny.addAnimation("blink", bunnyblink)
  bunny.addAnimation("eating", bunnyeating)
  bunny.addAnimation("sad", bunnysad)

  bunny.scale = 0.2

  cut_button = createImg("cut_btn.png");
  cut_button.position(210, 30);
  cut_button.size(70, 60);
  cut_button.mouseClicked(cut);

  button2 = createImg("cut_btn.png");
  button2.position(425,150);
  button2.size(70,60);
  button2.mouseClicked(cut2);

  button3 = createImg("cut_btn.png");
  button3.position(90,100)
  button3.size(70,60)
  button3.mouseClicked(cut3)
  

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(200, 680, 600, 0.1);

  rope = new Rope(7, { x: 245, y: 30 });
  rope2 = new Rope(9,{x:470, y:150});
  rope3 = new Rope(6,{x:120, y:100});

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  fruit_con2 = new Link(rope2,fruit)
  fruit_con3 = new Link(rope3,fruit)

  ballon = createImg("balloon.png")
  ballon.position(20,250)
  ballon.size(140,100)
  ballon.mouseClicked(air)

  mutebtn = createImg("mute.png")
  mutebtn.position(440,20)
  mutebtn.size(50,50)
 mutebtn.mouseClicked(mute)


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

sound.play()
sound.setVolume(0.1)
}

function draw() {
  background(51);

  image(bg_img, width / 2, height / 2, 490, 690);

  push();
  imageMode(CENTER);
  if (fruit != null) {

    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();


  if (colide(fruit,bunny) == true) {
    bunny.changeAnimation("eating")
    eatingSound.play()
  }

  if (fruit !== null && fruit.position.y > 680)  {
    
  bunny.changeAnimation("sad")
  sadSound.play()
  fruit = null;
  }

  rope.show();
  rope2.show();
  rope3.show();
  
  Engine.update(engine);
  ground.show();


  drawSprites()
}

function cut() {

  fruit_con.detach()
  rope.break()
  fruit_con = null
  cuttingSound.play()
}

function cut2() {

  fruit_con2.detach()
  rope2.break()
  fruit_con2 = null
  cuttingSound.play()
}

function cut3() {

  fruit_con3.detach()
  rope3.break()
  fruit_con3 = null
  cuttingSound.play()
}


function colide(waterMelon, body) {

  if (fruit != null) {
    var dear = dist(waterMelon.position.x, waterMelon.position.y, body.position.x, body.position.y)
    if (dear <= 50) {
      World.remove(world, fruit)
      fruit = null
      return true
    }
    else {
      return false

    }

  }

}


function air(){
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.07,y:-0.01})
 airSound.play() 
 airSound.setVolume(0.15)
}


function mute(){

  if (sound.isPlaying()) {
    sound.stop();
    airSound.stop();
    eatingSound.stop();
    cuttingSound.stop();
    sadSound.stop();
  }
  else{
    sound.play();
    airSound.play();
    eatingSound.play();
    cuttingSound.play();
    sadSound.play();
  }

}