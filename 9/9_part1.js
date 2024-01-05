{
    const test = 
`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;
    
    function day9_part1Func(input) {
        const lines = input.split('\n');    
        let result = 0;

        for(let line of lines){
            const numbers = line.trim().split(" ").map((x) => parseInt(x));

            const value = getNextValue(numbers);
            result += value;
        }
      
        return result;
    }
    
    function getNextValue(numbers){
        const lastNumbers = [];

        let array = [...numbers];
        for(let i=0; i <= numbers.length; i++){
            lastNumbers.push(array[array.length-1]);
            
            for(let j=0; j < array.length - 1; j++){
                array[j] = array[j+1] - array[j];
            }
            array.pop();

            if(array.every(x => x === 0)){
                break;
            }
        }

        return lastNumbers.reduce((a,b) => a+b, 0);
    }

    // TEST
    const resultTest = day9_part1Func(test);
    console.log(resultTest); //114
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day9_part1Func(text);
    console.log(result);

}