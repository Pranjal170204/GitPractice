class Node {
    constructor(x, y, g = 0, h = 0, parent = null) {
        this.x = x;
        this.y = y;
        this.g = g; // Cost from start node
        this.h = h; // Heuristic (estimated cost to goal)
        this.f = g + h; // Total cost
        this.parent = parent;
    }
}

function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhattan distance
}

function aStar(grid, start, end) {
    const openSet = [];
    const closedSet = new Set();
    openSet.push(new Node(start.x, start.y, 0, heuristic(start, end)));

    while (openSet.length > 0) {
        openSet.sort((a, b) => a.f - b.f); // Sort nodes by lowest f value
        let current = openSet.shift();

        if (current.x === end.x && current.y === end.y) {
            let path = [];
            while (current) {
                path.push([current.x, current.y]);
                current = current.parent;
            }
            return path.reverse();
        }

        closedSet.add(`${current.x},${current.y}`);

        const neighbors = [
            { x: current.x - 1, y: current.y },
            { x: current.x + 1, y: current.y },
            { x: current.x, y: current.y - 1 },
            { x: current.x, y: current.y + 1 }
        ];

        for (let neighbor of neighbors) {
            if (
                neighbor.x < 0 || neighbor.y < 0 ||
                neighbor.x >= grid.length || neighbor.y >= grid[0].length ||
                grid[neighbor.x][neighbor.y] === 1 ||
                closedSet.has(`${neighbor.x},${neighbor.y}`)
            ) {
                continue;
            }

            let g = current.g + 1;
            let h = heuristic(neighbor, end);
            let node = new Node(neighbor.x, neighbor.y, g, h, current);

            if (!openSet.some(n => n.x === node.x && n.y === node.y && n.f <= node.f)) {
                openSet.push(node);
            }
        }
    }
    return []; // No path found
}

// Example usage
const grid = [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
];

const start = { x: 0, y: 0 };
const end = { x: 4, y: 4 };
console.log(aStar(grid, start, end));
