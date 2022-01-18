
function startReadyCount(){
    setReadyCount()
}

function updateGameSceneLabel(){
    if(label_box["restInfo"] != undefined){
        label_box["restInfo"].text[1] = Math.ceil(game.timeRest*screen.updateIntervalSec).toString()
        label_box["restInfo"].text[3] = game.netRest.toString()
    }
    if(label_box["score"] != undefined){
        label_box["score"].text[1] = game.score.toString()
    }

}

function getOverallScore(){
    return game.score + game.netRest * game.netRestScore
}

function setLoadingSceneLabel(){
    label_box = {}
    label_box["loading"] = {
        canvasType : "root",
        xHS : 0.0,
        yVS : 0.0,
        widthHS : 1.0,
        heightVS : 1.0,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : ["Loading..."],
        textSizeHS : [0.05],
        textLineHeightVS : [],
        textWeight : ["bold"],

        background : true,
        backFillStyle : "#333333",
        textFillStyle : "#ffffff",
        shadowBlurHS : 0.0,
        textShadowFillStyle : "#ffffffaa",
        textShadowBlurHS : 0.01,
    }
}

function setInitialSceneLabel(){

    label_box = {}

    label_box["initial_back"] = {
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

        text : [],

        background : true,
        backFillStyle : "#f4f4f4e0",
        textFillStyle : "#333333",
        shadowFillStyle : "#ffffff55",
        shadowBlurHS : 0.1
    }

    label_box["title"] = {
        canvasType : "root",
        xHS : 0.0,
        yVS : 0.13,
        widthHS : 1.0,
        heightVS : 0.28,
        marginHS : 0.1,
        textAlign : "center",
        textBaseLine : "top",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : screen.english ? 
                ["~ Smash fishing ~", "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"] :
                ["~ 魚網シューター ~", "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"],
        textSizeHS : [0.07, 0.025],
        textLineHeightVS : [0.01],
        textWeight : ["bold", ""],
        
        background : false,
        textFillStyle : "#333333",
    }
    
    label_box["role"] = {
        canvasType : "root",
        xHS : 0.0,
        yVS : 0.29,
        widthHS : 1.0,
        heightVS : 0.775,
        marginHS : 0.1,
        textAlign : "center",
        textBaseLine : "top",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : screen.english ? 
                ["Catch as many fish as you can!", "The time limit is 60 seconds.🐟 ", "3 fishing nets will be stocked.", "Be careful not to lose them.🐠 ", "Pay attention to volume"] :
                ["網で魚を多く捕獲しよう", "制限時間は1分", "網を底に落とさないように気をつけよう", "ウニに当たらないようにも気をつけよう", "※音が出ます"],
        textSizeHS : [0.03, 0.03, 0.03, 0.03, 0.025],
        textLineHeightVS : [0.02, 0.05, 0.02, 0.02],
        textWeight : ["", "", "", "", ""],
        
        background : false,
        textFillStyle : "#333333",
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
        clickEvent : startGame ,

        text : screen.english ? ["Play"]:["スタート"],
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

        text : screen.english ? ["Credit(JPN)"]:["クレジット"],
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
            screen.english = !screen.english
            setInitialSceneLabel()
        } ,

        text : screen.english ? ["♻ 日本語"]:["♻ English"],
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
            screen.audio_game.currentTime = 0
            screen.audio_game.play()
            game.pause = false
        } else {
            setReadyCount()
            if(label_box["ready"] != undefined) label_box["ready"].text[1] = game.readyCount.toString()
        }
        draw()
        
    }, 1000)
}

