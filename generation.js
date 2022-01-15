
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

    var blockScale = 1.0 + Math.random()*0.5
    var speedScale = 1.0 + Math.random()*1.0

    var widthHS = 0.15*blockScale
    var heightVS = 0.03*blockScale

    make_new_block({
        xHS : from_right ? 1.0 : -widthHS,
        yVS : Math.random()*game.blocksHeightVS,
        widthHS  : widthHS,
        heightVS : heightVS,
        available: true,
        ballPiercing : true,
        animationImageSrc : ["resources/fishA.png"],
        animationIntervalSec : 0.01,
        animationXFlip : !from_right,
        speedHS : 0.001 * speedScale,
        seed : new Array(10).fill(Math.random()),
        dxFuncHS : function(){
            return (from_right ? -1:1)*this.speedHS*
                (0.3 + this.seed[0]*Math.abs(Math.cos(game.time/Math.PI*this.seed[1]*0.1)))
        },
        dyFuncVS : function(){
            return 0.0
        },
        brokenFunc : function(){
            this.available = false
            setTimeout(function(){
                generate_block(Math.random() < 0.5)
            }, 1000)
        },
        passFunc : function(){
            this.available = false
            generate_block(Math.random() < 0.5)
        }
    })
}