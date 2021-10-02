
var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: false,
  autounselectify: true,

  style: cytoscape.stylesheet()
    .selector('node')
    .css({
      'background-opacity': '0',
    })
    .selector('edge[color]')
    .css({
      'curve-style': 'unbundled-bezier',
      'width': 6,
      'target-arrow-shape': 'triangle',
      'line-color': 'data(color)',
      'target-arrow-color': 'data(color)'
    })
}); // cy init


cy.domNode();


let initNode = new Node(null, "all", null, false);

/*
addNode("all", , "Datasets", null, (node) => {

  if (node.isForked) {
    node.isForked = false;
    cy.$('#' + node.id).neighborhood(function (ele) {
      cy.remove(ele);
    });
  }
  else {
    node.isForked = true;
    addNode("space", "./assets/icons/ic_space.svg", "Space", "all");
    addNode("earth", "./assets/icons/ic_earth.svg", "Earth", "all");
    addNode("ocean", "./assets/icons/ic_ocean.svg", "Ocean", "all");
  }

  layout();
})*/

cy.center()

