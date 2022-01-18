
function set_screen(){

    screen.root_cv = document.getElementById("canvas_src")
    screen.root_ctx = screen.root_cv.getContext("2d")
    screen.root_cv_width_aspect = 1
    screen.root_cv_height_aspect = 1
    screen.root_cv_margin_scale = 0.0
    screen.root_cv_min_width = 100
    screen.root_cv_min_height = screen.root_cv_min_width/screen.root_cv_width_aspect*screen.root_cv_height_aspect

    screen.game_cv = document.createElement("canvas")
    screen.game_ctx = screen.game_cv.getContext("2d")
    screen.game_cv_width_aspect = 4
    screen.game_cv_height_aspect = 5

    screen.board_cv = document.createElement("canvas")
    screen.board_ctx = screen.board_cv.getContext("2d")

    screen.resize_scale = 1.0

    screen.english = false
    screen.game_onprocess = false

    screen.audio_catch   = new Audio("resources/catch.mp3")
    screen.audio_injured = new Audio("resources/injured.mp3")
    screen.audio_over    = new Audio("resources/over.mp3")
    screen.audio_game    = new Audio("resources/game.mp3")
    screen.audio_catch.preload = "auto"
    screen.audio_injured.preload = "auto"
    screen.audio_over.preload = "auto"
    screen.audio_game.preload = "auto"
}

function set_ball(){
    game.ballXHS = game.paddleXHS + game.paddleWidthHS*0.5
    game.ballYVS = game.paddleYVS
    game.ballAngle = Math.PI*0.2
    game.ballReleased = false
}

function set_game(){

    game.collisionFillStyle = "rgba(200,200,200,0)"

    game.ballRadiusHS = 0.03
    game.ballImageSrc = ["resources/netB.png"]
    game.ballAnimationIntervalSec = 0.3
    game.ballMinVelocityHS = 0.008
    game.ballMaxVelocityHS = 0.01


    game.paddleWidthHS = 0.15
    game.paddleHeightVS = 0.02
    game.paddleXHS = 0.5 - game.paddleWidthHS*0.5
    game.paddleYVS = 0.9
    game.paddleSpeedHS = 0.01
    game.paddleImageSrc = ["resources/paddle.png"]
    game.paddleAnimationIntervalSec = 0.01

    game.blocks = []
    game.blocksHeightVS = 0.35
    game.blocksMarginHS = 0.005

    game.rightPressed = false
    game.leftPressed = false
    game.time = 0
    game.max_time = 2*2*2*2*3*3*5*7*11*13
    game.lastTimeLost = 0
    
    game.pause = true
    game.imageLoadProcess = 0

    game.timeRest = 60/screen.updateIntervalSec
    game.netRest = 3
    game.netRestScore = 600
    game.fishScore = 100
    game.pauseEndTimeCount = 0
    game.resultLoop = 50
    
    game.maxReadyCount = 3
    game.readyCount = game.maxReadyCount

    game.score = 0
    
    set_ball()
    set_blocks()
}

function set_canvas(){

    // canvas に関する設定 (HTMLの内容に反映される)
    screen.root_cv.width =
        Math.min(window.innerWidth, window.innerHeight/screen.root_cv_height_aspect*screen.root_cv_width_aspect) * (1.0-screen.root_cv_margin_scale*2)
    screen.root_cv.height =
        Math.min(window.innerHeight, window.innerWidth/screen.root_cv_width_aspect*screen.root_cv_height_aspect) * (1.0-screen.root_cv_margin_scale*2)


    if(screen.root_cv.width < screen.root_cv_min_width || screen.root_cv.height < screen.root_cv_min_height){
        screen.root_cv.width = screen.root_cv_min_width
        screen.root_cv.height = screen.root_cv_min_height
    }
    
    screen.game_cv.width =
        Math.min(screen.root_cv.width, screen.root_cv.height/screen.game_cv_height_aspect*screen.game_cv_width_aspect)
    screen.game_cv.height =
        Math.min(screen.root_cv.height, screen.root_cv.width/screen.game_cv_width_aspect*screen.game_cv_height_aspect)

    screen.board_cv.width = screen.root_cv.width-screen.game_cv.width
    screen.board_cv.height = screen.root_cv.height

    screen.root_cv.style.position = "fixed"
    screen.root_cv.positionX = ((window.innerWidth-screen.root_cv.width)*0.5)
    screen.root_cv.positionY = ((window.innerHeight-screen.root_cv.height)*0.5)
    screen.root_cv.style.top  = screen.root_cv.positionY.toString() + "px"
    screen.root_cv.style.left = screen.root_cv.positionX.toString() + "px"
    
}

function set_blocks(){

    var enemyWidthHS = 0.1
    var enemyXHS = function(){ return game.paddleXHS + (game.paddleWidthHS-enemyWidthHS)/2 }

    make_new_block({
            
        xHS : enemyXHS(),
        yVS : 0.42,
        widthHS  : enemyWidthHS,
        heightVS : 0.06,
        available: true,
        ballPiercing : false,
        animationImageSrc : ["resources/uniA1.png", "resources/uniA2.png", "resources/uniA3.png", "resources/uniA4.png", "resources/uniA3.png", "resources/uniA2.png"],
        animationIntervalSec : 0.1,
        animationXFlip : false,
        seed : new Array(10).fill(Math.random()),
        dxFuncHS : function(){
            var dx = (enemyXHS() - this.xHS) * 0.05
            this.animationXFlip =  dx > 0
            return dx
        },
        dyFuncVS : function(){
            return 0.0
        },
        brokenFunc : function(){
            lostBall()
        },
        passFunc : function(){
            
        }
    })
    for(var i = 0; i < 15; i++) generate_block(i%2 == 0)
    
}

