function Screen2() {
    var texture = TextureCache['assets/screen-2.jpg'];
    BaseScreen.call(this, texture);

    this.setInteractive();
}

Screen2.constructor = Screen2;
Screen2.prototype = Object.create(BaseScreen.prototype);

Screen2.prototype.setInteractive = function () {
    this.interactive = true;

    this
        .on('mousedown', this.onMouseDown.bind(this))
        .on('touchstart', this.onMouseDown.bind(this));

};

Screen2.prototype.onMouseDown = function (e) {

    var x = e.data.global.x;
    var y = e.data.global.y;

    var ww = 141 / 2;
    var hh = 57 / 2;
    if (x >= btnNext.x - ww && x <= btnNext.x + ww && y >= btnNext.y - hh && y <= btnNext.y + hh) {
        this.onBtnNextClick();
    } else {
        ww = 26;
        hh = 13;
        if (x >= checkBoxAgree.x && x <= checkBoxAgree.x + ww && y >= checkBoxAgree.y - hh && y <= checkBoxAgree.y + hh) {
            checkBoxAgree.checked = !checkBoxAgree.checked;
            checkBoxAgree.texture = checkboxTextures[+checkBoxAgree.checked];
        }
        else if (x >= checkBoxSubscribe.x && x <= checkBoxSubscribe.x + ww && y >= checkBoxSubscribe.y - hh && y <= checkBoxSubscribe.y + hh) {
            checkBoxSubscribe.checked = !checkBoxSubscribe.checked;
            checkBoxSubscribe.texture = checkboxTextures[+checkBoxSubscribe.checked];
        } else if (x >= 230 && x <= 525 && y >= 620 && y <= 645){
            this.onRulesClick();
        }
    }
};

Screen2.prototype.showControls = function () {
    logo.visible = true;

    btnNext.visible = true;
    checkBoxAgree.visible = true;
    checkBoxSubscribe.visible = true;

    userEmail.value = "";
    userFirstName.value = "";
    userPhone.value = "";
    userEmail.value = "";

    userFirstName.visible = true;
    userLastName.visible = true;
    userPhone.visible = true;
    userEmail.visible = true;
};

Screen2.prototype.onBtnNextClick = function(){
    var user_first_name = userFirstName.value;
    var user_last_name = userLastName.value;
    var user_phone = userPhone.value;
    var user_email = userEmail.value;

    if (user_first_name == "") {
        $('#message-div').html('Παρακαλώ εισάγετε το όνομα σας');
        $('#fancybox').click();
        return;
    }

    if (user_last_name == "") {
        $('#message-div').html('Παρακαλώ εισάγετε το επώνυμο σας');
        $('#fancybox').click();
        return;
    }

    if (!validatePhome(user_phone)) {
        $('#message-div').html('Παρακαλώ εισάγετε το τηλέφωνο σας');
        $('#fancybox').click();
        return;
    }

    if (!validateEmail(user_email)) {
        $('#message-div').html('Παρακαλώ εισάγετε έγκυρο e-mail');
        $('#fancybox').click();
        return;
    }

    if (!checkBoxAgree.checked) {
        $('#message-div').html('Η συμμετοχή στο διαγωνισμό απαιτεί να αποδεχτείτε τους Όρους Χρήσης');
        $('#fancybox').click();
        return;
    }

    var user_newsletter = +checkBoxSubscribe.checked;

    $.ajax({
        type: 'POST',
        url: 'api/setCompetitor.php',
        data: {
            fb_user_id: fb_user_id,
            fb_user_first_name: fb_user_first_name,
            fb_user_last_name: fb_user_last_name,
            fb_user_email: fb_user_email,
            fb_user_access_token: fb_user_access_token,
            user_first_name: user_first_name,
            user_last_name: user_last_name,
            user_phone: user_phone,
            user_email: user_email,
            user_newsletter: user_newsletter
        },
        success: function (result) {
            if (result || true) {
                Main.screenChange = true;
                Main.startFadeIn = true;
                Main.preScreen = 2;
                Main.curScreen = 3;
            } else {
                console.log("invalid user");
            }
        }
    });
};

Screen2.prototype.onRulesClick = function () {
    $('#message-div').html($("#rules-div").html());
    $('#fancybox').click();
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhome(phone) {
    var re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(phone);
}
