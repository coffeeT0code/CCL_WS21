// imports
import Cactus from './gameObjects/cactus.js';
import Player from './gameObjects/player.js';
import Storm from './gameObjects/storm.js';
import Rock from './gameObjects/stone.js';
import Collision from './checkCollision.js';
import Base from './gameObjects/base.js';


// global variables
let CONFIG = {
    width: 800,
    height: 430,
    debug: false,
}
let ctx;
let ctxEnd;
let ctxStart;
let ctxWin;
let lastTickTimestamp;

let player;
let cactus;
let storm;
let rock;
let base;

let pointsDisplay = [];
let pointsToWin = 15;

let collision;
let collisionCactus;

let obstacles = [];

let currentScore;
let img;
let imgWidth = 0;
let scrollspeed;

let canvasStart = document.getElementById('canvasStart');
let canvas = document.getElementById('canvas');
let canvasEnd = document.getElementById('canvasEnd');
let canvasWin = document.getElementById('canvasWin');
ctx = canvas.getContext('2d');
ctxEnd = canvasEnd.getContext('2d');
ctxStart = canvasStart.getContext('2d');
ctxWin = canvasWin.getContext('2d');
canvasStart.style.display = 'flex';
canvas.style.display = 'none';
canvasEnd.style.display = 'none';
canvasWin.style.display = 'none';

// init function
const init = () => {

    //creating the background image
    img = new Image();
    img.src = './assets/gameBackground.png';


    // creating the Player as an instance of a class
    player = new Player(ctx, 0, 430, 150, 183, CONFIG);

    //setting the scrollspeed of the background to half of the players sprites fps
    scrollspeed = player.sprites['run'].fps / 2

    // instantiating the strom
    storm = new Storm(ctx, 10, 330, 550, 256, CONFIG);
    //pushing the storm into the obstacles array
    obstacles.push(storm);

    // instantiating the collision of stone and cactus
    collision = new Collision();
    collisionCactus = new Collision();
    // spawning the first obstacle
    spawnObstacles();

    player.groundY = CONFIG.height;

    lastTickTimestamp = performance.now();
    gameLoop();
}

const gameLoop = () => {


    // Calculating the time that has passed since the last render = Actual performance minus the performance it had one rendering before.
    let timePassedSinceLastRender = performance.now() - lastTickTimestamp;
    window.timePassedSinceLastRender = timePassedSinceLastRender;
    lastTickTimestamp = performance.now();
    update(timePassedSinceLastRender);
    render();

    requestAnimationFrame(gameLoop);

}

const update = (timePassedSinceLastRender) => {
    player.update(timePassedSinceLastRender);

    if (pointsDisplay === pointsToWin) {
        console.log('you won!')
        if (base === undefined) {
            base = new Base(ctx, CONFIG.width + 578, 240, 978, 457, CONFIG)
            obstacles.push(base)
        }

        

        if (player.x >= base.getBoundingBox().x) {
            currentScore = pointsDisplay;
            canvas.style.display = 'none'
            canvasWin.style.display = 'flex'
            canvasEnd.style.display = 'none'
            player.isDead = true;
            player.dx = 0;
            player.y = 100;
            pointsDisplay = 0;
            console.log('base collision')
            obstacles.length = 0;
            spawnObstacles();
            base = undefined;
            obstacles.push(storm);

        }
    }


    let obstaclesToRemove = [];

    obstacles.forEach(obstacle => {
        if (obstacle.x + obstacle.width < 0) {
            obstaclesToRemove.push(obstacle)
        }
    })
    obstaclesToRemove.forEach(obstacle => {
        obstacles.splice(obstacles.indexOf(obstacle), 1)
        pointsDisplay++;
        if (obstacle === base) {
            pointsDisplay--; 
            base = undefined; 
        }
        spawnObstacles();
    })

    player.canGoRight = true;

    if (!player.isDead && rock != undefined && collision.checkCollisionBetween(player, rock)) {


        if (collision.direction.right && player.dy != -1 && !collision.direction.left) {
            player.x = (rock.getBoundingBox().x - rock.getBoundingBox().w / 2);
            player.canGoRight = false;
            player.groundY = player.CONFIG.height;
            console.log("coliding right")

        }

        if (collision.direction.bottom) {

            player.groundY = rock.getBoundingBox().y;
            console.log('jump on rock')
        }
    }


    // when the player jumps on the cactus, he dies
    if (!player.isDead && cactus != undefined &&

        (player.getBoundingBox().x + player.getBoundingBox().w >= cactus.getBoundingBox().x &&
            player.getBoundingBox().x <= cactus.getBoundingBox().x + cactus.getBoundingBox().w &&
            player.getBoundingBox().y + player.getBoundingBox().w >= cactus.getBoundingBox().y + 100)

    ) {
        console.log("dead");
        player.isDead = true;
        player.dx = 0;
        player.groundY = player.CONFIG.height;
    }

    if (!player.isDead && cactus != undefined && collisionCactus.checkCollisionBetween(player, cactus)) {
        console.log("cactus colliding");

        // when the player dies disable all keyboard commands in player.js and set dx to 0. 
        player.isDead = true;
        player.dx = 0;
        player.state = 'idle'
        obstacles.lenght = 0;

        canvas.style.display = 'none';
        canvasEnd.style.display = 'flex';

        currentScore = pointsDisplay;
        pointsDisplay = 0;

    }


    if (!player.isDead && player.getBoundingBox().x < storm.getBoundingBox().x + storm.getBoundingBox().w) {


        console.log('strom got you')
        // when the player dies disable all keyboard commands in player.js and set dx to 0. 
        player.isDead = true;
        player.dx = 0;
        player.state = 'idle'
        obstacles.lenght = 0;
        currentScore = pointsDisplay;

        if (!base === undefined ) {
            console.log( 'undefined')
            base = undefined; 
        }

        canvas.style.display = 'none';
        canvasEnd.style.display = 'flex';

        ctx.resetTransform();
    }

    ctx.resetTransform();

};


