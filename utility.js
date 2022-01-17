var rankList = [
    ["　", " ", "#eeeeee", 3000],
    ["銅", "C", "#ddaa22", 4000],
    ["銀", "B", "#ccccdd", 5000],
    ["金", "A", "#ffdd55", 6000],
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