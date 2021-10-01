import cytoscape from "./cytoscape.esm.min.js";
import cytoscapeDomNode from "./cytoscape.dom.node.js";


cytoscape.use(cytoscapeDomNode);

// A node is either forked or not.
// A forked node, is forked to into a set of values of a chosen category.

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

let addNode = (id, icon, text, parentId) => {
  let node = document.createElement("div");
  node.className = 'node';

  let nodeDom = document.createElement("div");
  nodeDom.className = 'node-dom';
  node.appendChild(nodeDom);

  let iconElm = document.createElement("img");
  iconElm.src = icon;
  nodeDom.appendChild(iconElm);

  let textElm = document.createElement("span");
  textElm.textContent = text;
  nodeDom.appendChild(textElm);

  node.addEventListener('click', (e) => {
    e.currentTarget.classList.add("forked");
  });

  cy.add({ group: 'nodes', data: { id: id, dom: node } });

  if (parentId) {
    cy.add({ group: 'edges', data: { source: parentId, target: id } });
  }

}

addNode("all", "./assets/icons/ic_all.svg", "All datasets")

addNode("space", "./assets/icons/ic_space.svg", "Space", "all")
addNode("earth", "./assets/icons/ic_earth.svg", "Earth", "all")
addNode("ocean", "./assets/icons/ic_ocean.svg", "Ocean", "all")

cy.layout({
  name: 'concentric',
  fit: false,
  minNodeSpacing: 200,
  padding: 100,
}).run()