function render() {

    ctxEnd.clearRect(0, 0, CONFIG.width, CONFIG.height);
    ctx.clearRect(0, 0, CONFIG.width, CONFIG.height);
    ctxWin.clearRect(0, 0, CONFIG.width, CONFIG.height);
    ctxEnd.font = "40px Arial";
    ctxEnd.fillStyle = 'black'
    ctxEnd.fillText(`Your score: ${currentScore}`, CONFIG.width / 2 + 45, 330)
    ctxEnd.font = "29px Arial";
    ctxEnd.fillText(`Press "Enter" to restart `, CONFIG.width / 2 + 45, 330 + 80)
    ctxEnd.resetTransform();

    if (canvasWin.style.display === 'flex') {
        ctxWin.font = "40px Arial";
        ctxWin.fillStyle = 'black'
        ctxWin.fillText(`Your score: ${currentScore}`, 20, 450)
        ctxWin.font = "29px Arial";
        ctxWin.fillText(`Press "Enter" to play again `, 20, 500)
        ctxWin.resetTransform();
    }

    
    // scrolling background image

    ctx.drawImage(img, imgWidth, 0, );
    ctx.drawImage(img, imgWidth + CONFIG.width * 2 - 1.5, 0)

    imgWidth -= scrollspeed;

    if (imgWidth <= -CONFIG.width * 2) {
        imgWidth = 0;
    }

    ctx.resetTransform();

    player.render();
    obstacles.forEach((obstacles) => {
        obstacles.render();
    })

    ctx.fillStyle = '#321f32';
    ctx.fillRect(0, 0, 200, 70)
    ctx.fillStyle = 'white'
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${pointsDisplay}`, 50, 45)

}

function spawnObstacles() {
    cactus = undefined;
    rock = undefined;

    if (pointsDisplay < pointsToWin) {

        if (Math.random() < 0.50) {
            cactus = new Cactus(ctx, CONFIG.width + 80, 350, 150, 150, CONFIG);
            obstacles.push(cactus);

        } else {
            rock = new Rock(ctx, CONFIG.width + 230, 370, 230, 112, CONFIG);
            obstacles.push(rock);
        }
    }



}


if (canvasStart.style.display === 'flex') {
    ctxStart.font = "29px Arial";
    ctxStart.fillStyle = 'black'
    ctxStart.fillText(`Press "Enter" to start `, CONFIG.width / 2 + 100, 500)
    ctxStart.resetTransform(); 
    ctxStart.clearRect(0,0,CONFIG.width, CONFIG.height)
}



document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && canvasStart.style.display === 'flex') {
        canvasStart.style.display = 'none';
        canvas.style.display = 'flex';
        init();
    }

    if (event.key === 'Enter' && canvasEnd.style.display === 'flex' || canvasWin.style.display === 'flex') {
        canvasEnd.style.display = 'none';
        canvasWin.style.display = 'none'
        canvas.style.display = 'flex'
        player.isDead = false;
        player.x = 0 + player.width;
        player.y = CONFIG.height - player.height / 2;
        pointsDisplay = 0;

    }
})