{
    const test = 
`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

    const cache = {};

    function day12_part1Func(input) {
        const lines = input.split('\n');    
        let result = 0;

        for(const line of lines){
            const record = line.split(' ')[0];
            const springMap = line.split(' ')[1].split(',').map(x => parseInt(x));
            // console.log(record, springMap);
            
            result += calculateCombinations(record, springMap);
            console.log(result);
        }

        return result;
    }

    function removeStart(str) {
        return str.startsWith(".") ? str.split(/(?<=\.)(?=[^.])/).slice(1).join("") : str;
    }
    function calculateCombinations(record, springMap){
        const line = record + " " + springMap.join(",");
        let count = 0;

        if(!!cache[line]) return cache[line];
        if(springMap.length === 0) return record.includes('#') ? 0 : 1;
        if(record.length - springMap.length + 1 - springMap.reduce((a,b) => a+b, 0) < 0) return 0;

        const firstGroupDamagedOrUnknown = record.slice(0, springMap[0]).includes('.') ? 0 : 1;
        if(record.length === springMap[0]) return firstGroupDamagedOrUnknown;

        if(record[0] != '#'){
           count += calculateCombinations(removeStart(record.slice(1)), springMap);
        }

        if(firstGroupDamagedOrUnknown > 0 && record[springMap[0]] != '#'){
            count += calculateCombinations(removeStart(record.slice(springMap[0] + 1)), springMap.slice(1));
        }
       // console.log(count, line)
        
       cache[line] = count;
        return count;
    }


    // TEST
    const resultTest = day12_part1Func(test);
    console.log(resultTest); //21
    
    // REAL INPUT
    // var fs = require("fs");
    // var text = fs.readFileSync("./input.txt", "utf-8");
    // const result = day12_part1Func(text);
    // console.log(result);

}