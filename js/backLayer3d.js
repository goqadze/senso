function BackLayer3d() {
    PIXI.flip.Container3d.call(this);

    this.character = null;
    this.controls = null;

    this.bgPath = "assets/show-pattern.jpg";
    this.obstacleTextures = [
        ["left-ice-1.png", "left-ice-2.png", "left-ice-3.png", "left-ice-4.png"],
        ["right-ice-1.png", "right-ice-2.png", "right-ice-3.png", "right-ice-4.png"],
        ["center-ice-1.png"]
    ];

    this.obstaclePolygons = [
        [
            [[0, 65], [340, 0], [500, 475], [10, 425]],
            [[25, 30], [1125, 30], [890, 310], [210, 400], [85, 300]],
            [[0, 400], [365, 0], [890, 400], [500, 595], [270, 595]],
            [[0, 930], [525, 0], [1235, 0], [365, 1220], [130, 1220]]
        ],
        [
            [[400, 530], [635, 225], [1010, 150], [1180, 380], [1190, 745], [905, 865], [315, 850]],
            [[0, 0], [485, 180], [700, 385], [650, 725], [485, 645]],
            [[0, 100], [750, 0], [1085, 100], [744, 380], [400, 380]],
            [[100, 0], [900, 55], [900, 485], [450, 550]]
        ],
        [
            [[0, 750], [500, 0], [1000, 345]]
        ]
    ];

    this.position.x = Main.CANVAS_WIDTH / 2;
    this.position.y = Main.CANVAS_HEIGHT / 2;
    this.position.z = 1600;
    this.rotation.x = -(74 * Math.PI / 180);

    this.bgCount = 50;
    this.startY = -27350;
    this.speed = 80;
    this.characterSpeed = 10;
    this.distance = 0;
    this.roadLength = 0;
    this.backgrounds = [];

    for (var i = 0; i < this.bgCount; i++) {
        var texture = TextureCache[this.bgPath];
        for (var j = 0; j < 12; j++) {
            var background = new PIXI.flip.Sprite3d(texture);
            this.addChild(background);
            background.position.x = -4200 + j * 850;
            background.position.y = this.startY + i * 900;
            background.position.z = 0;
            background.anchor.x = 0.5;
            background.anchor.y = 0.5;
            this.backgrounds.push(background);
        }
    }

    this.obstacles = [];

    this.startTime = Date.now();


    var sideRand = 0;
    var obstacleRand = 0;
    var shuffle = [0, 1, 2];

    for (var i = 0; i < 50; i++) {
        if (i % 3 == 0) {
            shuffle = this.nextShuffle(shuffle);
        }

        sideRand = shuffle[i % 3]; // 0 , 1 , 2

        if (sideRand == 2)
            obstacleRand = 0;
        else
            obstacleRand = Math.floor(Math.random() * Date.now()) % 4;

        var texture = TextureCache['assets/' + this.obstacleTextures[sideRand][obstacleRand]];
        var obstacle = new PIXI.flip.Sprite3d(texture);
        obstacle.poligonX = sideRand;
        obstacle.poligonY = obstacleRand;

        this.addChild(obstacle);
        obstacle.position.x = -1100 + sideRand * 1200 + (sideRand == 0 ? 300 : 0);
        obstacle.position.y = this.startY + i * (2400);

        obstacle.position.z = 0;
        obstacle.anchor.x = 0.5;
        obstacle.anchor.y = 0.5;
        obstacle.rotation.x = (12 * Math.PI / 180);
        obstacle.scale.x = 20;
        obstacle.scale.y = 20;
        this.obstacles.push(obstacle);
    }

    this.interactivity(this);

    var keyDownCatchInput = document.createElement('input');
    keyDownCatchInput.type = "text";
    keyDownCatchInput.style = 'opacity: 0';
    keyDownCatchInput.readOnly = true;

    var div = document.getElementById('canvas');
    div.appendChild(keyDownCatchInput);

    this.keyDownLeft = false;
    this.keyDownRight = false;
    var $this = this;
    $this.keyup = true;

    keyDownCatchInput.addEventListener("keydown", function (e) {
        if ($this.keyup) {
            $this.turn = true;
            $this.keyup = false;
        }
        switch (e.keyCode) {
            case 37: // left
                $this.keyDownLeft = true;
                break;
            case 39: //right
                $this.keyDownRight = true;
                break;
        }
    });

    keyDownCatchInput.addEventListener("keyup", function (e) {
        $this.keyup = true;
        switch (e.keyCode) {
            case 37: // left
                $this.keyDownLeft = false;
                break;
            case 39: //right
                $this.keyDownRight = false;
                break;
        }
    });

    keyDownCatchInput.focus();
    window.addEventListener('mousedown', function (e) {
        if (e.target.tagName.toLowerCase() == 'canvas') {
            keyDownCatchInput.focus();
        }
    }, true);
}

BackLayer3d.constructor = BackLayer3d;
BackLayer3d.prototype = Object.create(PIXI.flip.Container3d.prototype);

BackLayer3d.Delta_X = 0;
BackLayer3d.Counter = 0;
BackLayer3d.Count = 60;

