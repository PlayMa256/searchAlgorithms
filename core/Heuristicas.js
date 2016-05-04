function Heurisitcas(){
	this.mahattan = function(dx, dy){
		return dx+dy;
	};

	this.euclidian = function(dx, dy){
		return Math.sqrt(dx * dx + dy * dy);
	};
}
