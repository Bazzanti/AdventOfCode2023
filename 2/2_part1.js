{
    const test = 
    `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
    
    const testBag = {red: 12, green: 13, blue: 14};

    function day2_part1Func(input) {
        const lines = input.split('\n');
        let result = 0;
        const game = [];
        for(let line of lines){ // line = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
            const newGame = {};
            const gameNumber = line.split(':')[0].trim().split(' ')[1];
            newGame.gameNumber = +gameNumber; // id game

            const gameSetsData = line.split(':')[1].trim().split(';');
            for(let set of gameSetsData){ // set = '3 blue, 4 red'
                const colorsSet = set.trim().split(',');

                for(let colorNumber of colorsSet){
                    const colorNumberSplit = colorNumber.trim().split(' ');
                    const color = colorNumberSplit[1].trim();
                    const number = colorNumberSplit[0].trim();

                    if(!newGame[color] | newGame[color] < +number)newGame[color] = +number;
                }
                
            }

            game.push(newGame);
        }
        // console.log(game);

        game.forEach(gameData => {
            if(testBag.red >= gameData?.red && testBag.green >= gameData?.green && testBag.blue >= gameData?.blue){
                result += gameData.gameNumber;
            }
        });

        return result;
    }
    
    // TEST
    const resultTest = day2_part1Func(test);
    console.log(resultTest); //8
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day2_part1Func(text);
    console.log(result);
    
}