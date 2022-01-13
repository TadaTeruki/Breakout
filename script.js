
var game = {}
var screen = {}

function loop(){
    draw()
}


function main(){
    set_screen()
    set_canvas()
    screen.canvas.start_width  = screen.canvas.width
    screen.canvas.start_height = screen.canvas.height
    set_game()
    // イベントハンドラの追加
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    window.addEventListener("resize", function(event){
        set_screen()
        screen.resize_scale = screen.canvas.width/screen.canvas.start_width
        loop()
    })

    // ループ処理の定義
    setInterval(loop, 10);
}

function set_blocks(){

    for(var i = 0; i < 40; i++){
        game.blocks.push({
            xHS : Math.random()*1.0,
            yVS : Math.random()*game.blocksHeightVS,
            widthHS  : 0.2,
            heightVS : 0.05,
            available: true,
            ball_piercing : true,
            
        })
    }
    
}