function setGameSceneLabel(){
    label_box = {}

    label_box["ready"] = {
        canvasType : "game",
        xHS : 0.0,
        yVS : 0.0,
        widthHS : 1.0,
        heightVS : 0.9,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : game.pause ? ["READY?", game.maxReadyCount.toString()]:[],
        textSizeHS : [0.05, 0.1],
        textLineHeightVS : [0.05],
        textWeight : ["", ""],

        background : false,
        backFillStyle : "#00000000",
        textFillStyle : "#ffffff",
        textShadowFillStyle : "#ffffffaa",
        textShadowBlurHS : 0.01,
        shadowBlurHS : 0
    }

    label_box["background"] = {
        canvasType : "board",
        xHS : 0.0,
        yVS : 0.0,
        widthHS : 1.0,
        heightVS : 1.0,
        marginHS : 0.0,
        clickEvent : undefined,

        text : [],
        background : true,
        backFillStyle : "#555555",
        shadowBlurHS : 0
    }

    label_box["control"] = {
        canvasType : "board",
        xHS : 0.0,
        yVS : 0.6,
        widthHS : 1.0,
        heightVS : 0.3,
        marginHS : 0.0,

        textAlign : "center",
        textBaseLine : "top",
        textFont : "M PLUS Rounded 1c",

        clickEvent : undefined,

        text : screen.english ? 
                ["How to play",
                "[↑] Throw the net",
                "[←][→] Move paddle"]:
                ["操作方法",
                "[↑] 網をはなす",
                "[←][→] 移動"],
        textSizeHS : screen.english ? [0.13, 0.09, 0.09]:[0.13, 0.13, 0.13],
        textLineHeightVS : [0.02, 0.01],
        textWeight : screen.english ? ["bold", "bold", "bold"]:["bold", "", ""],
        background : false,
        textFillStyle : "#ffffff",
        shadowBlurHS : 0
    }

    label_box["restInfo"] = {
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

        text : screen.english ? ["Time", "", "Fishing nets", ""] : ["残り時間", "", "残り網数", ""],
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

        text : screen.english ? ["SCORE", ""]:["スコア", ""],
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
        clickEvent : pauseGame,

        text : screen.english ? ["PAUSE"]:["ポーズ"],
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

function setResultLabel(){
    label_box["finish"] = undefined

    label_box["result_back"] = {
        canvasType : "game",
        xHS : 0.0,
        yVS : 0.0,
        widthHS : 1.0,
        heightVS : 1.0,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : [],

        background : true,
        backFillStyle : "#444444e0",
        backFillStyleMouseIn : "#444444e0",
        shadowBlurHS : 0
    }

    label_box["button_restart"] = {
        canvasType : "game",
        xHS : 0.2,
        yVS : 0.79,
        widthHS : 0.4,
        heightVS : 0.1,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        mouseIn : false,
        clickEvent : startGame,

        text : screen.english ? ["Play again"]:["もう一度遊ぶ"],
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

    label_box["jump_title"] = {
        canvasType : "game",
        xHS : 0.65,
        yVS : 0.8,
        widthHS : 0.2,
        heightVS : 0.08,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        mouseIn : false,
        clickEvent : function(){
            screen.game_onprocess = false
            setInitialSceneLabel()
        } ,

        text : screen.english ? ["Quit"]:["タイトルに戻る"],
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

    label_box["result_title"] = {
        canvasType : "game",
        xHS : 0.0,
        yVS : 0.1,
        widthHS : 1.0,
        heightVS : 0.08,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : screen.english ? ["Result"]:["今回のスコア"],
        textSizeHS : [0.08],
        textLineHeightVS : [],
        textWeight : ["bold"],
        
        background : false,
        textFillStyle : "#ffffff",
        shadowBlurHS : 0
    }



    label_box["result_score_info"] = {
        canvasType : "game",
        xHS : 0.25,
        yVS : 0.28,
        widthHS : 0.5,
        heightVS : 0.3,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "top",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : screen.english ? 
                ["Caught fish : " + Math.round(game.score/game.fishScore).toString()+" x " + game.fishScore.toString(),
                "+",
                "left fishing nets : " + game.netRest.toString() + " x " + game.netRestScore.toString(),
                "⇓",
                "0",
                "~~~~~~~~~~~~~~~~~~~~~~~~"]:
                ["捕獲した魚 : " + Math.round(game.score/game.fishScore).toString()+"匹 x " + game.fishScore.toString(),
                "+",
                "残った網数 : " + game.netRest.toString() + "張 x " + game.netRestScore.toString(),
                "⇓",
                "0",
                "~~~~~~~~~~~~~~~~~~~~~~~~"],
        textSizeHS : [0.05, 0.05, 0.05, 0.05, 0.1, 0.02],
        textLineHeightVS : [0.04, 0.04, 0.04, 0.04, 0.01],
        textWeight : ["", "", "", "", "", "bold"],
        
        background : false,
        textFillStyle : "#ffffff",
        shadowBlurHS : 0
    }

    label_box["result_score_idc"] = {
        canvasType : "game",
        xHS : 0.15,
        yVS : 0.6,
        widthHS : 0.1,
        heightVS : 0.1,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : screen.english ? ["Final SCORE"]:["総合スコア"],
        textSizeHS : [0.04],
        textLineHeightVS : [],
        textWeight : [""],
        
        background : false,
        textFillStyle : "#ffffff",
        shadowBlurHS : 0,
    }

    var rank = getRankByScore(getOverallScore())

    label_box["result_score_rank"] = {
        canvasType : "game",
        xHS : 0.0,
        yVS : 0.595,
        widthHS : 0.1,
        heightVS : 0.1,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "Yuji Mai",
        clickEvent : undefined,

        text : screen.english ? [rank[1]]:[rank[0]],
        textSizeHS : [0.0],
        textLineHeightVS : [],
        textWeight : ["bold"],
        
        background : false,
        textFillStyle : rank[2],
        textShadowFillStyle : rank[2]+"aa",
        textShadowBlurHS : 0.0,

    }

    var resultStartLoop = game.resultLoop
    countEffect = function(){
        if(resultStartLoop == game.resultLoop){
            screen.audio_calculate.currentTime = 0
            screen.audio_calculate.play()
        }

        if(label_box["result_score_info"] == undefined) return
        game.resultLoop--
        if(game.resultLoop > 0){
            setTimeout(countEffect, 10)
        } else {
            game.resultLoop = 0
        }
        if(game.resultLoop < resultStartLoop/2 && label_box["result_score_rank"].text[0] != ""){
            screen.audio_rank.play()
            label_box["result_score_rank"].xHS = 0.75
            label_box["result_score_rank"].textShadowBlurHS = 0.1
            label_box["result_score_rank"].textSizeHS[0] = 0.13 + Math.pow(game.resultLoop/resultStartLoop,4)*2.0
        } else {
            label_box["result_score_rank"].xHS = 1.0
            label_box["result_score_rank"].textShadowBlurHS = 0.0
            label_box["result_score_rank"].textSizeHS[0] = 0.01
        }
        label_box["result_score_info"].text[4] = Math.floor((1.0-game.resultLoop/resultStartLoop)*getOverallScore()).toString()
        draw()
    }

    setTimeout(countEffect, 500)
}

function setFinishLabel(){
    label_box["button_pause"] = undefined

    label_box["finish"] = {
        canvasType : "game",
        xHS : 0.0,
        yVS : 0.0,
        widthHS : 1.0,
        heightVS : 1.0,
        marginHS : 0.0,
        textAlign : "center",
        textBaseLine : "middle",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : screen.english ?
            ["Finish", game.netRest == 0 ? "No fishing net left":"Time over"]:
            ["ゲーム終了", game.netRest == 0 ? "網がなくなりました":"残り時間が0になりました"],
        textSizeHS : [0.07, 0.05],
        textLineHeightVS : [0.03],
        textWeight : ["", ""],

        background : true,
        backFillStyle : "#444444e0",
        backFillStyleMouseIn : "#444444e0",
        textFillStyle : "#ffffff",
        shadowBlurHS : 0
    }
}

function setPauseLabel(){

    label_box["button_pause"].clickEvent = undefined

    label_box["pause"] = {
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
        clickEvent : endPause,

        text : screen.english ? ["PAUSE", "Click or touch screen to resume"]:["ポーズ中", "画面をクリックまたはタッチすると戻ります"],
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
        xHS : 0.15,
        yVS : 0.2,
        widthHS : 0.4,
        heightVS : 0.6,
        marginHS : 0.0,
        textAlign : "left",
        textBaseLine : "top",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : [screen.english ? "🐟 Developers 🐟":"🐟 開発メンバー 🐟",
                "ゆきだま",
                "   ゲームシステム・BGM/SE選曲",
                "       コーディング",
                "やま",
                "   グラフィックス",
                "       ゲームシステム(支援)",
                "ぺるき",
                "   企画・コーディング",
                "       ゲームシステム(支援)",
                "   楽曲 : 甘茶の音楽工房",
                "   効果音 : OtoLogic,魔王魂"
        ],
        textSizeHS : [0.037,
                      0.032,
                      0.03,
                      0.025,
                      0.032,
                      0.03,
                      0.025,
                      0.032,
                      0.03,
                      0.025,
                      0.025,
                      0.025],
        textLineHeightVS : [0.04,
                            0.015,
                            0.015,
                            0.04,
                            0.015,
                            0.015,
                            0.04,
                            0.015,
                            0.015,
                            0.05,
                            0.01],
        textWeight : ["bold",
                      "",
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
        xHS : 0.55,
        yVS : 0.2,
        widthHS : 0.3,
        heightVS : 0.5,
        marginHS : 0.0,
        textAlign : "left",
        textBaseLine : "top",
        textFont : "M PLUS Rounded 1c",
        clickEvent : undefined,

        text : [screen.english ? "🐠 Contributors 🐠":"🐠 支援者の方々 🐠",
                "       雪見だいふく",
                "       ファラット",
                "       shigure",
                "                       企画(支援)",
        ],
        textSizeHS : [0.037,
                      0.032,
                      0.032,
                      0.032,
                      0.025,],
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

        text : screen.english ? ["Go back"]:["戻る"],
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