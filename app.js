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
world.height = 4000;
world.width = 4000;
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

    world.addChild(player);
    player.loop = false;
    app.stage.addChild(world);
    player.play();
    player.animationspeed = 12;
    return player;
}

let player = createPlayer();
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
    }

    //A
    if (keys["65"]) {
        player.angle -= 1;
        player.play();
    }

    //S
    if (keys["83"]) {
        if (player.v < 1) player.v += 0.01;
        player.play();
    }
    
    //D
    if (keys["68"]) {
        player.angle += 1;
        player.play();
    }

    player.x += player.v * (Math.sin(-player.rotation));
    player.y += player.v * (Math.cos(player.rotation));
    world.pivot.x = player.x;
    world.pivot.y = player.y;
}