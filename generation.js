
function make_new_block(obj){

    for(var i = 0; i < game.blocks.length; i++) {
        if(game.blocks[i].available == false){
            game.blocks[i] = obj
            return 
        }
    }
    game.blocks.push(obj)
}


function generate_block(from_right = false){

    var blockScale = 1.0 + Math.random()*1.0
    var speedScale = 1.0 + Math.random()*1.0

    var is_can = Math.random() > (1.25-game.time/(game.time+game.timeRest)*0.25 - 0.2)

    var widthHS = (is_can ? 0.08:0.13)*blockScale
    var heightVS = (is_can ? 0.04:0.025)*blockScale

    make_new_block({
        xHS : from_right ? 1.0 : -widthHS,
        yVS : Math.random()*game.blocksHeightVS,
        widthHS  : widthHS,
        heightVS : heightVS,
        available: true,
        score : game.fishScore,
        is_can : is_can,
        ballPiercing : !is_can,
        animationImageSrc :
            is_can ? ["resources/can.png"]:
            (Math.random() < 0.8 ? 
            ["resources/fishA1.png", "resources/fishA2.png", "resources/fishA3.png",
             "resources/fishA4.png", "resources/fishA3.png", "resources/fishA2.png"] :
            ["resources/fishB1.png", "resources/fishB2.png", "resources/fishB3.png",
             "resources/fishB4.png", "resources/fishB3.png", "resources/fishB2.png"]),
        animationIntervalSec : 0.1,
        animationXFlip : !from_right,
        speedHS : 0.001 * speedScale,
        rotate : is_can ? Math.random()*2.0*Math.PI:0.0,
        seed : new Array(2).fill(Math.random()),
        dxFuncHS : function(){
            return (from_right ? -1:1)*this.speedHS*
                (0.3 + this.seed[0]*Math.abs(Math.cos(game.time/Math.PI*this.seed[1]*0.1)))
        },
        dyFuncVS : function(){
            return 0.0
        },
        brokenFunc : function(){
            if(this.is_can){
                screen.audio_can.currentTime = 0
                screen.audio_can.play()
            } else {
                screen.audio_catch.currentTime = 0
                screen.audio_catch.play()
                this.available = false
                setTimeout(function(){
                    generate_block(Math.random() < 0.5)
                }, 1000)
                game.score += this.score
            }
        },
        passFunc : function(){
            this.available = false
            generate_block(Math.random() < 0.5)
        }
    })
}