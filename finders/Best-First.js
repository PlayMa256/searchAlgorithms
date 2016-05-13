function BestFirst(heuristica){
	if(!heuristica instanceof Heuristica)
		throw new Error('Erro ao instanciar BestFirst');
	this.heuristica = heuristica;
}
BestFirst.prototype.findPath = function(nodeInicial, nodeFinal, Grid){
	var node, i, j, k, x, y, vizinhos, vizinhoG, vizinho;
	var abertos = new Heap(function(nodeA, nodeB){
		nodeA.f - nodeB.f;
	});

	nodeInicial.f = 0;
	abertos.push(nodeInicial);
	while(!abertos.empty()){
		node = abertos.pop();

		if(node === nodeFinal){
			return 0;
		}

		vizinhos = Grid.getNeighbors(node, true);
		for(i=0;i<vizinhos.length;i++){
			vizinho = vizinhos[i];
			x = vizinho.x;
			y = vizinho.y;
			vizinhos.f = this.heuristica(x, nodeFinal.x, y, nodeFinal.y);
			vizinhos.parent = node;
			abertos.push(vizinhos);
		}


	}

};