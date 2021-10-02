class FilterPicker {
    constructor (node, onFilterSelected) {
  
      let commands = [];
      let filtersPath = node.filtersPath;
  
      Filters.List.forEach((filterId) => {
  
        commands.push({
          fillColor: ColorUtils.HexToRGBA( Filters.Color( filterId ), 0.9),
          content: `<img width='38' height='38' src='${Filters.Icon( filterId )}'>`,
          contentStyle: {
   
          }, 
          select: () => { onFilterSelected(filterId) }
        });
      });
  
      this.menu = cy.cxtmenu({
        menuRadius: function (ele) { return 70; },
        
        selector: `node[id='${node.id}']`,
        commands: commands,
        fillColor: 'rgba(255, 255, 255, 0.75)',
        activeFillColor: 'rgba(1, 105, 217, 0.75)', 
        activePadding: 10,
        indicatorSize: 20,
        separatorWidth: 3,
        spotlightPadding: 0,
        adaptativeNodeSpotlightRadius: true, 
        openMenuEvents: 'cxttapstart taphold',
        zIndex: 9999, 
        atMouse: false,
        outsideMenuCancel: true
      });
    }

    destroy() {
        this.menu.destroy();
    }
  }