function make2dArray(cols, rows) {
    let arr = new Array(cols);
    for(let x = 0; x < cols; x++) {
      arr[x] = new Array(rows);
    }
    return arr;
}

let grid;
let next;
let cols;
let rows;
const resolution = 10;

function setup() {
    createCanvas(600,400);
    cols = width / resolution;
    rows = height / resolution;
    grid = make2dArray(cols, rows);

    for(let x = 0; x < cols; x++) {
      for(let y = 0; y < rows; y++) {
        grid[x][y] = floor(random(2))
      }
    }
}

function draw() {
    background(0);
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            x = i * resolution
            y = j * resolution
            if(grid[i][j] == 1){
                fill(255);
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1)
            }
        }
    }
    let next = make2dArray(cols, rows);

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j)
            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }

    grid = next;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            col = (x + i + cols) % cols;
            row = (y + i + rows) % rows;
            sum += grid[col][row]
        }
    }
    sum -= grid[x][y];
    return sum;
}
