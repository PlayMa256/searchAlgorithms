function AStar(options){
	this.heuristica = options.heuristica;
}

AStar.prototype.findPath = function(nodeInicial, nodeFinal, Grid) {
	var fechados = [];

	var inicial = nodeInicial;
	var final = nodeFinal;
	var node, vizinhos, i, j, k, noVizinho, x, vg;

	// essa lista ordena os elementos de maneira com que a heuristica deles sejao menores e estejam em ordem.
	// ou seja, se eu tirar algum, ele vai me retornar o com menor heuristica.

	var abertos = new (function(nodeA, nodeB){
		nodeA.f - nodeB.f;
	});

	//a heuristica total ainda é 0;
	inicial.f = 0;
	//o custo é 0
	inicial.g = 0;

	abertos.push(inicial);

	while(!abertos.empty()){
		node = abertos.pop();
		fechados.push(node);

		if(node === nodeFinal){
			//ver o que ainda retornar
			return 0;
		}

		vizinhos = Grid.getNeighbors(node, true); 
		for(i=0;i<vizinhos.length;i++){
			noVizinho = vizinhos[i];

			//se achar uma parede
			if(noVizinho === 0){
				continue;
			}

			//senao
			var diferencaX = Math.pow(node.x - noVizinho.x, 2);
			var diferencaY = Math.pow(node.y - noVizinho.x, 2);
			var novizinhoG = Math.sqrt(diferencaX+diferencaY);
			
			if(!_.includes(fechados, noVizinho)){

			}

		}

	}
};