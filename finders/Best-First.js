function BestFirst(heuristica){
	if(!heuristica instanceof Heuristica)
		throw new Error('Erro ao instanciar BestFirst');
	this.heuristica = heuristica;
	this.caminho = [];
	this.custo = 0;
}
BestFirst.prototype.findPath = function(nodeInicial, nodeFinal, grid){
	var node, i, j, k, x, y, vizinhos, vizinhoG, vizinho;
	var fechados = [];
	this.custo = 0;
	var abertos = new Heap(function(nodeA, nodeB){
		nodeA.hVal - nodeB.hVal;
	});

	nodeInicial.hVal = this.heuristica.getValue(nodeInicial, nodeFinal);
	abertos.push(nodeInicial);
	while (!abertos.empty()) {
		node = abertos.pop();
        abertos.clear();
		fechados.push(node);
		this.custo++;

		if (node === nodeFinal) {
		    this.caminho = backtrace(node);
		    return this.caminho;
        }

		vizinhos = grid.getVizinhos(node);
		for (i = 0; i < vizinhos.length; i++) {
			vizinho = vizinhos[i];

			if (_.includes(fechados,vizinho))
				continue;

			vizinho.hVal = this.heuristica.getValue(vizinho, nodeFinal);
			vizinho.parent = node;

			if (vizinho.hVal < node.hVal && !_.includes(abertos, vizinho)) {
				abertos.push(vizinho);
			}
		}
	}

    this.caminho = null;
    return this.caminho;
};
