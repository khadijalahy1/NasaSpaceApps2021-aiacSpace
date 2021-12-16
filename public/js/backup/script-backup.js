import cytoscape from "../cytoscape.esm.min.js";

// photos from flickr with creative commons license

var cy = cytoscape({
    container: document.getElementById('cy'),
  
    boxSelectionEnabled: false,
    autounselectify: true,
  
    style: cytoscape.stylesheet()
      .selector('node')
        .css({
          'height': 100,
          'width': 100,
          'background-color': '#FFF',
          'border-color': '#ffaaaa',
          'border-width': 3,
          'border-opacity': 0.5
        })
      .selector('.eating')
        .css({
          'border-color': 'red'
        })
      .selector('.eater')
        .css({
          'border-width': 9
        })
      .selector('edge')
        .css({
          'curve-style': 'unbundled-bezier',
          'width': 6,
          'target-arrow-shape': 'triangle',
          'line-color': '#ffaaaa',
          'target-arrow-color': '#ffaaaa'
        })
      .selector('#theme')
        .css({
          'background-image': '../assets/icons/ic_theme.svg'
        })
      .selector('#space')
        .css({
          'background-image': '../assets/icons/ic_earth.svg'
        })
      .selector('#earth')
        .css({
          'background-image': '../assets/icons/ic_ocean.svg'
        })
    .selector('#ocean')
        .css({
          'background-image': '../assets/icons/ic_space.svg'
        }),
  
    elements: {
      nodes: [
        { data: { id: 'theme' } },
        { data: { id: 'space' } },
        { data: { id: 'earth' } },
        { data: { id: 'ocean' } },
      ],
      edges: [
        { data: { source: 'theme', target: 'space' } },
        { data: { source: 'theme', target: 'earth' } },
        { data: { source: 'theme', target: 'ocean' } },
      ]
    },
  
    layout: {
      name: 'breadthfirst',
      directed: true,
      padding: 10
    }
  }); // cy init
  
  cy.on('tap', 'node', function(){
    var nodes = this;
    var tapped = nodes;
    var food = [];
  
    nodes.addClass('eater');
  
    for(;;){
      var connectedEdges = nodes.connectedEdges(function(el){
        return !el.target().anySame( nodes );
      });
  
      var connectedNodes = connectedEdges.targets();
  
      Array.prototype.push.apply( food, connectedNodes );
  
      nodes = connectedNodes;
  
      if( nodes.empty() ){ break; }
    }
  
    var delay = 0;
    var duration = 500;
    for( var i = food.length - 1; i >= 0; i-- ){ (function(){
      var thisFood = food[i];
      var eater = thisFood.connectedEdges(function(el){
        return el.target().same(thisFood);
      }).source();
  
      thisFood.delay( delay, function(){
        eater.addClass('eating');
      } ).animate({
        position: eater.position(),
        css: {
          'width': 10,
          'height': 10,
          'border-width': 0,
          'opacity': 0
        }
      }, {
        duration: duration,
        complete: function(){
          thisFood.remove();
        }
      });
  
      delay += duration;
    })(); } // for
  
  }); // on tap
  