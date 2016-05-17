
function backtrace(node) {
    var path = [[node.x, node.y]];
    while (node.parent) {
        node = node.parent;
        path.push([node.x, node.y]);
    }
    return path.reverse();
}

function createDomGrid(grid){
    var container = document.getElementById('container');
    var celula = document.createElement('div');
    celula.classList.add('celula');
    for (i = 0; i < grid.altura; i++) {
        for (j = 0; j < grid.largura; j++) {
            container.appendChild(celula.cloneNode());
        }

    }
}