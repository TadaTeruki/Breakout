
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
    
    // イベントハンドラの追加
    document.addEventListener("keydown", keyDownHandler, false)
    document.addEventListener("keyup", keyUpHandler, false)

    window.addEventListener("resize", function(event){
        set_canvas()
        screen.resize_scale = screen.game_cv.width/screen.game_cv.start_width
        draw()
    })

    set_game()

    label_box["initial"] = {
        canvasType : "root",
        xHS : 0.0,
        yVS : 0.0,
        widthHS : 1.0,
        heightVS : 1.0,
        marginHS : 0.1,
        textAlign : "left",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",

        text : ["タイトル", "〜ルール〜"],
        textSizeHS : [0.05, 0.05],
        textLineHeightVS : [0.1],
        textWeight : ["bold", ""],

        backFillStyle : "#445555f0",
        textFillStyle : "#eeeeee",
    }

    loop()
}

function loop(){

    if(game.pause == false){
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

        setTimeout(loop, 1000 * screen.updateIntervalSec)
    }

    draw()
}


