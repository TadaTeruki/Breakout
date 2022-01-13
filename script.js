
var game = {}
var image_stock = {}
var screen = {}


function main(){
    set_screen()
    set_canvas()
    screen.canvas.start_width  = screen.canvas.width
    screen.canvas.start_height = screen.canvas.height
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
    setInterval(loop, 10)
}

function loop(){
    game.time++
    if(game.time > game.max_time){
        game.time = 0
    }
    draw()
}


function set_blocks(){

    for(var i = 0; i < 10; i++){
        game.blocks.push({
            xHS : Math.random()*1.0,
            yVS : Math.random()*game.blocksHeightVS,
            widthHS  : 0.2,
            heightVS : 0.05,
            available: true,
            ball_piercing : true,
            animation_image_src : ["resources/test_fish0.png"],
            animation_interval : 1,
        })
    }
    
}

