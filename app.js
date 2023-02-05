import debrisData from "./Calculations/dataXYAvg.json" assert { type: "json" };

const Application = PIXI.Application;

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: false,
    antalias: true
});

app.renderer.view.style.position = 'absolute';
document.body.appendChild(app.view);

//camera
const world = new PIXI.Container();
const acceleration = 1;
world.x = app.screen.width / 2;
world.y = app.screen.height / 2;
world.pivot.x = world.width / 2;
world.pivot.y = world.height / 2;

const earth_sprite = PIXI.Sprite.from('./Assets/Earf.png');
earth_sprite.scale.set(2, 2);
world.height = earth_sprite.height;
world.width = earth_sprite.width;
world.addChild(earth_sprite);


function createPlayer() {
    const playerImages = [];
    for (let i = 0; i < 10; i++) {
        const texture = PIXI.Texture.from(`./Assets/tile00${i}.png`);
        playerImages.push(texture);
    }
    for (let i = 10; i < 16; i++) {
        const texture = PIXI.Texture.from(`./Assets/tile0${i}.png`);
        playerImages.push(texture);
    }

    let player = new PIXI.AnimatedSprite(playerImages);
    player.score = 0;
    player.debris = 0;
    player.anchor.set(0.5, 0.5);
    player.x = window.innerWidth/2;
    player.y = window.innerHeight/2;
    //velocity
    player.v = 0;
    //acceleration
    player.a = 0;
    //mass
    player.m = 1;
    //force
    player.force = 0;
    //fuel
    player.fuel = 500;
    //angle
    player.angle = 0;
    //score
    player.score = 0;
    player.scale.set(0.5,0.5);

    world.addChild(player);
    player.loop = false;
    player.animationspeed = 1;
    return player;
}
const debrisImages = [
    "./Assets/SpaceDebris_1.png",
    "./Assets/SpaceDebris_2.png",
    "./Assets/SpaceDebris_3.png"
]

let debris_sprites = [];
let debris_coords = [];
function generateDebris() {
    for (let i = 0; i < debrisData.length; i++) {
        let obj = debrisData[i];
        let x = obj["xScaled"];
        let y = obj["yScaled"];
        const debris_sprite = PIXI.Sprite.from(debrisImages[i % 3]);
        debris_sprite.scale.set(0.5,0.5);
        debris_sprite.x = 2*x - 3000;
        debris_sprite.y = 2.5*y - 2000;
        debris_sprite.v = 0;
        debris_sprites.push(debris_sprite);
        world.addChild(debris_sprite);
    }
}

let player = createPlayer();
generateDebris();

let scoreText = new PIXI.Text('Score:' + player.score);
app.stage.addChild(scoreText);
app.stage.addChild(world);

let keys = {};
let keysDiv;
let playerSheet = {}; 


//event handlers
window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

function keysDown(e) {
    console.log(e.keyCode);
    keys[e.keyCode] = true;
}

function keysUp(e) {
    console.log(e.keyCode);
    keys[e.keyCode] = false;
}

app.ticker.add(gameLoop);
keysDiv = document.querySelector('#keys');

function gameLoop() {
    //W
    if (keys["87"]) {
       if (player.v > -0.5) player.v -= 0.005;
       player.play();
       player.loop = true;
    }
    //A
    if (keys["65"]) {
        player.angle -= 1;
        player.play();
        player.loop = true;
    }

    //S
    if (keys["83"]) {
        if (player.v < 0.5) player.v += 0.005;
        player.gotoAndStop(0);
    }
    
    //D
    if (keys["68"]) {
        player.angle += 1;
        player.play();
        player.loop = true;
    }

    if (!keys["68"] && !keys["65"] && !keys["87"] && !keys["83"]) {
        player.stop();
        player.gotoAndStop(0);
        player.loop = false;
    }

    if (player.x + (player.v * (Math.sin(-player.rotation))) > 0 && player.x + (player.v * (Math.sin(-player.rotation))) < world.width) player.x += player.v * (Math.sin(-player.rotation));
    else {
        let text = new PIXI.Text("Careful there! Don't want to travel too far into the dangerous depths of the abyss!")
        text.x = player.x + 10;
    }
    if (player.y + (player.v * (Math.cos(player.rotation))) >0 && player.y + (player.v * (Math.cos(player.rotation))) < world.height) player.y += player.v * (Math.cos(player.rotation));

    if (player.x + world.width/2 < world.width) {
        world.pivot.x = player.x;
    }
    if (player.y + world.height/2 < world.height) {
        world.pivot.y = player.y;
    }
    if (player.x - world.width/2 > 0) {
        world.pivot.x = player.x;
    }
    if (player.y - world.height/2 > 0) {
        world.pivot.y = player.y;
    }

    for (let i = 0; i < debris_sprites.length; i++) {
        if(document.getElementById("Details-Underline").innerHTML == "") {
            document.getElementById("itemFound").style.display = "none";
        }
        else {
            document.getElementById("itemFound").style.display = "block";
        }

        if (rectsIntersect(player, debris_sprites[i])) {

            let obj = debrisData[i];
            
            if (keys["70"]) {
                player.debris += 1;
                if(obj.type == "PAYLOAD") {
                    player.score += 10;
                }
                else if(obj.type == "DEBRIS") {
                    player.score += 15;
                }
                else if(obj.type == "ROCKET BODY") {
                    player.score += 25;
                }

                world.removeChild(debris_sprites[i]);

                document.getElementById("name").innerHTML = "Name: " + obj.name;
                document.getElementById("type").innerHTML = "Type: " + obj.type;
                document.getElementById("designator").innerHTML = "Designator: " + obj.designator;
                document.getElementById("launch").innerHTML = "Launch Date: " + obj.launch;
                document.getElementById("motion").innerHTML = "Mean Motion: " + obj.motion;
                document.getElementById("orbit").innerHTML = "Orbit: " + obj.orbit;
                document.getElementById("inclination").innerHTML = "Inclination: " + obj.inclination;
                document.getElementById("Details-Underline").innerHTML = obj.type;
                
                setTimeout(function () {
                    document.getElementById("name").innerHTML = "";
                    document.getElementById("type").innerHTML = "";
                    document.getElementById("designator").innerHTML = "";
                    document.getElementById("launch").innerHTML = "";
                    document.getElementById("motion").innerHTML = "";
                    document.getElementById("orbit").innerHTML = "";
                    document.getElementById("inclination").innerHTML = "";
                    document.getElementById("Details-Underline").innerHTML = "";
                }, 10000);


            }
        }

    }
    document.getElementById("scoreCount").innerHTML = player.score;
    document.getElementById("debrisCount").innerHTML = player.debris;
}


function rectsIntersect(a, b) {
    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return aBox.x + aBox.width > bBox.x && aBox.x < bBox.x + bBox.width && aBox.height + aBox.y > bBox.y && aBox.y < bBox.y + bBox.height
}

let minutes = 0;
let seconds = 0;

setInterval(function() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    document.getElementById("timer").innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}, 1000);