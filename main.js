console.log("Page loaded successfully!");

let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');
ctx.lineWidth = 2;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// CREATE GAME INTERFACE
let PlayField = function () {
    this.x = 10;
    this.y = 10;
    this.W = 133;
    this.H = 263;

    this.map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    this.emptyMap = [...this.map];
}

PlayField.prototype.drawPlayField = function () {
    ctx.strokeStyle = "#000";
    ctx.strokeRect(this.x, this.y, this.W, this.H);
}

PlayField.prototype.drawCell = function (x, y, value) {
    if (value === 0) {
        ctx.fillStyle = "#61705B";
        ctx.strokeStyle = "#61705B";
    }
    else if (value === 1) {
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#000";
    }
    ctx.strokeRect(x, y, 10, 10);
    ctx.fillRect(x + 3, y + 3, 4, 4)
}

PlayField.prototype.drawMap = function () {
    let x = this.x + 3;
    let y = this.y + 3;
    for (let i = 5; i < 25; i++) {
        for (let j = 0; j < 10; j++) {
            this.drawCell(x, y, this.map[i][j]);
            x += 13;
        }
        y += 13;
        x = this.x + 3;
    }
}

function moveMap() {
    score += 10;

    if (counter === 0) {
        spawnEnemy();
    }
    counter = (counter + 1) % 10;

    let cell = playField.map[24][0];
    for (let i = 24; i > 5; i--) {
        playField.map[i][0] = playField.map[i - 1][0];
        playField.map[i][9] = playField.map[i - 1][9];
    }
    playField.map[5][0] = cell;
    playField.map[5][9] = cell;

    if (player.position === "Left")
        clearPosition(21, 2, playField.map);
    else
        clearPosition(21, 5, playField.map);

    for (let i = 24; i > 0; i--) {
        playField.map[i][2] = playField.map[i - 1][2];
        playField.map[i][3] = playField.map[i - 1][3];
        playField.map[i][4] = playField.map[i - 1][4];
        playField.map[i][5] = playField.map[i - 1][5];
        playField.map[i][6] = playField.map[i - 1][6];
        playField.map[i][7] = playField.map[i - 1][7];
    }
}

function showScore(score) {
    ctx.fillStyle = "#000";
    ctx.font = 'bold 16px "Courier New", "Montserrat", sans-serif';
    ctx.fillText("Score", 170, 50);
    ctx.fillText(score.toString(), 170, 64);
}

function pressToStart() {
    ctx.fillStyle = "#000";
    ctx.font = 'bold 20px "Courier New", "Montserrat", sans-serif';
    ctx.fillText("Press Enter/Space", 20, 294);
    ctx.fillText("to start", 70, 312);
}

function gameOver() {
    ctx.fillStyle = "#000";
    ctx.font = 'bold 20px "Courier New", "Montserrat", sans-serif';
    ctx.fillText("Game Over", 60, 300);
}

// CREATE CARS
let Car = function () {

}

Car.prototype.spawnOnMap = function (i, j, map) {
    map[i][j + 1] = 1;

    map[i + 1][j] = 1;
    map[i + 1][j + 1] = 1;
    map[i + 1][j + 2] = 1;

    map[i + 2][j + 1] = 1;

    map[i + 3][j] = 1;
    map[i + 3][j + 2] = 1;
}

function clearPosition(i, j, map) {
    map[i][j + 1] = 0;

    map[i + 1][j] = 0;
    map[i + 1][j + 1] = 0;
    map[i + 1][j + 2] = 0;

    map[i + 2][j + 1] = 0;

    map[i + 3][j] = 0;
    map[i + 3][j + 2] = 0;
}

let Player = function () {
    Car.call(this);
    this.position = "Left";
}

Player.prototype = Object.create(Car.prototype);

Player.prototype.spawn = function () {
    if (this.position === "Left")
        this.spawnOnMap(21, 2, playField.map);
    else
        this.spawnOnMap(21, 5, playField.map);
}

function checkFrontCrash(map) {
    if ((player.position === "Left" && map[20][3] === 1) ||
        (player.position === "Right" && map[20][6] === 1)) {
        crash = 1;
    }
}

