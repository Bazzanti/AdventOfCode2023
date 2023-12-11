{const test = 
`Time:      7  15   30
Distance:  9  40  200`;

    function day6_part2Func(input) {
        const lines = input.split('\n');    
        let result = 1;

        const time = + lines[0].split(':')[1].trim().split(' ').map(x => parseInt(x.trim())).filter(x => x > 0).join("");
        const distance = lines[1].split(':')[1].trim().split(' ').map(x => parseInt(x.trim())).filter(x => x > 0).join("");
   
        // console.log(time);
        // console.log(distance);

        const inputAmounts = getWinningInputsAmount(+time, +distance);
        result *= inputAmounts;
        

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
    const resultTest = day6_part2Func(test);
    console.log(resultTest); //71503
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day6_part2Func(text);
    console.log(result);
    
}