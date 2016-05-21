/**
 * @description algoritmo Best-first que executa um backtrack para o nó pai caso ele encontre um DEAD-END
 * @param heuristica {[Heuristica]}
 */
function AStar(heuristica) {
	if(!heuristica instanceof Heuristica)
		throw new Error('Erro ao instanciar AStar');
	this.heuristica = heuristica;
	this.nome = 'A*';
    this.caminho = [];
    this.custo = 0;
}
/**
 * @param  nodeInicial {[Node]} é o ponto inicial do algoritmo
 * @param  nodeFinal {[Node]} é o ponto em que se deseja chegar.
 * @param  grid {[Grid]} é a grid com os nós.
 * @return caminho {[integer]} o custo do caminho || um caminho até o nó inicial com todos os nós parent.
 */
AStar.prototype.findPath = function(nodeInicial, nodeFinal, grid) {
	var node, vizinhos, i, noVizinho;
	var fechados = [];
	this.custo = 0;

	// essa lista ordena os elementos de maneira com que a heuristica deles sejao menores e estejam em ordem.
	// ou seja, se eu tirar algum, ele vai me retornar o com menor heuristica.
	var abertos = new Heap(function(nodeA, nodeB) {
		return nodeA.hVal - nodeB.hVal;
	});

	//a heuristica total ainda é 0;
	nodeInicial.hVal = 0;
	//o custo é 0
	nodeInicial.custo = 0;

	//priority queue contendo start
	abertos.push(nodeInicial);
	// enquanto existirem nós na lista de abertos, o algoritmo executará.
	while(!abertos.empty()){
		/**
		 * retira-se um nó da lista de abertos, um nó que ainda nao foi percorrido.
		 * @type node {[Node]}
		 */
		node = abertos.pop();
		//ele foi visitado.
		fechados.push(node);
		//o custo é aumentado em 1.
		this.custo++;

		//se este nó for o objetivo, retorna-se o caminho até o inicial.
		if(node === nodeFinal){
            this.caminho = backtrace(node);
            return this.caminho;
		}
		//senão.

		// obtem-se os vizinhos do nó atual, filtrando os nós que são obstáculos
		// e os nós que nao foram percorridos.
		vizinhos = grid.getVizinhos(node).filter(function(a) {
			return (!(_.includes(fechados,a)));
		});
		//percorre-se todos os vizinhos.
		for(i = 0; i < vizinhos.length; i++){
			noVizinho = vizinhos[i];
			// se o nó vizinho nao estiver na lista de abertos
			// ou o seu custo for menor do que o custo atual do nó.
			if(!abertos.contains(noVizinho) || noVizinho.custo > node.custo){
				//realiza-se toda a aplicação da heuristica.
				noVizinho.custo = node.custo + 1;
				noVizinho.hVal = noVizinho.custo + this.heuristica.getValue(noVizinho, nodeFinal);
				//coloca o nó pai como o nó atual.
				noVizinho.parent = node;
				//se este nó vizinho não tiver sido percorrido ainda
				if (!abertos.contains(noVizinho)){
					//coloque-o para ser percorrido.
					abertos.push(noVizinho);
				}
			}
		}
	}

    this.caminho = null;
    return this.caminho;
}
