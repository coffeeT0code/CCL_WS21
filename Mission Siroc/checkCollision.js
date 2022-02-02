import Rock from "./gameObjects/stone.js"

class Collision {
    constructor() {
        this.direction = {
            right: false,
            left: false,
            top: false,
            bottom: false,
            general: false,
        }

    }

    // function to check the collision
    checkCollisionBetween(gameObjectA, gameObjectB) {
        // bba and bbB to shorten the function
        let bbA = gameObjectA.getBoundingBox();
        let bbB = gameObjectB.getBoundingBox();

        // expression if there is any collision no matter what direction

        // if the gameObjectA is in the same X area as gameObjectB, A is above B and B is a rock then change the ground position to the height of B (the rock)
        if (
            bbA.x + bbA.w >= bbB.x &&
            bbA.x <= bbB.x + bbB.w &&
            bbA.y + bbA.h <= bbB.y &&
            gameObjectB instanceof Rock
        ) {
    
            this.direction.bottom = true;
            gameObjectA.groundY = bbB.y;
            this.direction.right = false;
            this.direction.left = false;
            return;
        } else {
            gameObjectA.groundY = gameObjectA.CONFIG.height;
        }

        // if there is a collision set general to true
        if (
            bbA.x + bbA.w >= bbB.x &&
            bbA.x <= bbB.x + bbB.w &&
            bbA.y + bbA.h >= bbB.y &&
            bbA.y <= bbB.y + bbB.h
        ) {
            this.direction.general = true

            // collision on the right side of bbA
            this.direction.right = (
                bbA.x + bbA.w >= bbB.x &&
                bbA.y + bbA.h >= bbB.y
                
            )

            this.direction.bottom = false;
            return this.direction.general;

        }

        // setting everything back to default false

        this.direction = {
            right: false,
            left: false,
            top: false,
            bottom: false,
            general: false,
        }

    }

}

export default Collision;