{
    const test = 
`..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;
    
   
    const move = {
        up: function (position) {
            position[1]--;
        },
        right: function (position) {
            position[0]++;
        },
        down: function (position) {
            position[1]++;
        },
        left: function (position) {
            position[0]--;
        },
    };

    function day10_part1Func(input) {
        const lines = input.split('\n');    
        const map = lines.map((x) => x.split(""));
        let result = 0;

        const start = getS(map);
        const currentPos = [...start];
        const previousPos = [...start];

        // console.log(map)
        console.log("S",start);

        const firstMoveFunc = getFirstMove(currentPos,map);
        firstMoveFunc(currentPos);
        result++;

        console.log("newstart", currentPos);

        while (!(equalPosition(currentPos,start)) || result > 100000) {
            switch (map[currentPos[1]][currentPos[0]]) {
              case "|":
                if (equalPosition(testMove(previousPos, move.down) ,currentPos)) {
                  move.down(previousPos);
                  move.down(currentPos);
                } else {
                  move.up(previousPos);
                  move.up(currentPos);
                }
                break;
              case "-":
                if (equalPosition(testMove(previousPos, move.right) ,currentPos)) {
                  move.right(previousPos);
                  move.right(currentPos);
                } else {
                  move.left(previousPos);
                  move.left(currentPos);
                }
                break;
              case "L":
                if (equalPosition(testMove(previousPos, move.down) ,currentPos)) {
                  move.down(previousPos);
                  move.right(currentPos);
                } else {
                  move.left(previousPos);
                  move.up(currentPos);
                }
                break;
              case "J":
                if (equalPosition(testMove(previousPos, move.down),currentPos)) {
                  move.down(previousPos);
                  move.left(currentPos);
                } else {
                  move.right(previousPos);
                  move.up(currentPos);
                }
                break;
              case "7":
                if (equalPosition(testMove(previousPos, move.right),currentPos)) {
                  move.right(previousPos);
                  move.down(currentPos);
                } else {
                  move.up(previousPos);
                  move.left(currentPos);
                }
                break;
              case "F":
                if (equalPosition(testMove(previousPos, move.left),currentPos)) {
                  move.left(previousPos);
                  move.down(currentPos);
                } else {
                  move.up(previousPos);
                  move.right(currentPos);
                }
                break;
            }
            result++;
        }
      
        console.log("totalSteps",result)
        return result/2;
    }

    function equalPosition(pos1, pos2) {

        return pos1[0] === pos2[0] && pos1[1] === pos2[1];
    }

    function getS(map){
        for(let y = 0; y < map.length; y++){
            for(let x = 0; x < map[y].length; x++){
                if(map[y][x] === "S"){
                    return [x, y];
                }
            }
        }

    }

    function testMove(pos, moveFunct){
        const newPos = [...pos];
        moveFunct(newPos);
        return newPos;
    }

    function getFirstMove(currentPos, map){
        if(("|","F","7").includes( map[currentPos[1]-1][currentPos[0]]))
        return move.up;
        
        if(("7","J","-").includes( map[currentPos[1]][currentPos[0]+1]))
        return move.right;

        if(("L","J","|").includes( map[currentPos[1]+1][currentPos[0]]))
        return move.down;

        return move.left;
    }

    // TEST
    const resultTest = day10_part1Func(test);
    console.log(resultTest); //8
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day10_part1Func(text);
    console.log(result);

}