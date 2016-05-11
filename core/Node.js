function Node(x, y, transitavel) {
	this.x = x;
	this.y = y;
	this.transitavel = (transitavel != true && transitavel != false ? true : transitavel);
}

Node.buildNodeFrom = function(node) {
	if (node instanceof Node) {
		return node;
	} else if (node.x !== undefined && node.y !== undefined) {
		return new Node(node.x, node.y, node.transitavel);
	} else {
		throw new Error('Erro de conversao de node');
	}
}