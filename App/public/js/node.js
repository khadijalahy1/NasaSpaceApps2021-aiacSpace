// A node is either forked or not.
// A forked node, is forked to into a set of values of a chosen Filter.


class Node {
  constructor(filterId, filterValueId, parent = null, showIconOnly = true) {

    this.id = filterValueId;
    this.icon = FiltersValues.Icon(filterValueId);
    if (!this.icon || !showIconOnly)
      this.text = FiltersValues.Name(filterValueId);

    // this.filter is the filter that gived this node.
    this.filter = filterId;

    // this.forkedFilter is the filter that this node is currently forking
    this.forkedFilter = null;

    this.parent = parent;

    this.dom = document.createElement("div");
    this.dom.className = 'node';

    let content = document.createElement("div");
    content.className = 'node-dom';
    this.dom.appendChild(content);

    if (this.icon) {
      let iconElm = document.createElement("img");
      iconElm.src = this.icon;
      content.appendChild(iconElm);
    }

    let textElm = document.createElement("span");
    textElm.textContent = this.text;
    content.appendChild(textElm);

    this.dom.addEventListener('click', (e) => { this.onClick() });
    this.dom.addEventListener('dblclick', (e) => { this.onDoubleClick() });

    this.graphNode = cy.add({ group: 'nodes', data: { id: this.id, dom: this.dom } });

    if (this.parent) {
      cy.add({ group: 'edges', data: { source: this.parent.id, target: this.id, color: Filters.Color(this.filter) } });
    }

    this.picker = new FilterPicker(this, (e) => { this.onFilterSelected(e) });
  }

  get boundingClientRect() {
    return this.dom.getBoundingClientRect();
  }

  get filtersPath() {
    let path = [this.filter];
    let p = this.parent;
    while (p != null) {
      path.push(p.filter);
      p = p.parent;
    }
    return path;
  }

  remove() {
    this.picker.destroy();
    this.graphNode.remove();
    this.dom.remove();
  }

  onClick() {
    console.log("clicked: " + this.id);
  }

  onDoubleClick() {
    this.unFork();
  }

  onFilterSelected(filterId) {
    this.forkOn(filterId);
    Cytoscape.DoLayout();
  }

  clearChildNodes() {
    if (this.childNodes)
      this.childNodes.forEach(node => node.remove())

    this.childNodes = [];
  }

  forkOn(filterId) {
    if (this.forkedFilter === filterId)
      return;

    this.clearChildNodes();

    this.forkedFilter = filterId;
    this.childNodes = [];

    this.dom.style.border = `5px solid ${Filters.Color(filterId)}`;

    Filters.Values(filterId).forEach((valueId) => {
      this.childNodes.push(new Node(filterId, valueId, this));
    });
  }

  unFork() {
    this.forkedFilter = null;
    this.clearChildNodes();
    this.dom.style.border = 'none';
  }
}