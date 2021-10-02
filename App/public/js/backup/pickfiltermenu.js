class PickFilterMenu {

    static Show(node) {
  
      let focusLayer = document.createElement("div");
      focusLayer.className = 'focusLayer';
  
      let container = document.createElement("div");
      container.className = 'pick-filter-menu';
  
      let title = document.createElement("span");
      title.textContent = "Pick a Filter";    
  
      container.appendChild(title);
  
      let path = node.FiltersPath;
  
      Filters.List.forEach((filterId) => {
        let disabled = path.includes(filterId);
        let filterElm = document.createElement("div");
        filterElm.className = "filter";
        if(disabled) {
          filterElm.className = "disabled";
        }     
        filterElm.textContent = Filters.Name(filterId); 
        filterElm.title = Filters.Description(filterId);  
        filterElm.filterId = filterId;    
        container.appendChild(filterElm);
      });
  
      let nodeRect = node.BoundingClientRect;
      let width = 100, height = 300;
      let x = nodeRect.right + 10, y = nodeRect.y - 20;
  
      console.log(x, y, x + width, y + height);
      if(x + width > window.innerWidth)
        x = nodeRect.x - nodeRect.width - 10;
  
      if(y + height > window.innerHeight)
        y = nodeRect.y - nodeRect.height - 10;
  
      container.style.left = x+'px';
      container.style.top = y+'px';    
  
      focusLayer.appendChild(container);        
      document.body.appendChild(focusLayer);
  
      //focusLayer.offsetWidth;
      focusLayer.style.opacity = 1;
  
      return new Promise((resolve, reject) => {
        let onclick = (e) => {
  
          if(e.target.filterId) {
            resolve(e.target.filterId);
          }
          else if(e.target != container && e.target != title) {
            reject();
          }
          else
             return; // don't remove the listener!
  
          focusLayer.style.opacity = 0;
          focusLayer.ontransitionend = () =>  focusLayer.remove();
          window.removeEventListener('click', onclick);
        }
        window.addEventListener('click', onclick);
      })
    }
  }