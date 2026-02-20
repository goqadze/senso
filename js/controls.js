function Controls() {
    PIXI.flip.Container3d.call(this);
    this.position.z = -0.01;

    this.bar = PIXI.flip.Sprite3d.fromFrame('bar.png');
    this.bar.anchor.set(0, 1);
    this.bar.position.set(0, Main.CANVAS_HEIGHT + 4);
    this.addChild(this.bar);

    this.progressBg = PIXI.flip.Sprite3d.fromFrame('progress-bottom.png');
    this.progressBg.anchor.set(0.5, 0.5);
    this.progressBg.position.set(275, Main.CANVAS_HEIGHT - 27);
    this.progressBg.position.z = -1;
    this.addChild(this.progressBg);


    this.progress = PIXI.flip.Sprite3d.fromFrame('progress-bar.png');
    this.progress.position.set(170, Main.CANVAS_HEIGHT - 27);
    this.progress.position.z = -2;
    this.progress.anchor.y = 0.5;
    this.addChild(this.progress);
    this.progressWidth = this.progress.texture.width;
    this.progressHeight = this.progress.texture.height;


    this.progressTop = PIXI.flip.Sprite3d.fromFrame('progress-top.png');
    this.progressTop.anchor.set(0.5, 0.5);
    this.progressTop.position.set(275, Main.CANVAS_HEIGHT - 27);
    this.progressTop.position.z = -3;
    this.addChild(this.progressTop);

    this.timeText = this.createText(0, 0, '0');
    this.addChild(this.timeText);

    this.timeText3d = new PIXI.flip.Sprite3d(this.timeText.texture);
    this.timeText3d.anchor.set(0.5, 0.5);
    this.timeText3d.position.set(745, Main.CANVAS_HEIGHT - 27);
    this.timeText3d.position.z = -3;
    this.addChild(this.timeText3d);
}

Controls.constructor = Controls;
Controls.prototype = Object.create(PIXI.flip.Container3d.prototype);

Controls.prototype.update = function (p, time) {
    var w = this.progressWidth * p;
    var h = this.progressHeight;
    var xx = this.progress.texture.frame.x;
    var yy = this.progress.texture.frame.y;
    this.progress.texture.frame = new Rectangle(xx, yy, w, h);

    this.timeText.text = time.toString();
    this.timeText3d.texture = this.timeText.texture;
};

Controls.prototype.createText = function (x, y, str) {
    var style = {
        font: 'bold 33px ' + main.digitFont.fontFamily,
        fill: 'white',
        wordWrap: true,
        wordWrapWidth: 30,
        align: 'center',
        stroke: 'white',
        strokeThickness: 0
    };

    var txt = new Text(str, style);
    txt.anchor.set(0.5, 0.5);
    txt.position.set(x, y);
    return txt;
};
