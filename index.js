// imports
import Player from './gameObjects/player.js';

// global variables
let ctx;
let player;
let lastTickTimestamp;


let CONFIG = {
    width: 800,
    height: 550,
}

// init function
const init = () => {
    let canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // creating the Player as an instance of a class
    player = new Player (ctx, 0, 0, 100, 100, CONFIG)

    lastTickTimestamp = performance.now();
    gameLoop(); 
}

const gameLoop = () => {

    // Calculating the time that has passed since the last render = Actual performance minus the performance it had one rendering before.
    let timePassedSinceLastRender = performance.now() - lastTickTimestamp;
    window.timePassedSinceLastRender = timePassedSinceLastRender;
    lastTickTimestamp = performance.now(); 


    requestAnimationFrame(gameLoop);
    update(timePassedSinceLastRender); 
    render(); 

}

const update = (timePassedSinceLastRender) => {
    player.update(timePassedSinceLastRender);

};

function render() {
  
    ctx.clearRect(0, 0, CONFIG.width, CONFIG.height);
    player.render();
}

window.addEventListener ('load', () => {
    init();
});
