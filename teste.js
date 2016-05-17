// arquivo feito para realizar os testes

var matriz = [
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0],
];

var grid = new Grid(matriz);
var heuristica = new Manhattan();
var algoritmo = new BestFirst(heuristica);
console.log(algoritmo.findPath(grid.getNode(0,0), grid.getNode(4,2), grid));