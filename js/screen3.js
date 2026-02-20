function Screen3() {
    var texture = TextureCache['assets/screen-3.jpg'];
    BaseScreen.call(this, texture);



    this.setInteractive(btnMale);
    this.setInteractive(btnFemale);
}

Screen3.constructor = Screen3;
Screen3.prototype = Object.create(BaseScreen.prototype);

Screen3.prototype.setInteractive = function (btn) {
    btn.interactive = true;

    btn
        .on('click', this.onMouseDown.bind(this))
        .on('tap', this.onMouseDown.bind(this));

};

Screen3.prototype.onMouseDown = function (e) {
    Main.screenChange = true;
    Main.startFadeIn = true;
    Main.preScreen = 3;
    Main.curScreen = 4;

    var x = e.data.global.x;
    var y = e.data.global.y;

    var ww = 173 / 2;
    var hh = 51 / 2;

    if (x >= btnMale.x - ww && x <= btnMale.x + ww &&
        y >= btnMale.y - hh && y <= btnMale.y + hh)
        Main.selectedCharacter = 0;
    else
        Main.selectedCharacter = 1;
};

Screen3.prototype.showControls = function(){
    btnFemale.visible = true;
    btnMale.visible = true;
    btnNext.visible = false;
    logo.visible = false;

    userFirstName.visible = false;
    userLastName.visible = false;
    userPhone.visible = false;
    userEmail.visible = false;

    checkBoxAgree.visible = false;
    checkBoxSubscribe.visible = false;

    btnShare.visible = false;
    btnInviteFriend.visible = false;
    btnPlayAgain.visible = false;
};