class Summary {

    static pathElm = document.getElementById("path");
    static countElm = document.getElementById("count");

    static update(node) 
    {
        Summary.pathElm.textContent = node.id;
        Summary.countElm.textContent = "Loading...";
        fetch("/count"+node.query.slice(0, -1))
        .then(rep=>rep.json())
        .then(json=>{
            Summary.countElm.textContent = json.count;
        })
        .catch(err=>console.error(err));        
    }
}