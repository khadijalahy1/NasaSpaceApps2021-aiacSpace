
var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: true,
  autounselectify: false,

  style: cytoscape.stylesheet()
    .selector('node')
    .css({
      'background-opacity': '0',
    })
    .selector('node:selected')
    .css({
      'background': 'red',
    })
    .selector('edge[color]')
    .css({
      'curve-style': 'unbundled-bezier',
      'width': 6,
      'target-arrow-shape': 'triangle',
      'line-color': 'data(color)',
      'target-arrow-color': 'data(color)'
    })
}); 


cy.domNode();

let initNode = new Node(null, "all", null, true);

cy.center()

