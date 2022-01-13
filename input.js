
function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        game.ballReleased = true;
    }
    if(e.key == "Right" || e.key == "ArrowRight") {
        game.rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        game.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        game.rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        game.leftPressed = false;
    }
}