/**
 * Função de heuristica, Classe ABSTRATA
 */
var Heuristica = function() {
	throw new Error('Erro de metodo abstrato');
};
Heuristica.prototype.getValue = function(begin, end){
	throw new Error('Erro de metodo abstrato');
};


/**
 * Função de heuristica manhattan
 * Esta classe é uma classe do tipo Heuristica
 */
var Manhattan = function() {
	this.name = "Manhattan";
}
Manhattan.prototype = Object.create(Heuristica.prototype);
Manhattan.prototype.constructor = Manhattan;

/**
 * @param  begin {[Node]}
 * @param  end {[Node]}
 * @return dx+dy{[Integer]}
 */
Manhattan.prototype.getValue = function(begin, end) {
	var dx = Math.abs (begin.x - end.x);
	var dy = Math.abs (begin.y - end.y);

	return dx + dy;
}

/**
 * Classe de distancia euclidiama filha da classe abstrata Heuristica
 */
var DistanciaEuclidiana = function() {
	this.name = "Distancia Euclidiana";
}
DistanciaEuclidiana.prototype = Object.create(Heuristica.prototype);
DistanciaEuclidiana.prototype.constructor = DistanciaEuclidiana;

/**
 * @param  begin {[Node]}
 * @param  end {[Node]}
 * @return Raiz Quadrada entre as distancias {[Float]}
 */
DistanciaEuclidiana.prototype.getValue = function(begin, end) {
	var dx = Math.abs (begin.x - end.x);
	var dy = Math.abs (begin.y - end.y);
	return Math.sqrt(dx*dx + dy*dy);
}