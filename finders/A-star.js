function AStar(heuristica) {
	if(!heuristica instanceof Heuristica)
		throw new Error('Erro ao instanciar AStar');
	this.heuristica = heuristica;
}

AStar.prototype.findPath = function(nodeInicial, nodeFinal, Grid) {
	var fechados = [];

	var inicial = nodeInicial;
	var final = nodeFinal;
	var node, vizinhos, i, j, k, noVizinho, x, vg;

	// essa lista ordena os elementos de maneira com que a heuristica deles sejao menores e estejam em ordem.
	// ou seja, se eu tirar algum, ele vai me retornar o com menor heuristica.

	var abertos = new Heap(function(nodeA, nodeB) {
		nodeA.hVal - nodeB.hVal;
	});

	//a heuristica total ainda é 0;
	inicial.hVal = 0;
	//o custo é 0
	inicial.custo = 0;

	//priority queue contendo start
	abertos.push(inicial);


	while(!abertos.empty()){
		node = abertos.pop();
		fechados.push(node);

		if(node === nodeFinal){
			// TODO ver o que ainda retornar
			return 0;
		}

		// Encontra somente vizinhos que nao sao parede/obstaculo
		vizinhos = Grid.getVizinhos(node);
		for(i = 0; i < vizinhos.length; i++){
			noVizinho = vizinhos[i];

			if(_.includes(fechados, noVizinho)){
				continue;
			}
			var novizinhoG = 1;
			var custoTotalEstimadoG = node.custo + 1;	// sempre 1 ja que esta caminhando nas 4 direcoes cardeais

			// remover noVizinho de abertos se custo ate noVizinho > custo ate node atual?
			if (_.includes(abertos, noVizinho) && custoTotalEstimadoG > node.custo) {
				abertos.splice(indexOf(noVizinho), 1);

			// remover noVizinho de fechados se custo ate noVizinho > custo ate node atual?
			}else if(_.includes(fechados, noVizinho) && custoTotalEstimadoG > node.custo){
				fechados.splice(indexOf(noVizinho, 1));

			// se noVizinho nao estiver em aberto e em fechado
			}else if(!_.contains(abertos, noVizinho) && !_.contains(fechados, noVizinho)){
				noVizinho.custo = novizinhoG;	// ahn? custo de noVizinho eh 1?
				noVizinho.hVal = noVizinho.custo + this.heuristica.getValue(noVizinho, nodeFinal);
				noVizinho.parent = node;
				abertos.push(noVizinho);
			}
		}

	}
};