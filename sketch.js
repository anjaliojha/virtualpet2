var dog, dogImg
var happyDog, happyDogImg
var database;
var foodS;
var foodStock;
var FedTime, lastFed;
var foodObj;
function preload()
{
	dogImg=loadImage("dogImg.png");
  happyDogImg=loadImage("dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1000, 1000);

  foodObj = new Food();

  dog=createSprite(200,200,10,10);
  dog.addImage(dogImg);
  dog.scale=0.2;

  
  foodStock=database.ref('food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
}


function draw() {  

  background("green");

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
});


textSize(5);
fill("red");
stroke(5);
textSize(20);


drawSprites();
}

function addFood(){
   foodS++;
   database.ref('/').update({
     Food:foodS
   });
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

 //function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDogImg);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}




