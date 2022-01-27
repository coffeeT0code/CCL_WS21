import GameObject from "./gameObject.js";

class Base extends GameObject {
    constructor(ctx, x, y, width, height, CONFIG) {
        super(ctx, x, y, width, height, CONFIG)

        this.init(); 
    }

    init() {

        this.img = new Image();
        this.img.src = './assets/base.png'
    }

    update() {}

    render() {

        super.render();
        this.x -=6;
        this.ctx.translate(this.x, this.y)
        this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height)
        this.ctx.resetTransform();
    }

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