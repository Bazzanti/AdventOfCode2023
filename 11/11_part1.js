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
        const map = [];
        let index = 1;
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
                for(let j = 0; j < origMap[i].length; j++) {
                    arr.push('.');
                }
                map.push(arr);
            }else{
                for(let j = 0; j < origMap[i].length; j++) {
                    if(origMap[i][j] === '#'){
                        arr.push(index++);
                     } else
                        arr.push('.');

                    if(!columns.has(j))
                        arr.push('.');
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
        // console.log(coordinates);

        for(let i = 0; i < coordinates.length; i++) {
            for(let j = i; j < coordinates.length; j++) {
                result += Math.abs(coordinates[i][0] - coordinates[j][0]) + Math.abs(coordinates[i][1] - coordinates[j][1]); 
                
            }
            
        }

        return result;
    }
    


    // TEST
    const resultTest = day11_part1Func(test);
    console.log(resultTest); //374
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day11_part1Func(text);
    console.log(result);

}