{const test = 
    `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;
    
    function day8_part1Func(input) {
        const lines = input.split('\n');    
        let result = 0;

        const commands = lines[0].trim().split("");
        const mapsToParse = lines.slice(2);
        const mapL = new Map();
        const mapR = new Map();
        for(let mapToParse of mapsToParse) 
        {
            const map = mapToParse.trim().split(" = ");
            const key = map[0];
            const values = map[1].substring(1, map[1].length-1).split(", ");

            mapL[key] = values[0];
            mapR[key] = values[1];
        }

        // console.log(commands);
        //console.log(mapL);
        //console.log(mapR);

        let lastvisited = "AAA";
        while(lastvisited != "ZZZ") {
            const command = commands[(result%commands.length)];
            if(command === "L") {
                lastvisited = mapL[lastvisited];
            }else if(command === "R") {
                lastvisited = mapR[lastvisited];
            }

            result++;
        }

        return result;
    }
    

    // TEST
    const resultTest = day8_part1Func(test);
    console.log(resultTest); //6
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day8_part1Func(text);
    console.log(result);
    
}