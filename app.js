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
world.height = 500;
world.width = 500;
world.x = app.screen.width / 2;
world.y = app.screen.height / 2;
world.pivot.x = world.width / 2;
world.pivot.y = world.height / 2;

const earth_sprite = PIXI.Sprite.from('./Assets/Earf.png');
earth_sprite.scale.set(1.5, 1.5);

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
    for (let i = 0; i < debrisData.length/3; i++) {
        let obj = debrisData[i];
        let x = obj["xScaled"];
        let y = obj["yScaled"];
        const debris_sprite = PIXI.Sprite.from(debrisImages[i % 3]);
        debris_sprite.scale.set(0.5,0.5);
        debris_sprite.x = x;
        debris_sprite.y = y;
        debris_sprite.v = 0;
        debris_sprites.push(debris_sprite);
        world.addChild(debris_sprite);
    }
}

let player = createPlayer();
generateDebris();
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
       if (player.v > -1) player.v -= 0.01;
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
        if (player.v < 1) player.v += 0.01;
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

    player.x += player.v * (Math.sin(-player.rotation));
    player.y += player.v * (Math.cos(player.rotation));
    world.pivot.x = player.x;
    world.pivot.y = player.y;

    for (let i = 0; i < debris_sprites.length; i++) {
        if (rectsIntersect(player, debris_sprites[i])) {
            if (keys["70"]) world.removeChild(debris_sprites[i]);
        }
    }
}

function rectsIntersect(a, b) {
    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return aBox.x + aBox.width > bBox.x && aBox.x < bBox.x + bBox.width && aBox.height + aBox.y > bBox.y && aBox.y < bBox.y + bBox.height
}