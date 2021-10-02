// A node is either forked or not.
// A forked node, is forked to into a set of values of a chosen Filter.


class Node {
  constructor(filterValueId, parent = null) {

    this.id = filterValueId;
    this.icon = FiltersValues.Icon(filterValueId)
    this.text = FiltersValues.Name(filterValueId);    
    this.filter = FiltersValues.Filter(filterValueId);

    this.parent = parent;

    this.dom = document.createElement("div");
    this.dom.className = 'node';

    let content = document.createElement("div");
    content.className = 'node-dom';
    this.dom.appendChild(content);

    let iconElm = document.createElement("img");
    iconElm.src = this.icon;
    content.appendChild(iconElm);

    let textElm = document.createElement("span");
    textElm.textContent = this.text;
    content.appendChild(textElm);

    this.dom.addEventListener('click', (e) => { e.stopPropagation(); this.onClick() });

    cy.add({ group: 'nodes', data: { id: this.id, dom: this.dom } });

    if (this.parent) {
      cy.add({ group: 'edges', data: { source: this.parent.id, target: this.id } });
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
  }

  onClick() {
    console.log("clicked: " + this.id);
  }

  onFilterSelected(filterId) {
    // TODO: fork here
    console.log(filterId);
    e.currentTarget.classList.add("forked");            
  }
}