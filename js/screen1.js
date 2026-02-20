function Screen1() {
    var texture = TextureCache['assets/screen-1.jpg'];
    BaseScreen.call(this, texture);
    this.setInteractive();
}

Screen1.constructor = Screen1;
Screen1.prototype = Object.create(BaseScreen.prototype);

Screen1.prototype.setInteractive = function () {
    this.interactive = true;

    this.on('mousedown', this.onMouseDown.bind(this))
        .on('touchstart', this.onMouseDown.bind(this));

};

Screen1.prototype.onMouseDown = function () {
    Main.screenChange = true;
    Main.startFadeIn = true;
    Main.preScreen = 1;
    Main.curScreen = 3;
};
