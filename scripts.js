let startGame = false;
let isMovingObstacle = false;
let isDead = false;
let scorePoint = 0;

function update() {
    if (validateObstacle() && isMovingObstacle) {
        isMovingObstacle = false;
        document.getElementById("cactus").className = "cactus-start"
        moveObstacle()
        if (!isDead) {
            score()
        }
    }

    if (validateCollision()) {
        isDead = true;
        document.getElementById("text").innerHTML = "Game Over";
        console.log("Morreu")
    }

    window.requestAnimationFrame(update)
}

function jump() {
    document.getElementById("dino").style.cssText = 'transition: all 0.4s ease-out;';
    document.getElementById("dino").style.bottom = "100vh";
    setTimeout(function() { document.getElementById("dino").style.bottom = "49vh"; }, 250);
}

function moveObstacle() {
    setTimeout(function() {
        document.getElementById("cactus").className = "cactus-moving";
        isMovingObstacle = true
    }, 10);
}

function validateObstacle() {
    let cactu = document.getElementById("cactus").getBoundingClientRect();
    return (cactu.left < -100)
}

function validateCollision() {
    let dino = document.getElementById("dino").getBoundingClientRect();
    let cactu = document.getElementById("cactus").getBoundingClientRect();
    return (
        cactu.left < dino.right &&
        cactu.top < dino.bottom &&
        cactu.right > dino.left &&
        cactu.bottom > dino.top
    )

}

function score() {
    scorePoint++;
    document.getElementById("score").innerHTML = (scorePoint);
}

document.addEventListener("keydown", function(event) {
    if (startGame) {
        jump();
    }
});
document.addEventListener("keydown", function(event) {
    if (!startGame) {
        startGame = true;
        document.getElementById("text").innerHTML = "";
        moveObstacle()
        update();
    }
});