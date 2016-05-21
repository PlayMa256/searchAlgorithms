function BestFirstWithBacktrack(heuristica){
    if(!heuristica instanceof Heuristica)
        throw new Error('Erro ao instanciar BestFirstWithBacktrack');
    this.heuristica = heuristica;
    this.nome = "Best First + Backtrack";
    this.caminho = [];
    this.custo = 0;
}
BestFirstWithBacktrack.prototype.findPath = function(nodeInicial, nodeFinal, grid){
    var node, i, j, k, x, y, vizinhos, vizinhoG, vizinho;
    var fechados = [];
    this.custo = 0;
    var abertos = new Heap(function(nodeA, nodeB) {
        return nodeA.hVal - nodeB.hVal;
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
            vizinhos = grid.getVizinhos(node).filter(function(a) {
                return (!(_.includes(fechados,a)));
            });
            if (vizinhos.length == 0){
                fechados.push(node);
                node = node.parent;
                if (node == undefined) {
                    this.caminho = null;
                    return this.caminho;
                }
            }
        } while (vizinhos.length == 0);
        for (i = 0; i < vizinhos.length; i++) {
            vizinho = vizinhos[i];
            vizinho.hVal = this.heuristica.getValue(vizinho, nodeFinal);
            vizinho.parent = node;
            abertos.push(vizinho);
        }
    }

    this.caminho = null;
    return this.caminho;
};
