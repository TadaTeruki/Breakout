
function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        game.ballReleased = true
    }
    if(e.key == "Right" || e.key == "ArrowRight") {
        game.rightPressed = true
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        game.leftPressed = true
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        game.rightPressed = false
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        game.leftPressed = false
    }
}

function updateLabelMouseIO(mouseXHS, mouseYVS){

    var info_changed = false
    
    for(key in label_box){
        var label = label_box[key]
        if(label == undefined)continue
        if(label.clickEvent == undefined)continue

        var fMouseXHS = mouseXHS
        var fMouseYVS = mouseYVS

        if(label.canvasType == "board"){
            fMouseXHS = (mouseXHS-screen.game_cv.width/screen.root_cv.width)/(screen.board_cv.width/screen.root_cv.width)
        }
        if(label.canvasType == "game"){
            fMouseXHS = mouseXHS/(screen.game_cv.width/screen.root_cv.width)
        }

        var previousMouseIn = label_box[key].mouseIn

        if(fMouseXHS >= label.xHS && fMouseXHS <= label.xHS + label.widthHS &&
           fMouseYVS >= label.yVS && fMouseYVS <= label.yVS + label.heightVS) {
            label_box[key].mouseIn = true
        } else {
            label_box[key].mouseIn = false
        }

        info_changed = info_changed || (label_box[key].mouseIn != previousMouseIn)
    }

    return info_changed
}

function pointerIsInGame(mouseXHS){
    return mouseXHS <= screen.game_cv.width/screen.root_cv.width
}

function motionHandler(e) {
    var mouseXHS = (e.x - screen.root_cv.positionX)/screen.root_cv.width
    var mouseYVS = (e.y - screen.root_cv.positionY)/screen.root_cv.height

    if(updateLabelMouseIO(mouseXHS, mouseYVS)){
        draw()
    }

}

function mouseOutHandler(e) {
    if(updateLabelMouseIO(-1.0, -1.0)){
        draw()
    }
}

function mouseUpHandler(e) {

    var mouseXHS = (e.x - screen.root_cv.positionX)/screen.root_cv.width
    var mouseYVS = (e.y - screen.root_cv.positionY)/screen.root_cv.height

    updateLabelMouseIO(mouseXHS, mouseYVS)

    for(key in label_box){
        var label = label_box[key]

        if(label == undefined)continue

        if(label.clickEvent == undefined)continue

        if(label.mouseIn){
            label.clickEvent()
            screen.audio_button.currentTime = 0
            screen.audio_button.play()
        }
    }

    if(game.pauseEndTimeCount == 0 && game.pause == false && screen.game_onprocess == true && pointerIsInGame(mouseXHS)) {
        game.paddleXHS = mouseXHS/screen.game_cv.width*screen.root_cv.width - game.paddleWidthHS*0.5
        if(game.ballReleased == false){
            game.ballXHS = game.paddleXHS + game.paddleWidthHS * 0.5
            game.ballReleased = true
        }
    }

}

function mouseDownHandler(e) {
    screen.touching = true
}