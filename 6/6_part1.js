{const test = 
`Time:      7  15   30
Distance:  9  40  200`;

    function day6_part1Func(input) {
        const lines = input.split('\n');    
        let result = 1;

        const times = lines[0].split(':')[1].trim().split(' ').map(x => parseInt(x.trim())).filter(x => x > 0);
        const distances = lines[1].split(':')[1].trim().split(' ').map(x => parseInt(x.trim())).filter(x => x > 0);
   
        // console.log(times);
        // console.log(distances);

        for(let i = 0; i < times.length; i++){
            const inputAmounts = getWinningInputsAmount(times[i], distances[i]);
            result *= inputAmounts;
        }

        return result;
    }
    
    function getWinningInputsAmount(time, distance){
        let validInputStartingPoint = 0;
        for(let i=0; i<time; i++){
            if(i * (time-i) > distance){
                break;
            }

            validInputStartingPoint++;
        }

        return time - (validInputStartingPoint*2) + 1;
    }

    // TEST
    const resultTest = day6_part1Func(test);
    console.log(resultTest); //288
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day6_part1Func(text);
    console.log(result);
    
}