function BaseScreen(texture){
    PIXI.Sprite.call(this, texture);
    stage.addChild(this);

    this.visible = false;
    this.alpha = 0;
}

BaseScreen.constructor = BaseScreen;
BaseScreen.prototype = Object.create(PIXI.Sprite.prototype);

BaseScreen.prototype.fadeIn = function(){
    if (this.alpha == 0){
        this.visible = true;
    }

    if (this.alpha < 1) {
        this.alpha = Math.min(1, this.alpha + Main.FadeInSpeed);
    }
};

BaseScreen.prototype.fadeOut = function(){
    if (this.alpha > 0) {
        this.alpha = Math.max(0, this.alpha - Main.FadeOutSpeed);
    }

    if (this.alpha == 0){
        this.visible = false;
        Main.screenChange = false;
    }
};

BaseScreen.prototype.update = function(){};

BaseScreen.prototype.showControls = function(){
    logo.visible = true;
};


BaseScreen.prototype.hideControls = function(){
    //logo.visible = visible;
};

