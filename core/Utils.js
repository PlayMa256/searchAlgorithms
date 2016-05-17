
function backtrace(node) {
    var path = [{'x' : node.x, 'y' : node.y}];
    while (node.parent) {
        node = node.parent;
        path.push({'x' : node.x, 'y' : node.y});
    }
    return path.reverse();
}

function criarGrid(grid){
    var container = document.getElementById('container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    var celula = document.createElement('div');
    celula.classList.add('celula');

    for (i = 0; i < grid.altura; i++) {
        for (j = 0; j < grid.largura; j++) {
            var clone = celula.cloneNode();
            if (!grid.isTransitavel(j, i)) {
                clone.classList.add('bloqueada');
            }
            container.appendChild(clone);
        }
        container.appendChild(document.createElement('br'));
    }
}
function pintarGrid(grid, caminho) {
    criarGrid(grid)
    caminho.forEach(function(ponto) {
        try {
            pintarCelula(grid, ponto);
        } catch(err) {
            console.error('Pintura de ' + ponto.x + ',' + ponto.y + ' nao foi bem sucedida.');
        }
    })
}
function pintarCelula(grid, ponto) {
    var ind = grid.largura * ponto.y + ponto.x;
    var celula = document.querySelectorAll('.celula')[ind];
    celula.classList.add('is-pintada');
}