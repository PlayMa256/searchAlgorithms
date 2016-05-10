function Grid(altura, largura, matriz){
    this.altura = altura;
    this.largura = largura;
    this.nodes = _popularMatriz(altura, largura, matriz);
}
Grid.prototype._popularMatriz = function(largura, altura, matriz) {
	var i, j,
	nodes = new Array(altura);

	
	for(i=0;i<largura;i++){
		nodes[i] = new Array();
		for(j=0;j<altura;j++){
			nodes[i][j] = new Node(i, j, matriz[i][j]);
		}
	}

	return nodes;
};

Grid.prototype.getNodeAt = function(x, y) {
    return this.nodes[x][y];
};
Grid.prototype.isWalkableAt = function(x, y) {
    return this.isInside(x, y) && this.nodes[x][y].walkable;
};
Grid.prototype.isInside = function(x, y) {
    return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
};
Grid.prototype.setWalkableAt = function(x, y, walkable) {
    this.nodes[x][y].walkable = walkable;
};

Grid.prototype.getNeighbors = function(node, diagonalMovement) {
	var x = node.x;
	var y = node.y;
	var vizinhos = [];
	var listNodes = this.nodes;

	//posição para baixo
	if(this.isWalkableAt(x, y-1)){
		vizinhos.push(listNodes[x][y-1]);
	}
	// para a direita
	if(this.isWalkableAt(x+1, y)){
		vizinhos.push(listNodes[x+1][y]);
	}
	// para a esquerda
	if(this.isWalkableAt(x-1, y)){
		vizinhos.push(listNodes[x-1][y]);
	}
	//para cima
	if(this.isWalkableAt(x, y+1)){
		vizinhos.push(listNodes[x][y+1]);
	}

	if(diagonalMovement){
		//para cima e para a direita
		if(this.isWalkableAt(x+1, y+1)){
			vizinhos.push(listNodes[x+1][y+1]);
		}
		//para cima e para a esquerda
		if(this.isWalkableAt(x+1, y-1)){
			vizinhos.push(listNodes[x+1][y-1]);
		}
		//para baixo e para a esquerda
		if(this.isWalkableAt(x-1, y-1)){
			vizinhos.push(listNodes[x-1][y-1]);
		}
		//para baixo e para a direita
		if(this.isWalkableAt(x-1, y+1)){
			vizinhos.push(listNodes[x-1][y+1]);
		}
	}
	return vizinhos;
}