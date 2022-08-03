let ROWS = 15
let COLS = 15

let HEI = 1500
let WID = 1500

let SIZE = HEI / ROWS
let MARGIN = SIZE / 10
let CLEAN = 0

let SCORE = 0
let SPEED = get_speed()

let board = new Array(ROWS)
for (let y=0; y<ROWS; y++) {
    board[y] = new Array(COLS)
    for (let x=0; x<COLS; x++)
        board[y][x] = 'E'
}

board[1][3] = 'S'
board[1][4] = 'S'
board[1][5] = 'S'
board[2][5] = 'S'


let snake = [
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 5]
];

let dir = [1, 0]
let n_dir = [1, 0]


function randInt(max) {
    return Math.floor(Math.random() * max);
}
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}
function arrayCopy(arr) {
    cop = []
    for (i = 0; i < arr.length; i++)
        cop[i] = arr[i];
    return cop
}


function get_speed() {
    return 10_000 / (SCORE + 18) + 60
}

function move_snake() {
    console.log(snake[0])

    let gameover = false

    dir = arrayCopy(n_dir)
    let head = snake[0]
    let next = [head[0] + dir[0], head[1] + dir[1]]

    let outside = next[0] < 0 || next[0] >= ROWS || next[1] < 0 || next[1] >= COLS

    // Hit the snake but not the tail itself
    // Game Over!
    if (outside || board[next[0]][next[1]] == 'S' && !arraysEqual(snake[snake.length - 1], next)) {
        gameover = true
        alert("Game Over!")
    }
    else {
        // Found food
        if (board[next[0]][next[1]] == 'F') {
            remove_block(next[0], next[1])
            place_food()
            SCORE += 1
            SPEED = get_speed()
        }
        else {
            // Move tail
            let last = snake.pop()
            board[last[0]][last[1]] = 'E'
            remove_block(last[0], last[1])
        }    
        // Place head
        snake.unshift(next)
        board[snake[0][0]][snake[0][1]] = 'S'
        place_head(next[0], next[1], dir)

        // paint_snake()
        setTimeout(move_snake, SPEED)
    }

}


// NO LONGER USED
function paint_snake() {    
    let ctx = document.getElementById("canv").getContext("2d")
    for (let y=0; y<ROWS; y++) {
        for (let x=0; x<COLS; x++) {
            let color = ''
            let big = true

            switch(board[y][x]) {
                // Empty box
                case 'E':
                    color = 'white'
                    break
                // Part of snake
                case 'S':
                    color = 'black'
                    big = false
                    break
                // Food
                case 'F':
                    color = 'red'
                    break
                default:
                    color = 'green'
            }
            ctx.fillStyle = color
            if (big)
                ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE) 
            else       
                ctx.fillRect(x * SIZE + MARGIN, y * SIZE + MARGIN, SIZE - 2*MARGIN, SIZE - 2*MARGIN)            
        }
    }

}

function place_food() {
    let ctx = document.getElementById("canv").getContext("2d")

    let okay = false
    let x = -1
    let y = -1
    while (!okay) {
        x = randInt(COLS)
        y = randInt(ROWS)
        if (board[y][x] == 'E') {
            board[y][x] = 'F'
            okay = true
        }
    }
    ctx.fillStyle = 'red'
    ctx.fillRect(x * SIZE + MARGIN, y * SIZE + MARGIN, SIZE - 2*MARGIN, SIZE - 2*MARGIN) 
}

function remove_block(y, x) {
    let ctx = document.getElementById("canv").getContext("2d")

    ctx.fillStyle = 'white'
    // let y_size = SIZE + 2*MARGIN
    // let x_size = SIZE + 2*MARGIN
    // let y_place = y * SIZE - MARGIN
    // let x_place = x * SIZE - MARGIN
    let y_size = SIZE
    let x_size = SIZE
    let y_place = y * SIZE
    let x_place = x * SIZE
    
    ctx.fillRect(x_place, y_place, x_size, y_size) 
}

function place_head(y, x, dir) {
    let ctx = document.getElementById("canv").getContext("2d")

    let y_size = SIZE - 2.1*MARGIN
    let x_size = SIZE - 2.1*MARGIN
    let y_place = y * SIZE + MARGIN
    let x_place = x * SIZE + MARGIN

    if (dir[0] != 0)
        y_size += 2*MARGIN
    else
        x_size += 2*MARGIN
    
    if(dir[0] == 1)
        y_place -= 2*MARGIN
    if(dir[1] == 1)
        x_place -= 2*MARGIN
    
    ctx.fillStyle = 'gray'
    ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE) 
    ctx.fillStyle = 'black'
    ctx.fillRect(x_place, y_place, x_size, y_size) 
}

function main() {
    // let canvas = document.getElementById("canv")
    // let ctx = canvas.getContext("2d")


    document.addEventListener("keydown", (event) => {
        switch(event.code) {
            case "ArrowRight":
                if (!arraysEqual(dir, [0, -1]))
                    n_dir = [0, 1]
                break
            case "ArrowDown":
                if (!arraysEqual(dir, [-1, 0]))
                    n_dir = [1, 0]
                break
            case "ArrowLeft":
                if (!arraysEqual(dir, [0, 1]))
                    n_dir = [0, -1]
                break
            case "ArrowUp":
                if (!arraysEqual(dir, [1, 0]))
                    n_dir = [-1, 0]
        }
    })

    place_food()
    // paint_snake()
    move_snake()
}