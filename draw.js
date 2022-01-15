
function getAnimID(interval_sec, image_num){
    return Math.floor(game.time/(interval_sec/screen.updateIntervalSec))%image_num
}

function drawImageOnRect(ctx, image_src, rect_x, rect_y, rect_width, rect_height, flip_x = false, flip_y = false) {
    
    process = function(){
        var image_width  = image_stock[image_src].width
        var image_height = image_stock[image_src].height

        var display_width  = Math.max(rect_width,  image_width/image_height*rect_height)
        var display_height = Math.max(rect_height, image_height/image_width*rect_width)

        ctx.save()

        var xscale = flip_x ? -1:1
        var yscale = flip_y ? -1:1
        var xfix = flip_x ? -1:0
        var yfix = flip_y ? -1:0
        ctx.scale(xscale, yscale)
        ctx.drawImage(image_stock[image_src],
            xscale*rect_x+rect_width*xfix+(rect_width-display_width)/2, yscale*rect_y+(rect_height-display_height)/2, display_width, display_height
        )

        ctx.restore()
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
    screen.game_ctx.beginPath()

    var ball_x = screen.game_cv.width*game.ballXHS
    var ball_y = screen.game_cv.height*game.ballYVS
    var ball_r = screen.game_cv.width*game.ballRadiusHS
    screen.game_ctx.arc(ball_x, ball_y, ball_r, 0, Math.PI*2)
    screen.game_ctx.fillStyle = game.collisionFillStyle
    screen.game_ctx.fill()
    screen.game_ctx.closePath()

    var anim_id = getAnimID(game.ballAnimationIntervalSec, game.ballImageSrc.length)
    drawImageOnRect(screen.game_ctx, game.ballImageSrc[anim_id],
        ball_x-ball_r,
        ball_y-ball_r,
        ball_r*2,
        ball_r*2)
}

// パドルの描画
function drawPaddle() {
    screen.game_ctx.beginPath()

    var rect_x = game.paddleXHS * screen.game_cv.width
    var rect_y = game.paddleYVS * screen.game_cv.height
    var rect_width = game.paddleWidthHS * screen.game_cv.width
    var rect_height = game.paddleHeightVS * screen.game_cv.height

    screen.game_ctx.rect(rect_x, rect_y, rect_width, rect_height)
    screen.game_ctx.fillStyle = game.collisionFillStyle
    screen.game_ctx.fill()
    screen.game_ctx.closePath()

    var anim_id = getAnimID(game.paddleAnimationIntervalSec, game.paddleImageSrc.length)
    drawImageOnRect(screen.game_ctx, game.paddleImageSrc[anim_id], rect_x, rect_y, rect_width, rect_height)

}

// ブロックの描画
function drawBlocks() {
    
    for(var i = 0; i<game.blocks.length; i++){
        if(game.blocks[i].available == false) continue
        screen.game_ctx.beginPath()
        var margin = game.blocksMarginHS * screen.game_cv.width
        var rect_x = game.blocks[i].xHS * screen.game_cv.width
        var rect_y = game.blocks[i].yVS * screen.game_cv.height
        var rect_width = game.blocks[i].widthHS * screen.game_cv.width
        var rect_height = game.blocks[i].heightVS * screen.game_cv.height
        screen.game_ctx.rect(
            rect_x + margin,
            rect_y + margin,
            rect_width  - margin,
            rect_height - margin
        )
        screen.game_ctx.fillStyle = game.collisionFillStyle
        screen.game_ctx.fill()
        screen.game_ctx.closePath()

        var anim_id = getAnimID(game.blocks[i].animationIntervalSec, game.blocks[i].animationImageSrc.length)
        drawImageOnRect(screen.game_ctx, game.blocks[i].animationImageSrc[anim_id], rect_x, rect_y, rect_width, rect_height, game.blocks[i].animationXFlip)
    }
    
}

// 全体の描画処理
function draw() {

    screen.game_ctx.clearRect(0, 0, screen.game_cv.width, screen.game_cv.height)
    screen.board_ctx.clearRect(0, 0, screen.board_cv.width, screen.board_cv.height)

    drawImageOnRect(screen.game_ctx, "resources/test_background.png", 0, 0, screen.game_cv.width, screen.game_cv.height)
    drawImageOnRect(screen.board_ctx, "resources/test_background.png", 0, 0, screen.board_cv.width, screen.board_cv.height)
    
    drawBall()
    drawPaddle()
    drawBlocks()

    screen.root_ctx.drawImage(screen.game_cv, 0, 0)
    screen.root_ctx.drawImage(screen.board_cv, screen.game_cv.width, 0)
}