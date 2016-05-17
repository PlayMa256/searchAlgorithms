function BestFirstWithBacktrack(heuristica){
    if(!heuristica instanceof Heuristica)
        throw new Error('Erro ao instanciar BestFirstWithBacktrack');
    this.heuristica = heuristica;
    this.caminho = [];
    this.custo = 0;
}
BestFirstWithBacktrack.prototype.findPath = function(nodeInicial, nodeFinal, grid){
    var node, i, j, k, x, y, vizinhos, vizinhoG, vizinho;
    var fechados = [];
    this.custo = 0;
    var abertos = new Heap(function(nodeA, nodeB){
        nodeA.hVal - nodeB.hVal;
    });

    nodeInicial.hVal = this.heuristica.getValue(nodeInicial, nodeFinal);
    abertos.push(nodeInicial);
    while (!abertos.empty()) {
        node = abertos.pop();
        abertos.clear();
        fechados.push(node);
        this.custo++;

        if (node === nodeFinal) {
            this.caminho = backtrace(node);
            return this.caminho;
        }

        // backtrack
        do {
            vizinhos = grid.getVizinhos(node);
            vizinhos = vizinhos.filter(function(a){
                if(_.includes(fechados,a))
                    return false;
                else 
                    return true;
            });
            if (vizinhos.length == 0){
                fechados.push(node);
                node = node.parent;
            }
        } while (vizinhos.length == 0);

        for (i = 0; i < vizinhos.length; i++) {
            vizinho = vizinhos[i];
            vizinho.hVal = this.heuristica.getValue(vizinho, nodeFinal);
            vizinho.parent = node;
            abertos.push(vizinho);
        }
    }

};