var Container = PIXI.Container,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Text = PIXI.Text,
    Graphics = PIXI.Graphics;


Main.CANVAS_WIDTH = 810;
Main.CANVAS_HEIGHT = 800;

var stage = new Container();
var renderer = new PIXI.WebGLRenderer(Main.CANVAS_WIDTH, Main.CANVAS_HEIGHT, {resolution: 1, autoResize: true});
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.backgroundColor = 0xFFFFFF;

function Main() {
    var div = document.getElementById('canvas');
    div.appendChild(renderer.view);

    this.preLoader = Sprite.fromImage('assets/preloader.jpg');
    stage.addChild(this.preLoader);

    this.loadHandBookFonts();
}

Main.Finished = false;
Main.Finishing = false;
Main.Start = false;
Main.FadeInSpeed = 0.05;
Main.FadeOutSpeed = 0.05;
Main.Screens = [];
Main.curScreen = 1;
Main.preScreen = 0;
Main.screenChange = true;
Main.selectedCharacter = 0;
Main.startFadeIn = true;
Main.resultTime = 0;

Main.prototype.update = function () {
    this.manager.update();
    renderer.render(stage);
    requestAnimationFrame(this.update.bind(this));
};


Main.prototype.loadHandBookFonts = function () {
    this.handBookFont = new Font();
    var $this = this;
    this.handBookFont.onload = function () {
        $this.loadDigitFonts();
    };

    this.handBookFont.onerror = function (err) {
        console.log(err);
    };

    this.handBookFont.fontFamily = "PFHandbookPro-Medium";
    this.handBookFont.src = this.handBookFont.fontFamily;
};

Main.prototype.loadDigitFonts = function () {
    this.digitFont = new Font();
    var $this = this;
    this.digitFont.onload = function () {
        $this.loadSpriteSheet();
    };

    this.digitFont.onerror = function (err) {
        console.log(err);
    };

    this.digitFont.fontFamily = "DS-Digital Italic";
    this.digitFont.src = this.digitFont.fontFamily;
};

Main.prototype.loadSpriteSheet = function () {
    this.whooshSound = new Howl({
        urls: ['assets/audios/whoosh.mp3'],
        volume: 0.1,
        preload: true,
        onend: function () {
            //console.log('Finished!');
        }
    });

    var loader = new PIXI.loaders.Loader();
    loader.on("progress", this.loadProgressHandler.bind(this));
    loader.add('sensodyneSheet', 'assets/SensodyneSheet.json');
    loader.add('road', 'assets/show-pattern.jpg');
    loader.add('mountain', 'assets/mountains.png');
    for (var i = 1; i <= 4; i++) {
        loader.add('left-ice-' + i.toString(), 'assets/left-ice-' + i.toString() + '.png');
    }

    for (var i = 1; i <= 4; i++) {
        loader.add('right-ice-' + i.toString(), 'assets/right-ice-' + i.toString() + '.png');
    }

    for (var i = 1; i <= 6; i++) {
        loader.add('screen-' + i.toString(), 'assets/screen-' + i.toString() + '.jpg');
    }

    loader.add('screen', 'assets/screen-4-w.jpg');
    loader.add('center-ice', 'assets/center-ice-1.png');
    loader.add('finish', 'assets/finish01.png');
    loader.load(this.spriteSheetLoaded.bind(this));
};

Main.prototype.spriteSheetLoaded = function () {
    this.manager = new Manager();

    Main.Screens[0] = new BaseScreen();
    Main.Screens[1] = new Screen1(stage);
    Main.Screens[2] = new Screen2(stage);
    Main.Screens[3] = new Screen3(stage);
    Main.Screens[4] = new StartScreen(stage);
    Main.Screens[5] = new Screen5(stage);
    Main.Screens[6] = new Screen6(stage);

    this.manager.setupControls();

    Main.Screens[0].alpha = 1;

    var $this = this;
    window.addEventListener('resize', function (event) {
        $this.fitScreen();
    });
    this.fitScreen();

    this.preLoader.visible = false;
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.loadProgressHandler = function (loader, resource) {
    renderer.render(stage);
};

Main.prototype.fitScreen = function () {
    var width = Math.min(window.innerWidth, 810);
    var height = Math.min(window.innerHeight, 800);

    var f1 = width / Main.CANVAS_WIDTH;
    var f2 = height / Main.CANVAS_HEIGHT;

    var w, h;
    if (f1 < f2) {
        w = width;
        h = width * 800 / 810;
    } else {
        h = height;
        w = height * 810 / 800;
    }

    renderer.view.style.width = w + 'px';
    renderer.view.style.height = h + 'px';
    document.getElementById('canvas').style.width = Main.CANVAS_WIDTH + 'px';
};
