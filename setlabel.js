
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
        
        background : true,
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
            startReadyCount()
        } ,

        text : ["スタート"],
        textSizeHS : [0.045],
        textLineHeightVS : [],
        textWeight : ["bold"],
        
        background : true,
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
            setCreditLabel()
        } ,

        text : ["クレジット"],
        textSizeHS : [0.025],
        textLineHeightVS : [],
        textWeight : ["bold"],

        background : true,
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

        background : true,
        backFillStyle : "#cc8888",
        backFillStyleMouseIn : "#aa5555",
        textFillStyle : "#ffffff",
        shadowFillStyle : "#aaaaaa",
        shadowBlurHS : 0.01
    }
}

function setReadyCount(){
    setTimeout(function(){

        game.readyCount--
        if(game.readyCount <= 0){
            if(label_box["ready"] != undefined) label_box["ready"].text[1] = "START!"
            setTimeout(function(){ label_box["ready"].text = [] }, 1000)

            game.pause = false
        } else {
            setReadyCount()
            if(label_box["ready"] != undefined) label_box["ready"].text[1] = game.readyCount.toString()
        }

        
    }, 1000)
}

function startReadyCount(){
    game.readyCount = game.maxReadyCount

    setReadyCount()
}

function setGameSceneLabel(){
    label_box = {}

    label_box["ready"] = {
        canvasType : "root",
        xHS : 0.0,
        yVS : 0.0,
        widthHS : 1.0,
        heightVS : 1.0,
        marginHS : 0.8,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : game.pause ? ["READY?", game.maxReadyCount.toString()]:[],
        textSizeHS : [0.03, 0.07],
        textLineHeightVS : [0.02],
        textWeight : ["", ""],

        background : false,
        backFillStyle : "#00000000",
        textFillStyle : "#333333",
        shadowBlurHS : 0
    }

    label_box["time"] = {
        canvasType : "board",
        xHS : 0.0,
        yVS : 0.0,
        widthHS : 1.0,
        heightVS : 0.35,
        marginHS : 0.1,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : ["残り時間", "100", "残り網数", "3"],
        textSizeHS : [0.13, 0.25, 0.13, 0.25],
        textLineHeightVS : [0.01, 0.05, 0.01],
        textWeight : ["", "", "", ""],
        
        background : true,
        backFillStyle : "#888888",
        textFillStyle : "#ffffff",
        shadowFillStyle : "#aaaaaa",
        shadowBlurHS : 0.01
    }

    label_box["score"] = {
        canvasType : "board",
        xHS : 0.0,
        yVS : 0.34,
        widthHS : 1.0,
        heightVS : 0.2,
        marginHS : 0.1,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : ["スコア", "0"],
        textSizeHS : [0.13, 0.25],
        textLineHeightVS : [0.01],
        textWeight : ["", "", "", ""],
        
        background : true,
        backFillStyle : "#888888",
        textFillStyle : "#ffffff",
        shadowFillStyle : "#aaaaaa",
        shadowBlurHS : 0.01
    }

    label_box["button_pause"] = {
        canvasType : "board",
        xHS : 0.0,
        yVS : 0.88,
        widthHS : 1.0,
        heightVS : 0.12,
        marginHS : 0.1,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        mouseIn : false,
        clickEvent : function(){
            if(game.pause == true) return
            setPauseLabel()
            game.pause = true
        },

        text : ["ポーズ"],
        textSizeHS : [0.2],
        textLineHeightVS : [],
        textWeight : [""],
        
        background : true,
        backFillStyle : "#cc8888",
        backFillStyleMouseIn : "#aa5555",
        textFillStyle : "#ffffff",
        shadowFillStyle : "#aaaaaa",
        shadowBlurHS : 0.01
    }

}

