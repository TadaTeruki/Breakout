// ボールが取りこぼされた時の処理を行う
function lostBall(){
    if(game.ballReleased == true) game.netRest--

    if(game.netRest <= 0){
        finishGame()
    }

    set_ball()

    screen.audio_injured.play()
    
    game.lastTimeLost = game.time
}

function startGame(){
    screen.game_onprocess = true
    set_game()
    draw()
    setGameSceneLabel()
    startReadyCount()
}

function finishGame(){

    game.pause = true
    setFinishLabel()

    setTimeout(function(){
        setResultLabel()
    }, 1500)

}
