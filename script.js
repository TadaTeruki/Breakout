
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
    moveBlocks()
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
            ballPiercing : true,
            animationImageSrc : ["resources/test_fish0.png"],
            animationIntervalSec : 0.01,
            seed : new Array(10).fill(Math.random()),
            dxFuncHS : function(){
                return -0.001*this.seed[0]*Math.abs(Math.cos(game.time/Math.PI*this.seed[1]*0.1))
            },
            dyFuncVS : function(){
                return 0.0
            }
        })
    }
    
}

