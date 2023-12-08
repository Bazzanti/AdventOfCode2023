{

const test = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
    
    const specialCharAvailable = ['*', '#', '$', '+', '@', '&', '!', '%', '^', 
    '?', '~', '`', '(', ')', '[', ']', '{', '}', '<', '>', '|', 
    '/', '\\', '-', '_', '=', '+', ':', ';', '"', "'", ','];

    function day3_part1Func(input) {
        const lines = input.split('\n');
        let result = 0;
        const numbers = [];
        const specialChars = [];
        for(let i=0; i<lines.length; i++){
            let numberToRegister = "";
            for(let j=0; j<lines[i].length; j++){
                if(lines[i][j].match(/\d/)) numberToRegister += lines[i][j];
                else if(numberToRegister !== "") {
                    numbers.push({x:j-numberToRegister.length, y:i, number:numberToRegister});
                    numberToRegister = "";
                }
                
                if(specialCharAvailable.includes(lines[i][j]))specialChars.push({x:j,y:i});
            }
            if(numberToRegister !== "") {
                numbers.push({x:lines[i].length-1-numberToRegister.length, y:i, number:numberToRegister});
            }
        }
        // console.log(numbers);
        // console.log(specialChars);

        numbers.forEach(number => {
            if(specialChars?.filter(specialChar => specialChar.x >= number.x-1 && specialChar.x <= number.x + number.number.length)
            ?.filter(specialChar => specialChar.y >= number.y-1 && specialChar.y <= number.y + 1)
            ?.length > 0){
                result += +number.number;
            }   
        });

        return result;
    }
    
    // TEST
    const resultTest = day3_part1Func(test);
    console.log(resultTest); //4361
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day3_part1Func(text);
    console.log(result);
    
}