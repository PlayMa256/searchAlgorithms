function AStar(heuristica) {
	if(!heuristica instanceof Heuristica)
		throw new Error('Erro ao instanciar AStar');
	this.heuristica = heuristica;
}

AStar.prototype.findPath = function(nodeInicial, nodeFinal, grid) {
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
            return backtrace(node);
		}

		// Encontra somente vizinhos que nao sao parede/obstaculo
		vizinhos = grid.getVizinhos(node);
		for(i = 0; i < vizinhos.length; i++){
			noVizinho = vizinhos[i];

			if(_.includes(fechados, noVizinho)){
				continue;
			}

			var custoTotalEstimado = node.custo + 1;	// sempre 1 ja que esta caminhando nas 4 direcoes cardeais

			// // se nóvizinho ainda nao foi vizitado E o custo para ir até ele é menor que o custo até o node atual
			// if (_.includes(abertos, noVizinho) && custoTotalEstimado > node.custo) {
			// 	noVizinho = abertos.splice(indexOf(noVizinho), 1);
			// 	fechados.push(noVizinho);


			// }else if(_.includes(fechados, noVizinho) && custoTotalEstimado > node.custo){
			// 	fechados.splice(indexOf(noVizinho), 1);

			// // se noVizinho nao estiver em aberto e em fechado
			// }else if(!_.includes(abertos, noVizinho) && !_.includes(fechados, noVizinho)){
			// 	noVizinho.custo = custoTotalEstimado;
			// 	noVizinho.hVal = noVizinho.custo + this.heuristica.getValue(noVizinho, nodeFinal);
			// 	noVizinho.parent = node;
			// 	abertos.push(noVizinho);
			// }
			
			if(!_.includes(fechados, noVizinho) || custoTotalEstimado < node.custo){
				noVizinho.custo = custoTotalEstimado;
				noVizinho.hVal = noVizinho.custo + this.heuristica.getValue(noVizinho, nodeFinal);
				noVizinho.parent = node;
				abertos.push(noVizinho);
			}
		}

	}
}
