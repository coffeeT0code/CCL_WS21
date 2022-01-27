import Stone from "./gameObjects/stone.js"

class Collision {
    constructor() {
        this.direction = {
            right: false,
            left: false,
            top: false,
            bottom: false,
            general: false,
        }

        this.jumpabove = false; 
    }

    checkCollisionBetween(gameObjectA, gameObjectB) {
        let bbA = gameObjectA.getBoundingBox();
        let bbB = gameObjectB.getBoundingBox();

        //gameObjectA.groundY = gameObjectA.CONFIG.height;

        // expression if there is any collision no matter what direction

        if (
            bbA.x + bbA.w >= bbB.x &&
            bbA.x <= bbB.x + bbB.w &&
            bbA.y + bbA.h <= bbB.y && 
            gameObjectB instanceof Stone
        ) {
            console.log("Jump above");
            this.jumpabove = true; 
            this.direction.bottom = true; 
            
            gameObjectA.groundY = bbB.y;
            this.direction.right = false;
            this.direction.left = false;
           return;
        } else{
            gameObjectA.groundY = gameObjectA.CONFIG.height;
        }

        if (
            bbA.x + bbA.w >= bbB.x &&
            bbA.x <= bbB.x + bbB.w &&
            bbA.y + bbA.h >= bbB.y &&
            bbA.y <= bbB.y + bbB.h
        ) {
            this.direction.general = true

            this.direction.right = (
                bbA.x + bbA.w >= bbB.x &&
                bbA.y + bbA.h >= bbB.y 
            )

            if (gameObjectA.dx > -1 && bbA.x + bbA.w >= bbB.x &&
                bbA.y + bbA.h >= bbB.y) {
                this.direction.right = true;
                console.log('collision right');
            } else if (gameObjectA.dx === -1) {
                this.direction.left = true;
                console.log('collision left');
            } 

            this.direction.bottom = false;



            return this.direction.general;

        }

        this.direction = {
            right: false,
            left: false,
            top: false,
            bottom: false,
            general: false,
        }

    }
    //gameObjectA.groundY = gameObjectA.CONFIG.height;

  

}



export default Collision;