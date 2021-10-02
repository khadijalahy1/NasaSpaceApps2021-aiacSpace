// A node is either forked or not.
// A forked node, is forked to into a set of values of a chosen Filter.


class Node {
  constructor(filterId, filterValueId, parent = null, showIconAndText = false) {
    
    this.value = filterValueId;

    // The id must be unique, so we will use the nodes hierarchy to generate the final id.
    if (parent)
      this.id = parent.id + " > " + filterValueId;
    else
      this.id = filterValueId;

    this.icon = FiltersValues.Icon(filterValueId);
    if (showIconAndText || !this.icon)
      this.text = FiltersValues.Name(filterValueId);

    // this.filter is the filter that gived this node.
    this.filterId = filterId;

    // this.forkedFilter is the filter that this node is currently forking
    this.forkedFilter = null;

    this.parent = parent;

    this.dom = document.createElement("div");
    this.dom.className = 'node';

    let content = document.createElement("div");
    content.className = 'node-dom';
    let filterColor = Filters.Color(filterId);
    if(filterColor)
    {
      content.style.borderColor = Filters.Color(filterId);
      content.style.color = ColorUtils.LightenDarkenColor(Filters.Color(filterId), -20);
    }    
    this.dom.appendChild(content);    

    if (this.icon) {
      let iconElm = document.createElement("img");
      iconElm.src = this.icon;
      content.appendChild(iconElm);
    }

    if (this.text) {
      let textElm = document.createElement("span");
      textElm.textContent = this.text;
      content.appendChild(textElm);
    }

    this.dom.addEventListener('click', (e) => { this.onClick() });
    this.dom.addEventListener('dblclick', (e) => { this.onDoubleClick() });

    this.graphNode = cy.add({ group: 'nodes', data: { id: this.id, dom: this.dom } });
    
    cy.on('move', 'node[id="'+this.id+'"]', (e)=> {
      console.log("sss");
    });

    if (this.parent) {
      cy.add({ group: 'edges', data: { source: this.parent.id, target: this.id, color: Filters.Color(this.filterId) } });
    }    

    this.picker = new FilterPicker(this, (e) => { this.onFilterSelected(e) });
  }

  get boundingClientRect() {
    return this.dom.getBoundingClientRect();
  }

  get filtersPath() {
    if (this._filtersPath === undefined) {
      if (this.parent)
        this._filtersPath = this.parent.filtersPath.concat(this.filterId);
      else
        this._filtersPath = [];
    }
    return this._filtersPath;
  }

  remove() {    
    this.picker.destroy();
    this.graphNode.remove();
    this.dom.remove();
    this.clearChildNodes();
  }

  onClick() {
    console.log("clicked: " + this.id);
  }

  onDoubleClick() {
    this.unFork();
  }

  onFilterSelected(filterId) {
    this.forkOn(filterId);
    Cytoscape.DoLayout(this.graphNode);
  }

  clearChildNodes() {
    if (this.childNodes)
      this.childNodes.forEach(node => node.remove())

    this.automove?.destroy();
    this.childNodes = [];
  }

  forkOn(filterId) {
    if (this.forkedFilter === filterId)
      return;

    this.clearChildNodes();

    this.forkedFilter = filterId;
    this.childNodes = [];
    
    this.dom.style.border = `5px solid ${Filters.Color(filterId)}`;
    this.dom.style.background = ColorUtils.HexToRGBA(Filters.Color(filterId), 0.5);
    this.dom.children[0].style.borderStyle = "solid";

    let values = Filters.Values(filterId);

    let predecessor = Filters.Predecessor(filterId);
    if(predecessor)
    {
      let p = this;
      while(p.filterId != predecessor)
      {
        p = p.parent;
      }
      values = values[p.value];
    }

    let collection = cy.collection().union(this.graphNode);

    values.forEach((valueId) => {
      let node = new Node(filterId, valueId, this);
      this.childNodes.push(node);
     // collection = collection.union(node.graphNode);
    });

    this.automove = cy.automove({
      nodesMatching: collection,
      meanOnSelfPosition: function( node ){ return false; }
    });
  }

  unFork() {
    this.forkedFilter = null;
    this.clearChildNodes();
    this.dom.style.border = 'none';
  }
}