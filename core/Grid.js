function Grid(matriz) {
	this.matriz = matriz;
	this.altura = matriz.length;
	this.largura = matriz[0].length;
	this.nodes = this._popularMatriz(this.largura, this.altura, matriz);
}

Grid.prototype._popularMatriz = function(largura, altura, matriz) {
	var i, j;
	nodes = new Array(altura);

	for (i = 0; i < altura; i++) {
		nodes[i] = new Array(largura);
		for (j = 0; j < largura; j++){
			var valor = (matriz[i][j]==0) ? false : true;
			nodes[i][j] = new Node(i, j, valor);
		}
	}


	return nodes;
};

Grid.prototype.getNode = function(x, y) {
	return this.nodes[x][y];
};
Grid.prototype.isTransitavel = function(x, y) {
	return this.isDentro(x, y) && this.nodes[x][y].transitavel;
};
Grid.prototype.isDentro = function(x, y) {
	return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
};
Grid.prototype.setTransitavel = function(x, y, transitavel) {
	this.nodes[x][y].transitavel = transitavel;
};

Grid.prototype.getVizinhos = function(node) {
	var x = node.x;
	var y = node.y;
	var vizinhos = [];
	var listNodes = this.nodes;

	// para baixo
	if (this.isTransitavel(x, y-1)) {
		vizinhos.push(listNodes[x][y-1]);
	}
	// para a direita
	if (this.isTransitavel(x+1, y)) {
		vizinhos.push(listNodes[x+1][y]);
	}
	// para a esquerda
	if (this.isTransitavel(x-1, y)) {
		vizinhos.push(listNodes[x-1][y]);
	}
	//para cima
	if (this.isTransitavel(x, y+1)) {
		vizinhos.push(listNodes[x][y+1]);
	}
	return vizinhos;
}