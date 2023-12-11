{const test = 
`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

    function day5_part2Func(input) {
        const lines = input.split('\n\n');    
        let result = 1000000000000000;

        const seeds = lines[0].split(': ')[1].split(' ').map(x => parseInt(x.trim()));

        const maps = lines.slice(1).map(x => x.split("\n").slice(1).map(y => y.split(" ").map(z => parseInt(z))));

        // const hashmap = new Map();
        // TODO add hashmap to memoize results; 1 Map is too small, it needs a set of maps
        for(let i = 0; i < seeds.length; i=i+2){
            for(let j=0; j < seeds[i+1]; j++){
                let current = seeds[i]+j;
                for(let map of maps){
                    for( let minimap of map) {
                        if(current >= minimap[1] && current < minimap[1] + minimap[2] ){
                            current = current + minimap[0] - minimap[1];
                            break;
                        }
                    }
                }
                result = result < current ? result : current;
            }
        }


        return result;
    }
    
    // TEST
    const resultTest = day5_part2Func(test);
    console.log(resultTest); //46
    
    // REAL INPUT
    var fs = require("fs");
    var text = fs.readFileSync("./input.txt", "utf-8");
    const result = day5_part2Func(text);
    console.log(result);
    
}