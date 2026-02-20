function StartScreen() {
    var texture = TextureCache['assets/screen-4.jpg'];
    BaseScreen.call(this, texture);


    btnStart.interactive = true;
    btnStart
        .on('mousedown', this.onMouseDown.bind(this))
        .on('touchstart', this.onMouseDown.bind(this));

    this.gameConainer = new Container();

    this.backLayer3d = new BackLayer3d();
    this.gameConainer.addChild(this.backLayer3d);

    this.frontLayer = new FrontLayer();
    this.gameConainer.addChild(this.frontLayer);

    this.character = new Character();
    this.gameConainer.addChild(this.character);

    this.controls = new Controls();
    this.gameConainer.addChild(this.controls);

    this.backLayer3d.character = this.character;
    this.backLayer3d.controls = this.controls;

    stage.addChild(this.gameConainer);

    this.gameConainer.alpha = 0;
    this.gameConainer.visible = false;
}

StartScreen.constructor = StartScreen;
StartScreen.prototype = Object.create(BaseScreen.prototype);

StartScreen.prototype.onMouseDown = function () {
    this.startMouseDown = true;
    btnStart.visible = false;
};

StartScreen.prototype.update = function () {
    if (!Main.Start) {
        if (this.startMouseDown) {
            BaseScreen.prototype.fadeOut.call(this);
            this.gameScreenFadeIn();
            if (this.gameConainer.alpha == 1) {
                Main.Start = true;
                Main.Finished = false;
                logo2.visible = false;
            }
        }
        return;
    }

    this.backLayer3d.update();
    this.frontLayer.update();
};

StartScreen.prototype.gameScreenFadeIn = function () {
    if (this.gameConainer.alpha == 0) {
        this.gameConainer.visible = true;
        this.backLayer3d.startTime = Date.now();
        this.character.setCharacterTextures(Main.selectedCharacter);
    }

    if (this.gameConainer.alpha < 1) {
        this.gameConainer.alpha = Math.min(1, this.gameConainer.alpha + Main.FadeInSpeed);
    }
};

StartScreen.prototype.gameScreenFadeOut = function () {
    if (this.gameConainer.alpha == 1) {
        this.gameConainer.visible = false;
    }

    if (this.gameConainer.alpha > 0) {
        this.gameConainer.alpha = Math.max(0, this.gameConainer.alpha - Main.FadeOutSpeed);
    }

    if (this.gameConainer.alpha == 0) {
        Main.screenChange = false;
    }
};

StartScreen.prototype.fadeOut = function () {
    this.gameScreenFadeOut();
};

StartScreen.prototype.showControls = function () {
    logo.visible = false;
    btnFemale.visible = false;
    btnMale.visible = false;
    logo2.visible = true;
    btnStart.visible = true;
    Main.Start = false;
    Main.Finished = false;
    this.frontLayer.reset();
    this.character.reset();
    this.backLayer3d.reset();
    this.startMouseDown = false;

    this.texture = TextureCache["assets/screen-4" + (Main.selectedCharacter == 0 ? "" : "-w") + ".jpg"];
};
