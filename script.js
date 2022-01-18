
var game = {}
var image_stock = {}
var screen = {}
var label_box = {}

function main(){
    set_screen()
    set_canvas()

    setLoadingSceneLabel()

    draw()

    screen.game_cv.start_width  = screen.game_cv.width
    screen.game_cv.start_height = screen.game_cv.height
    screen.updateIntervalSec = 0.01
    screen.drawInterval = 2
    
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

    startLoop()


    
}

function startLoop(){

    screen.audio_catch    = new Audio("resources/catch.mp3")
    screen.audio_injured  = new Audio("resources/injured.mp3")
    screen.audio_over     = new Audio("resources/over.wav")
    screen.audio_game     = new Audio("resources/game.mp3")
    screen.audio_button   = new Audio("resources/button.mp3")
    screen.audio_rank     = new Audio("resources/rank.mp3")
    screen.audio_calculate= new Audio("resources/calculate.mp3")
    screen.audio_can      = new Audio("resources/can.mp3")
    screen.audio_uni      = new Audio("resources/uni.mp3")
    screen.audio_count    = new Audio("resources/count.mp3")
    
    screen.audio_catch.preload = "auto"
    screen.audio_injured.preload = "auto"
    screen.audio_over.preload = "auto"
    screen.audio_game.preload = "auto"
    screen.audio_button.preload = "auto"
    screen.audio_rank.preload = "auto"
    screen.audio_calculate.preload = "auto"
    screen.audio_can.preload = "auto"
    screen.audio_uni.preload = "auto"
    screen.audio_count.preload = "auto"
    
    screen.imageLoadProcess += 10

    screen.audio_catch.addEventListener("loadedmetadata",function(){
        screen.imageLoadProcess--
    })
    screen.audio_injured.addEventListener("loadedmetadata",function(){ screen.imageLoadProcess-- })
    screen.audio_over.addEventListener("loadedmetadata",function(){ screen.imageLoadProcess-- })
    screen.audio_game.addEventListener("loadedmetadata",function(){ screen.imageLoadProcess-- })
    screen.audio_button.addEventListener("loadedmetadata",function(){ screen.imageLoadProcess-- })
    screen.audio_rank.addEventListener("loadedmetadata",function(){ screen.imageLoadProcess-- })
    screen.audio_calculate.addEventListener("loadedmetadata",function(){ screen.imageLoadProcess-- })
    screen.audio_can.addEventListener("loadedmetadata",function(){ screen.imageLoadProcess-- })
    screen.audio_uni.addEventListener("loadedmetadata",function(){ screen.imageLoadProcess-- })
    screen.audio_count.addEventListener("loadedmetadata",function(){ screen.imageLoadProcess-- })

    loadImage(
        "resources/background.png",
        "resources/fishA1.png",
        "resources/fishA2.png",
        "resources/fishA3.png",
        "resources/fishA4.png",
        "resources/fishB1.png",
        "resources/fishB2.png",
        "resources/fishB3.png",
        "resources/fishB4.png",
        "resources/netB.png",
        "resources/paddle.png",
        "resources/uniA1.png",
        "resources/uniA2.png",
        "resources/uniA3.png",
        "resources/uniA4.png",
        "resources/can.png",
    )

    checkContentsLoaded = function(){
        if(screen.imageLoadProcess == 0){
            draw()
            document.fonts.ready.then(function(fontFaceSet) {
                setInitialSceneLabel()
                loop()
            });
        } else {
            setTimeout(function(){
                checkContentsLoaded()
            }, 500)
        }
    }

    checkContentsLoaded()

}

function loop(){

    if(game.pause == false){
        game.time++
        if(game.time > game.max_time){ game.time = 0 }

        game.timeRest--

        if(game.timeRest <= 0){
            finishGame()
        }

        game.pauseEndTimeCount = Math.max(game.pauseEndTimeCount-1, 0)
        
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
        if(Math.floor(game.time/screen.drawInterval) != Math.floor((game.time-1)/screen.drawInterval)){
            draw()
        }
    } else {
        setTimeout(loop, 1000)
        draw()
    }
}


