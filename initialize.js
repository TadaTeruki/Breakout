
function set_screen(){
    screen.width_aspect = 4
    screen.height_aspect = 5
    screen.resize_scale = 1.0
    screen.canvas_margin_scale = 0.1
    screen.canvas = document.getElementById("canvas_src");
    screen.ctx = screen.canvas.getContext("2d");
    
}

function set_ball(){
    game.ballXHS = game.paddleXHS + game.paddleWidthHS*0.5;
    game.ballYVS = game.paddleYVS;
    game.ballAngle = Math.PI*0.2;
    game.ballVelocityHS = 0.008;
    game.ballReleased = false;
}

function set_game(){

    game.ballRadiusHS = 0.02;
    game.paddleWidthHS = 0.15;
    game.paddleHeightVS = 0.02;
    game.paddleXHS = 0.5 - game.paddleWidthHS*0.5;
    game.paddleYVS = 0.9;
    game.paddleSpeedHS = 0.01;

    game.blocks = []
    game.blocksHeightVS = 0.35;
    game.blocksMarginHS = 0.005;

    game.rightPressed = false;
    game.leftPressed = false;
    
    set_ball()
    set_blocks()
}

function set_canvas(){

    // canvas に関する設定 (HTMLの内容に反映される)
    screen.canvas.width =
        Math.min(window.innerWidth, window.innerHeight/screen.height_aspect*screen.width_aspect) * (1.0-screen.canvas_margin_scale*2)
    screen.canvas.height =
        Math.min(window.innerHeight, window.innerWidth/screen.width_aspect*screen.height_aspect) * (1.0-screen.canvas_margin_scale*2)

    if(screen.canvas.width < 0.0 || screen.canvas.height < 0.0){
        screen.canvas.width = 0.0
        screen.canvas.height = 0.0
    }
    //screen.canvas.style.top  = ((window.innerHeight-screen.canvas.height)*0.5).toString() +"px"
    screen.canvas.style.left = ((window.innerWidth-screen.canvas.width)*0.5).toString() + "px"
    
}