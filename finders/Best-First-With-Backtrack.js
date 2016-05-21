/**
 * @description algoritmo Best-first que executa um backtrack para o nó pai caso ele encontre um DEAD-END
 * @param heuristica {[Heuristica]}
 */
function BestFirstWithBacktrack(heuristica){
    if(!heuristica instanceof Heuristica)
        throw new Error('Erro ao instanciar BestFirstWithBacktrack');
    this.heuristica = heuristica;
    this.nome = "Best First + Backtrack";
    this.caminho = [];
    this.custo = 0;
}
/**
 * @param  nodeInicial {[Node]} é o ponto inicial do algoritmo
 * @param  nodeFinal {[Node]} é o ponto em que se deseja chegar.
 * @param  grid {[Grid]} é a grid com os nós.
 * @return caminho {[integer]} o custo do caminho || um caminho até o nó inicial com todos os nós parent.
 */
BestFirstWithBacktrack.prototype.findPath = function(nodeInicial, nodeFinal, grid){
    var node, i, vizinhos,vizinho;
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

        // backtrack
        /**
         * Enquanto a lista de vizinhos for igual a zero.
         */
        do {
            //filtrar todos os vizinhos que não foram inclusos no fechado, ou seja
            // não foram percorridos
            vizinhos = grid.getVizinhos(node).filter(function(a) {
                return (!(_.includes(fechados,a)));
            });
            //se não possuir nenhum vizinho
            if (vizinhos.length == 0){
                //insiro o node atual no fechado marcando-o como visitado.
                fechados.push(node);
                // volto para o seu pai.
                node = node.parent;
                //verificação para casos em que não se possui pai, por exemplo 0x0
                if (node == undefined) {
                    this.caminho = null;
                    return this.caminho;
                }
            }
        } while (vizinhos.length == 0);
        //percorre todos os seus vizinhos que ainda não foram visitados
        for (i = 0; i < vizinhos.length; i++) {
            vizinho = vizinhos[i];
            //mensura sua heuristica
            vizinho.hVal = this.heuristica.getValue(vizinho, nodeFinal);
            vizinho.parent = node;
            //e o marca para ser percorrido.
            abertos.push(vizinho);
        }
    }

    this.caminho = null;
    return this.caminho;
};
