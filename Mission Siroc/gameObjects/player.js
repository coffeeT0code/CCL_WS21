import GameObject from "./gameObject.js";

class Player extends GameObject {
    constructor(ctx, x, y, width, height, CONFIG, ) {
        super(ctx, x, y, width, height, CONFIG, )

        this.dx = 0;
        this.dy = 0;
        this.lastDirection = 1;
        this.speed = 0.33;
        this.currentKeys = {};

        this.canJump = true;
        this.gravity = 0.272;
        this.state = 'run'

        this.isDead = false;
        this.jump_v = 0;
        this.isJumping = false;

        this.jumpCount = 0;
        this.canGoRight = true;

        this.collision = {
            right: false,
            left: false,
            top: false,
            bottom: false,
        }

        this.groundY = super.groundY
        this.init();
    }

    init() {

        // tellin if keys are pressed or not
        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft' || event.code === 'ArrowRight' || event.code === 'Space') {
                //prevents arrow keys from scrolling whilst playing
                event.preventDefault();
                // to being able to use the keys 
                this.currentKeys[event.code] = true;
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
                event.preventDefault();
                this.currentKeys[event.code] = false;
            }
        })


        // initializing the sprites, setting their source, frames, fps, and size 
        this.sprites = {
            run: {
                src: './assets/run.png',
                frames: 10,
                fps: 12,
                frameSize: {
                    width: 150,
                    height: 183,
                },
                image: null,
            },
            jump: {
                src: './assets/run1.png',
                frames: 1,
                fps: 1,
                frameSize: {
                    width: 150,
                    height: 183,
                },
                image: null,
            },
        }

        // load images
        Object.values(this.sprites).forEach((sprite) => {
            sprite.image = new Image();
            sprite.image.src = sprite.src;
        });

    }

    update(timePassedSinceLastRender) {
        // calls update function of the parent
        super.update();

        // movements only if the player is not dead
        if (!this.isDead) {
            // moving right
            if (this.currentKeys['ArrowRight'] && this.canGoRight) {
                this.dx = 1;

                // moving left
            } else if (this.currentKeys['ArrowLeft']) {
                this.dx = -1;

                // not moving if keys are not pressed
            } else {
                this.dx = 0;
            }
            // jumping with arrowup and space keys
            if (this.currentKeys['ArrowUp'] || this.currentKeys['Space']) {

                if (this.y === this.groundY - this.height / 2) {
                    this.jump_v = -10;
                    this.currentKeys['ArrowUp'] = false;
                    this.currentKeys['Space'] = false;
                    this.grounded = false;
                    this.isJumping = true;
                }
            }

            // adding the gravity to the velocity
            this.jump_v += this.gravity;

            // updating the y coordinates
            this.y += this.jump_v;

            // storing the last direction if the player is moving
            if (this.dx !== 0) this.lastDirection = this.dx;

            // updating the x coordinates
            this.x += timePassedSinceLastRender * this.dx * this.speed;

            // check for right boundary
            if (this.x + this.width / 2 > this.CONFIG.width) this.x = this.CONFIG.width - this.width / 2;

            // check for left boundary
            if (this.x - this.width / 2 < 0) this.x = 0 + this.width / 2;

            // check for bottom boundary
            if (this.y + this.height / 2 > this.groundY) {
                this.y = this.groundY - this.height / 2;
                this.isJumping = false;
            }

            // if the player jumps the state is jump other than that it is run
            this.state = this.isJumping ? 'jump' : 'run';
        }
    }

    render() {
        super.render();

        // moving the player and rotating it when going in the last direction
        this.ctx.translate(this.x, this.y)
        this.ctx.scale(this.lastDirection, 1);

        // get the coordinates on the sprite sheet
        let coordinates = this.getImageSpriteCoordinates(this.sprites[this.state]);

        //draw the right image of the sprite sheet
        this.ctx.drawImage(
            this.sprites[this.state].image,
            coordinates.sourceX,
            coordinates.sourceY,
            coordinates.sourceWidth,
            coordinates.sourceheight,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height,
        );

        this.ctx.resetTransform();
    }

    getBoundingBox() {
        let bb = super.getBoundingBox();

        // change the size of the bounding box 

        // of the player jumps the bounding box should be bigger because he exentds his leg
        if(!this.isJumping) {
        bb.w = bb.w * 0.5;
        bb.x = bb.x - bb.w / 2;
        } else {
            bb.w = bb.w*0.7;
            bb.x = bb.x -bb.w/2;
        }

        bb.h = bb.h * 0.9;
        bb.y = bb.y - bb.h / 2;

        return bb;
    }

}

export default Player;