var rankList = [
    ["　", " ", "#eeeeee", 6000],
    ["銅", "C", "#ddaa22", 9000],
    ["銀", "B", "#ccccdd", 1000],
    ["金", "A", "#ffdd55", 12000],
    ["虹", "S", "#ffffff", 0],
]

function getRankByScore(score){
    for(var i = 0; i<rankList.length-1; i++){
        if(score < rankList[i][3]){
            return rankList[i]
        }
    }
    return rankList[rankList.length-1]
}