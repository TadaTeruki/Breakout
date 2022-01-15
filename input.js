
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

        if(label.clickEvent == undefined)continue

        var previousMouseIn = label_box[key].mouseIn

        if(mouseXHS >= label.xHS && mouseXHS <= label.xHS + label.widthHS &&
           mouseYVS >= label.yVS && mouseYVS <= label.yVS + label.heightVS) {
            label_box[key].mouseIn = true
        } else {
            label_box[key].mouseIn = false
        }

        info_changed = info_changed || (label_box[key].mouseIn != previousMouseIn)
    }

    return info_changed
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
        }
    }
}