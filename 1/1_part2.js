{
const test = 
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const digitsMap = new Map([
    ["one",1],
    ["two",2],
    ["three",3],
    ["four",4],
    ["five",5],
    ["six",6],
    ["seven",7],
    ["eight",8],
    ["nine",9],
  ]);
  

function code(input) {
    const lines = input.split('\n');
    let result = 0;
    lines.forEach(line => {
        let numberToParse = "";
        let numberFromText = "";

        for(let i = 0; i < line.length; i++) {
            if (line[i] >= '0' && line[i] <= '9') {
                numberToParse += line[i];
                break;
            }

            numberFromText += line[i];

            digitsMap.forEach((value, key) => {
                if(numberFromText.includes(key)){
                    numberToParse += value;
                }
            });

            if(numberToParse.length > 0) break;
        }

        numberFromText= "";
        for(let i = line.length-1; i >= 0; i--) {
            if (line[i] >= '0' && line[i] <= '9') {

                numberToParse += line[i];
                break;
            }

            numberFromText = line[i] + numberFromText;

            digitsMap.forEach((value, key) => {
                if(numberFromText.includes(key)){
                    numberToParse += value;
                }
            });

            if(numberToParse.length > 1) break;
        }

        console.log(numberToParse);
        result += parseInt(numberToParse);
    });

    return result;
}

// TEST
const resultTest = code(test);
console.log(resultTest); //281

// REAL INPUT
var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");
const result = code(text);
console.log(result);

}