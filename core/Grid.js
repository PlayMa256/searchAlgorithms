function Grid(altura, largura, matriz){
    this.altura = altura;
    this.largura = largura;
    this.nodes = _popularMatriz(altura, largura, matriz);
}
Grid.prototype._popularMatriz = function(largura, altura, matrix) {
	var i, j,
	nodes = new Array(altura);

	for (i = 0; i < altura; ++i) {
		nodes[i] = new Array(largura);
		for (j = 0; j < largura; ++j) {
			nodes[i][j] = new Node(j, i);
		}
	}

	if (matrix === undefined) {
		return nodes;
	}

	if (matrix.length !== altura || matrix[0].length !== largura) {
		throw new Error('Matrix size does not fit');
	}

	for (i = 0; i < altura; ++i) {
		for (j = 0; j < largura; ++j) {
			if (matrix[i][j]) {
				nodes[i][j].walkable = false;
			}
		}
	}

	return nodes;
};