BackLayer3d.prototype.update = function () {

    if (Main.Finished) {
        this.character.update(0, 0);
        return;
    }

    var time = Math.floor((Date.now() - this.startTime) / 1000);
    this.controls.update((this.roadLength - this.distance) / this.roadLength, time);
    Main.resultTime = time;

    for (var i = 0; i < this.backgrounds.length; i++) {
        var background = this.backgrounds[i];
        background.position.y += this.speed;
        if (background.position.y >= this.startY + this.bgCount * 900) {
            background.position.y = this.startY;
        }
    }


    var mn = 0, mnlen = 100000000, chpos = this.character.getPosition();
    for (var i = 0; i < this.obstacles.length; i++) {
        var obstacle = this.obstacles[i];
        var len = (obstacle.x - chpos[0]) * (obstacle.x - chpos[0]) + (obstacle.y - chpos[1]) * (obstacle.y - chpos[1]);
        if (len < mnlen) {
            mnlen = len;
            mn = i;
        }

        obstacle.position.y += this.speed;
        if (obstacle.position.y >= (this.obstacles.length + 1) * 2400 + this.startY) {
            obstacle.position.y = this.startY;
        }
        if (this.distance < 12000 && obstacle.y < this.character.y - 12000)
            obstacle.visible = false;
    }

    var obs = this.obstacles[mn];
    var p = obs.poligonX;
    var q = obs.poligonY;
    var polygon = this.obstaclePolygons[p][q];
    var vs = [];
    for (var j = 0; j < polygon.length; j++) {
        var tx = polygon[j][0] + obs.position.x - obs.texture.width / 2;
        var ty = polygon[j][1] + obs.position.y - obs.texture.height / 2;
        vs.push([tx, ty]);
    }

 //   var message = document.getElementById('message');

    for (var i = 0; i < 15; i++) {
        var x = chpos[0] - 350;
        var y = chpos[1] + 200 + i * 10;
        if (this.checkInside([x, y], vs)) {
            //      message.innerHTML = i.toString() + ": " + x.toString() + " " + y.toString() + "<br/>" + message.innerHTML;
           // message.innerHTML = p + ' ' + q + '<br />' + message.innerHTML;
            this.speed -= 5;
            this.speed = Math.max(this.speed, 10);
            break;
        } else {
            this.speed += 0.015;
            this.speed = Math.min(this.speed, 80);
        }
    }

    this.distance -= this.speed;
    if (obs.visible == false) {
        this.character.setFinishVisible(true);
        this.character.updateFinish(this.speed);
    }

    if (this.distance <= 100) {
        if (!Main.Finishing) {
            this.character.update(0, 0);
            var xy = this.character.getPosition();
            BackLayer3d.Delta_X = (Main.CANVAS_HEIGHT / 2 - xy[0]) / BackLayer3d.Count;
        }
        Main.Finishing = true;

        if (BackLayer3d.Counter < BackLayer3d.Count) {
            BackLayer3d.Counter++;
            this.character.Finishing(BackLayer3d.Delta_X);
        }
    }

    if (this.isdown || Main.Finishing)
        return;

    if (this.keyDownLeft ^ this.keyDownRight == 0)
        this.character.update(0, 0, false);
    else if (this.keyDownLeft) {
        this.character.update(this.characterSpeed, -1, this.turn);
        this.turn = false;
    }
    else if (this.keyDownRight) {
        this.character.update(this.characterSpeed, 1, this.turn);
        this.turn = false;
    }
};

BackLayer3d.prototype.interactivity = function (btn) {
    btn.interactive = true;

    btn
        .on('mousedown', this.onMouseDown.bind(this))
        .on('touchstart', this.onMouseDown.bind(this))

        .on('mouseup', this.onMouseUp.bind(this))
        .on('touchend', this.onMouseUp.bind(this))
        .on('mouseupoutside', this.onMouseUp.bind(this))
        .on('touchendoutside', this.onMouseUp.bind(this))
        .on('mouseout', this.onMouseUp.bind(this))
        .on('touchout', this.onMouseUp.bind(this))

        .on('mousemove', this.onMouseMove.bind(this))
        .on('touchmove', this.onMouseMove.bind(this))
};

BackLayer3d.prototype.onMouseDown = function (e) {
    this.isdown = true;
    this.turn = true;
    this.mousePreX = e.data.global.x;
};

BackLayer3d.prototype.onMouseUp = function () {
    this.isdown = false;
};

BackLayer3d.prototype.onMouseMove = function (e) {
    if (Main.Finishing || !Main.Start)
        return;

    var x = e.data.global.x;

    if (!this.isdown)
        this.character.update(0, 0, false);
    else if (x - this.mousePreX < 0) {
        this.character.update(this.characterSpeed, -1, this.turn);
        this.turn = false;
    }
    else if (x - this.mousePreX > 0) {
        this.character.update(this.characterSpeed, 1, this.turn);
        this.turn = false;
    }
    else
        this.character.update(0, 0, false);

    this.mousePreX = x;
};

BackLayer3d.prototype.nextShuffle = function (shuffle) {
    var res = [];

    for (var i = 0; i < 2; i++) {
        var index = Math.floor(Math.random() * Date.now()) % 2;
        var x = shuffle[index + i];
        res.push(x);

        if (index == 1) {
            var t = shuffle[index + i];
            shuffle[index + i] = shuffle[i];
            shuffle[i] = t;
        }
    }

    res.push(shuffle[2]);
    return res;
};

BackLayer3d.prototype.checkInside = function (point, vs) {
    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

BackLayer3d.prototype.reset = function(){
    this.distance = 120000;
    this.roadLength = this.distance;
    this.speed = 80;
    this.startTime = Date.now();

    for (var i = 0; i < this.obstacles.length; i ++){
        this.obstacles[i].visible = true;
    }

    var k = 0;
    for (var i = 0; i < this.bgCount; i++) {
        for (var j = 0; j < 12; j++) {
            var background = this.backgrounds[k];
            background.position.x = -4200 + j * 850;
            background.position.y = this.startY + i * 900;
            background.position.z = 0;
            k ++;
        }
    }
};


