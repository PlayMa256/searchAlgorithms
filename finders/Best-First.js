function BestFirst(heuristica){
	if(!heuristica instanceof Heuristica)
		throw new Error('Erro ao instanciar BestFirst');
	this.heuristica = heuristica;
}
BestFirst.prototype.findPath = function(nodeInicial, nodeFinal, Grid){
	var node, i, j, k, x, y, vizinhos, vizinhoG, vizinho;
	var abertos = new Heap(function(nodeA, nodeB){
		nodeA.hVal - nodeB.hVal;
	});

	nodeInicial.hVal = 0;
	abertos.push(nodeInicial);
	while (!abertos.empty()) {
		node = abertos.pop();

		if (node === nodeFinal) {
			return 0;
		}

		vizinhos = Grid.getVizinhos(node);
		for (i = 0; i < vizinhos.length; i++) {
			vizinho = vizinhos[i];
			vizinho.hVal = this.heuristica.getValue(vizinho, nodeFinal);
			vizinho.parent = node;
			abertos.push(vizinho);
		}
	}
};