function setPauseLabel(){

    label_box["button_pause"].clickEvent = undefined

    label_box["credit_back"] = {
        canvasType : "root",
        xHS : 0.0,
        yVS : 0.0,
        widthHS : 1.0,
        heightVS : 1.0,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        mouseIn : false,
        clickEvent : function(){
            game.pause = false
            setGameSceneLabel()
        },

        text : ["ポーズ中", "画面をクリックまたはタッチすると戻ります"],
        textSizeHS : [0.07, 0.03],
        textLineHeightVS : [0.02],
        textWeight : ["", ""],

        background : true,
        backFillStyle : "#444444e0",
        backFillStyleMouseIn : "#444444e0",
        textFillStyle : "#ffffff",
        shadowFillStyle : "#ffffff00",
        shadowBlurHS : 0
    }
}

function setCreditLabel(){
    label_box = {}

    label_box["credit_back"] = {
        canvasType : "root",
        xHS : 0.1,
        yVS : 0.1,
        widthHS : 0.8,
        heightVS : 0.8,
        marginHS : 0.0,
        textAlign : "left",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : [],
        
        background : true,
        backFillStyle : "#f4f4f4e0",
        textFillStyle : "#333333",
        shadowFillStyle : "#ffffff55",
        shadowBlurHS : 0.1
    }
    
    label_box["credit_main"] = {
        canvasType : "root",
        xHS : 0.18,
        yVS : 0.25,
        widthHS : 0.4,
        heightVS : 0.6,
        marginHS : 0.0,
        textAlign : "left",
        textBaseLine : "top",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : ["🐟 開発メンバー 🐟",
                "ゆきだま",
                "   ゲームデザイン・BGM選曲",
                "       コーディング(支援)",
                "やま",
                "   グラフィックス",
                "       ゲームデザイン(支援)",
                "ぺるき",
                "   企画・コーディング",
                "       ゲームデザイン(支援)",
        ],
        textSizeHS : [0.03,
                      0.028,
                      0.025,
                      0.02,
                      0.028,
                      0.025,
                      0.02,
                      0.028,
                      0.025,
                      0.02],
        textLineHeightVS : [0.04,
                            0.015,
                            0.015,
                            0.04,
                            0.015,
                            0.015,
                            0.04,
                            0.015,
                            0.015],
        textWeight : ["bold",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      ""],
        
        background : false,
        backFillStyle : "#ffffff00",
        textFillStyle : "#333333",
        shadowFillStyle : "#00000000",
        shadowBlurHS : 0.0
    }

    label_box["credit_sub"] = {
        canvasType : "root",
        xHS : 0.57,
        yVS : 0.25,
        widthHS : 0.3,
        heightVS : 0.5,
        marginHS : 0.0,
        textAlign : "left",
        textBaseLine : "top",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : ["🐠 支援者の方々 🐠",
                "雪見だいふく",
                "ファラット",
                "shigure",
                "             企画(支援)",
        ],
        textSizeHS : [0.03,
                      0.028,
                      0.028,
                      0.028,
                      0.02,],
        textLineHeightVS : [0.04,
                            0.015,
                            0.015,
                            0.015,],
        textWeight : ["bold",
                      "",
                      "",
                      "",
                      "",],

        background : false,
        backFillStyle : "#ffffff00",
        textFillStyle : "#333333",
        shadowFillStyle : "#00000000",
        shadowBlurHS : 0.0
    }

    label_box["back"] = {
        canvasType : "root",
        xHS : 0.7,
        yVS : 0.75,
        widthHS : 0.15,
        heightVS : 0.08,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        mouseIn : false,
        clickEvent : function(){
            setInitialSceneLabel()
        } ,

        text : ["戻る"],
        textSizeHS : [0.025],
        textLineHeightVS : [],
        textWeight : ["bold"],

        background : true,
        backFillStyle : "#888888",
        backFillStyleMouseIn : "#555555",
        textFillStyle : "#ffffff",
        shadowFillStyle : "#aaaaaa",
        shadowBlurHS : 0.01
    }

}