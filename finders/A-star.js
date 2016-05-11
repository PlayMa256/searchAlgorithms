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

	var abertos = new Heap(function(nodeA, nodeB){
		nodeA.f - nodeB.f;
	});

	//a heuristica total ainda é 0;
	inicial.f = 0;
	//o custo é 0
	inicial.g = 0;

	//priority queue contendo start
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
			var custoTotalEstimadoG = node.g + novizinhoG;

			if(_.includes(abertos, noVizinho) && custoTotalEstimadoG > node.g){
				abertos.splice(indexOf(noVizinho), 1);
			}else if(_.includes(fechados, noVizinho) && custoTotalEstimadoG > node.g){
				fechados.splice(indexOf(noVizinho, 1));
			}else if(!_.contains(abertos, noVizinho) && !_.contains(fechados, noVizinho)){
				noVizinho.g = novizinhoG;
				noVizinho.h = heuristica(noVizinho.x, nodeFinal.x, noVizinho.y, nodeFinal.y);
				noVizinho.f = noVizinho.g+noVizinho.h;
				noVizinho.parent = node;
				abertos.push(noVizinho);
			}
		}

	}
};