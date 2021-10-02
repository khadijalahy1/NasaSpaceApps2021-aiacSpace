
function layout() {
  cy.layout({
    name: 'concentric',
    fit: true,
    minNodeSpacing: 200,
    randomize: true,
    padding: 100,
    animate: true,
    animationDuration: 350,
    animationEasing: 'ease-in-out'
  }).run()
}


var cy = cytoscape({
  container: document.getElementById('cy'),

  wheelSensitivity: 0.1,
  boxSelectionEnabled: false,
  autounselectify: true,

  style: cytoscape.stylesheet()
    .selector('node')
    .css({
      'background-opacity': '0',
    })
    .selector('edge')
    .css({
      'curve-style': 'unbundled-bezier',
      'width': 6,
      'target-arrow-shape': 'triangle',
      'line-color': '#FFF',
      'target-arrow-color': '#FFF'
    })
}); // cy init

cy.domNode();


let initNode = new Node("all", null);
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

