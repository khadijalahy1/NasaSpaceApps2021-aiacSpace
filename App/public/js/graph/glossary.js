let glossaryElm = document.getElementById('glossary');

Filters.List.forEach((filterId) => 
{
    let line = document.createElement("div");

    line.style.backgroundColor = Filters.Color(filterId);
    
    let icon = document.createElement("img");
    icon.src = Filters.Icon(filterId);

    let name = document.createElement("span");
    name.textContent = Filters.Name(filterId);

    line.appendChild(icon);
    line.appendChild(name);

    glossaryElm.appendChild(line);
})