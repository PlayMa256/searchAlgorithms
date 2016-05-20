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

function fazerExperimento(grid, pBegin, pEnd, algoritmo) {
    criarGrids(grid);
	if(grid.isTransitavel(pBegin.x, pBegin.y) && grid.isTransitavel(pEnd.x, pEnd.y)) {
		algoritmo.findPath(grid.getNode(pBegin.x, pBegin.y), grid.getNode(pEnd.x, pEnd.y), grid);
	} else {
		throw new Error('Erro ao tentar criar experimento. Ponto passou dos limites.')
	}
}

function criarGrids(grid){
    var container = $('.container');
    container.empty();
    criarGrid(grid, container.eq(0));
    criarGrid(grid, container.eq(1));
}
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
function pintarGrid(grid, container, caminho) {
    if (container.children().length === 0) {
        criarGrid(grid, container);
    }
    $('.celula.is-pintada', container).removeClass('is-pintada');
    if(!caminho) return;
    caminho.forEach(function(ponto) {
        try {
            pintarCelula(grid, container, ponto);
        } catch(err) {
            console.error('Pintura de ' + ponto.x + ',' + ponto.y + ' nao foi bem sucedida.');
        }
    });
}
function pintarCelula(grid, container, ponto) {
    var ind = grid.largura * ponto.y + ponto.x;
    var celula = $('.celula', container).eq(ind);
    celula.addClass('is-pintada');
}

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
