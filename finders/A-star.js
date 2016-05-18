function AStar(heuristica) {
	if(!heuristica instanceof Heuristica)
		throw new Error('Erro ao instanciar AStar');
	this.heuristica = heuristica;
}

AStar.prototype.findPath = function(nodeInicial, nodeFinal, grid) {
	var node, vizinhos, i, j, k, noVizinho, x, vg;
	var fechados = [];
	this.custo = 0;

	// essa lista ordena os elementos de maneira com que a heuristica deles sejao menores e estejam em ordem.
	// ou seja, se eu tirar algum, ele vai me retornar o com menor heuristica.
	var abertos = new Heap(function(nodeA, nodeB) {
		nodeA.hVal - nodeB.hVal;
	});

	//a heuristica total ainda é 0;
	nodeInicial.hVal = 0;
	//o custo é 0
	nodeInicial.custo = 0;

	//priority queue contendo start
	abertos.push(nodeInicial);

	while(!abertos.empty()){
		node = abertos.pop();

		fechados.push(node);
		this.custo++;

		if(node === nodeFinal){
            this.caminho = backtrace(node);
            return this.caminho;
		}

		vizinhos = grid.getVizinhos(node);
		for(i = 0; i < vizinhos.length; i++){
			noVizinho = vizinhos[i];

			if (_.includes(fechados, noVizinho)) {
				continue;
			}

			noVizinho.custo = node.custo + 1;
			noVizinho.hVal = noVizinho.custo + this.heuristica.getValue(noVizinho, nodeFinal);
			noVizinho.parent = node;

			abertos.push(noVizinho);
		}
	}

    this.caminho = null;
    return this.caminho;
}
