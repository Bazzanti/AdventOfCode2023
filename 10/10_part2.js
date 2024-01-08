{
    const test = 
`FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJIF7FJ-
L---JF-JLJIIIIFJLJJ7
|F|F-JF---7IIIL7L|7|
|FFJF7L7F-JF7IIL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;
   
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

    function day10_part2Func(input) {
        const lines = input.split('\n');    
        const map = lines.map((x) => x.split(""));

        const start = getS(map);
        const currentPos = [...start];
        const previousPos = [...start];
        const path = [start];

        // console.log(map)
        console.log("S",start);

        const firstMoveFunc = getFirstMove(currentPos,map);
        firstMoveFunc(currentPos);
        path.push([...currentPos]);

        console.log("newstart", currentPos);

        while (!(equalPosition(currentPos,start))) {
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
            path.push([...currentPos]);
        }
        
        return calculateEmptySpotsInPath(path,map);
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
        if(currentPos[1]>0 && ("|","F","7").includes( map[currentPos[1]-1][currentPos[0]]))
        return move.up;
        
        if(("7","J","-").includes( map[currentPos[1]][currentPos[0]+1]))
        return move.right;

        if(("L","J","|").includes( map[currentPos[1]+1][currentPos[0]]))
        return move.down;

        return move.left;
    }

    function calculateEmptySpotsInPath(path,map){
      let result = 0;

      for(let i = 1; i < map.length-1; i++){

        for(let j = 1; j < map[0].length-1; j++){
          // color first row
          if(i === 0){
            if(path.some(x => x[1] === i && x[0] === j))
              map[i][j] = "I";
            continue;
          }

          if(path.some(x => x[1] === i && x[0] === j)){
            if(map[i][j] === "J" || map[i][j] === "|" || map[i][j] === "7"){
              if(map[i][j-1] === "I" || map[i-1][j] === "I"){
                map[i][j] = "I";
              }else{
                map[i][j] = "O";
              }

              continue;
            }

            if( map[i][j] === "F" || map[i][j] === "L" || map[i][j] === "-"){
              if(map[i][j-1] === "I" || map[i-1][j] === "I"){
                map[i][j] = "O";
              }else{
                map[i][j] = "I";
              }

              continue;
            }
          }

          if((map[i][j-1] === "I" || map[i-1][j] === "I")){
            map[i][j] = "I";

            result++;
          }else{
            map[i][j] = "O";
          }
        }
      }

      console.log(map);
        return result;
    }

    // TEST
    const resultTest = day10_part2Func(test);
    console.log(resultTest); //10
    
    // REAL INPUT
    // var fs = require("fs");
    // var text = fs.readFileSync("./input.txt", "utf-8");
    // const result = day10_part2Func(text);
    // console.log(result);

}