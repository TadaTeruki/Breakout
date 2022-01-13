// ボールの描画
function drawBall() {
    screen.ctx.beginPath();
    screen.ctx.arc(screen.canvas.width*game.ballXHS, screen.canvas.height*game.ballYVS, screen.canvas.width*game.ballRadiusHS, 0, Math.PI*2);
    screen.ctx.fillStyle = "#0025DD";
    screen.ctx.fill();
    screen.ctx.closePath();
}

// パドルの描画
function drawPaddle() {
    screen.ctx.beginPath();
    screen.ctx.rect(
        screen.canvas.width*game.paddleXHS,
        screen.canvas.height*game.paddleYVS,
        screen.canvas.width*game.paddleWidthHS,
        screen.canvas.height*game.paddleHeightVS
    );
    screen.ctx.fillStyle = "#0095DD";
    screen.ctx.fill();
    screen.ctx.closePath();
}

// ブロックの描画
function drawBlocks() {
    
    for(var i = 0; i<game.blocks.length; i++){
        if(game.blocks[i].available == false) continue;
        screen.ctx.beginPath();
        var margin = game.blocksMarginHS * screen.canvas.width
        screen.ctx.rect(
            game.blocks[i].xHS * screen.canvas.width + margin,
            game.blocks[i].yVS * screen.canvas.height + margin,
            game.blocks[i].widthHS * screen.canvas.width - margin,
            game.blocks[i].heightVS * screen.canvas.height - margin
        );
        screen.ctx.fillStyle = "#aaaaaa";
        screen.ctx.fill();
        screen.ctx.closePath();
    }
    
}

// 全体の描画処理
function draw() {

    if(game.rightPressed && game.paddleXHS < 1.0-game.paddleWidthHS) {
        game.paddleXHS += game.paddleSpeedHS;
    }
    else if(game.leftPressed && game.paddleXHS > 0) {
        game.paddleXHS -= game.paddleSpeedHS;
    }

    if(game.ballReleased == true) {
        moveBall()
    } else {
        set_ball()
    }

    screen.ctx.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
    drawBall();
    drawPaddle();
    drawBlocks();
}