
function setInitialSceneLabel(){

    label_box = {}
    
    label_box["initial_a"] = {
        canvasType : "root",
        xHS : 0.0,
        yVS : 0.0,
        widthHS : 1.0,
        heightVS : 1.0,
        marginHS : 0.1,
        textAlign : "center",
        textBaseLine : "top",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : ["", "網漁ゲーム(仮称)", "時間制限内に網で魚を捕獲しよう", "捕れた魚の数が得点になる", "網を底に落とさないように気をつけよう", "ウニに当たらないようにも気をつけよう"],
        textSizeHS : [0.1, 0.05, 0.028, 0.028, 0.028, 0.028],
        textLineHeightVS : [0.0, 0.05, 0.015, 0.025, 0.015],
        textWeight : ["", "bold", "", "", "", ""],

        backFillStyle : "#f4f4f4e0",
        textFillStyle : "#333333",
        shadowFillStyle : "#ffffff55",
        shadowBlurHS : 0.1
    }

    label_box["button_start"] = {
        canvasType : "root",
        xHS : 0.35,
        yVS : 0.7,
        widthHS : 0.3,
        heightVS : 0.1,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        mouseIn : false,
        clickEvent : function(){
            setGameSceneLabel()
            game.pause = false
        } ,

        text : ["スタート"],
        textSizeHS : [0.045],
        textLineHeightVS : [],
        textWeight : ["bold"],

        backFillStyle : "#66bb66",
        backFillStyleMouseIn : "#449944",
        textFillStyle : "#ffffff",
        shadowFillStyle : "#aaaaaa",
        shadowBlurHS : 0.01
    }

    label_box["credit"] = {
        canvasType : "root",
        xHS : 0.7,
        yVS : 0.71,
        widthHS : 0.15,
        heightVS : 0.08,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        mouseIn : false,
        clickEvent : function(){
            setGameSceneLabel()
            game.pause = false
        } ,

        text : ["クレジット"],
        textSizeHS : [0.025],
        textLineHeightVS : [],
        textWeight : ["bold"],

        backFillStyle : "#888888",
        backFillStyleMouseIn : "#555555",
        textFillStyle : "#ffffff",
        shadowFillStyle : "#aaaaaa",
        shadowBlurHS : 0.01
    }

    label_box["language"] = {
        canvasType : "root",
        xHS : 0.15,
        yVS : 0.71,
        widthHS : 0.15,
        heightVS : 0.08,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        mouseIn : false,
        clickEvent : function(){
            setGameSceneLabel()
            game.pause = false
        } ,

        text : ["♻ English"],
        textSizeHS : [0.025],
        textLineHeightVS : [],
        textWeight : ["bold"],

        backFillStyle : "#cc8888",
        backFillStyleMouseIn : "#aa5555",
        textFillStyle : "#ffffff",
        shadowFillStyle : "#aaaaaa",
        shadowBlurHS : 0.01
    }
}

function setGameSceneLabel(){
    label_box = {}
}