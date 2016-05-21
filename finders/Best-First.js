/**
 * @description algoritmo Best-first que executa um backtrack para o nó pai caso ele encontre um DEAD-END
 * @param heuristica {[Heuristica]}
 * esta é uma implementação classica
 */
function BestFirst(heuristica){
	if(!heuristica instanceof Heuristica)
		throw new Error('Erro ao instanciar BestFirst');
	this.heuristica = heuristica;
	this.nome = "Best First";
	this.caminho = [];
	this.custo = 0;
}
/**
 * @param  nodeInicial {[Node]} é o ponto inicial do algoritmo
 * @param  nodeFinal {[Node]} é o ponto em que se deseja chegar.
 * @param  grid {[Grid]} é a grid com os nós.
 * @return caminho {[integer]} o custo do caminho || um caminho até o nó inicial com todos os nós parent.
 */
BestFirst.prototype.findPath = function(nodeInicial, nodeFinal, grid){
	var node, i, vizinhos, vizinho;
	var fechados = [];
	this.custo = 0;
    // essa lista ordena os elementos de maneira com que a heuristica deles sejao menores e estejam em ordem.
    // ou seja, se eu tirar algum, ele vai me retornar o com menor heuristica.	
	var abertos = new Heap(function(nodeA, nodeB) {
		return nodeA.hVal - nodeB.hVal;
	});
    //mede-se a heuristica do nó inicial.
	nodeInicial.hVal = this.heuristica.getValue(nodeInicial, nodeFinal);
	// o insere na lista de abertos.
	abertos.push(nodeInicial);
	// enquanto não existir nós para serem percorridos.
	while (!abertos.empty()) {
		//retira o de menor Heuristica da pilha
		node = abertos.pop();
		//limpa a pilha, já que se perde a ligação para os filhos dos percorridos
        abertos.clear();
        //o marca como percorrido
		fechados.push(node);
		this.custo++;
		//se este nó for o objetivo, retorna-se o caminho até o inicial.
		if (node === nodeFinal) {
		    this.caminho = backtrace(node);
		    return this.caminho;
        }
        // obtem todos os vizinhos deste nó
		vizinhos = grid.getVizinhos(node);
		for (i = 0; i < vizinhos.length; i++) {
			vizinho = vizinhos[i];
			// se o vizinho ja foi percorrido, percorre o proximo vizinho
			if (_.includes(fechados,vizinho))
				continue;
			//senao
			//mensura a sua heuristica
			vizinho.hVal = this.heuristica.getValue(vizinho, nodeFinal);
			vizinho.parent = node;
			// se a heuristica do vizinho for menor do que a heuristica do nó atual e este nó vizinho
			// nao ter sido percorrido ainda.
			if (vizinho.hVal < node.hVal && !_.includes(abertos, vizinho)) {
				// tomo este nó vizinho como proximo
				abertos.push(vizinho);
			}
		}
	}

    this.caminho = null;
    return this.caminho;
};
