let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 810;
canvas.height = window.innerHeight - 100;
const dinoImage = new Image();
dinoImage.src = './assets/dinosaur.png';
dinoImage.width = 50;
dinoImage.height = 50;
const cactusImage = new Image();
cactusImage.src = './assets/cactus.png';
cactusImage.width = 30;

let dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(dinoImage, this.x, this.y, 50, 50);
    }
}

class Cactus {
    constructor() {
        this.x = 800;
        this.y = 200;
        this.width = 30;
        this.height = 50
    }
    draw() {
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(cactusImage, this.x, this.y, 30, 50)
    }
}

dino.draw();

const scoreSection = document.getElementById('score');
let timer = 0;
let cactusArray = [];
let jumpflag = false;
let jumpTimer = 0;
let score = 0;
let animation;

function foo() {
    animation = requestAnimationFrame(foo);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timer % 120 === 0) {
        let cactus = new Cactus();
        cactusArray.push(cactus);
    }

    cactusArray.forEach((a, i, o) => {
        if (a.x < 0) {
            o.splice(i, 1);
            score += 10;
            scoreSection.innerHTML = `점수 : ${score}`;
        }
        a.x -= 12;
        collision(dino, a);
        a.draw();
    })

    if (jumpflag) {
        dino.y -= 12;
        jumpTimer++;
    } else if (dino.y < 200) {
        dino.y += 12;
    }

    if (jumpTimer > 10) {
        jumpflag = false;
        jumpTimer = 0;
    }
    dino.draw();
}

foo();

// Collision Check
function collision(dino, cactus) {
    let xCol = cactus.x - (dino.x + dino.width - 5);
    let yCol = cactus.y - (dino.y + dino.height);
    if ((xCol < 0 && xCol > 0 - cactus.width) && yCol < 0) {
        cancelAnimationFrame(animation);
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('modal').style.display = 'block';
    }
}


document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        jumpflag = true;
    }
})

document.getElementById('reset').addEventListener('click', function () {
    timer = 0;
    cactusArray = [];
    jumpflag = false;
    jumpTimer = 0;
    score = 0;
    scoreSection.innerHTML = `점수 : ${score}`;
    document.getElementById('modal').style.display = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animation = requestAnimationFrame(foo);
});