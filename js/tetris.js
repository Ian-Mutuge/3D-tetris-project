if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = ( function () {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function FrameRequestCallback / callback, / DOMElement Element */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

window.Tetris = window.Tetris || {};
Tetris.sounds = {};
var mouseDown = false;
var mouseX = 0;
var mouseY = 0;

function onMouseDown(event) {
    event.preventDefault();
    mouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onMouseMove(event) {
    if (mouseDown) {
        var deltaX = event.clientX - mouseX;
        var deltaY = event.clientY - mouseY;

        Tetris.camera.position.x += deltaX * 0.5; // Adjust the sensitivity by changing the multiplier
        Tetris.camera.position.y -= deltaY * 0.5;

        mouseX = event.clientX;
        mouseY = event.clientY;
    }
}

function onMouseUp(event) {
    mouseDown = false;
}

document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mouseup', onMouseUp, false);
Tetris.init = function () {
    Tetris.sounds["theme"] = document.getElementById("audio_theme");
    Tetris.sounds["collision"] = document.getElementById("audio_collision");
    Tetris.sounds["move"] = document.getElementById("audio_move");
    Tetris.sounds["gameover"] = document.getElementById("audio_gameover");
    Tetris.sounds["score"] = document.getElementById("audio_score");


    // set the scene size
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    // create a WebGL renderer, camera
    // and a scene
    Tetris.renderer = new THREE.WebGLRenderer();
    Tetris.camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR);
    Tetris.scene = new THREE.Scene();
Tetris.camera.position.set(0, -600, 900);
Tetris.camera.lookAt(new THREE.Vector3(0, -300, 450));
    // the camera starts at 0,0,0 so pull it back
    Tetris.scene.add(Tetris.camera);

    // start the renderer
    Tetris.renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    document.body.appendChild(Tetris.renderer.domElement);

    // configuration object
    var boundingBoxConfig = {
        width:360,
        height:360,
        depth:1200,
        splitX:6,
        splitY:6,
        splitZ:20
    };
    Tetris.boundingBoxConfig = boundingBoxConfig;
    Tetris.blockSize = boundingBoxConfig.width / boundingBoxConfig.splitX;

    Tetris.Board.init(boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ);

    var boundingBox = new THREE.Mesh(
        new THREE.CubeGeometry(boundingBoxConfig.width, boundingBoxConfig.height, boundingBoxConfig.depth, boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ),
        new THREE.MeshBasicMaterial({ color: 0xd3d3d3, wireframe: true, opacity: 0.1 })
    );
    Tetris.scene.add(boundingBox);

    Tetris.renderer.render(Tetris.scene, Tetris.camera);

    Tetris.stats = new Stats();
    Tetris.stats.domElement.style.position = 'absolute';
    Tetris.stats.domElement.style.top = '10px';
    Tetris.stats.domElement.style.left = '10px';
    document.body.appendChild(Tetris.stats.domElement);

    document.getElementById("play_button").addEventListener('click', function (event) {
        event.preventDefault();
        Tetris.start();
    });
};

Tetris.start = function () {
    document.getElementById("menu").style.display = "none";
    Tetris.pointsDOM = document.getElementById("points");
    Tetris.pointsDOM.style.display = "block";

    Tetris.sounds["theme"].play();

    Tetris.Block.generate();
    Tetris.animate();
};

Tetris.gameStepTime = 1000;

Tetris.frameTime = 0; // ms
Tetris.cumulatedFrameTime = 0; // ms
Tetris._lastFrameTime = Date.now(); // timestamp

Tetris.gameOver = false;

Tetris.animate = function () {
    var time = Date.now();
    Tetris.frameTime = time - Tetris._lastFrameTime;
    Tetris._lastFrameTime = time;
    Tetris.cumulatedFrameTime += Tetris.frameTime;

    while (Tetris.cumulatedFrameTime > Tetris.gameStepTime) {
        Tetris.cumulatedFrameTime -= Tetris.gameStepTime;
        Tetris.Block.move(0, 0, -1);
    }

    Tetris.renderer.render(Tetris.scene, Tetris.camera);

    Tetris.stats.update();

    if (!Tetris.gameOver) window.requestAnimationFrame(Tetris.animate);
};


// nice test:
// var i = 0, j = 0, k = 0, interval = setInterval(function() {if(i==6) {i=0;j++;} if(j==6) {j=0;k++;} if(k==6) {clearInterval(interval); return;} Tetris.addStaticBlock(i,j,k); i++;},30)

Tetris.staticBlocks = [];
Tetris.zColors = [
    0x6666ff, 0x66ffff, 0xcc68EE, 0x666633, 0x66ff66, 0x9966ff, 0x00ff66, 0x66EE33, 0x003399, 0x330099, 0xFFA500, 0x99ff00, 0xee1289, 0x71C671, 0x00BFFF, 0x666633, 0x669966, 0x9966ff
];
Tetris.addStaticBlock = function (x, y, z) {
    if (Tetris.staticBlocks[x] === undefined) Tetris.staticBlocks[x] = [];
    if (Tetris.staticBlocks[x][y] === undefined) Tetris.staticBlocks[x][y] = [];

    var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry(Tetris.blockSize, Tetris.blockSize, Tetris.blockSize), [
        new THREE.MeshBasicMaterial({color:0x000000, shading:THREE.FlatShading, wireframe:true, transparent:true}),
        new THREE.MeshBasicMaterial({color:Tetris.zColors[z]})
    ]);

    mesh.position.x = (x - Tetris.boundingBoxConfig.splitX / 2) * Tetris.blockSize + Tetris.blockSize / 2;
    mesh.position.y = (y - Tetris.boundingBoxConfig.splitY / 2) * Tetris.blockSize + Tetris.blockSize / 2;
    mesh.position.z = (z - Tetris.boundingBoxConfig.splitZ / 2) * Tetris.blockSize + Tetris.blockSize / 2;

    Tetris.scene.add(mesh);
    Tetris.staticBlocks[x][y][z] = mesh;
};

Tetris.currentPoints = 0;
Tetris.addPoints = function (n) {
    Tetris.currentPoints += n;
    Tetris.pointsDOM.innerHTML = Tetris.currentPoints;
    Cufon.replace('#points');
    Tetris.sounds["score"].play();
};

window.addEventListener("load", Tetris.init);

window.addEventListener('keydown', function (event) {
    var key = event.which ? event.which : event.keyCode;

    switch (key) {
        //case

        case 38: // up (arrow)
            Tetris.Block.move(0, 1, 0);
            break;
        case 40: // down (arrow)
            Tetris.Block.move(0, -1, 0);
            break;
        case 37: // left(arrow)
            Tetris.Block.move(-1, 0, 0);
            break;
        case 39: // right (arrow)
            Tetris.Block.move(1, 0, 0);
            break;
        case 32: // space
            Tetris.Block.move(0, 0, -1);
            break;

        case 87: // up (w)
            Tetris.Block.rotate(90, 0, 0);
            break;
        case 83: // down (s)
            Tetris.Block.rotate(-90, 0, 0);
            break;

        case 65: // left(a)
            Tetris.Block.rotate(0, 0, 90);
            break;
        case 68: // right (d)
            Tetris.Block.rotate(0, 0, -90);
            break;

        case 81: // (q)
            Tetris.Block.rotate(0, 90, 0);
            break;
        case 69: // (e)
            Tetris.Block.rotate(0, -90, 0);
            break;
    }
}, false);


window.addEventListener('keydown', function (event) {
    var key = event.which ? event.which : event.keyCode;

    switch (key) {
        case 49: // 1
            Tetris.camera.position.set(0, -300, 900);
            Tetris.camera.lookAt(new THREE.Vector3(0, -150, 400));
            break;
        case 50: // 2
           Tetris.camera.position.set(800, -50, 500);
           Tetris.camera.lookAt(new THREE.Vector3(-300, 0, 0));
            break;
        case 51: // 3
            Tetris.camera.position.set(0, 500, 900);
            Tetris.camera.lookAt(new THREE.Vector3(0, 300, 450));
            break;
        case 52: // 4
            Tetris.camera.position.set(-600, 0, 450);
            Tetris.camera.lookAt(new THREE.Vector3(-300, 0, 225));
            break;

        case 48: // 0
          Tetris.camera.position.set(0, 0, 600);
          Tetris.camera.lookAt(new THREE.Vector3(0, 0, 0));
          break;
        case 57: // 9
            // Set the position and lookAt for the bottom view
            Tetris.camera.position.set(0, 0, -1200);
            Tetris.camera.lookAt(new THREE.Vector3(0, 0, 0));
            break;
        case 27: // Esc key
            if (Tetris.gameOver) {
                // Game is already over, do nothing
            } else {
                // Pause the game
                Tetris.gameOver = true;
                Tetris.renderer.render(Tetris.scene, Tetris.camera); // Render the paused scene
                // Display the pause popup
                document.getElementById("pause_popup").style.display = "block";
            }
            break;
    }
}, false);
function resumeGame() {
    // Hide the pause popup
    document.getElementById("pause_popup").style.display = "none";

    // Resume the game by setting gameOver to false
    Tetris.gameOver = false;

    // Start the game loop again
    Tetris.animate();
}
