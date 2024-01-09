{
    const test = 
`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;
    
    function day11_part1Func(input) {
        const origMap = input.split('\n');    
        let result = 0;

        const rows = new Set();
        const columns = new Set();
        let rowsToEnlarge = new Set();
        let columnsToEnlarge = new Set();
        let index = 1;
        const map = [];

        for(let i = 0; i < origMap.length; i++) {
            for(let j = 0; j < origMap[i].length; j++) {
                if(origMap[i][j] === '#') {
                    rows.add(i);
                    columns.add(j);
                } 
            }
        }
      
        for(let i = 0; i < origMap.length; i++) {
            const arr = [];

            if(!rows.has(i)){
                rowsToEnlarge.add(i);
            }else{
                for(let j = 0; j < origMap[i].length; j++) {
                    if(origMap[i][j] === '#'){
                        arr.push(index++);
                     } else
                        arr.push('.');

                    if(!columns.has(j))
                        columnsToEnlarge.add(j);
                }
            }
            map.push(arr);
        }

        // console.log(map);
        const coordinates = [];
        for(let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if(map[i][j] !== '.') {
                    coordinates.push([i,j]);
                } 
            }
        }

        rowsToEnlarge = [...rowsToEnlarge];
        columnsToEnlarge = [...columnsToEnlarge];

       // console.log(coordinates);
       // console.log(rowsToEnlarge);
       // console.log(columnsToEnlarge);

        const enlarge = 1000000-1;
        
        for(let i = 0; i < coordinates.length; i++) {
            for(let j = i; j < coordinates.length; j++) {
                let amountOfEmptyX = 0;

                if(coordinates[i][0] < coordinates[j][0]){
                    amountOfEmptyX = rowsToEnlarge.filter(x => x > coordinates[i][0] && x < coordinates[j][0]).length;
                }else{
                    amountOfEmptyX = rowsToEnlarge.filter(x => x > coordinates[j][0] && x < coordinates[i][0]).length;
                }
                let amountOfEmptyY = 0;
                if(coordinates[i][1] < coordinates[j][1]){
                    amountOfEmptyY = columnsToEnlarge.filter(x => x > coordinates[i][1] && x < coordinates[j][1]).length;
                }else{
                    amountOfEmptyY = columnsToEnlarge.filter(x => x > coordinates[j][1] && x < coordinates[i][1]).length;
                }

                result += Math.abs(coordinates[i][0] - coordinates[j][0]) +
                 (enlarge * amountOfEmptyX)
                 + Math.abs(coordinates[i][1] - coordinates[j][1]) +
                 (enlarge * amountOfEmptyY);     
                 // console.log("result",result, " ", amountOfEmptyX, " ", amountOfEmptyY);
            }    
        }

        return result;
    }
    


    // TEST
    const resultTest = day11_part1Func(test);
    console.log(resultTest); //374 with 1 - 1030 with 10
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day11_part1Func(text);
    console.log(result);

}