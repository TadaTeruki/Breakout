
var game = {}
var image_stock = {}
var screen = {}

function main(){
    set_screen()
    set_canvas()
    screen.canvas.start_width  = screen.canvas.width
    screen.canvas.start_height = screen.canvas.height
    screen.updateIntervalSec = 0.01
    set_game()
    // イベントハンドラの追加
    document.addEventListener("keydown", keyDownHandler, false)
    document.addEventListener("keyup", keyUpHandler, false)

    window.addEventListener("resize", function(event){
        set_canvas()
        screen.resize_scale = screen.canvas.width/screen.canvas.start_width
        draw()
    })

    // ループ処理の定義
    setInterval(loop, 1000 * screen.updateIntervalSec)
}

function loop(){
    game.time++
    if(game.time > game.max_time){ game.time = 0 }
    
    if(game.rightPressed && game.paddleXHS < 1.0-game.paddleWidthHS) {
        game.paddleXHS += game.paddleSpeedHS
    }
    else if(game.leftPressed && game.paddleXHS > 0) {
        game.paddleXHS -= game.paddleSpeedHS
    }

    moveBlocks()

    if(game.ballReleased == true) {
        moveBall()
    } else {
        set_ball()
    }
    draw()
}


