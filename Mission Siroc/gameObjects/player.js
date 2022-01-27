import GameObject from "./gameObject.js";

class Player extends GameObject {
    constructor(ctx, x, y, width, height, CONFIG,) {
        super(ctx, x, y, width, height, CONFIG,)

        this.dx = 0;
        this.dy = 0;
        this.lastDirection = 1;
        this.speed = 0.33;

        this.currentKeys = {};

        // canJump enable
        this.canJump = true;
        this.gravity = 0.272;
        this.state = 'run'

        this.init();
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
        
    }

    init() {

        let shouldHandleKeyDown = true;

        // tellin if keys are pressed or not
        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft' || event.code === 'ArrowRight'|| event.code === 'Space') {

                shouldHandleKeyDown = false;
                event.preventDefault();
                this.currentKeys[event.code] = true;
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
                event.preventDefault();

                this.currentKeys[event.code] = false;
            }
        })


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
            idle: {
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

        Object.values(this.sprites).forEach((sprite) => {
            sprite.image = new Image();
            sprite.image.src = sprite.src;
        });

    }

    update(timePassedSinceLastRender) {
        super.update();

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

            if (this.currentKeys['ArrowUp']  || this.currentKeys['Space']) {
               
                if (this.y === this.groundY - this.height / 2) {
                    this.jump_v = -10;
                    this.currentKeys['ArrowUp'] = false;
                    this.currentKeys['Space'] = false; 
                    this.grounded = false; 
                    this.isJumping = true;
                }

            
            } 

            // if (this.isJumping === false) 
            this.jump_v += this.gravity;
            // updating the y coordinates

            this.y += this.jump_v;

            if (this.dx !== 0) this.lastDirection = this.dx;

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

            // check for top boundary
            //if (this.y - this.height < 0) this.y = 0 + this.height / 2;

            // if you do not press a button the state is idle
            // this.state = 'run';
            // this.state = this.dx === 0 ? 'idle' : 'run';

            this.state = this.isJumping ? 'idle': 'run';


            // console.log("x:", this.x)

            // console.log("height", this.height)
            // console.log("width", this.width)''
            // console.log("config width", this.CONFIG.width)
            // console.log("config height", this.CONFIG.height)
            // console.log(this.dx)
            // console.log('this canJump v: ', this.jump_v)
        }
    }

    render() {
        super.render();

        // moving the player and rotating it when going in the last direction
        this.ctx.translate(this.x, this.y)
        this.ctx.scale(this.lastDirection, 1);

      



        let coordinates = this.getImageSpriteCoordinates(this.sprites[this.state]);

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

        bb.w = bb.w *0.5;
        bb.x = bb.x - bb.w/2;

        bb.h = bb.h*0.9;
        bb.y = bb.y - bb.h/2;

        return bb;
    }

}

export default Player;