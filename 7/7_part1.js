{const test = 
`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const cardsOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4','3','2'];

    function day7_part1Func(input) {
        const lines = input.split('\n');    
        let result = 0;

        const handsbets = lines.map(x => {return {
            hands:x.split(' ')[0].split('').map(x => {
                if(x === 'T') return 10;
                if(x === 'J') return 11;
                if(x === 'Q') return 12;
                if(x === 'K') return 13;
                if(x === 'A') return 14;
                return +x;
            }), 
            bets: x.split(' ')[1],
            type: 0}
        });
        //console.log(handsbets);

        for(let i = 0; i < handsbets.length; i++){
            handsbets[i].type = evaluateCards(handsbets[i].hands);
        }

        let currentRank = handsbets.length;
        for(let i = 0; i < 7; i++){
            const filterHands = handsbets.filter(x => x.type === i+1);

            filterHands.sort((a,b) => { 
                for(let j = 0; j < 5; j++){
                    if(a.hands[j] === b.hands[j]) continue;
                    return b.hands[j] - a.hands[j];
                }
            });
            // console.log(filterHands);

            result += filterHands.reduce((prev,curr, index) =>  +curr.bets * (currentRank - index) + prev,0);
            currentRank -= filterHands.length;
        }


        return result;
    }
    
    function evaluateCards(cards){

        const counts = cards.reduce(count, {})
        const duplicates = Object.values(counts).reduce(count, {})

        return (duplicates[5] && 1) ||
        (duplicates[4] && 2) ||
        (duplicates[3] && duplicates[2] && 3) ||
        (duplicates[3] && 4) ||
        (duplicates[2] > 1 && 5) ||
        (duplicates[2] && 6) ||
        7;
    }


    function count(c, a) {
        c[a] = (c[a] || 0) + 1
        return c
    }

    // TEST
    const resultTest = day7_part1Func(test);
    console.log(resultTest); //6440
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day7_part1Func(text);
    console.log(result);
    
}