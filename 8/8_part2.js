{const test = 
    `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;
    
    function day8_part2Func(input) {
        const lines = input.split('\n');    

        const commands = lines[0].trim().split("");
        const mapsToParse = lines.slice(2);
        const mapL = new Map();
        const mapR = new Map();
        const lastsVisited = [];

        for(let mapToParse of mapsToParse) 
        {
            const map = mapToParse.trim().split(" = ");
            const key = map[0];
            const values = map[1].substring(1, map[1].length-1).split(", ");

            mapL[key] = values[0];
            mapR[key] = values[1];
            if(key[2] === "A") lastsVisited.push(key);
        }

        // console.log(commands);
        // console.log(mapL);
        // console.log(mapR);
        // console.log(lastsVisited);

        // while(!lastsVisited.every((x) => x[2] === "Z")) {
                    
        //     for(let i=0; i< lastsVisited.length; i++){

        //         const command = commands[(result%commands.length)];
        //         if(command === "L") {
        //             lastsVisited[i] = mapL[lastsVisited[i]];
        //         }else if(command === "R") {
        //             lastsVisited[i] = mapR[lastsVisited[i]];
        //         }


        //     }

        //     if(result > 1000000000) break;

        //     result++;
        // }

        const results = [];
                    
        for(let i=0; i< lastsVisited.length; i++){
            let result = 0;
            while(lastsVisited[i][2] !== "Z") {
                const command = commands[(result%commands.length)];
                if(command === "L") {
                    lastsVisited[i] = mapL[lastsVisited[i]];
                }else if(command === "R") {
                    lastsVisited[i] = mapR[lastsVisited[i]];
                }
                if(result > 100000) break;

                result++;
            }

            results[i] = result;
        }        
        console.log(results);

        return lcm(...results);
    }

    // TEST
    const resultTest = day8_part2Func(test);
    console.log(resultTest); //6
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day8_part2Func(text);
    console.log(result);
    
}

 
function lcm (...arr) {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
}