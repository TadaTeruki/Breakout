

function moveBlocks(){
    for(var i = 0; i<game.blocks.length; i++){
        if(game.blocks[i].available == false) continue
        game.blocks[i].xHS += game.blocks[i].dxFuncHS()
        game.blocks[i].yVS += game.blocks[i].dyFuncVS()

        if(game.blocks[i].xHS < -game.blocks[i].widthHS*2.0 || game.blocks[i].xHS > 1.0+game.blocks[i].widthHS){
            game.blocks[i].passFunc()
        }
    }
}

// ブロックを動かす
function moveBall(){

    var NextBallXHS = 0.0
    var NextBallYVS = 0.0
    var NextBallAngle = game.ballAngle
    var MaxCollisionDistanceScale = 10.0
    var brokenBlocksList = []

    var AngleList = [ 0.0, -game.ballAngle*2, Math.PI-game.ballAngle*2, Math.PI]

    CollisionLoop:
    for(var CollisionDistanceScale = 1.0; CollisionDistanceScale <= MaxCollisionDistanceScale; CollisionDistanceScale++){

        for(var j = 0; j < AngleList.length; j++){

            var angle = NextBallAngle + AngleList[j]
            var timeProp = (game.time-game.lastTimeLost)/(game.time+game.timeRest-game.lastTimeLost)
            var velocity = ((1.0-timeProp)*game.ballMinVelocityHS + timeProp*game.ballMaxVelocityHS) * CollisionDistanceScale
            var ballXHS = game.ballXHS + Math.cos(angle)*velocity
            var ballYVS = game.ballYVS - Math.sin(angle)*velocity
            var accepted = true

            // 以下の条件を満たしている場合、ボールは直進する
            // 満たしていない場合は、acceptedが偽となり、ボールの方向が変わる

            // 条件1 : 枠の外に出ていないか?
            if(ballXHS < 0.0 || ballXHS > 1.0 || ballYVS < 0.0 || ballYVS > 1.0){
                accepted = false
                // 枠の底にいる場合(=ボールを取りこぼした場合)は、当たり判定ループから抜け、処理を行う
                if (ballYVS > (1.0 + game.paddleYVS)*0.5) {
                    lostBall()
                    break CollisionLoop
                }
                
            }

            // 条件2 : ブロックに当たっていないか?
            for(var i = 0; i<game.blocks.length; i++){
                if(game.blocks[i].available == false) continue
                if((ballXHS > game.blocks[i].xHS) && (ballXHS < game.blocks[i].xHS + game.blocks[i].widthHS) &&
                    (ballYVS > game.blocks[i].yVS) && (ballYVS < game.blocks[i].yVS + game.blocks[i].heightVS) ){
                    
                    // ブロックに当たっている
                    // ただし、ボールが跳ね返るには、ballPiercingがtrueである必要あり
                    if (game.blocks[i].ballPiercing == false){
                        accepted = false
                    }
                    brokenBlocksList.push(i)
                }
            }

            // 条件3 : パドルに当たっていないか?
            if(
                (ballXHS > game.paddleXHS) && (ballXHS < game.paddleXHS + game.paddleWidthHS) &&
                (ballYVS > game.paddleYVS) && (ballYVS < game.paddleYVS + game.paddleHeightVS) ){
                accepted = false
            }

            if(accepted == true){
                NextBallAngle = angle
                NextBallXHS = ballXHS
                NextBallYVS = ballYVS
                break CollisionLoop
            }
        }

        if(CollisionDistanceScale == MaxCollisionDistanceScale){
            return
        }
    }

    if (game.ballAngle != NextBallAngle && brokenBlocksList.length == 0) {
        screen.audio_injured.currentTime = 0
        screen.audio_injured.play()
    }

    game.ballXHS = NextBallXHS
    game.ballYVS = NextBallYVS
    game.ballAngle = NextBallAngle
    
    for(var i = 0; i < brokenBlocksList.length; i++){
        var place = brokenBlocksList[i]
        game.blocks[place].brokenFunc()
    }



}