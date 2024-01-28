import numpy as np

test = """#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#

####.##.#..##.#
..#...##..#####
.##..#.......#.
.##..#.......#.
..#...##..#####
####.##.#..##.#
####...#..#....
....###.###.###
..###.#.#.##.##
.####.#.######.
.####.#.###.##.
..###.#.#.##.##
....###.###.###
####...#..#....
####.##.#..##.#"""

def day13_part1Func(input: list):
    result = 0
    lines = input.split("\n\n")

    for line in lines:
        result += checkMap(line)

    return result

def transposeMap(input):
    y = list(map(lambda x: list(x),input))
    return list(map(lambda x: "".join(x),np.transpose(y)))

def checkMap(input: list):
    result = 0
    pattern = input.split("\n")
    
    result = checkMirror(pattern) * 100
    if result <= 0:
            # rotate 90 degrees
        rotatedMap = transposeMap(pattern)
        result = checkMirror(rotatedMap)

    # print(pattern)
    # print(result)

    return result

def checkMirror(mapp: list):
    result = 0
    for i in range(len(mapp) - 1):

        if mapp[i] == mapp[i+1]:           
           for j in range(min(i+1, len(mapp) - i)): # check if valid mirror
               if mapp[i-j] != mapp[i+j+1]:
                   break
               # at the end of the loop return the index of the mirror + 1 = number of rows
               if i+j+1 == len(mapp) - 1 or i-j == 0:
                   return i+1

    return result

print(day13_part1Func(test)) # 705 - base=405

# read and test file input
file = open("input.txt", "r")
input = file.read()
print(day13_part1Func(input)) # 28463 too low
