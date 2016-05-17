// arquivo feito para realizar os testes

var matriz = [
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0],
];

var grid = new Grid(matriz);

var heuristica,
	algoritmo;



window.onload = function() {
	document.getElementById('btnAndar').addEventListener('click', function(){

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
		}
		algoritmo.findPath(grid.getNode(0,0), grid.getNode(4,2), grid);
		pintarGrid(grid, algoritmo.caminho);
		putInfo(algoritmo);
	});
};