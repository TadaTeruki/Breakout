
var game = {}
var image_stock = {}
var screen = {}
var label_box = {}

function main(){
    set_screen()
    set_canvas()
    screen.game_cv.start_width  = screen.game_cv.width
    screen.game_cv.start_height = screen.game_cv.height
    screen.updateIntervalSec = 0.01

    draw()
    
    // イベントハンドラの追加
    document.addEventListener("keydown", keyDownHandler, false)
    document.addEventListener("keyup", keyUpHandler, false)
    screen.root_cv.addEventListener("mousemove", motionHandler, false)
    screen.root_cv.addEventListener("mouseout", mouseOutHandler, false)
    screen.root_cv.addEventListener("mousedown", mouseDownHandler, false)
    screen.root_cv.addEventListener("mouseup", mouseUpHandler, false)

    window.addEventListener("resize", function(event){
        set_canvas()
        screen.resize_scale = screen.game_cv.width/screen.game_cv.start_width
        draw()
    })

    document.fonts.ready.then(function(fontFaceSet) {
        setInitialSceneLabel()
        loop()
    });

    
    
}

function loop(){

    if(game.pause == false && game.imageLoadProcess == 0){
        game.time++
        if(game.time > game.max_time){ game.time = 0 }

        game.timeRest--

        if(game.timeRest <= 0){
            finishGame()
        }
        
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

        updateGameSceneLabel()

        setTimeout(loop, 1000 * screen.updateIntervalSec)
    } else {
        setTimeout(loop, 1000)
    }

    draw()
}


