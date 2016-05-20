
function backtrace(node) {
    var path = [{'x' : node.x, 'y' : node.y}];
    while (node.parent) {
        node = node.parent;
        path.push({'x' : node.x, 'y' : node.y});
    }
    return path.reverse();
}
