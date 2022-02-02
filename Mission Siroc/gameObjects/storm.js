import GameObject from "./gameObject.js";

class Storm extends GameObject {
    constructor(ctx, x, y, height, width, CONFIG) {
        super(ctx, x, y, width, height, CONFIG)
        this.state = 'storm';
        this.init();
        
    }

    init() {
        // creating the spritesheet and setting frames, fps, and size
        this.sprites = {
                storm: {
                    src: './assets/storm.png',
                    frames: 3,
                    fps: 6,
                    frameSize: {
                        width: 256,
                        height: 388,
                    },
                    image: null,
                }
            }
            Object.values(this.sprites).forEach((sprite) => {
                sprite.image = new Image();
                sprite.image.src = sprite.src;
            });
    };

    render() {            
        super.render();

        this.ctx.translate(this.x, this.y)

        // getting the coordinates for the sprite
        let coordinates = this.getImageSpriteCoordinates(this.sprites[this.state]);

        this.ctx.drawImage(

            this.sprites[this.state].image,            coordinates.sourceX,
            coordinates.sourceY,
            coordinates.sourceWidth,
            coordinates.sourceheight,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height,
        );

        this.ctx.resetTransform(); 

    }; 

    getBoundingBox() {
        let bb = super.getBoundingBox();

        // change the size of the bounding box

        bb.w = bb.w * 0.5;
        bb.x = bb.x - bb.w/2;

        bb.h = bb.h * 0.5;
        bb.y = bb.y;

        return bb;
    }
}

export default Storm; 