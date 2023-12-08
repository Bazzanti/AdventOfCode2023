{
const test = 
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

function part1Func(input) {
    const lines = input.split('\n');
    let result = 0;
    lines.forEach(line => {
        let numberFromText = "";
        for(let i = 0; i < line.length; i++) {
            if (line[i] >= '0' && line[i] <= '9') {
                numberFromText += line[i];
                break;
            }
        }

        for(let i = line.length-1; i >= 0; i--) {
            if (line[i] >= '0' && line[i] <= '9') {

                numberFromText += line[i];
                break;
            }
        }
        console.log(numberFromText)
        result += parseInt(numberFromText);
    });

    return result;
}

// TEST
const resultTest = part1Func(test);
console.log(resultTest); //142

// REAL INPUT
var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");
const result = part1Func(text);
console.log(result);

}