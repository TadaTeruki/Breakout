
function getAnimID(interval_sec, image_num){
    return Math.floor(game.time/(interval_sec/screen.updateIntervalSec))%image_num
}

function drawImageOnRect(image_src, rect_x, rect_y, rect_width, rect_height) {
    
    process = function(){
        var image_width  = image_stock[image_src].width
        var image_height = image_stock[image_src].height

        var display_width  = Math.max(rect_width,  image_width/image_height*rect_height)
        var display_height = Math.max(rect_height, image_height/image_width*rect_width)
        screen.ctx.drawImage(image_stock[image_src],
            rect_x+(rect_width-display_width)/2, rect_y+(rect_height-display_height)/2, display_width, display_height
        )
    }
    
    if(image_stock[image_src] == undefined){
        image_stock[image_src] = new Image()
        image_stock[image_src].src = image_src
        image_stock[image_src].onload = process
    } else {
        process()
    }

}

// ボールの描画
function drawBall() {
    screen.ctx.beginPath()

    var ball_x = screen.canvas.width*game.ballXHS
    var ball_y = screen.canvas.height*game.ballYVS
    var ball_r = screen.canvas.width*game.ballRadiusHS
    screen.ctx.arc(ball_x, ball_y, ball_r, 0, Math.PI*2)
    screen.ctx.fillStyle = game.collisionFillStyle
    screen.ctx.fill()
    screen.ctx.closePath()

    var anim_id = getAnimID(game.ballAnimationIntervalSec, game.ballImageSrc.length)
    drawImageOnRect(game.ballImageSrc[anim_id],
        ball_x-ball_r,
        ball_y-ball_r,
        ball_r*2,
        ball_r*2)
}

// パドルの描画
function drawPaddle() {
    screen.ctx.beginPath()

    var rect_x = game.paddleXHS * screen.canvas.width
    var rect_y = game.paddleYVS * screen.canvas.height
    var rect_width = game.paddleWidthHS * screen.canvas.width
    var rect_height = game.paddleHeightVS * screen.canvas.height

    screen.ctx.rect(rect_x, rect_y, rect_width, rect_height)
    screen.ctx.fillStyle = game.collisionFillStyle
    screen.ctx.fill()
    screen.ctx.closePath()

    var anim_id = getAnimID(game.paddleAnimationIntervalSec, game.paddleImageSrc.length)
    drawImageOnRect(game.paddleImageSrc[anim_id], rect_x, rect_y, rect_width, rect_height)

}

// ブロックの描画
function drawBlocks() {
    
    for(var i = 0; i<game.blocks.length; i++){
        if(game.blocks[i].available == false) continue
        screen.ctx.beginPath()
        var margin = game.blocksMarginHS * screen.canvas.width
        var rect_x = game.blocks[i].xHS * screen.canvas.width
        var rect_y = game.blocks[i].yVS * screen.canvas.height
        var rect_width = game.blocks[i].widthHS * screen.canvas.width
        var rect_height = game.blocks[i].heightVS * screen.canvas.height
        screen.ctx.rect(
            rect_x + margin,
            rect_y + margin,
            rect_width  - margin,
            rect_height - margin
        )
        screen.ctx.fillStyle = game.collisionFillStyle
        screen.ctx.fill()
        screen.ctx.closePath()

        var anim_id = getAnimID(game.blocks[i].animationIntervalSec, game.blocks[i].animationImageSrc.length)
        drawImageOnRect(game.blocks[i].animationImageSrc[anim_id], rect_x, rect_y, rect_width, rect_height)

    }
    
}

// 全体の描画処理
function draw() {

    if(game.rightPressed && game.paddleXHS < 1.0-game.paddleWidthHS) {
        game.paddleXHS += game.paddleSpeedHS
    }
    else if(game.leftPressed && game.paddleXHS > 0) {
        game.paddleXHS -= game.paddleSpeedHS
    }

    if(game.ballReleased == true) {
        moveBall()
    } else {
        set_ball()
    }

    screen.ctx.clearRect(0, 0, screen.canvas.width, screen.canvas.height)

    drawImageOnRect("resources/test_background.png", 0, 0, screen.canvas.width, screen.canvas.height)

    drawBall()
    drawPaddle()
    drawBlocks()
}