// heuristica abstrata
var Heuristica = function() {
	throw new Error('Erro de metodo abstrato');
};
Heuristica.prototype.getValue(begin, end) {
	throw new Error('Erro de metodo abstrato');
};


// heuristica manhattan
var Manhattan = function() {
	Manhattan.apply(this, arguments);
	this.name = "Manhattan";
}
Manhattan.prototype = Object.create(Heuristica.prototype);
Manhattan.prototype.constructor = Manhattan;

Manhattan.prototype.getValue(begin, end) {
	begin = Node.buildNodeFrom(begin);
	end = Node.buildNodeFrom(end);

	var dx = Math.abs (begin.x - end.x);
	var dy = Math.abs (begin.y - end.y);

	return dx + dy;
}

// heuristica euclidiana
var DistanciaEuclidiana = function() {
	DistanciaEuclidiana.apply(this, arguments);
	this.name = "Distancia Euclidiana";
}
DistanciaEuclidiana.prototype = Object.create(Heuristica.prototype);
DistanciaEuclidiana.prototype.constructor = DistanciaEuclidiana;

DistanciaEuclidiana.prototype.getValue(begin, end) {
	begin = Node.buildNodeFrom(begin);
	end = Node.buildNodeFrom(end);

	var dx = Math.abs (begin.x - end.x);
	var dy = Math.abs (begin.y - end.y);

	return Math.sqrt(dx*dx + dy*dy);
}