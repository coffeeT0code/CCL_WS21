import GameObject from "./gameObject.js";

class Base extends GameObject {
    constructor(ctx, x, y, width, height, CONFIG) {
        super(ctx, x, y, width, height, CONFIG)

        this.init(); 
    }

    init() {
        // creating the image
        this.img = new Image();
        this.img.src = './assets/base.png'
    }

    render() {
        // rendering from parent
        super.render();

        //moving the base
        this.x -=6;
        // drawing the image
        this.ctx.translate(this.x, this.y)
        this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height)
        this.ctx.resetTransform();
    }


    // fit the parents boundingbox to the base
    getBoundingBox() {
        let bb = super.getBoundingBox();

        bb.w = bb.w;
        bb.x = bb.x - bb.w / 2;
        bb.h = bb.h * 0.7;
        bb.y = bb.y - bb.h / 2;

        return bb;
    }

}

export default Base;