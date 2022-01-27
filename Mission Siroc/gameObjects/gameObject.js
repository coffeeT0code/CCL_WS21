class GameObject {

    constructor(ctx, x, y, width, height, CONFIG) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.CONFIG = CONFIG;
        this.gameSpeed = 5;
        this.init();

        this.backgroundLayer1;
        this.backgroundLayer2;
        this.groundY = CONFIG.height;
    }

    init() {


    }


    update() {



    }

    render() {

        if (this.CONFIG.debug) {
            let bb = this.getBoundingBox();
            
            this.ctx.strokeRect(bb.x, bb.y, bb.w, bb.h);

            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(bb.x, bb.y, 5, 5)
            this.ctx.fillRect(bb.x + bb.w, bb.y + bb.h, 5, 5)
            

            this.ctx.arc(this.x, this.y, 10, 0, Math.PI *2);
            this.ctx.resetTransform();
            // this.ctx.clearRect();
        }

    }



    getImageSpriteCoordinates(sprite) {

        let frameX = Math.floor(performance.now() / 1000 * sprite.fps % sprite.frames);

        let coordinates = {
            sourceX: frameX * sprite.frameSize.width,
            sourceY: 0,
            sourceWidth: sprite.frameSize.width,
            sourceheight: sprite.frameSize.height,
        }
        return coordinates;
    }

    getBoundingBox() {

        return {
            x: this.x ,
            y: this.y,
            w: this.width,
            h: this.height,
        }
    }

}
export default GameObject