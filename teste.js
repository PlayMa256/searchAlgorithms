// arquivo feito para realizar os testes

var exp1 = [
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0]
],
	exp2 = [
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0]
],
	exp3 = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0]
],
	exp4 = [
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0]
],
	exp5 = [
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0]
];

window.onload = function() {
	document.getElementById('btnAndar').addEventListener('click', function(){
		var heuristica, algoritmo;
		var valHeu = document.getElementById('selHeu').value;
		var valAlg = document.getElementById('selAlg').value;
		switch (valHeu) {
			case 'ma':
				heuristica = new Manhattan();
				break;
			case 'de':
				heuristica = new DistanciaEuclidiana();
				break;
		}
		switch (valAlg) {
			case 'as':
				algoritmo = new AStar(heuristica);
				break;
			case 'bf':
				algoritmo = new BestFirst(heuristica);
				break;
			case 'bfb':
				algoritmo = new BestFirstWithBacktrack(heuristica);
				break;
		}
		fazerExperimento(exp3, {x: '0', y: '0'}, {'x' : 4, 'y' : 2}, algoritmo);
	});
};

function fazerExperimento(matriz, pBegin, pEnd, algoritmo) {
	var grid = new Grid(matriz);
	if(grid.isTransitavel(pBegin.x, pBegin.y) && grid.isTransitavel(pEnd.x, pEnd.y)) {
		algoritmo.findPath(grid.getNode(pBegin.x, pBegin.y), grid.getNode(pEnd.x, pEnd.y), grid);
		pintarGrid(grid, algoritmo.caminho);
		putInfo(algoritmo);
	} else {
		throw new Error('Erro ao tentar criar experimento. Ponto passou dos limites.')
	}
}