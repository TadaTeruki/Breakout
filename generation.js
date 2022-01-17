
function make_new_block(obj){

    for(var i = 0 ; i < obj.animationImageSrc.length; i++){
        var image_src = obj.animationImageSrc[i]
        if(image_stock[image_src] != undefined) continue
        game.imageLoadProcess++
        image_stock[image_src] = new Image()
        image_stock[image_src].src = image_src
        image_stock[image_src].onload = function(){
            game.imageLoadProcess--
        }
    }

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

    var widthHS = 0.13*blockScale
    var heightVS = 0.025*blockScale

    make_new_block({
        xHS : from_right ? 1.0 : -widthHS,
        yVS : Math.random()*game.blocksHeightVS,
        widthHS  : widthHS,
        heightVS : heightVS,
        available: true,
        score : game.fishScore,
        ballPiercing : true,
        animationImageSrc :
            Math.random() < 0.8 ? 
            ["resources/fishA1.png", "resources/fishA2.png", "resources/fishA3.png",
             "resources/fishA4.png", "resources/fishA3.png", "resources/fishA2.png"] :
            ["resources/fishB1.png", "resources/fishB2.png", "resources/fishB3.png",
             "resources/fishB4.png", "resources/fishB3.png", "resources/fishB2.png"],
        animationIntervalSec : 0.1,
        animationXFlip : !from_right,
        speedHS : 0.001 * speedScale,
        seed : new Array(2).fill(Math.random()),
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
            game.score += this.score
        },
        passFunc : function(){
            this.available = false
            generate_block(Math.random() < 0.5)
        }
    })
}