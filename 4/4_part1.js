{const test = 
`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

    function day4_part1Func(input) {
        const lines = input.split('\n');
        const cards = [];
        let result = 0;
       
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const cardId = i+1;
            const target = line.split(': ')[1].split(' | ')[0].trim().split(' ');
            const players = line.split(' | ')[1].trim().split(' ');

            cards.push({id: cardId, target: target.map(x => parseInt(x.trim())), players: players.map(x => parseInt(x.trim()))});
        }
        // console.log(cards);

        cards.forEach(card => {
            let wins = 0;
            card.target.forEach(target => {
                if(!isNaN(target) && card.players.includes(target)) wins++;
            })

            result += wins > 0 ? Math.pow(2,wins - 1) : 0
        })

        return result;
    }
    
    // TEST
    const resultTest = day4_part1Func(test);
    console.log(resultTest); //13
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day4_part1Func(text);
    console.log(result);
    
}