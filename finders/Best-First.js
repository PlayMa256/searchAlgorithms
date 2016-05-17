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

	nodeInicial.hVal = 0;
	abertos.push(nodeInicial);
	while (!abertos.empty()) {
		node = abertos.pop();
		fechados.push(node);
		this.custo++;

		if (node === nodeFinal) {
		    this.caminho = backtrace(node);
		    return this.caminho;
        }

		vizinhos = grid.getVizinhos(node);
		for (i = 0; i < vizinhos.length; i++) {
			vizinho = vizinhos[i];
			if(fechados.indexOf(vizinho) >= 0)
				continue;
			vizinho.hVal = this.heuristica.getValue(vizinho, nodeFinal);
			vizinho.parent = node;
			abertos.push(vizinho);
		}
	}
};
