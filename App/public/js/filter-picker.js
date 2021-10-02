class FilterPicker {
    constructor (node, onFilterSelected) {
  
      let commands = [];
      let allFilters = Filters.List;
      let filtersPath = node.filtersPath;
  
      allFilters.forEach((filterId) => {        

        // Before adding a filter to the picker, we must take care of 2 special filters:
        // 1- the already used ones
        // 2- the ones that have an predecessor that the user didn't choose yet, e.g: Speciality is a successor of Audience.
        // The first ones are going to be disabled for the moment.
        // The seconds ones, should not be included, unless their predecossor is already used, in that case it have to be removed.
        // The following lines (before commands.push) deals with this.
        
        let alreadyUsed = filtersPath.includes(filterId);        
        let predecessor = Filters.Predecessor(filterId);

        if((alreadyUsed && Filters.Successors(filterId)) || (predecessor && !filtersPath.includes(predecessor)))
        {       
          return;
        }          

        commands.push({
          fillColor: ColorUtils.HexToRGBA( Filters.Color( filterId ), 0.9),
          content: `<img width='38' height='38' src='${Filters.Icon( filterId )}'>`,
          select: () => { onFilterSelected(filterId) },
          enabled: !alreadyUsed
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