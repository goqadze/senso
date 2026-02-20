var logo = null;
var btnMale = null;
var btnFemale = null;
var logo2 = null;
var btnStart = null;
var btnNext = null;
var checkBoxAgree = null;
var checkBoxSubscribe = null;
var userFirstName = null;
var userLastName = null;
var userPhone = null;
var userEmail = null;
var checkboxTextures = [];
var resultText = null;
var btnShare = null;
var btnInviteFriend = null;
var btnPlayAgain = null;

function Manager() {
    logo = Sprite.fromFrame('logo-masoutis.jpg');
    logo.anchor.set(0.5, 0.5);
    logo.position.set(Main.CANVAS_WIDTH - 115, Main.CANVAS_HEIGHT - 45);
    logo.visible = false;

    btnMale = Sprite.fromFrame('btn-male.png');
    btnMale.anchor.set(0.5, 0.5);
    btnMale.position.set(Main.CANVAS_WIDTH / 2 - 165, 745);
    btnMale.visible = false;

    btnFemale = Sprite.fromFrame('btn-female.png');
    btnFemale.anchor.set(0.5, 0.5);
    btnFemale.position.set(Main.CANVAS_WIDTH / 2 + 150, 745);
    btnFemale.visible = false;

    logo2 = Sprite.fromFrame('logo-masoutis.jpg');
    logo2.anchor.set(0.5, 0.5);
    logo2.position.set(Main.CANVAS_WIDTH - 110, Main.CANVAS_HEIGHT - 100);
    logo2.visible = false;

    btnStart = Sprite.fromFrame("btn-play.png");
    btnStart.anchor.set(0.5, 0.5);
    btnStart.position.set(Main.CANVAS_WIDTH / 2, 320);
    btnStart.visible = false;

    btnNext = Sprite.fromFrame("btn-play.png");
    btnNext.anchor.set(0.5, 0.5);
    btnNext.position.set(Main.CANVAS_WIDTH / 2, 690);
    btnNext.visible = false;

    btnInviteFriend = Sprite.fromFrame("btn-invite-friends.png");
    btnInviteFriend.anchor.set(0.5, 0.5);
    btnInviteFriend.position.set(Main.CANVAS_WIDTH / 2 + 110, 553);
    btnInviteFriend.visible = false;

    btnPlayAgain = Sprite.fromFrame("btn-play-again.png");
    btnPlayAgain.anchor.set(0.5, 0.5);
    btnPlayAgain.position.set(Main.CANVAS_WIDTH / 2 - 110, 553);
    btnPlayAgain.visible = false;

    btnShare = Sprite.fromFrame("btn-share.png");
    btnShare.anchor.set(0.5, 0.5);
    btnShare.position.set(Main.CANVAS_WIDTH / 2, 670);
    btnShare.visible = false;

    checkboxTextures = [Texture.fromFrame('checkbox-off.png'), Texture.fromFrame('checkbox-on.png')];

    checkBoxSubscribe = new Sprite(checkboxTextures[0]);
    checkBoxSubscribe.anchor.set(0, 0.5);
    checkBoxSubscribe.position.set(380, 418);
    checkBoxSubscribe.checked = false;
    checkBoxSubscribe.visible = false;

    checkBoxAgree = new Sprite(checkboxTextures[0]);
    checkBoxAgree.anchor.set(0, 0.5);
    checkBoxAgree.position.set(535, 635);
    checkBoxAgree.checked = false;
    checkBoxAgree.rules = true;
    checkBoxAgree.visible = false;

    userFirstName = this.createText(160, 165, "Όνομα");
    userLastName = this.createText(160, 227, "Επώνυμο");
    userPhone = this.createText(160, 287, "Τηλέφωνο");
    userEmail = this.createText(160, 347, "e-mail");

    resultText = this.createResultText(Main.CANVAS_WIDTH / 2 - 58, 320, '0 sec');
}


Manager.prototype.update = function () {
    if (Main.screenChange) {
        if (Main.startFadeIn) {
            Main.startFadeIn = false;
            Main.Screens[Main.curScreen].showControls();
            Main.Screens[Main.preScreen].hideControls();
        }
        Main.Screens[Main.curScreen].fadeIn();
        Main.Screens[Main.preScreen].fadeOut();
    } else {
        Main.Screens[Main.curScreen].update();
    }
};

Manager.prototype.setupControls = function () {
    stage.addChild(logo);
    stage.addChild(btnMale);
    stage.addChild(btnFemale);
    stage.addChild(btnStart);
    stage.addChild(btnNext);
    stage.addChild(logo2);
    stage.addChild(checkBoxSubscribe);
    stage.addChild(checkBoxAgree);
    stage.addChild(userFirstName);
    stage.addChild(userLastName);
    stage.addChild(userPhone);
    stage.addChild(userEmail);
    stage.addChild(resultText);
    stage.addChild(btnPlayAgain);
    stage.addChild(btnShare);
    stage.addChild(btnInviteFriend);

    for (var i = 0; i < stage.children.length; i++) {
        stage.children[i].ID = i;
    }
};


Manager.prototype.createText = function (x, y, str) {
    var options = {
        readonly: false,
        maxlength: 60,
        placeholder: str,
        placeholderColor: "#bfbebd",
        selectionColor: "rgba(179, 212, 253, 0.8)",
        value: "",
        type: "text",
        width: 470,
        height: 17,
        padding: 15,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 0,
        borderRadius: 12,
        backgroundColor: "rgba(179, 212, 253, 0)",
        backgroundGradient: null,
        valign: "middle",
        align: "center",
        outline: 0,
        text: {
            font: "23px " + main.handBookFont.fontFamily,
            fill: "white",
            align: "left",
            stroke: "rgba(179, 212, 253, 0)",
            strokeThickness: 0
        }
    };

    var input = new PIXI.Input(options);
    input.position.set(x, y);
    input.visible = false;
    return input;
};

Manager.prototype.createResultText = function(x, y, str){
    var style = {
        font: 'bold 45px ' + main.digitFont.fontFamily,
        fill: 'blue',
        wordWrap: true,
        wordWrapWidth: 500,
        align: 'center',
        stroke: 'white',
        strokeThickness: 0
    };

    var txt = new Text(str, style);
    txt.anchor.set(0, 0.5);
    txt.position.set(x, y);
    txt.visible = false;
    return txt;
};

