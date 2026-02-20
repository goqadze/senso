function Screen5() {
    var texture = TextureCache['assets/screen-5.jpg'];
    BaseScreen.call(this, texture);

    this.setInteractive();
}

Screen5.constructor = Screen5;
Screen5.prototype = Object.create(BaseScreen.prototype);

Screen5.prototype.setInteractive = function () {
    this.interactive = true;

    this.on('mousedown', this.onMouseDown.bind(this))
        .on('touchstart', this.onMouseDown.bind(this));

};

Screen5.prototype.onMouseDown = function (e) {
    var x = e.data.global.x;
    var y = e.data.global.y;

    var ww = 167 / 2;
    var hh = 52 / 2;
    if (x >= btnPlayAgain.x - ww && x <= btnPlayAgain.x + ww && y >= btnPlayAgain.y - hh && y <= btnPlayAgain.y + hh) {
        Main.screenChange = true;
        Main.startFadeIn = true;
        Main.preScreen = 5;
        Main.curScreen = 6;
    } else if (x >= btnShare.x - ww && x <= btnShare.x + ww && y >= btnShare.y - hh && y <= btnShare.y + hh) {
        shareApp(function(){

        });
    } else {
        ww = 179 / 2;
        hh = 65 / 2;
        if (x >= btnInviteFriend.x - ww && x <= btnInviteFriend.x + ww && y >= btnInviteFriend.y - hh && y <= btnInviteFriend.y + hh) {
            inviteFriends(function(){

            });
        }
    }
};

Screen5.prototype.showControls = function () {
    logo.visible = true;
    logo2.visible = false;
    resultText.visible = true;
    resultText.text = Main.resultTime + " sec";
    btnShare.visible = true;
    btnInviteFriend.visible = true;
    btnPlayAgain.visible = true;

    if (stage.children[0].ID == 0) {
        for (var i = 0; i < stage.children.length / 2; i++) {
            var tmp = stage.children[i];
            stage.children[i] = stage.children[stage.children.length - 1 - i];
            stage.children[stage.children.length - 1 - i] = tmp;
        }
    }
};