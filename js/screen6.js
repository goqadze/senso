function Screen6() {
    var texture = TextureCache['assets/screen-6.jpg'];
    BaseScreen.call(this, texture);

   // this.setInteractive();
}

Screen6.constructor = Screen6;
Screen6.prototype = Object.create(BaseScreen.prototype);

Screen6.prototype.setInteractive = function () {
    this.interactive = true;

    this.on('mousedown', this.onMouseDown.bind(this))
        .on('touchstart', this.onMouseDown.bind(this));

};

Screen6.prototype.onMouseDown = function () {
    Main.screenChange = true;
    Main.startFadeIn = true;
    Main.preScreen = 6;
    Main.curScreen = 3;
};

Screen6.prototype.showControls = function () {
    logo.visible = true;
    resultText.visible = false;

    btnShare.visible = false;
    btnInviteFriend.visible = false;
    btnPlayAgain.visible = false;

    setTimeout(function(){
        location.reload();
    }, 2000);

};