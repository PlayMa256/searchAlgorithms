function Node(x, y, transitavel) {
	this.x = x;
	this.y = y;
	this.transitavel = (transitavel != true && transitavel != false ? true : transitavel);
}