var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

$(document).ready(function() {

})
    .on('change', '#selExp', function() {
        matriz = selecionarExperimento($(this).val()).matriz;
        criarGrids(new Grid(matriz));
    })
    .on('click', '#btnExperimentar', function() {
        var valHeu = $('#selHeu').val();
        var valAlg = $('#selAlg').val();
        var valExp = $('#selExp').val();
        switch (valHeu) {
            case 'ma':
               heuristica = new Manhattan();
                break;
            case 'de':
                heuristica = new DistanciaEuclidiana();
                break;
        }

        var astar = new AStar(heuristica), bestfirst;
        switch (valAlg) {
            case 'bf':
                bestfirst = new BestFirst(heuristica);
                break;
            case 'bfb':
                bestfirst = new BestFirstWithBacktrack(heuristica);
                break;
        }
        exper = selecionarExperimento(valExp);
        grid = new Grid(exper.matriz);
        fazerExperimento(grid, exper.ini, exper.fim, astar);
        fazerExperimento(grid, exper.ini, exper.fim, bestfirst);

        var container = $('.container'),
            info = $('.info');
        pintarGrid(grid, container.eq(0), astar.caminho);
        putInfo(info.eq(0), astar);
        pintarGrid(grid, container.eq(1), bestfirst.caminho);
        putInfo(info.eq(1), bestfirst);
    });
/**
 * @param  grid {[Grid]}
 * @param  pBegin {[Node]}
 * @param  pEnd {[Node]}
 * @param  algoritmo
 */
function fazerExperimento(grid, pBegin, pEnd, algoritmo) {
    criarGrids(grid);
	if(grid.isTransitavel(pBegin.x, pBegin.y) && grid.isTransitavel(pEnd.x, pEnd.y)) {
		algoritmo.findPath(grid.getNode(pBegin.x, pBegin.y), grid.getNode(pEnd.x, pEnd.y), grid);
	} else {
		throw new Error('Erro ao tentar criar experimento. Ponto passou dos limites.')
	}
}
/**
 * @param  grid {[type]}
 * @description [esta função gera as grids para comparação de 2 algoritmos]
 */
function criarGrids(grid){
    var container = $('.container');
    container.empty();
    criarGrid(grid, container.eq(0));
    criarGrid(grid, container.eq(1));
}
/**
 * @param  grid {[Grid]}
 * @param  container {[DomElement]}
 * @description está função gerá a grid que irá mostrar o caminho e os obstaculos
 */
function criarGrid(grid, container) {
    var celula = $(document.createElement('div')).addClass('celula');
    for (i = 0; i < grid.altura; i++) {
        for (j = 0; j < grid.largura; j++) {
            var clone = celula.clone();
            if (!grid.isTransitavel(j, i)) {
                clone.addClass('bloqueada');
            }
            container.append(clone);
        }
        container.append($(document.createElement('br')));
    }
}
/**
 * @param  grid {[Grid]}
 * @param  container {[DomElement]}
 * @param  caminho 
 * @description esta função irá pintar o caminho na grid
 */
function pintarGrid(grid, container, caminho) {
    if (container.children().length === 0) {
        criarGrid(grid, container);
    }
    $('.celula.is-pintada', container).removeClass('is-pintada');
    if(!caminho) return;
    qtdAzul = 0;
    caminho.forEach(function(ponto, ind) {
        try {
            pintarCelula(grid, container, ponto, ind);
        } catch(err) {
            console.error('Pintura de ' + ponto.x + ',' + ponto.y + ' nao foi bem sucedida.');
        }
    });
}
/**
 * @param  grid {[Grid]}
 * @param  container {[DomElement]}
 * @param  caminho 
 * @param ponto {[Node]}
 * @param contador {[Integer}
 * @description esta função pinta a celula, diferenciando as visitadas das nao visitadas
 */
function pintarCelula(grid, container, ponto, contador) {
    var ind = grid.largura * ponto.y + ponto.x;
    var celula = $('.celula', container).eq(ind);

    // gradient
    qtdAzul = contador % (hex.length * 2);
    if (qtdAzul >= hex.length) {
        qtdAzul = qtdAzul - hex.length;
        qtdAzul = (hex.length - 1) - qtdAzul;
    }
    celula.addClass('is-pintada').css({
        'background-color' : '#66' + hex[qtdAzul]
    });
}
/**
 * @param  div {[DomElement]}
 * @param  algoritmo
 * @description gera as informações.
 */
function putInfo(div, algoritmo) {
    var innerHtml = '<h3>' + algoritmo.nome + '</h3>';
    innerHtml += 'Custo de processamento: ' + algoritmo.custo + '<br>';
    if (!!algoritmo.caminho) {
        innerHtml += 'Tamanho do caminho: ' + algoritmo.caminho.length;
    } else {
        innerHtml += 'Caminho n&atilde;o encontrado';
    }

    div.html(innerHtml);
}