function checkSideCrash(map) {
    if (player.position === "Left" &&
        (map[21][2] === 1 || map[21][3] === 1 || map[21][4] === 1 ||
            map[22][2] === 1 || map[22][3] === 1 || map[22][4] === 1 ||
            map[23][2] === 1 || map[23][3] === 1 || map[23][4] === 1 ||
            map[24][2] === 1 || map[24][3] === 1 || map[24][4] === 1))
        crash = 1;
    else if (player.position === "Right" &&
        (map[21][5] === 1 || map[21][6] === 1 || map[21][7] === 1 ||
            map[22][5] === 1 || map[22][6] === 1 || map[22][7] === 1 ||
            map[23][5] === 1 || map[23][6] === 1 || map[23][7] === 1 ||
            map[24][5] === 1 || map[24][6] === 1 || map[24][7] === 1))
        crash = 1;
}

function spawnEnemy() {
    let lines = [2, 5];
    let enemy = new Car;
    enemy.spawnOnMap(1, lines[getRandomInt(2)], playField.map);
}

// CONTROLS
function keysDown() {
    // Set isPressed to an empty object
    this.isPressed = {};
    let left, right;

    // Set up `onkeydown` event handler.
    document.onkeydown = function (e) {
        if (e.code === "ArrowRight" || e.code === "KeyD") { right = true; }
        if (e.code === "ArrowLeft" || e.code === "KeyA") { left = true; }
    };

    // Set up `onkeyup` event handler.
    document.onkeyup = function (e) {
        if (e.code === "ArrowRight" || e.code === "KeyD") { right = false; }
        if (e.code === "ArrowLeft" || e.code === "KeyA") { left = false; }
    };

    // Define getters for each key
    // * Not strictly necessary. Could just return
    // * an object literal of methods, the syntactic
    // * sugar of `defineProperty` is just so much sweeter :)
    Object.defineProperty(this.isPressed, 'left', {
        get: function() { return left; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(this.isPressed, 'right', {
        get: function() { return right; },
        configurable: true,
        enumerable: true
    });

    return this;
}

let keys = keysDown();

Player.prototype.playerUpdate = function () {
    checkFrontCrash(playField.map);
    if (keys.isPressed.left && this.position !== "Left") {
        this.position = "Left";
        checkSideCrash(playField.map);

        clearPosition(21, 5, playField.map);
    }
    if (keys.isPressed.right && this.position !== "Right") {
        this.position = "Right";
        checkSideCrash(playField.map);

        clearPosition(21, 2, playField.map);
    }
}


// GAME ENGINE
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    playField.drawPlayField();
    playField.drawMap();
    showScore(score);
}

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

async function start() {
    await waitingForStart();
}

function waitingForStart() {
    return new Promise((resolve) => {
        window.addEventListener('keydown', keyStartHandler);
        function keyStartHandler(e) {
            if (e.code === "Enter" || e.code === "Space") {
                window.removeEventListener('keydown', keyStartHandler);
                resolve();
            }
        }
    });
}

function currentTime() {
    return new Date().getTime(); // кол-во мс с 1 янв 1970
}

function step(timeFromAnimationStart) {
    // sleep((timeFromAnimationStart - timeFromLastFrame) * (600 / FPS)).then(moveMap);
    sleep(timeFromAnimationStart  * (600 / FPS)).then(moveMap);
}

function gameLoop() {
    let now = currentTime();
    let timeFromAnimationStart = now - animationStart;
    // let timeFromLastFrame = now - lastFrameTime;
    lastFrameTime = now;

    player.playerUpdate();

    step(timeFromAnimationStart);
    player.spawn();
    draw();

    if (crash === 1) {
        gameOver();
        return sleep(3000).then(restart);
    }

    requestAnimationFrame(gameLoop);
}

function restart() {
    score = 0;
    playField = new PlayField();
    draw();
    counter = 1;
    crash = 0;
    playField.map = [...playField.emptyMap];
    run();
}

function run() {
    pressToStart();
    start().then(_ => {
        player = new Player();
        player.spawn();
        draw();
        
        animationStart = currentTime();
        lastFrameTime = currentTime();

        let result = gameLoop();
        console.log(result);
    });
}

let animationStart = currentTime();
let lastFrameTime = currentTime();

let FPS = 30;

let score = 0;

let playField = new PlayField();
ctx.scale(2, 2);
draw();

let player;
let counter = 1;
let crash = 0;

run();
