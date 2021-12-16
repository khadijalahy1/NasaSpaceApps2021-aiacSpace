
var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: false,
  autounselectify: true,

  style: cytoscape.stylesheet()
    .selector('node')
    .css({
      'overlay-opacity': 0,
      'background-opacity': 0,
    })
    .selector('edge[color]')
    .css({
      'overlay-opacity': 0,
      'curve-style': 'unbundled-bezier',
      'width': 6,
      'target-arrow-shape': 'triangle',
      'line-color': 'data(color)',
      'target-arrow-color': 'data(color)'
    }),
}); 


cy.domNode();

let initNode = new Node(null, "all", null, true, true);

cy.center()