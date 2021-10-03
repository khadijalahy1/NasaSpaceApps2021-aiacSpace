// A node is either forked or not.
// A forked node, is forked to into a set of values of a chosen Filter.


class Node {

  static SelectedNode = null;

  constructor(filterId, filterValueId, parent = null, showIconAndText = false, select = false) {

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
    if (filterColor) {
      content.style.borderColor = ColorUtils.LightenDarkenColor(filterColor, 40);
      content.style.background = ColorUtils.LightenDarkenColor(filterColor, -40);
      content.style.color = "#fff";
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

    if (this.parent) {
      this.graphEgde = cy.add({ group: 'edges', data: { source: this.parent.id, target: this.id, color: Filters.Color(this.filterId) } });
    }    

    this.picker = new FilterPicker(this, (e) => { this.onFilterSelected(e) });

    if(select)
      this.onClick();
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

  get query() {
    if (this._query === undefined) {
      if (this.parent) {
        this._query = this.parent.query + this.filterId + "=" + this.value + "&";
      }
      else
        this._query = "?";
    }
    return this._query;
  }

  get childGraphNodes() {
    return cy.collection(this.childNodes.map(e => e.graphNode));
  }

  remove() {
    this.picker.destroy();
    this.graphNode.remove();
    this.dom.remove();
    this.clearChildNodes();
  }

  onClick() {        
    if(Node.SelectedNode)
      Node.SelectedNode.dom.children[0].style.boxShadow = "none";
    this.dom.children[0].style.boxShadow = "0 0 10px 5px #FFF";      
    Node.SelectedNode = this;        

    Summary.update(this);    

    this.highlighPath();
  }

  onDoubleClick() {
    window.open("/dataset" + this.query);
    //this.unFork();
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

  highlighPath(tail) {    
    if(tail)
    {            
      this.childNodes.forEach((node) => {      
          node.dom.style.opacity = 0.3;        
          node.graphEgde.style({ opacity: 0.3 });
      });
      tail.dom.style.opacity = 1;      
      tail.graphEgde.style({ opacity: 1 });
    }

    this.parent?.highlighPath(this);
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
    if (predecessor) {
      let p = this;
      while (p.filterId != predecessor) {
        p = p.parent;
      }
      values = values[p.value];
    }

    values.forEach((valueId) => {
      let node = new Node(filterId, valueId, this);
      this.childNodes.push(node);
    });

    this.automove = cy.automove({
      nodesMatching: this.childGraphNodes,
      reposition: 'drag',
      dragWith: this.graphNode,
    });
  }

  unFork() {
    this.forkedFilter = null;
    this.clearChildNodes();
    this.dom.style.border = 'none';
  }
}