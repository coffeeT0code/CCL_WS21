import GameObject from "./gameObject.js";

class Cactus extends GameObject {

    constructor(ctx, x, y, width, height, CONFIG) {

        super(ctx, x, y, width, height, CONFIG)
        this.groundY = CONFIG.height
    }


    init() {
        // creating the image
        this.image = new Image();
        this.image.src = "./assets/cactus.png"

    }

    render() {
        // moving the cactus from right to left and drawing it
        super.render();
        this.x -= 6;
        this.ctx.translate(this.x, this.y)
        this.ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
        this.ctx.resetTransform();
    }
  
    getBoundingBox() {
        let bb = super.getBoundingBox();

        // change the size of the bounding box

        bb.w = bb.w * 0.8;
        bb.x = bb.x - bb.w/2;

        bb.h = bb.h * 0.7;
        bb.y = bb.y - bb.h/2;

        return bb;
    }

}

export default Cactus;