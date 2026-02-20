function FrontLayer() {
    PIXI.flip.Container3d.call(this);

    this.position.z = 800;
    var texture = TextureCache["assets/mountains.png"];
    this.mountains = new PIXI.flip.Sprite3d(texture);
    this.mountains.anchor.x = 0.5;

    this.mountains.position.x = Main.CANVAS_WIDTH / 2;
    this.mountains.position.y = -380;
    this.mountains.position.z = 0;

    this.addChild(this.mountains);
}

FrontLayer.constructor = FrontLayer;
FrontLayer.prototype = Object.create(PIXI.flip.Container3d.prototype);

FrontLayer.prototype.update = function () {
    if (!Main.Finished) {
        this.mountains.position.z -= 0.1;
        this.mountains.position.y += 0.02;
    }
};

FrontLayer.prototype.reset = function(){
    this.mountains.position.z = 0;
    this.mountains.position.y = -380;
};
