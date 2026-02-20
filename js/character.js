function Character() {
    PIXI.Container.call(this);

    this.position.x = 0;
    this.position.y = 0;

    this.textures = [];
/*    this.textures.push(Texture.fromFrame('character-left.png'));
    this.textures.push(Texture.fromFrame('character.png'));
    this.textures.push(Texture.fromFrame('character-right.png'));*/

    this.character = PIXI.flip.Sprite3d.fromFrame("character.png");

    this.addChild(this.character);
    this.character.position.x = Main.CANVAS_WIDTH / 2;
    this.character.position.y = 600;
    this.character.anchor.x = 0.5;
    this.character.anchor.y = 0.5;/*
    this.character.scale.x = ;
    this.character.scale.y = 0.6;*/

    this.finishStartY = 200;
    var texture = TextureCache["assets/finish01.png"];
    this.finish = new Sprite(texture);
    this.finish.anchor.x = 0.5;
    this.finish.anchor.y = 0.5;

    this.finish.position.x = Main.CANVAS_WIDTH / 2;
    this.finish.position.y = this.finishStartY;

    this.finish.scale.x = 0.1;
    this.finish.scale.y = 0.1;

    this.finish.alpha = 0.5;

    this.setFinishVisible(false);

    this.addChild(this.finish);

}

Character.constructor = Character;
Character.prototype = Object.create(PIXI.Container.prototype);

Character.prototype.update = function (deltaX, dir, turn) {
    this.character.texture = this.textures[dir + 1];
    this.character.position.x += deltaX * dir;

    this.character.position.x = Math.max(this.character.position.x, 0);
    this.character.position.x = Math.min(this.character.position.x, Main.CANVAS_WIDTH);

    this.finish.visible = this.finish.scale.x > 0.11;

    if (dir != 0 && turn) {
        main.whooshSound.play();
    }
};

Character.prototype.updateFinish = function (speed) {
    this.finish.scale.x *= 1.027 * Math.max(0.999, speed / 80);
    this.finish.scale.y *= 1.027 * Math.max(0.999, speed / 80);

    this.finish.alpha *= 1.032;

    this.finish.alpha = Math.min(1, this.finish.alpha);

    if (this.finish.scale.x > 3) {
        Main.Finished = true;
        setTimeout(function(){
            Main.preScreen = 4;
            Main.curScreen = 5;
            Main.screenChange = true;
            Main.startFadeIn = true;
        }, 1000);
    }
};

Character.prototype.getPosition = function () {
    return [this.character.x, this.character.y];
};

Character.prototype.setFinishVisible = function (visible) {
    this.finish.visible = visible;
};

Character.prototype.Finishing = function (delta) {
    this.character.position.x += delta;
};

Character.prototype.setCharacterTextures = function (s) {
     this.textures = [];
     this.textures.push(Texture.fromFrame('character' + (s == 0 ? "" : "-w") + '-left.png'));
     this.textures.push(Texture.fromFrame('character' + (s == 0 ? "" : "-w") + '.png'));
     this.textures.push(Texture.fromFrame('character' + (s == 0 ? "" : "-w") + '-right.png'));

     this.character.texture = this.textures[1];
};

Character.prototype.reset = function(){
    this.finish.position.x = Main.CANVAS_WIDTH / 2;
    this.finish.position.y = this.finishStartY;
    this.finish.scale.x = 0.1;
    this.finish.scale.y = 0.1;
    this.finish.alpha = 0.36;
    this.character.position.x = Main.CANVAS_WIDTH / 2;
};