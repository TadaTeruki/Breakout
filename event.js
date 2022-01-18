// ボールが取りこぼされた時の処理を行う
function lostBall(by_uni = false){
    if(game.ballReleased == true) game.netRest--

    if(game.netRest <= 0){
        finishGame()
    }

    set_ball()
    if(by_uni){
        screen.audio_uni.currentTime = 0
        screen.audio_uni.play()
    } else {
        screen.audio_injured.currentTime = 0
        screen.audio_injured.play()
    }

    game.lastTimeLost = game.time
}

function startGame(){
    screen.game_onprocess = true
    set_game()
    draw()
    setGameSceneLabel()
    startReadyCount()
    /*

    */
    screen.audio_count.play()
}

function finishGame(){

    game.pause = true
    setFinishLabel()

    setTimeout(function(){
        setResultLabel()
    }, 1500)

    screen.audio_game.pause()
    screen.audio_over.play()

}

function pauseGame(){
    if(game.pause == true) return
    setPauseLabel()
    game.pause = true
    screen.audio_game.pause()
}

function endPause(){
    game.pause = false
    setGameSceneLabel()
    game.pauseEndTimeCount = 5
    screen.audio_game.play()
}