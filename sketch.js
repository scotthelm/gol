function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for(let x = 0; x < cols; x++) {
      arr[x] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let generation = 0;
const resolution = 20;

function setup() {
    width = Math.ceil(document.defaultView.visualViewport.width / resolution) * resolution;
    height = Math.ceil(document.defaultView.visualViewport.height / resolution) * resolution;
    createCanvas(width, height);
    frameRate(20);
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        grid[i][j] = floor(random(2))
      }
    }
}

function draw() {
    background(0);

    generation+= 1

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if(grid[i][j] == 1){
                fill(255);
                stroke(0);
                rect(x, y, resolution, resolution)
            }
        }
    }

    let next = make2DArray(cols, rows);

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
    drawGeneration(generation);
    grid = next;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            col = (x + i + cols) % cols;
            row = (y + j + rows) % rows;
            sum += grid[col][row]
        }
    }
    sum -= grid[x][y];
    return sum;
}

function drawGeneration(gen) {
    fill(117, 255, 255);
    textSize(20);
    text(gen, 25, 25);
}
