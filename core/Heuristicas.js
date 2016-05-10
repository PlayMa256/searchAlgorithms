function Heuristicas(){
}


Heuristica.prototype.mahattan = function(dx, dy){
		return dx+dy;
};

Heuristica.prototype.euclidian = function(dx, dy){
		return Math.sqrt(dx * dx + dy * dy);
};